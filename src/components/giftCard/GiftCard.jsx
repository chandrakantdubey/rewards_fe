import { useState } from "react";
import "./giftCard.scss";
import { toggleGiftCardModal } from "../../redux/toggleSlice/toggleSlice";
import { useDispatch } from "react-redux";
import { getGiftCardById } from "../../redux/giftCard/giftCardSlice";
export default function GiftCard({ giftCard }) {
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => {
          dispatch(
            toggleGiftCardModal({
              open: true,
              brand_code: giftCard?.brand_code,
            })
          );
          dispatch(getGiftCardById(giftCard?.brand_code));
        }}
        className="select__tile"
      >
        <div className="select__tile__img">
          <img src={giftCard?.image_url} alt={giftCard?.name} />
        </div>
        <div className="select__tile__content">
          <h2 className="select__tile__title">
            <strong>{giftCard?.name}</strong>
          </h2>
          {/* {giftCard?.maxPriceInCents ? (
          <>
            <p className="">
              $ {+giftCard?.minPriceInCents / 100 ?? 0} - $
              {+giftCard?.maxPriceInCents / 100 ?? 0}
            </p>
          </>
        ) : (
          <p>${+giftCard?.allowedPricesInCents[0] / 100 ?? 0}</p>
        )} */}
        </div>
      </div>
    </>
  );
}
