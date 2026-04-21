import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/CartSlice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const CartItem = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  return (
    <div>
      <Navbar />

      <h1 style={{ textAlign: "center" }}>Your Cart</h1>

      {items.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>Cart is Empty</h2>
      ) : (
        <div style={{ padding: "20px" }}>
          {items.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.name} width="100" />

              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Total: ${item.totalPrice}</p>

                <div>
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, type: "dec" }))
                    }
                  >
                    -
                  </button>

                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, type: "inc" }))
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  style={{ marginTop: "10px", color: "red" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h2>Total Amount: ${totalAmount}</h2>

          <button
            onClick={() => alert("Coming Soon")}
            style={styles.checkout}
          >
            Checkout
          </button>

          <br /><br />

          <Link to="/plants">
            <button style={styles.continue}>
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    gap: "20px",
    border: "1px solid #ccc",
    padding: "15px",
    marginBottom: "15px",
  },
  checkout: {
    padding: "10px 20px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  continue: {
    padding: "10px 20px",
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

export default CartItem;