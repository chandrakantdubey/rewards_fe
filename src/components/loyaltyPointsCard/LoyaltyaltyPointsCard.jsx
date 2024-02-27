import { Link } from "react-router-dom";
import { formatNumberToAmericanStandard } from "../../utils/formatUtils";
import Ring from "../ring/Ring";
import { Column, Row } from "@carbon/react";

const LoyaltyaltyPointsCard = ({
  title,
  points,
  description,
  subtext1,
  ring,
  to,
  font1,
  font2,
  font3,
  font4,
  pmb = "mb-2",
  tmb = "mb-2",
  pcmb = "mb-05",
}) => {
  return (
    <Row condensed>
      {/* row-1 */}
      <Column lg={16} className={` text-center ${font2} ${pmb}`}>
        <h3 className={`${font2} fw-500`}>{title}</h3>
      </Column>

      {/* row-2 */}
      <Column lg={16} className={`d-flex justify-center ${tmb}`}>
        <Ring {...ring} />
      </Column>

      <Column lg={16}>
        <Row className={pcmb}>
          <Column
            lg={16}
            md={8}
            sm={4}
            className={`text-center ${font1} fw-500`}
            style={{ color: ring?.maxColor }}
          >
            {title?.includes("Credits") ? "$ " : ""}
            {formatNumberToAmericanStandard(points)}
          </Column>
        </Row>
        {description && (
          <Row className={subtext1 ? "mb-05" : ""}>
            <Column
              lg={16}
              md={8}
              sm={4}
              className={`text-center ${font3} fw-400`}
            >
              {description}
            </Column>
          </Row>
        )}
        {subtext1 && (
          <Row className="mb-05">
            <Column lg={16} md={8} sm={4} className={`text-center ${font4}`}>
              {to ? (
                <Link
                  to={to}
                  target="blank"
                  className="color-secondary decoration-none hover-underline"
                  dangerouslySetInnerHTML={{ __html: subtext1 }}
                />
              ) : (
                <p
                  className={font4}
                  dangerouslySetInnerHTML={{ __html: subtext1 }}
                />
              )}
            </Column>
          </Row>
        )}
      </Column>
    </Row>
  );
};

export default LoyaltyaltyPointsCard;
