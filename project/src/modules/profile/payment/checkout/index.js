import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import { Link, useParams } from 'react-router-dom';


import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';
import Spinner from '../../../../components/Spinner';
import Navigation from '../../../../components/Navigation';
import visaLogo from '../../../../assets/img/visa.png';
import momoLogo from '../../../../assets/img/momo.png';
import Button from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmPayment,
  fetchPayment,
  selectPaymentIsLoading,
} from '../../../../store/slices/paymentsSlice';

const formItemLayout = {
  labelCol: {
    xl: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
  wrapperCol: {
    xl: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};

const { Option } = Select;

export default function Checkout() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [vnpayForm] = Form.useForm();
  const { payment_id } = useParams();
  const [mode, setMode] = useState();
  const paymentLoading = useSelector(selectPaymentIsLoading);

  useEffect(() => {
    dispatch(fetchPayment(payment_id));
  }, [dispatch, payment_id]);

  const handleSubmit = (values) => {};

  const handleSubmitVNPay = (values) => {
    let newPayment = {
      amount: values.amount,
      orderDescription: values.order_description,
      orderType: values.order_type,
      language: values.language,
      bankCode: values.bank_code,
    };

    dispatch(confirmPayment(newPayment));
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="checkout-container mg-header">
        <div className="container-fluid">
          <div className="checkout-content">
            <Row>
              <Col className="left" sm={24} md={16} lg={16} xl={16} xxl={16}>
                <div className="form-content">
                  <h3 className="title">Personal Information</h3>
                  {/* Patient Information */}
                  <Row>
                    <Col
                      className="left"
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                    >
                      {/* First Name */}
                      <Form.Item
                        className="form-input-group"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your first name!',
                          },
                        ]}
                        label="First Name"
                        name="first_name"
                      >
                        <Input className="input" placeholder="First Name" />
                      </Form.Item>

                      {/* Email */}
                      <Form.Item
                        className="form-input-group"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your email!',
                          },
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                        ]}
                        label="Email"
                        name="email"
                      >
                        <Input className="input" placeholder="abc@gmail.com" />
                      </Form.Item>
                    </Col>
                    <Col
                      className="right"
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                      xxl={12}
                    >
                      {/* Last Name */}
                      <Form.Item
                        className="form-input-group"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your last name!',
                          },
                        ]}
                        label="Last Name"
                        name="last_name"
                      >
                        <Input className="input" placeholder="Last Name" />
                      </Form.Item>

                      {/* Phone */}
                      <Form.Item
                        className="form-input-group"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your phone!',
                          },
                        ]}
                        label="Phone"
                        name="phone"
                      >
                        <Input className="input" placeholder="19908198" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="separate"></div>

                  {/* Payment Method */}
                  <h3 className="title">Payment Method</h3>
                  <div className="payment-method-container">
                    <Form
                      {...formItemLayout}
                      className="checkout-form"
                      form={form}
                      onFinish={handleSubmit}
                      name="checkoutForm"
                      scrollToFirstError
                    >
                      <div className="payment-list">
                        <div
                          className={`payment-item ${
                            mode === 'visa' ? 'active' : ''
                          }`}
                          onClick={() => setMode('visa')}
                        >
                          <img
                            alt="visa logo"
                            className="payment-image visa"
                            src={visaLogo}
                          />
                        </div>
                        <div
                          className={`payment-item ${
                            mode === 'momo' ? 'active' : ''
                          }`}
                          onClick={() => setMode('momo')}
                        >
                          <img
                            alt="visa logo"
                            className="payment-image momo"
                            src={momoLogo}
                          />
                        </div>
                        <div
                          className={`payment-item ${
                            mode === 'vnpay' ? 'active' : ''
                          }`}
                          onClick={() => setMode('vnpay')}
                        >
                          <img
                            alt="visa logo"
                            className="payment-image momo"
                            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR.png"
                          />
                        </div>
                      </div>
                      {/* Mode momo and visa */}
                      {mode !== 'vnpay' && mode && (
                        <div className="payment-content">
                          <Row>
                            <Col
                              className="left"
                              sm={24}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                            >
                              {/* Name on Card */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter your name on card!',
                                  },
                                ]}
                                label="Name on Card"
                                name="name_on_card"
                              >
                                <Input
                                  className="input"
                                  placeholder="THU Hoa"
                                  onInput={(e) =>
                                    (e.target.value =
                                      e.target.value.toUpperCase())
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col
                              className="right"
                              sm={24}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                            >
                              {/* Card Number */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter your card number!',
                                  },
                                ]}
                                label="Card Number"
                                name="card_number"
                              >
                                <Input
                                  className="input"
                                  placeholder="1234 5678 9876 5432"
                                />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row>
                            <Col
                              className="left"
                              sm={24}
                              md={8}
                              lg={8}
                              xl={8}
                              xxl={8}
                            >
                              {/* Expiry Month */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter expiry month!',
                                  },
                                ]}
                                label="Expiry Month"
                                name="expiry_month"
                              >
                                <Input className="input" placeholder="MM" />
                              </Form.Item>
                            </Col>
                            <Col
                              className="middle"
                              sm={24}
                              md={8}
                              lg={8}
                              xl={8}
                              xxl={8}
                            >
                              {/* Expiry Year */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter expiry year!',
                                  },
                                ]}
                                label="Expiry Year"
                                name="expriry_year"
                              >
                                <Input className="input" placeholder="YY" />
                              </Form.Item>
                            </Col>
                            <Col
                              className="right"
                              sm={24}
                              md={8}
                              lg={8}
                              xl={8}
                              xxl={8}
                            >
                              {/* CCV */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter ccv!',
                                  },
                                ]}
                                label="CVV"
                                name="cvv"
                              >
                                <Input className="input" />
                              </Form.Item>
                            </Col>
                          </Row>

                          {/* Agreement */}
                          <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                        new Error('Should accept agreement')
                                      ),
                              },
                            ]}
                            className="agreement-input left"
                          >
                            <Checkbox className="agreement-text">
                              I have read the{' '}
                              <Link to="">Terms & Conditions</Link>
                            </Checkbox>
                          </Form.Item>

                          {/* Button */}
                          <Form.Item className="left">
                            <Button
                              type="submit"
                              className="button button--blue--dark square"
                            >
                              {paymentLoading ? (
                                <Spinner />
                              ) : (
                                <span>Confirm and Pay</span>
                              )}
                            </Button>
                          </Form.Item>
                        </div>
                      )}
                    </Form>

                    <Form
                      {...formItemLayout}
                      className="checkout-form"
                      form={vnpayForm}
                      onFinish={handleSubmitVNPay}
                      name="checkoutForm"
                      scrollToFirstError
                    >
                      {/* Mode vnpay */}
                      {mode === 'vnpay' && (
                        <div className="payment-content">
                          <Row>
                            <Col
                              className="left"
                              sm={24}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                            >
                              {/* Order Type */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter your order type!',
                                  },
                                ]}
                                label="Order Type"
                                name="order_type"
                              >
                                <Select placeholder="Select your order type">
                                  <Option value="prescription">
                                    Pay Prescription
                                  </Option>
                                  <Option value="billpayment">Pay Bill</Option>
                                  <Option value="topup">Top Up</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col
                              className="right"
                              sm={24}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                            >
                              {/* Amount */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter your amount!',
                                  },
                                ]}
                                label="Amount"
                                name="amount"
                              >
                                <Input className="input" placeholder="$1000" />
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row>
                            <Col
                              className="left"
                              sm={24}
                              md={8}
                              lg={8}
                              xl={8}
                              xxl={8}
                            >
                              {/* Payment Description */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      'Please enter payment description!',
                                  },
                                ]}
                                label="Payment Description"
                                name="order_description"
                              >
                                <Input
                                  className="input"
                                  placeholder="Enter your payment description"
                                />
                              </Form.Item>
                            </Col>
                            <Col
                              className="middle"
                              sm={24}
                              md={8}
                              lg={8}
                              xl={8}
                              xxl={8}
                            >
                              {/* Bank Code */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select your bank!',
                                  },
                                ]}
                                label="Bank"
                                name="bank_code"
                              >
                                <Select placeholder="Select your bank">
                                  <Option value="NCB">
                                    NCB (National Citizen Bank)
                                  </Option>
                                  <Option value="BIDV">
                                    BIDV (The Joint Stock Commercial Bank for
                                    Investment and Development of Vietnam )
                                  </Option>
                                  <Option value="SCB">
                                    SCB (Saigon Thuong Tin Commercial Joint
                                    Stock Bank )
                                  </Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col
                              className="right"
                              sm={24}
                              md={8}
                              lg={8}
                              xl={8}
                              xxl={8}
                            >
                              {/* Language */}
                              <Form.Item
                                className="form-input-group"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select your language!',
                                  },
                                ]}
                                label="Language"
                                name="language"
                              >
                                <Select placeholder="Select your bank">
                                  <Option value="en">English</Option>
                                  <Option value="vn">Vietnamese</Option>
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>

                          {/* Agreement */}
                          <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) =>
                                  value
                                    ? Promise.resolve()
                                    : Promise.reject(
                                        new Error('Should accept agreement')
                                      ),
                              },
                            ]}
                            className="agreement-input left"
                          >
                            <Checkbox className="agreement-text">
                              I have read the{' '}
                              <Link to="">Terms & Conditions</Link>
                            </Checkbox>
                          </Form.Item>

                          {/* Button */}
                          <Form.Item className="left">
                            <Button
                              type="submit"
                              className="button button--blue--dark square"
                            >
                              {paymentLoading ? (
                                <Spinner />
                              ) : (
                                <span>Confirm and Pay</span>
                              )}
                            </Button>
                          </Form.Item>
                        </div>
                      )}
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
