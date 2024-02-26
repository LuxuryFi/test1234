import React, { useEffect, useState } from "react";
import { Col, Row, Form, Input, Select } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import ScrollToTop from "react-scroll-to-top";

import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import {
  changeSearchCategory,
  changeSearchTerm,
  fetchAll,
  fetchAllCategoryBook,
  fetchBestSeller,
  fetchNewest,
  fetchTrending,
  selectBestSellerBooks,
  selectBooks,
  selectCategoryBook,
  selectFilteredBookGrid,
  selectNewestBooks,
  selectTrendingBooks,
} from "../../store/slices/booksSlice";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";

const mockAPI = [
  {
    name: "A doctor in the house",
    cover:
      "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book11-copyright.jpg",
    author: "Candy Carson",
    price_from: "6.50",
    price_to: "16.99",
  },
  {
    name: "Wildflower",
    cover:
      "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book13-copyright.jpg",
    author: "Drew Berrymore",
    price_from: "10.99",
    price_to: "20.00",
  },
  {
    name: "New Galaxy",
    cover:
      "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book8-copyright.jpg",
    author: "Richard Mann",
    price_from: "7.90",
    price_to: "16.90",
  },
  {
    name: "The Long Road to the Depp Silence",
    cover:
      "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book5-copyright.jpg",
    author: "Richard Mann",
    price_from: "12.00",
    price_to: "22.00",
  },
  {
    name: "Life in the Garden",
    cover:
      "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book4-copyright.jpg",
    author: "Candy Carson",
    price_from: "11.99",
    price_to: "25.00",
  },
  {
    name: "It's a Really Strange Story",
    cover:
      "https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book12-copyright.jpg",
    author: "Burt Geller",
    price_from: "8.00",
    price_to: "18.00",
  },
];

const { Option } = Select;

