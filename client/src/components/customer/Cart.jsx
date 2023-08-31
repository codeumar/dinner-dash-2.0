import React, { useState } from "react";
import axios from "axios";
import { useCart, useDispatchCart } from "../../context/ContextReducer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const processOrder = async () => {
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const newArray = data.map(({ restaurantid, itemname, ...rest }) => rest);
    const orderData = {
      items: newArray,
      totalprice: totalPrice,
      restaurantid: data[0].restaurantid,
      userid: user.userid,
      status: "pending",
    };

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token,
        CustomHeader: "custom-value",
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/order/create`,
        orderData,
        { headers }
      );

      if (response.status === 200) {
        localStorage.removeItem(`cart${user.userid}`);

        alert("Order placed successfully");
        navigate("/");
      } else {
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <div className="m-5 bg-success text-center fs-3 text-white">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const totalPrice = data.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((food, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{data[index].itemname}</td>
                  <td>{data[index].quantity}</td>
                  <td>{data[index].price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn p-0"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      <i class="bi bi-trash">Remove</i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 bg-success">Total Price:{totalPrice} /-</h1>
        </div>
        <div>
          <button
            onClick={processOrder}
            className={`btn bg-success mt-5 ${isLoading ? "disabled" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Check Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
