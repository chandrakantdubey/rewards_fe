import ThirdWIdgetText from "./ThirdWIdgetText";
import "./thirdWidget.scss";

const ThirdWidget = ({
  title,
  img,
  text,
  subtext,
  justifyContent,
  to,
  centerImage,
  align
}) => {
  return (
    <div
      className="third__widget"
      style={{
        background: `url("${img}"),#121212`,

        backgroundRepeat: "no-repeat",
        backgroundPosition: !centerImage ? "center" : "top left",
        backgroundSize: !centerImage ? "cover" : "contain",
        boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.30)",
        justifyContent: justifyContent,
      }}
    >
      <ThirdWIdgetText align={align} title={title} text={text} subtext={subtext} to={to} />
    </div>
  );
};

export default ThirdWidget;
