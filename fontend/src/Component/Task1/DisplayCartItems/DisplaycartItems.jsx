import "./DisplayCartItems.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "../Store/Cart/CartSlice";
import { Link } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

const DisplayItems = () => {
  const [totalCart, setTotalCart] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr.price * curr.qty,
      0
    );
    setTotalCart(Number(totalPrice.toFixed(2)));
    const totalQuantity = cart.reduce((acc, curr) => acc + curr.qty, 0);

    setTotalQty(totalQuantity);
  }, [cart]);

  return (
    <div className="display-cart-items">
      <Navbar />
      <div className="dispay-cart-items-contianer">
        {cart && cart.length ? (
          <div className="display-items">
            <table className="table-data">
              <tr className="table-row">
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product QNT</th>
              </tr>

              {cart.map((items) => {
                console.log(items);
                return (
                  <div className="table-div">
                    <div className="img-dt">
                      <img src={items.thumbnail} alt="" />
                    </div>
                    <h3>{items.title}</h3>
                    <p>{items.price}</p>
                    <p className="qnty">
                      {items.qty <= 1 ? (
                        <button
                          className="cancleBtn"
                          onClick={() => dispatch(removeFromCart(items))}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      ) : (
                        <span
                          className="mins"
                          onClick={() => dispatch(decreaseQty(items.id))}
                        >
                          -
                        </span>
                      )}
                      {items.qty}
                      <span onClick={() => dispatch(increaseQty(items.id))}>
                        +
                      </span>
                    </p>
                  </div>
                );
              })}
            </table>
            <div className="cart-total-items">
              <div className="set-total-cart">
                <p>Payment Details</p>
                <div className="qnt">
                  <p>Total Qnt - </p> <span>{totalQty}</span>
                </div>
                <div className="qnt">
                  <p>Total Price - </p> <span>${totalCart}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="none-cart">
            <Link to="/task1" className="shopnow">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayItems;
