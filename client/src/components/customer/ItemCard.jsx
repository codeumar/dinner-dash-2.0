import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, useDispatchCart } from "../../context/ContextReducer";

const ItemCard = (item) => {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [quantity, setQuantity] = useState(1);

  const AddToCart = async () => {
    let existingItemIndex = -1;
    //  console.log(item.item.restaurantid);
    //
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      console.log(item.item.restaurantid);
      if (data[i].restaurantid !== item.item.restaurantid) {
        alert("You can't order from multiple restaurants at once!");
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
    } else {
      await dispatch({
        type: "ADD",
        payload: {
          restaurantid: item.item.restaurantid,
          itemid: item.item.itemid,
          itemname: item.item.name,
          quantity: quantity,
          price: item.item.price * quantity,
        },
      });
    }
  };

  return (
    <div className="card m-2 mt-5">
      <img
        className="card-img-top"
        src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?w=1380&t=st=1692793442~exp=1692794042~hmac=678d879738977573ef1a98fb63f268a2df7c2df7af726f7264f777ea418326a3"
        alt="Card image cap"
        style={{ height: "120px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.item.name}</h5>
        <p className="card-text">{item.item.description}</p>
        <div className="container w-100">
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
          <div className="d-inline h-100 fs-5">
            Total Price: {quantity * item.item.price}
          </div>
        </div>
        <hr></hr>
        <Link
          onClick={AddToCart}
          className="btn btn-success justify-center mx-1"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
