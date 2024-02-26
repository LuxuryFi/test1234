import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  fetchDetails,
  fetchPayment,
  selectDetails,
  selectPaymentIsLoading,
  selectPaymentNeedUpdate,
} from "../../../../store/slices/paymentsSlice";
import Header from "../../../../components/Header";
import Navigation from "../../../../components/Navigation";
import Footer from "../../../../components/Footer";
import medcaresLogo from "../../../../assets/img/medcares-logo.png";
import { Col, Row, Table } from "antd";
import moment from "moment";
import {
  fetchClinic,
  selectClinicNeedUpdate,
} from "../../../../store/slices/clinicsSlice";
import { selectUserNeedUpdate } from "../../../../store/slices/usersSlice";
import { DISCOUNT, VAT } from "../../../../constants";
import Button from "../../../../components/Button";

export default function PaymentDetail() {
  const dispatch = useDispatch();
  const { order_id } = useParams();
  const [subTotal, setSubTotal] = useState(0);
  const payment = useSelector(selectPaymentNeedUpdate);
  const details = useSelector(selectDetails);
  const [prevDetail, setPrevDetail] = useState({});
  const user = useSelector(selectUserNeedUpdate);
  const isLoading = useSelector(selectPaymentIsLoading);

  useEffect(() => {
    if (details.length > 0) {
      setPrevDetail(details);
    }
  }, [details]);

  useEffect(() => {
    // dispatch(fetchPayment(order_id));
    dispatch(fetchDetails(order_id));
  }, [dispatch, order_id]);

  useEffect(() => {
    const calculateSubTotal = () => {
      details.forEach((detail) => {
        console.log(detail)
        setSubTotal(
          (prev) =>
            prev + (parseInt(detail.amount, 10) * parseInt(detail.price))
        );
      });
    };

    if (
      details.length > 0 &&
      JSON.stringify(details) !== JSON.stringify(prevDetail)
    ) {
      setSubTotal(0);
      calculateSubTotal();
    }
  }, [details, prevDetail, subTotal]);

  const detailColumns = [
    {
      title: "Book Name",
      index: "product_name",
      dataIndex: "title",
    },
    {
      title: "Quantity",
      index: "amount",
      dataIndex: "amount",
    },
    {
      title: "VAT",
      index: "vat",
      render: (record) => VAT,
    },
    {
      title: "Price",
      index: "price",
      dataIndex: "price",
      // render: (record) => "12000",
    },
    {
      title: "Total",
      index: "total",
      render: (record) =>
        `${parseInt(record.price, 10) * parseInt(record.amount, 10)}`
    },
  ];

  return (
    <>
      <Header />
      <Navigation />
      <Row className="mg-header">
        <Col
          className="payment-detail-container"
          sm={12}
          md={12}
          lg={12}
          xl={16}
          xxl={16}
        >
          <div className="container-fluid">
            <div className="payment-detail-content">
              <Row className="header">
                <Col className="left" sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="logo-container">
                    <span className="logo-text">Bookstore</span>
                  </div>
                </Col>
                <Col className="right" sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="info-item">
                    <span className="payment-title">Order: </span>
                    <span className="payment-title-sub">
                      #{order_id ?? "10"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="payment-title">Issued: </span>
                    <span className="payment-title-sub">
                      {moment(payment.created_date).format("DD/MM/YYYY") ??
                        "09/05/2023"}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="content">
                <Col className="left" sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="info-item">
                    <p className="payment-title">Invoice From </p>
                    <p className="payment-info">
                      {/* Book Store - {clinic.clinic.address ?? "Xuan Mai"},{" "}
                      {clinic.clinic.state ?? "Chuong My"},{" "}
                      {clinic.clinic.city ?? "Ha Noi"}{" "} */}
                      Book Store - My Dinh - Nam Tu Liem - Ha Noi
                    </p>
                  </div>
                </Col>
                <Col className="right" sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="info-item">
                    <p className="payment-title">Invoice To </p>
                    <p className="payment-info">
                      {user.full_name ?? "Thu Hoa"}{" "}
                      {user.address ?? "Khoai Chau"}
                      {", "}
                      {user.state ?? "TP Hung Yen"}
                      {", "}
                      {user.city ?? "Hung Yen"}
                    </p>
                  </div>
                </Col>
                <Col className="left" sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="info-item">
                    <p className="payment-title">Payment Method</p>
                    <p className="payment-info">
                      ACB Bank
                    </p>
                  </div>
                </Col>
              </Row>

              <Table
                className="detail-table"
                rowClassName="payment-row detail"
                x={true}
                loading={isLoading}
                scroll={{ x: 300 }}
                pagination={false}
                columns={detailColumns}
                dataSource={details}
                rowKey={(record) => record.detail_id}
              />
              <Row className="content">
                <Col className="right" sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <div className="bill-container">
                    <div className="info-item">
                      <span className="payment-title">Subtotal:</span>
                      {/* <span className="payment-info">${subTotal}</span> */}
                      <span className="payment-info">${subTotal}</span>
                    </div>
                    <div className="info-item">
                      <span className="payment-title">Discount:</span>
                      <span className="payment-info">${DISCOUNT}</span>
                    </div>
                    <div className="info-item">
                      <span className="payment-title">Total Amount:</span>
                      <span className="payment-info">${subTotal}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="content">
                <Col className="left" sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <div className="info-item">
                    <p className="payment-title">Other Information </p>
                    <p className="payment-info">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus sed dictum ligula, cursus blandit risus. Maecenas
                      eget metus non tellus dignissim aliquam ut a ex. Maecenas
                      sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae
                      lorem interdum, eu scelerisque tellus fermentum. Curabitur
                      sit amet lacinia lorem. Nullam finibus pellentesque
                      libero.
                    </p>
                  </div>
                </Col>
              </Row>
              <Row className="content">
                <Col className="right" sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Link
                    to={`/payment/checkout/${order_id}`}
                    type="button"
                    className="button button--main--book square checkout-button"
                  >
                    Check out
                  </Link>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* {Object.keys(details).length === 0 && (
        <Row className="mg-header">
          <Col
            className="payment-detail-container"
            sm={12}
            md={12}
            lg={12}
            xl={16}
            xxl={16}
          >
            <div className="container-fluid">
              <div className="payment-detail-content loading">
                <p style={{ marginBottom: 40 }} className="text-loading">
                  Payment does not have any detail
                </p>
                <Link
                  to="/profile/payments"
                  type="submit"
                  className="button button--blue--light"
                >
                  Back to payment list
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      )} */}
      <Footer />
    </>
  );
}
