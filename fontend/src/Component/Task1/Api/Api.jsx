import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader.jsx";
import "./Api.css";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../Store/Cart/CartSlice.js";
import { Link } from "react-router-dom";
import DisplayItems from "../DisplayCartItems/DisplaycartItems.jsx";
// fetching data from fake API
const Api = () => {
  const [fakeData, setFakeData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/carts");

        const resultApi = await response.json();
        // console.log(resultApi);
        setFakeData(resultApi.carts);
        // console.log(fakeData);
      } catch (error) {
        console.log("error :", error);
      } finally {
        setLoadData(false);
      }
    };
    fetchData();
  }, []);
  // adding product in store
  const handleaddcard = (product) => {
    dispatch(addTocart(product));
  };
  // removing product form store
  const handleRemoveCart = (product) => {
    dispatch(removeFromCart(product));
  };
  return (
    <div className="main-container">
      <div className="cart-item-contianer">
        <h1 className="shop-head">Shopping Cart</h1>
        <Link to="/shopList" className="cart-details">
          View Cart Detials
        </Link>
      </div>
      {loadData ? (
        <Loader />
      ) : (
        <div className="api-container">
          {fakeData.map((user, index) => {
            return (
              <div className="cart-contianer" key={index}>
                <div className="cart-image">
                  <img src={user.products[0].thumbnail} alt="" />
                </div>
                <div className="cart-text">
                  <h2>{user.products[0].title}</h2>
                  <div className="cartx">
                    <p>
                      <em>$</em> {user.products[0].price}{" "}
                    </p>
                    <span
                      onClick={
                        cart.some((items) => items.id === user.products[0].id)
                          ? () => handleRemoveCart(user.products[0])
                          : () => handleaddcard(user.products[0])
                      }
                    >
                      {cart.some((items) => items.id === user.products[0].id)
                        ? "Remove cart"
                        : "Add to cart"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Api;
