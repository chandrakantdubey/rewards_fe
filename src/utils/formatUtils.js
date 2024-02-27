import moment from "moment";

export function formatNumberToAmericanStandard(num = 0) {
  return num !== null ? num.toLocaleString("en-US") : "0";
}

export function formatNumberToAmericanStandardDec(num = 0) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const formatDate = (date) => moment(date).format("MM/DD/YYYY");
export const formatTime = (date) => moment(date).format("MM/DD/YY, h:mm A");
export const formatTimeLong = (date) =>
  moment(date).format("MMMM Do, YYYY (h:mm A)");
