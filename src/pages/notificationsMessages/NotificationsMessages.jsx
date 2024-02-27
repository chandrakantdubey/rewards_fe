import React, { useEffect, useState } from "react";
import { Filter } from "@carbon/icons-react";

import {
  DataTable,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  DataTableSkeleton,
  FlexGrid,
  DatePickerInput,
  Form,
  DatePicker,
  Layer,
  Theme,
  Tag,
} from "@carbon/react";
import { Notificationwrapper } from "./NotificationStyle";
const msg_headerData5 = [
  {
    header: "Notification",
    key: "message",
  },
  {
    header: "Date",
    key: "notification_time",
  },
];
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../../redux/notifications/notificationSlice";

const NotificationsMessages = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [filterBtn, setFilterBtn] = useState(false); // or your initial value
  const [Resetfilter, setResetfilter] = useState(false);
  const {
    data: { data: notifications, count: totalcount },
    status,
  } = useSelector((state) => state.notifications.allNotifications);
  const [isDateValid, setIsDateValid] = useState({
    StartDatevalid: true,
    EndDateValid: true,
  });
  const [DateFormate, setDateFormate] = useState({
    StartDate: "",
    EndDate: "",
  });
  const [validationMessages, setValidationMessages] = useState({
    startDate: "",
    endDate: "",
  });

  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    let isValidStartDate = true;
    let isValidEndDate = true;
    let messages = { startDate: "", endDate: "" };
    const currentDate = new Date();
    if (DateFormate?.StartDate) {
      const startDate = new Date(DateFormate.StartDate);
      isValidStartDate = startDate <= currentDate;
      if (!isValidStartDate) {
        messages.startDate = "Start date must be on or before the current date";
      }
    }
    if (DateFormate?.EndDate) {
      const endDate = new Date(DateFormate.EndDate);
      isValidEndDate = endDate >= currentDate;
      if (!isValidEndDate) {
        messages.endDate = "End date must be on or after the current date";
      }
    }
    if (DateFormate?.EndDate) {
      const endDate = new Date(DateFormate.EndDate);
      isValidEndDate = endDate >= new Date(DateFormate.StartDate);
      if (!isValidEndDate) {
        messages.endDate = "End date must be on or after the Start date";
      }
    }

    setIsDateValid({
      StartDatevalid: isValidStartDate,
      EndDateValid: isValidEndDate,
    });
    setValidationMessages(messages);
  }, [DateFormate]);

  const handleChange = () => {
    dispatch(
      getAllNotifications({
        pageNo,
        perPage,
        start_date: DateFormate?.StartDate,
        end_date: DateFormate?.EndDate,
      })
    );
    setFilterBtn(false);
  };

  useEffect(() => {
    handleChange();
  }, [pageNo, perPage, Resetfilter]);

  return (
    <React.Fragment>
      <Notificationwrapper>
        <FlexGrid fullWidth>
          <div className="notification_content">
            <div className="headingdiv">
              <h1 className="dark:!text-white">Notifications</h1>
            </div>
          </div>
        </FlexGrid>

        <Theme theme={theme.contentTheme}>
          <FlexGrid fullWidth>
            
            <div className="uvation_notification ">
              <p>
                Uvation Notifications keep you informed and in control with
                vital updates, real-time alerts, and custom notifications.
              </p>
            </div>
            <div className="notificationdata_table">
              <div>
                {status == "loading" ? (
                  <DataTableSkeleton
                    headers={msg_headerData5}
                    aria-label="sample table"
                  />
                ) : (
                  <DataTable
                    rows={notifications}
                    headers={msg_headerData5}
                    isSortable
                  >
                    {({
                      rows,
                      headers,
                      getHeaderProps,
                      getRowProps,
                      getTableProps,
                      onInputChange,
                    }) => (
                      <TableContainer>
                        <TableToolbar>
                          <TableToolbarContent>
                            {/* pass in `onInputChange` change here to make filtering work */}
                            <TableToolbarSearch
                              onChange={onInputChange}
                              expanded={true}
                            />
                            <div className="filter_mainbtn">
                              <Button
                                renderIcon={Filter}
                                onClick={() =>
                                  setFilterBtn((prevState) => !prevState)
                                }
                              >
                                Filter
                              </Button>
                              {filterBtn && (
                                <Form>
                                  <Theme
                                    theme={theme.contentTheme}
                                    className="filterDateform"
                                  >
                                    <DatePicker
                                      dateFormat="m/d/Y"
                                      datePickerType="single"
                                      onInput={(e) =>
                                        setDateFormate({
                                          ...DateFormate,
                                          StartDate: e.target.value,
                                        })
                                      }
                                      maxDate={new Date()}
                                    >
                                      <DatePickerInput
                                        id="date-picker-default-id"
                                        placeholder="mm/dd/yyyy"
                                        labelText="Start date"
                                        type="text"
                                        invalid={
                                          !!DateFormate?.StartDate &&
                                          !isDateValid?.StartDatevalid
                                        } // Show as invalid if EndDate is set and isDateValid is false
                                        invalidText={
                                          validationMessages.startDate &&
                                          validationMessages.startDate
                                        }
                                        value={DateFormate?.StartDate}
                                      />
                                    </DatePicker>

                                    <DatePicker
                                      dateFormat="m/d/Y"
                                      datePickerType="single"
                                      onInput={(e) =>
                                        setDateFormate({
                                          ...DateFormate,
                                          EndDate: e.target.value,
                                        })
                                      }
                                      maxDate={new Date()}
                                    >
                                      <DatePickerInput
                                        id="date-picker-default-id2"
                                        placeholder="mm/dd/yyyy"
                                        labelText="End date"
                                        invalid={
                                          !!DateFormate?.EndDate &&
                                          !isDateValid?.EndDateValid
                                        } // Show as invalid if EndDate is set and isDateValid is false
                                        invalidText={
                                          validationMessages.endDate &&
                                          validationMessages.endDate
                                        }
                                        type="text"
                                        value={DateFormate?.EndDate}
                                      />
                                    </DatePicker>
                                    {/* {!isDateValid && (
                                      <span
                                        style={{ color: "red", fontSize: "12px" }}
                                      >
                                        End date must be after start date.
                                      </span>
                                    )} */}

                                    <div className="filterbtn_set">
                                      <Button
                                        kind="primary"
                                        onClick={() => {
                                          setResetfilter(true);
                                          setDateFormate({
                                            StartDate: "",
                                            EndDate: "",
                                          });
                                        }}
                                      >
                                        Reset
                                      </Button>

                                      <Button
                                        kind="secondary"
                                        onClick={handleChange}
                                      >
                                        Apply
                                      </Button>
                                    </div>
                                  </Theme>
                                </Form>
                              )}
                            </div>
                          </TableToolbarContent>
                        </TableToolbar>
                        <Table {...getTableProps()} aria-label="sample table">
                          <TableHead>
                            <TableRow>
                              {headers.map((header) => (
                                <TableHeader
                                  key={header.key}
                                  {...getHeaderProps({
                                    header,
                                  })}
                                >
                                  {header.header}
                                </TableHeader>
                              ))}
                              <TableHeader>Type</TableHeader>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row, rowIndex) => (
                              <TableRow key={row.id} {...getRowProps({ row })}>
                                {row.cells.map((cell) => (
                                  <TableCell key={cell.id}>
                                    {cell.id.includes("notification_time") &&
                                    notifications[rowIndex]?.notification_time
                                      ? moment(
                                          notifications[rowIndex]
                                            .notification_time
                                        ).format("MM/DD/YY, h:mm A")
                                      : cell.value}
                                  </TableCell>
                                ))}
                                <TableCell>
                                  <Tag type="blue">System</Tag>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Theme theme={theme.contentTheme} >
                          <Layer level={3}>

                          <Pagination
                            backwardText="Previous page"
                            forwardText="Next page"
                            itemsPerPageText=""
                            page={pageNo}
                            pageSize={perPage}
                            pageNumberText="Page Number"
                            pageSizes={[10, 20, 30, 40, 50]}
                            totalItems={parseInt(totalcount)}
                            onChange={({ page, pageSize }) => {
                              setPageNo(page);
                              setPerPage(pageSize);
                            }}
                          />
                          </Layer>

                        </Theme>
                      </TableContainer>
                    )}
                  </DataTable>
                )}
              </div>
            </div>
          </FlexGrid>
        </Theme>
      </Notificationwrapper>
    </React.Fragment>
  );
};

export default NotificationsMessages;
