import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemInCart,
  fetchCart,
  selectAllItemInCart,
  updateItemInCart,
} from "../../../store/slices/cartSlice";
import { InputNumber } from "antd";
import Modal from "../../../components/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Button from "../../../components/Button";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { createPayment } from "../../../store/slices/paymentsSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const cart = useSelector(selectAllItemInCart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleOnChangeAmount = (amount, item) => {
    dispatch(
      updateItemInCart({
        amount,
        item,
      })
    );
  };

  const handleCreatePayment = () => {
    dispatch(createPayment());
    window.location.href = "/profile/payments";
  };

  const handleDeleteProduct = () => {
    dispatch(deleteItemInCart(productSelected.cart_id));
    setIsShowDelete(false);
  };

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this product?</h3>
      <h4 className="object">{}</h4>
      <div className="button-container">
        <Button
          className="button button--light--book"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button
          className="button button--main--book rounded"
          onClick={handleDeleteProduct}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div className="cart-container">
      <div className="cart-content">
        {cart && Object.keys(cart).length > 0 &&
          cart.map((item, index) => (
            <div key={item.product.title + index} className="cart-item">
              <img
                alt="cover book"
                className="img"
                src={`${process.env.REACT_APP_API_URL}/documents/${item.product.documents[0].document}`}
              />
              <h3 className="name">{item.product.title}</h3>
              <h4 className="price">₫{item.product.price}</h4>
              <div className="quantity-container">
                <Button
                  onClick={() => handleOnChangeAmount(item.amount - 1, item)}
                  disabled={item.amount === 0 ?? true}
                  className="button square button--light prev"
                  type="button"
                >
                  <AiOutlineMinus className="icon" />
                </Button>
                <div className="quantity-input-container">
                  <InputNumber
                    min={0}
                    max={item.product.amount}
                    value={item.amount}
                    controls={false}
                    className="input-quantity"
                  />
                </div>
                <Button
                  onClick={() => handleOnChangeAmount(item.amount + 1, item)}
                  disabled={false}
                  className="button square button--light next"
                  type="button"
                >
                  <AiOutlinePlus className="icon" />
                </Button>
              </div>
              <h4 className="total">₫{item.product.price * item.amount}</h4>
              <Button
                className="button button--text--red"
                type="button"
                onClick={() => {
                  setIsShowDelete(true);
                  setProductSelected(item);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
      </div>

      <Button
        onClick={handleCreatePayment}
        disabled={false}
        className="button button--main--book"
        type="button"
      >
        <span>Create a payment</span>
      </Button>

      {/* Modal Confirm */}
      <Modal
        className={`${isShowDelete ? "modal-detail active" : "modal-detail"}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </div>
  );
}
