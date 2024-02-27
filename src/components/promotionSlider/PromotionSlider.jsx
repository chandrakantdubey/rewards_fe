import "./promotionSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import PromotionCard from "../promotionCard/PromotionCard";

const PromotionSlider = ({
  promotionsData,
  email,
  newsLetterStatus,
  profileCompletion,
}) => {
  return (
    <>
      <Swiper
        rewind={true}
        spaceBetween={30}
        slidesPerView={"auto"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {promotionsData.map((data) => (
          <SwiperSlide key={data.id}>
            <PromotionCard
              title={data.title}
              text1={data.text1}
              text2={data.text2}
              subtext={data.subtext}
              btnTxt={data.btnTxt}
              btnIcon={data.btnIcon}
              key={data.id}
              handleClick={data.handleClick}
              dispatchFunction={data.dispatchFunction}
              customComponet={data.customComponet}
              email={email}
              newsLetterStatus={
                data?.title?.includes("Follow our Newsletter")
                  ? newsLetterStatus
                  : undefined
              }
              profileCompletion={
                data?.title?.includes("Complete Account Details")
                  ? profileCompletion
                  : undefined
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default PromotionSlider;
