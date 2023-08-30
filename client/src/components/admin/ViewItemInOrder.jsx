import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../customer/Navbar";
import { useCart, useDispatchCart } from "../../context/ContextReducer";

const ViewItemInOrder = () => {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [quantity, setQuantity] = useState(1);
  const { itemId } = useParams();
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    fetchData(itemId);
  }, []);

  const fetchData = async (itemId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:3003/items/${itemId}`);
      //(res.data.message);
      if (res.data.message !== "-1") {
        setItemData(res.data);
      }
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  const AddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login to add items to cart");
      return;
    }
    let existingItemIndex = -1;
    //  //(item.item.restaurantid);
    //
    for (let i = 0; i < data.length; i++) {
      //(data[i]);
      //(itemData.restaurantid);
      if (data[i].restaurantid !== itemData.restaurantid) {
        alert("You can't order from multiple restaurants at once!");
        return;
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].itemid === itemData.itemid) {
        existingItemIndex = i;
        break;
      }
    }

    if (existingItemIndex !== -1) {
      const updatedItem = {
        ...data[existingItemIndex],
        quantity: quantity,
        price: itemData.price * quantity,
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
          restaurantid: itemData.restaurantid,
          itemid: itemData.itemid,
          itemname: itemData.name,
          quantity: quantity,
          price: itemData.price * quantity,
        },
      });
    }
  };

  return (
    <>
      {itemData.quantity == null ? (
        <div
          className="container mt-5 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <div className="col-md-6 text-center">
            <h1 className="mb-4" style={{ color: "#343a40" }}>
              No Item Found..!
            </h1>
          </div>
        </div>
      ) : (
        <div>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <img
                  src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?w=1380&t=st=1692793442~exp=1692794042~hmac=678d879738977573ef1a98fb63f268a2df7c2df7af726f7264f777ea418326a3"
                  alt={itemData.name}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <h2 className="mb-3">{itemData.name}</h2>
                <p className="mb-4">{itemData.description}</p>
                <p className="mb-0">Price: ${itemData.price}</p>
                <hr></hr>
                <div className="card-body">
                  <div className="container w-100">
                    {itemData.quantity == 0 ? (
                      ""
                    ) : (
                      <select
                        className="h-100 bg-success"
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      >
                        {Array.from(Array(itemData.quantity), (e, i) => {
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
                      Total Price: {quantity * itemData.price}
                    </div>
                  </div>
                  <hr></hr>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewItemInOrder;
