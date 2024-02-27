import styled from "styled-components";
import backimage from "src/assets/notification-bg.png";
export const Notificationwrapper = styled.section`
  .cds--grid {
    max-width: 1920px !important;
  }
  .cds--select {
    box-shadow: none !important;
  }
  position: relative;
  .notification_content {
    position: relative;

    &::before {
      content: url(${backimage});
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  /* background-color: #fff; */
  .uvation_notification {
    padding: 2rem 0;
  }
  .notificationdata_table {
    padding: 0 0 2rem 0;
    .cds--data-table-container {
      border: 1px solid #00000029;
      padding: unset !important;
    }
    
  }
  .headingdiv {
    padding: 3.5rem 0;
    h1 {
      font-size: 32px;
      font-weight: 500;
    }
  }
  .bgimage {
    position: absolute;
    right: 12.5%;
    margin-top: 8px;
    top: 0;
  }
  .filter_mainbtn {
    /* color: #fff; */
    position: relative;
    min-width: 150px;
    .cds--btn--primary {
      width: 100%;
    }
    .filterDateform {
      position: absolute;
      right: 0;
      padding: 10px;
      border: 1px solid var(--border-border-subtle-00, #e0e0e0);
      /* background: var(--background-or-layer, #fff); */
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      gap: 20px;
      .filterbtn_set {
        width: 100%;
        .cds--btn--primary {
          width: 50%;
        }
        .cds--btn--secondary {
          width: 50%;
        }
      }
    }
  }
`;
