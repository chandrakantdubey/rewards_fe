import { Content, FlexGrid, Theme } from "@carbon/react";
import MainHeader from "../headers/MainHeader";
import ProductDetailsModal from "../productDetailsModal/ProductDetailsModal";
import "./layout.scss";
import { useEffect } from "react";
import { getAdminConfig } from "../../redux/getAdminConfig/getAdminConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import GiftCardDetailsModal from "../giftCardDetailsModal/GiftCardDetailsModal";
import MainSideNav from "../headers/MainSideNav";
import useWindowSize from "../../hooks/useWindowSize";
import TermsConditions from "../termsConditions/TermsConditions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const windowSize = useWindowSize();
  useEffect(() => {
    dispatch(getAdminConfig());
  }, []);
  return (
    <>
      <MainHeader />
      {windowSize?.width > 660 ? <MainSideNav windowSize={windowSize} /> : null}
      <Theme theme={theme.bgTheme} as={Content}>
        {/* <Content> */}
        <FlexGrid fullWidth className="main-grid">
          {children}
          <ProductDetailsModal />
          <GiftCardDetailsModal />
          <TermsConditions />
        </FlexGrid>
        {/* </Content> */}
      </Theme>
    </>
  );
};

export default Layout;
