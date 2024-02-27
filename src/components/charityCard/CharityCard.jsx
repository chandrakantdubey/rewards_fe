import { Add, View } from "@carbon/icons-react";
import "./charitycard.scss";
import CharityModal from "../charityModal/CharityModal";
import { Button, Theme } from "@carbon/react";
import { visitSite } from "../../utils/navigateUtils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CharityCard = ({
  name,
  description,
  logoUrl,
  website,
  ein,
  loyaltyPoints,
  preferred,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useSelector((state) => state.theme);
  const truncateText = (text, value) => {
    const words = text?.split(" ");
    if (words?.length > 25) {
      return words?.slice(0, value)?.join(" ") + "...";
    }
    return text;
  };
  const truncateTitle = (text, value) => {
    const words = text?.split(" ");
    if (words?.length > 6) {
      return words?.slice(0, value)?.join(" ") + "...";
    }
    return text;
  };
  return (
    <Theme theme={theme.contentTheme} className="charity__card">
      <div
        className={
          preferred ? "charity__card__img" : "charity__card__img preferred"
        }
      >
        <img src={logoUrl} className={preferred ? "preferred" : ""} />
      </div>
      <div className="charity__card__info">
        <div className="charity__card__info__title">
          {truncateTitle(name, 6)}
        </div>
        <div className="charity__card__info__description">
          {truncateText(description, 15)}
        </div>
      </div>
      <div className="charity__card__buttons">
        <Button
          kind="secondary"
          renderIcon={View}
          disabled={!website}
          as={Link}
          to={website ? website : null}
          target={website ? "_blank" : null}
        >
          Visit Website
        </Button>
        <Button
          kind="primary"
          renderIcon={Add}
          onClick={() => setOpenModal(true)}
        >
          Learn More
        </Button>
      </div>
      <CharityModal
        name={name}
        description={description}
        logoUrl={logoUrl}
        website={website}
        ein={ein}
        openModal={openModal}
        setOpenModal={setOpenModal}
        loyaltyPoints={loyaltyPoints}
      />
    </Theme>
  );
};

export default CharityCard;
