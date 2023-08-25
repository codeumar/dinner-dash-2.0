import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "../../context/ContextReducer";

const ItemCard = (item) => {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [msg, setMessage] = useState("");
  const [failureError, setfailureError] = useState("");
  const [quantity, setQuantity] = useState(1);

  const AddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login to add items to cart");
      return;
    }
    let existingItemIndex = -1;
    //  console.log(item.item.restaurantid);
    //
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      console.log(item.item.restaurantid);
      if (data[i].restaurantid !== item.item.restaurantid) {
        setfailureError("Cannot add items from different restaurants");
        return;
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].itemid === item.item.itemid) {
        existingItemIndex = i;
        break;
      }
    }

    if (existingItemIndex !== -1) {
      const updatedItem = {
        ...data[existingItemIndex],
        quantity: quantity,
        price: item.item.price * quantity,
      };

      await dispatch({
        type: "UPDATE",
        payload: {
          index: existingItemIndex,
          updatedItem: updatedItem,
        },
      });
      setMessage("Item Updated");
    } else {
      await dispatch({
        type: "ADD",
        payload: {
          restaurantid: item.item.restaurantid,
          itemid: item.item.itemid,
          itemname: item.item.name,
          quantity: Number(quantity),
          price: item.item.price * quantity,
        },
      });
      setMessage("Item Added to Cart");
    }
  };

  return (
    <div className="card m-2 mt-5">
      <img
        className="card-img-top"
        src={item.item.imageurl}
        alt="Card image cap"
        style={{ height: "300px", width: "100%", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.item.name}</h5>
        <p className="card-text">{item.item.description}</p>
        <div className="container w-100">
          {item.item.quantity == 0 ? (
            <p className="text-danger"></p>
          ) : (
            <select
              className="h-100 bg-success"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {Array.from(Array(item.item.quantity), (e, i) => {
                return (
                  <>
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  </>
                );
              })}
            </select>
          )}
          <div className="d-inline h-100 fs-5">
            Price $: {quantity * item.item.price}
          </div>
        </div>
        <hr></hr>

        {item.item.quantity == 0 ? (
          <p className="text-danger">Out of Stock</p>
        ) : (
          <Link
            onClick={AddToCart}
            className="btn btn-success justify-center mx-1"
          >
            Add to Cart
          </Link>
        )}
        <Link
          to={`/items/${item.item.itemid}`}
          className="btn btn-success justify-center mx-1"
        >
          View Details
        </Link>
        {msg && <p className="text-success">{msg}</p>}
        {failureError && <p className="text-danger">{failureError}</p>}
      </div>
    </div>
  );
};

export default ItemCard;
