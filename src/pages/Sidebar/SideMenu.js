import { Sidebar, Menu, SubMenu } from "react-pro-sidebar";
import { Badge, Card, Col, Row } from "reactstrap";
export const SideMenu = ({ ingredients, selectedIng, setSelectedIng }) => {
  const handleClick = (item) => {
    if (selectedIng.includes(item)) {
      let items = [...selectedIng];
      items = items.filter((t) => t !== item);
      setSelectedIng(items);
    } else {
      setSelectedIng([...selectedIng, item]);
    }
  };
  return (
    <Sidebar style={{ height: "100%", width: "500px" }}>
      <Menu>
        {ingredients.length &&
          ingredients.map((ing, index) => {
            return (
              <SubMenu label={ing.group_name} key={index}>
                <Card className="ingredient_card">
                  <Row>
                    {ing.ingredients.map((item, i) => {
                      return (
                        <Col xl={3} className="mx-auto center" key={i}>
                          <Badge
                            onClick={() => handleClick(item)}
                            color={
                              selectedIng.includes(item) ? "success" : "primary"
                            }
                            outline
                            className="mt-3 badge"
                            key={i}
                          >
                            {item}
                          </Badge>
                        </Col>
                      );
                    })}
                  </Row>
                </Card>
              </SubMenu>
            );
          })}
      </Menu>
    </Sidebar>
  );
};
