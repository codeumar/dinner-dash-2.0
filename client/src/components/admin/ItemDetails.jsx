import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ItemDetails = ({ item, fetchItemDetails }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchItemDetails().then((details) => {
      setItemDetails(details);
    });
  }, [fetchItemDetails]);

  if (!itemDetails) {
    return null;
  }

  const handleViewItem = (e) => {
    navigate(`/viewItem/${e.target.id}`);
  };

  return (
    <Card className="mb-3">
      <img
        src={itemDetails.imageurl}
        alt=""
        style={{ height: "100px", width: "100px" }}
      />
      <Card.Header>Name: {itemDetails.name}</Card.Header>
      <Card.Body>
        <Card.Title>Quantity: {item.quantity}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {itemDetails.description}
          <br />
          <strong>Price:</strong> {itemDetails.price}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          id={itemDetails.itemid}
          variant="primary"
          onClick={handleViewItem}
        >
          View Item
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ItemDetails;
