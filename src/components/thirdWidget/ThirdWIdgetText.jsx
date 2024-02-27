import { Link } from "react-router-dom";
import "./thirdWidget.scss";
import { useDispatch } from "react-redux";
import { toggleReferralModal } from "../../redux/toggleSlice/toggleSlice";

const ThirdWIdgetText = ({ title, text, subtext, to, align }) => {
  const dispatch = useDispatch();
  function openModal() {
    dispatch(toggleReferralModal());
  }
  return (
    <div className="text">
      <div className="top__text">
        <div
          className="top__text__title"
          style={{ textAlign: align }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="top__text__description"
          style={{ textAlign: align }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <div className="sub__text" style={{ textAlign: align }}>
        <Link
          to={to}
          onClick={to === "/promotions" ? openModal : null}
          target={to !== "/promotions" ? "_blank" : null}
          className="color-secondary decoration-none hover-underline"
        >
          {subtext}
        </Link>
      </div>
    </div>
  );
};

export default ThirdWIdgetText;
