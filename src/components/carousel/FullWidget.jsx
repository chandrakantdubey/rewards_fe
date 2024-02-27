import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./fullWidget.scss";
import useWindowSize from "../../hooks/useWindowSize";
function FullWidget({ items, showIndicators }) {
  const windowSize = useWindowSize();
  return (
    <>
      <Carousel
        autoPlay
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        showIndicators={showIndicators}
        emulateTouch={true}
        className="full__widget"
        infiniteLoop={true}
      >
        {items.map((item) => (
          <div key={item.title}>
            <img
              alt={item.title}
              src={windowSize?.width > 720 ? item?.src : item?.msrc}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default FullWidget;
