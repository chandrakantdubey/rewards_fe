import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
  Layer,
  Theme,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyUSPPromotionsList } from "../../redux/myPromotions/myPromotionsSlice";
import { Launch, NotAvailable } from "@carbon/icons-react";
import { visitSite } from "../../utils/navigateUtils";
import { useNavigate } from "react-router-dom";
import { getOrderPageLink } from "../../constants/appConstants";

const header = [
  {
    key: "invoice_id",
    header: "Invoice Id",
  },
  {
    key: "subscription_id",
    header: "Subscription Name",
  },
  {
    key: "released",
    header: "Promotion Released",
  },
  {
    key: "is_free_items_redeemed",
    header: "Free Item Redeemed",
  },
  {
    key: "free_item_order_id",
    header: "Free Item Order ID",
  },
];

const USPPromotions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);

  const promotions = useSelector(
    (state) => state.myPromotions.myUSPPromotionsListData
  );

  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  useEffect(() => {
    dispatch(getMyUSPPromotionsList(pagination));
  }, [pagination]);

  return (
    <Theme theme={theme.contentTheme} className="table__container">
      <Theme
        theme={theme.bgTheme}
        as={DataTable}
        rows={
          promotions.data?.result?.map((item) => ({
            ...item,
            id: String(item.invoice_id),
          })) || []
        }
        headers={header}
      >
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getToolbarProps,
          onInputChange,
          getTableContainerProps,
        }) => (
          <TableContainer
            title={"USP Promotions"}
            description="List of all the USP promotions"
            {...getTableContainerProps()}
          >
            {!!promotions.data?.result?.length > 0 ? (
              <>
                <Layer>
                  <TableToolbar {...getToolbarProps()}>
                    <TableToolbarContent>
                      <TableToolbarSearch onChange={onInputChange} persistent />
                    </TableToolbarContent>
                  </TableToolbar>
                </Layer>
                <br />
                <Table {...getTableProps()} aria-label="sample table">
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <>
                          <TableHeader
                            key={header.key}
                            {...getHeaderProps({
                              header,
                            })}
                          >
                            {header.header}
                          </TableHeader>
                        </>
                      ))}
                      <TableHeader>View Free Items</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        {...getRowProps({
                          row,
                        })}
                      >
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header == "released"
                              ? cell.value
                                ? "Released"
                                : "Pending"
                              : cell.value || <NotAvailable />}
                          </TableCell>
                        ))}

                        <TableCell>
                          {
                            <Launch
                              className="cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/usp/promotions/${promotions?.data?.result[index]?.invoice_id}`
                                )
                              }
                            />
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div className="empty__table">
                <img src="/table/emptytable.svg" alt="empty" />
              </div>
            )}
          </TableContainer>
        )}
      </Theme>

      {promotions.data?.result?.length ? (
        <Pagination
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText=""
          onChange={({ page, pageSize }) => {
            setPagination({
              limit: pageSize,
              skip: (page - 1) * pageSize,
            });
          }}
          page={pagination.skip / pagination.limit + 1}
          pageSize={pagination.limit}
          pageSizes={[5, 10, 15, 20, 25]}
          size="md"
          totalItems={parseInt(promotions.data?.totalCount?.count) || 0}
          className="table__pagination"
        />
      ) : null}
    </Theme>
  );
};

export default React.memo(USPPromotions);
