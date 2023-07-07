import { useState, useRef } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { getDetails } from "../../services/dailyRecipesService";
import ActionSheet from "actionsheet-react";
import { actionSheetStyle } from "../../shared/ActionSheetStyle";

export const FoodList = ({ result, selectedIng }) => {
  const [details, setDetails] = useState(null);
  const ref = useRef();

  const handleOpen = () => {
    ref.current.open();
  };

  const handleClose = () => {
    ref.current.close();
  };
  const handleCardClick = (res) => {
    setDetails(null);
    getDetails(res.id, selectedIng.toString(), setDetails, handleOpen);
  };

  console.log(details);
  return (
    <div>
      <ActionSheet ref={ref} onClose={handleClose}>
        <div style={actionSheetStyle}>
          <img src={details?.recipe?.img} width="300" alt="" />
          <h4 className="mt-4"> {details?.recipe?.title}</h4>
          <p>{details?.recipe?.displayurl}</p>

          {details?.ingredients.map((item, index) => {
            return <li key={index}>{item.line}</li>;
          })}

          <button onClick={handleClose}>Close</button>
        </div>
      </ActionSheet>
      <Row>
        {result.length > 0 &&
          result.map((res, index) => {
            return (
              <Col xl={4} className="mx-auto center mt-3" key={index}>
                <Card
                  onClick={() => handleCardClick(res)}
                  style={{ cursor: "pointer" }}
                >
                  <img alt={`Sample${index}`} src={res.img} />
                  <CardBody>
                    <CardTitle tag="h5">{res.title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {res.domain}
                    </CardSubtitle>
                    <CardText>{res.uses}</CardText>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