const settings = {
  dots: true,
  arrows: false,
  // adaptiveHeight: true,
  swipe: true,
  autoplay: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  customPaging: (i) => <div className="button-slide" />,
  // nextArrow: <FaAngleRight />,
  // prevArrow: <FaAngleLeft />,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function HomePage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const books = useSelector(selectBooks);
  const filteredBooks = useSelector(selectFilteredBookGrid);
  const [cloneBooks, setCloneBooks] = useState([]);
  const trendingBooks = useSelector(selectTrendingBooks);
  const bestSellerBooks = useSelector(selectBestSellerBooks);
  const newestBooks = useSelector(selectNewestBooks);
  const bookCategory = useSelector(selectCategoryBook);

  // Fetch Category
  useEffect(() => {
    dispatch(fetchAllCategoryBook());
  }, [dispatch]);

  // Fetch Trending
  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  // Fetch Best Seller
  useEffect(() => {
    dispatch(fetchBestSeller());
  }, [dispatch]);

  // Fetch Newest
  useEffect(() => {
    dispatch(fetchNewest());
  }, [dispatch]);

  // Fetch All Products
  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  // Clone books
  useEffect(() => {
    const limit = 10;
    let start = (page - 1) * limit;
    let end = (page - 1) * limit + limit;
    setCloneBooks(filteredBooks.slice(start, end));
  }, [filteredBooks, page]);

  // Search
  const handleClickSearch = () => {};

  return (
    <div className="app-container">
      <Header />
      {/* Banner */}
      <section className="banner-container">
        <ScrollToTop smooth color="#6f00ff" />
        <Navigation />
        <Row className="container-fluid banner-content">
          <Col className="left" xs={0} sm={0} md={6} lg={6} xl={6}>
            <div className="content">
              <Typewriter
                options={{
                  strings: [
                    "Bookstore. For your intelligence ",
                    "Best online bookstore",
                  ],
                  autoStart: true,
                  loop: true,
                  pauseFor: 3000,
                }}
              />
              <p className="sub-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse.
              </p>
            </div>
          </Col>
          <Col className="right" xs={0} sm={0} md={12} lg={12} xl={12}>
            <div></div>
          </Col>
        </Row>
      </section>

      {/* Discover */}
      <section className="discover-container container-space">
        <div className="container-fluid">
          <h3 className="title">Discover Your Next Book</h3>
          <div className="discover-content">
            <h4 className="heading">New Releases</h4>
            <div className="grid-product">
              {trendingBooks &&
                trendingBooks.map((item, index) => (
                  <Link
                    to={`books/${item.product_id}`}
                    className="item"
                    key={item.created_date + index}
                  >
                    <img
                      alt="img"
                      src={
                        item.document[0]
                          ? `http://localhost:3001/documents/${item.document[0].document}`
                          : mockAPI[3].cover
                      }
                      className="cover"
                    />
                    <div className="bottom">
                      <div className="info">
                        <h3 className="name">
                          {item.title ? item.title : mockAPI[3].name}
                        </h3>
                        <p className="author">{item.author}</p>
                      </div>
                      <p className="prices">
                  ${item.price}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="trending-container container-space">
        <div className="container-fluid">
          <h3 className="title">Choose Trending Book</h3>
          <div className="trending-content">
            <h4 className="heading">Trending</h4>
            <div className="trending-list">
              <Slider {...settings}>
                {trendingBooks &&
                  trendingBooks.map((item, index) => (
                    <Link
                      to={`books/${item.product_id}`}
                      className="item"
                      key={item.name + index}
                    >
                      <img
                        alt="img"
                        src={
                          item.document[0]
                            ? `http://localhost:3001/documents/${item.document[0].document}`
                            : mockAPI[3].cover
                        }
                        className="cover"
                      />
                      <div className="bottom">
                        <div className="info">
                          <h3 className="name">
                            {item.title ? item.title : mockAPI[3].name}
                          </h3>
                          <p className="author">{item.author}</p>
                        </div>
                        <p className="prices">
                          ${item.price}
                        </p>
                      </div>
                    </Link>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller */}
      <section className="best-seller-container container-space">
        <div className="container-fluid">
          <h3 className="title">Choose Best Seller Book</h3>
          <div className="best-seller-content">
            <h4 className="heading">Best Seller</h4>
            <div className="best-seller-list">
              <Slider {...settings}>
                {bestSellerBooks &&
                  bestSellerBooks.map((item, index) => (
                    <Link
                      to={`books/${item.product_id}`}
                      className="item"
                      key={item.name + index}
                    >
                      <img
                        alt="img"
                        src={
                          item.document[0]
                            ? `http://localhost:3001/documents/${item.document[0].document}`
                            : mockAPI[3].cover
                        }
                        className="cover"
                      />
                      <div className="bottom">
                        <div className="info">
                          <h3 className="name">
                            {item.title ? item.title : mockAPI[3].name}
                          </h3>
                          <p className="author">{item.author}</p>
                        </div>
                        <p className="prices">
                        ${item.price}
                        </p>
                      </div>
                    </Link>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Newest */}
      <section className="newest-container container-space">
        <div className="container-fluid">
          <h3 className="title">Choose The Newest Book</h3>
          <div className="newest-content">
            <h4 className="heading">Newest</h4>
            <div className="newest-list">
              <Slider {...settings}>
                {newestBooks &&
                  newestBooks.map((item, index) => (
                    <Link
                      to={`books/${item.product_id}`}
                      className="item"
                      key={item.name + index}
                    >
                      <img
                        alt="img"
                        src={
                          item.document[0]
                            ? `http://localhost:3001/documents/${item.document[0].document}`
                            : mockAPI[3].cover
                        }
                        className="cover"
                      />
                      <div className="bottom">
                        <div className="info">
                          <h3 className="name">
                            {item.title ? item.title : mockAPI[3].name}
                          </h3>
                          <p className="author">{item.author}</p>
                        </div>
                        <p className="prices">
                        ${item.price}
                        </p>
                      </div>
                    </Link>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Display Grid Product */}
      <section className="list-container container-space">
        <div className="container-fluid grid-content">
          <h3 className="title">Grid display books</h3>
          <Form
            scrollToFirstError
            form={form}
            className="search-container"
            onFinish={handleClickSearch}
          >
            <Form.Item name="product_name">
              <Input
                className="input"
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
                placeholder="Product Name"
              ></Input>
            </Form.Item>

            <Form.Item name="category">
              <Select
                placeholder="Select your cateogry"
                onChange={(value) => dispatch(changeSearchCategory(value))}
              >
                {bookCategory &&
                  bookCategory.map((item, index) => (
                    <Option key={index} value={item.category_name}>
                      {item.category_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Button
              type="button"
              className="button button--main--book"
              onClick={() => {
                dispatch(changeSearchCategory(""));
                dispatch(changeSearchTerm(""));
                form.resetFields();
              }}
            >
              Reset
            </Button>
          </Form>
          <div className="grid-product">
            {cloneBooks &&
              cloneBooks.map((item, index) => (
                <Link
                  to={`books/${item.product_id}`}
                  className="item"
                  key={item.created_date + index}
                >
                  <img
                    alt="img"
                    src={
                      item.document[0]
                        ? `http://localhost:3001/documents/${item.document[0].document}`
                        : mockAPI[3].cover
                    }
                    className="cover"
                  />
                  <div className="bottom">
                    <div className="info">
                      <h3 className="name">
                        {item.title ? item.title : mockAPI[3].name}
                      </h3>
                      <p className="author">{item.author}</p>
                    </div>
                    <p className="prices">
                      ${item.price}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
          <Pagination
            limit={10}
            setPage={setPage}
            currentPage={page}
            count={filteredBooks.length}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
