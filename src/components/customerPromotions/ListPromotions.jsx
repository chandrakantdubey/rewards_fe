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
  Theme,
  Layer,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Launch, NotAvailable } from "@carbon/icons-react";
import { visitSite } from "../../utils/navigateUtils";
import { useNavigate } from "react-router-dom";
import { getOrderPageLink } from "../../constants/appConstants";
import { getMyPromotionsList } from "../../redux/myPromotions/myPromotionsSlice";
const header = [
  {
    key: "marketPlaceOrderId",
    header: "Order Id",
  },
  {
    key: "promotionName",
    header: "Promotion Name",
  },
  {
    key: "promotionReleaseStatus",
    header: "Promotion Status",
  },
  {
    key: "orderStatus",
    header: "Order Status",
  },
];
const ListPromotions = ({ title, description }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  const promotions = useSelector(
    (state) => state?.myPromotions?.myPromotionsListData
  );
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  useEffect(() => {
    dispatch(getMyPromotionsList(pagination));
  }, [pagination]);

  return (
    <Theme theme={theme.contentTheme} className="table__container">
      <Theme
        theme={theme.bgTheme}
        as={DataTable}
        rows={
          promotions.data?.result?.map((item) => ({
            ...item,
            id: String(item.orderId),
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
            title={"Marketplace Promotions"}
            description={"List of all the marketplace promotions"}
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
                      <TableHeader>View Order</TableHeader>
                      <TableHeader>View Promotion</TableHeader>
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
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        <TableCell>
                          {!!promotions.data?.result[index]["entityId"] ? (
                            <Launch
                              className="cursor-pointer"
                              onClick={() =>
                                visitSite(
                                  getOrderPageLink(
                                    promotions.data?.result[index]["entityId"]
                                  )
                                )
                              }
                            />
                          ) : (
                            <NotAvailable />
                          )}
                        </TableCell>
                        <TableCell>
                          <Launch
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/marketplace/promotions/${promotions.data?.result[index]["marketPlaceOrderId"]}/${promotions.data?.result[index]["promotionId"]}`
                              )
                            }
                          />
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
      {!!promotions.data?.result?.length > 0 ? (
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
          totalItems={promotions.data?.totalCount || 0}
          className="table__pagination"
        />
      ) : null}
    </Theme>
  );
};

export default React.memo(ListPromotions);
