import React from "react";
import { useCart, useDispatchCart } from "../../context/ContextReducer";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

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
      {console.log(data)}
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
            {data.map((food, index) => (
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
                    <img
                      src="path_to_your_delete_icon.png"
                      alt="Delete"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price:{totalPrice} /-</h1>
        </div>
        <div>
          <button
            className="btn bg-success mt-5 "
            //onClick={handleCheckOut}
          >
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
