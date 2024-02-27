import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./swiperCarousel.css";

export default function SwiperCarousel({ promotionsBanner }) {
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {promotionsBanner.map((data) => (
        <SwiperSlide key={data.title}>
          <img src={data.src} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
