import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import moment from "moment";
import { Col, Form, InputNumber, Row } from "antd";
import Navigation from "../../../components/Navigation";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addFavorite,
  addWatch,
  checkBook,
  commentBook,
  fetchComment,
  selectBookFavorite,
  selectBookNeedUpdate,
} from "../../../store/slices/booksSlice";
import { fetchOneBook } from "../../../store/slices/booksSlice";
import { selectCurrentUser } from "../../../store/slices/usersSlice";
import TextArea from "antd/lib/input/TextArea";
import { isLogin } from "../../../helpers/isLogin";
import { addItemToCart } from "../../../store/slices/cartSlice";

export default function BookDetail() {
  const dispatch = useDispatch();
  const { book_id } = useParams();
  const [formComment] = Form.useForm();
  const [formAddToCart] = Form.useForm();
  const currentUser = useSelector(selectCurrentUser);
  const favorites = useSelector(selectBookFavorite);
  const bookNeedUpdate = useSelector(selectBookNeedUpdate);
  const [quantity, setQuantity] = useState(0);

  // Fill value to input quantity
  useEffect(() => {
    formAddToCart.setFieldsValue({
      quantity: quantity,
    });
  }, [formAddToCart, quantity]);

  // Get exact book
  useEffect(() => {
    if (book_id) {
      dispatch(fetchOneBook(book_id));
    }
  }, [book_id, dispatch]);

  // Check favorite and watch
  // useEffect(() => {
  //   if (isLogin()) dispatch(checkBook(book_id));
  // }, [book_id, dispatch]);

  const handleClickFavorite = () => {
    dispatch(addFavorite(book_id));
  };

  const handleClickWatch = () => {
    dispatch(addWatch(book_id));
  };

  const handleFinishOrder = (values) => {};

  const handleClickMinus = () => {
    if (quantity === 0) return false;
    setQuantity((prev) => prev - 1);
  };

  const handleClickPlus = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    const data = {
      amount: quantity,
      product_id: bookNeedUpdate.product_id,
      user_id: currentUser.user_id,
    };
    dispatch(addItemToCart(data));
    window.location.reload(false);

  };

  const handleFinishComment = (values) => {
    const data = {
      user_id: currentUser.user_id,
      comment: values.comment,
      product_id: book_id,
    };
    dispatch(commentBook(data));
  };

  return (
    <div className="app-container ">
      <Header />
      <Navigation />

      {Object.keys(bookNeedUpdate).length > 0 && (
        <div className="book-detail-container container-space">
          <div className="container-fluid">
            <Row className="book-detail-content">
              <Col xl={8}>
                <div className="image-container">
                  <img
                    className="image-current"
                    src={
                      bookNeedUpdate.documents &&
                      bookNeedUpdate.documents.length > 0
                        ? `${process.env.REACT_APP_API_URL}/documents/${bookNeedUpdate.documents[0].document}`
                        : "https://img.freepik.com/free-vector/blank-book-cover-white-vector-illustration_1284-41903.jpg?w=360"
                    }
                    alt="current product"
                  />
                  <div className="image-list">
                    {bookNeedUpdate.documents &&
                      bookNeedUpdate.documents.length > 0 &&
                      bookNeedUpdate.documents.map((src, index) => (
                        <img
                          key={src.document + index}
                          className="image-item"
                          alt="remain img current"
                          src={`${process.env.REACT_APP_API_URL}/documents/${src.document}`}
                        />
                      ))}
                  </div>
                </div>
              </Col>
              <Col xl={16}>
                <div className="book-info-container">
                  <h2 className="book-title">{bookNeedUpdate.title}</h2>
                  <div className="rate-container">
                    <div className="stars-list">
                      <span className="num">4.5</span>
                      <div className="stars">
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarHalf />
                      </div>
                    </div>
                    <div className="rates">
                      {Object.keys(bookNeedUpdate.count).length > 0 && (
                        <span className="num">
                          {bookNeedUpdate.count[0].count}
                        </span>
                      )}
                      <span className="text">Ratings</span>
                    </div>
                    <div className="solds">
                      <span className="num">{bookNeedUpdate.sold}</span>
                      <span className="text">Sold</span>
                    </div>
                    <div className="favorite">
                      {favorites.includes(bookNeedUpdate.book_id) ? (
                        <AiFillHeart
                          className="icon"
                          onClick={handleClickFavorite}
                        />
                      ) : (
                        <AiOutlineHeart
                          onClick={handleClickFavorite}
                          className="icon"
                        />
                      )}
                    </div>
                  </div>
                  <div className="price-container">
                    {bookNeedUpdate.promotion && (
                      <span className="prev">₫500.000</span>
                    )}
                    <span className="current">₫{bookNeedUpdate.price}</span>
                    {bookNeedUpdate.promotion && (
                      <span className="sale">40% OFF</span>
                    )}
                  </div>
                  <div className="voucher-container">
                    <h3 className="title">Shop Vouchers</h3>
                    <span className="sale">₫30k OFF</span>
                    <span className="sale">₫40k OFF</span>
                  </div>
                  <div className="supplier-container">
                    <h3 className="title">Supplier</h3>
                    <span className="value">
                      {bookNeedUpdate.supplier_name}
                    </span>
                  </div>
                  {bookNeedUpdate.amount <= 0 ? (
                    <div className="watch-container">
                      <Button
                        onClick={handleClickWatch}
                        disabled={false}
                        className="button square button--light addToWatch-btn"
                        type="button"
                      >
                        <span>Notify me when the goods arrive</span>
                      </Button>
                      <h4 className="quantity-amount">
                        {bookNeedUpdate.amount ?? 0} piece available
                      </h4>
                    </div>
                  ) : (
                    <>
                      <div className="quantity-container">
                        <h3 className="title">Quantity</h3>
                        <div className="quantity-content">
                          <Form
                            form={formAddToCart}
                            scrollToFirstError
                            onFinish={handleFinishOrder}
                          >
                            <div className="form-container">
                              <Button
                                onClick={handleClickMinus}
                                disabled={quantity === 0}
                                className="button square button--light prev"
                                type="button"
                              >
                                <AiOutlineMinus className="icon" />
                              </Button>
                              <Form.Item
                                name="quantity"
                                className="quantity-input-container"
                              >
                                <InputNumber
                                  min={0}
                                  max={bookNeedUpdate.amount}
                                  controls={false}
                                  className="input-quantity"
                                />
                              </Form.Item>
                              <Button
                                onClick={handleClickPlus}
                                disabled={false}
                                className="button square button--light next"
                                type="button"
                              >
                                <AiOutlinePlus className="icon" />
                              </Button>
                            </div>
                          </Form>
                        </div>
                        <h4 className="quantity-amount">
                          {bookNeedUpdate.amount} piece available
                        </h4>
                      </div>
                      <div className="actions-container">
                        <Button
                          onClick={handleAddToCart}
                          disabled={false}
                          className="button square button--light addToCart-btn"
                          type="button"
                        >
                          <AiOutlineShoppingCart className="icon" />
                          <span>Add to cart</span>
                        </Button>

                        <Button
                          onClick={handleAddToCart}
                          disabled={false}
                          className="button square button--light buyNow-btn"
                          type="button"
                        >
                          <span>Buy now</span>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>

            <Row
              className="book-info-content"
              gutter={{
                xl: 10,
              }}
            >
              <Col xl={18}>
                <div className="book-info-item">
                  <h2 className="title">Book Description</h2>
                  <p className="description">{bookNeedUpdate.description}</p>
                </div>

                <div className="book-info-item">
                  <h2 className="title">Book Ratings</h2>
                  <div className="comment-action">
                    <div className="left">
                      <img
                        className="avatar"
                        alt="avatar"
                        src={`${process.env.REACT_APP_API_URL}/${currentUser.avatar[0].url || ""}`}
                      />
                    </div>
                    <div className="right">
                      <h3 className="username">{currentUser.full_name}</h3>
                      <Form
                        className="form-comment"
                        scrollToFirstError
                        form={formComment}
                        onFinish={handleFinishComment}
                      >
                        <div className="comment-box">
                          <Form.Item
                            name="comment"
                            className="comment-textarea"
                          >
                            <TextArea
                              showCount
                              maxLength={100}
                              style={{
                                height: 120,
                                marginBottom: 24,
                              }}
                              placeholder="Write down your feedback"
                            />
                          </Form.Item>
                          <Button
                            className="button button--blue--light button-send-comment"
                            type="submit"
                          >
                            Send
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                  <div className="comment-list">
                    {bookNeedUpdate.comments.map((item, index) => (
                      <div
                        className="comment-item"
                        key={item.full_name + index}
                      >
                        <img
                          alt="avatar"
                          src={`${process.env.REACT_APP_API_URL}/${item.avatar}`}
                          className="avatar"
                        ></img>
                        <div className="comment-content">
                          <h3 className="username">{item.full_name}</h3>
                          <div className="stars-list">
                            <div className="stars">
                              <BsStarFill />
                              <BsStarFill />
                              <BsStarFill />
                              <BsStarFill />
                              <BsStarHalf />
                            </div>
                          </div>
                          <p className="date">
                            {moment(new Date(item.created_date)).format(
                              "YYYY-MM-DD"
                            )}
                            - {moment(new Date(item.created_date)).format("LT")}
                          </p>
                          <p className="description">{item.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col xl={6}>
                <div className="book-info-item voucher-container">
                  <h2 className="title">Shop Vouchers</h2>
                  <div className="voucher-item">
                    <div className="left">
                      <p className="sale">₫30k off</p>
                      <p className="min-spend">Min. Spend ₫500k</p>
                      <span className="expired-date">
                        Valid Till: 30.07.2023
                      </span>
                    </div>
                    <div className="right">
                      <Button
                        onClick={() => {}}
                        disabled={false}
                        className="button square button--light buyNow-btn"
                        type="button"
                      >
                        <span>Claim</span>
                      </Button>
                    </div>
                  </div>
                  <div className="voucher-item">
                    <div className="left">
                      <p className="sale">₫30k off</p>
                      <p className="min-spend">Min. Spend ₫500k</p>
                      <span className="expired-date">
                        Valid Till: 30.07.2023
                      </span>
                    </div>
                    <div className="right">
                      <Button
                        onClick={() => {}}
                        disabled={false}
                        className="button square button--light buyNow-btn"
                        type="button"
                      >
                        <span>Claim</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
