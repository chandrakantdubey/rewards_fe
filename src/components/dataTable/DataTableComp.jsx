import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
  Theme,
  Layer,
} from "@carbon/react";
import "./dataTableComp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { NotAvailable } from "@carbon/icons-react";

const DataTableComp = ({
  dispatchFunction,
  stateName1,
  stateName2,
  title,
  description,
  emptyText,
}) => {
  const dispatch = useDispatch();
  const dataList = useSelector((state) => state[stateName1][stateName2]);
  const theme = useSelector((state) => state.theme);
  let headers = [];
  let rows = [];

  if (dataList?.data?.result && dataList?.data?.result.length > 0) {
    headers = Object.keys(dataList?.data?.result[0]).map((key) => {
      let headerKey = key;
      if (key.toLowerCase().includes("amountincents")) {
        headerKey = "Amount";
      }
      if (key.toLowerCase().includes("isStatusPending")) {
        headerKey = "Status";
      }
      const words = headerKey
        .replace(/([A-Z])/g, " $1")
        .trim()
        .split(" ");
      const header = words
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          } else {
            return word.charAt(0).toLowerCase() + word.slice(1);
          }
        })
        .join(" ");
      return {
        key: key,
        header: header,
      };
    });

    headers = headers.filter(
      (item) => !["orderTrackingDetails"].includes(item.key)
    );

    rows = dataList?.data?.result?.map((obj) => {
      const row = {};
      headers.forEach((header) => {
        if (obj[header.key] === false) {
          row[header.key] = "No";
        } else if (obj[header.key] === true) {
          row[header.key] = "Yes";
        } else if (header.key.toLowerCase().includes("amountincents")) {
          row[header.key] = (obj[header.key] / 100).toFixed(2);
        } else if (header.key.toLowerCase().includes("amount")) {
          row[header.key] = obj[header.key];
        } else if (
          obj[header.key] === null ||
          obj[header.key] === undefined ||
          obj[header.key] === ""
        ) {
          row[header.key] = <NotAvailable />;
        } else if (
          header.key === "created" ||
          header.key === "updated" ||
          header.key === "createdAt" ||
          header.key === "updatedAt" ||
          header.key === "donatedOn" ||
          header.key === "releasedAt" ||
          header.key === "redeemedAt" ||
          header.key === "OrderedAt"
        ) {
          const date = new Date(obj[header.key]);
          const formattedDate = date.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          row[header.key] = formattedDate;
        } else if (typeof obj[header.key] === "number") {
          row[header.key] = new Intl.NumberFormat("en-US").format(
            obj[header.key]
          );
        } else if (
          typeof obj[header.key] === "string" &&
          obj[header.key].startsWith("http")
        ) {
          row[header.key] = (
            <img
              src={obj[header.key]}
              alt="cell"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          );
        } else {
          row[header.key] = obj[header.key];
        }
      });
      return row;
    });
  }

  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    dispatch(dispatchFunction({ limit: limit, skip: skip }));
  }, [limit, skip]);

  return (
    <Theme theme={theme.contentTheme} className="table__container">
      <Theme theme={theme.bgTheme} as={DataTable} rows={rows} headers={headers}>
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
            title={title}
            description={description}
            {...getTableContainerProps()}
          >
            {dataList?.data?.result && dataList?.data?.result.length > 0 ? (
              <>
                <Layer>
                  <TableToolbar {...getToolbarProps()}>
                    <TableToolbarContent>
                      <TableToolbarSearch onChange={onInputChange} persistent />
                    </TableToolbarContent>
                  </TableToolbar>
                </Layer>
                <br />
                <Table {...getTableProps()} aria-label="data table">
                  <TableHead>
                    <TableRow>
                      {headers
                        .filter((item) => item.header != "Id")
                        .map((header) => (
                          <TableHeader
                            key={header.key}
                            {...getHeaderProps({
                              header,
                              isSortable: true,
                            })}
                          >
                            {header.header}
                          </TableHeader>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.id}
                        {...getRowProps({
                          row,
                        })}
                      >
                        {row.cells
                          .filter((item) => item.info.header != "id")
                          .map((cell) => {
                            return (
                              <TableCell key={cell.id}>
                                {" "}
                                {cell.value}{" "}
                              </TableCell>
                            );
                          })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <div className="empty__table">
                <img src="/table/emptytable.svg" alt="empty" />
                {emptyText && <span>{emptyText}</span>}
              </div>
            )}
          </TableContainer>
        )}
      </Theme>
      {dataList?.data?.result && dataList?.data?.result?.length > 0 ? (
        <Layer level={0}>
          <Pagination
            backwardText="Previous page"
            forwardText="Next page"
            itemsPerPageText=""
            onChange={({ page, pageSize }) => {
              setLimit(pageSize);
              setSkip((page - 1) * pageSize);
            }}
            page={skip / limit + 1}
            pageSize={limit}
            pageSizes={[5, 10, 15, 20, 25]}
            size="md"
            totalItems={dataList?.data?.totalCount}
            className="table__pagination"
          />
        </Layer>
      ) : null}
    </Theme>
  );
};

export default DataTableComp;
