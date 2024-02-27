export const loginToken = "loginToken";
export const azureId = "azureId";
export const simpleHeaderRoutes = [
  "servicedetailpage",
  "product",
  "calendar",
  "edit-service",
  "meetingschedule",
  "servicedetailpage",
];
export const ACCESSS_LEVEL = {
  READ: "r",
  READ_WRITE: "r+w",
};
export const ADMIN_ROLE = "Global Administrator";

export const SECTIONS = {
  BILLING: {
    name: "Billing & Invoices",
    id: '-L0w<qub_Gv)f("h99"m',
  },
  SUPPORT: {
    name: "Suport",
    id: "~VO^v'4X^N345p!?rXeC",
  },
  EXISTING_SUBSCRIPTIONS: {
    name: "Existing Subscriptions",
    id: "?9]z`%v;al;699?E#<?G",
  },
  PURCHASE_CATALOG: {
    name: "Purchase Catalog",
    id: "e/u$f[:_QWjT-)`_=Oq/",
  },
  PENDING_SUBSCRIPTIONS: {
    name: "Pending Subscription",
    id: "|^3~6RV~~Zi0SvQHL5<+",
  },
};

export const getOrderPageLink = (entityId) =>
  `https://marketplace.uvation.com/sales/order/view/order_id/${entityId}/`;
