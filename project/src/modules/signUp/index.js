import React from "react";
import { Row, Col, Form, Input, DatePicker, Radio } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import medcaresLogo from "../../assets/img/medcares-logo.png";
import bannerLoginBg from "../../assets/img/banner-login-bg.jpg";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { selectUserIsLoading, signUp } from "../../store/slices/usersSlice";

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

export default function SignUpForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

  const handleSubmit = (values) => {
    const newPatient = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      password: values.password,
      date_of_birth: moment(values.date_of_birth).format("YYYY-MM-DD"),
      gender: values.gender,
    };

    dispatch(signUp(newPatient));
  };

  return (
    <Row className="signup-container">
      <Col className="left" sm={24} md={24} lg={12} xl={12} xxl={12}>
        <div className="container-fluid">
          <Link to="/" className="logo-container">
            <span className="logo-text">BookStore</span>
          </Link>
          <div className="banner-container">
            <div className="banner-bg"></div>
          </div>
        </div>
      </Col>
      <Col className="right" sm={24} md={24} lg={12} xl={12} xxl={12}>
        <div className="container-fluid">
          <div className="form-container">
            <h2 className="title">Sign up</h2>
            <p className="sub-title">
              Let's protect yourself and those around you by vaccinating
            </p>
            <Form
              form={form}
              className="formLogin"
              name="formLogin"
              {...formItemLayout}
              scrollToFirstError
              onFinish={handleSubmit}
            >
              <Row>
                <Col
                  className="left-signup"
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  xll={12}
                >
                  {/* First Name */}
                  <Form.Item
                    className="form-input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name!",
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
                        message: "Please enter your email!",
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                    ]}
                    label="Email"
                    name="email"
                  >
                    <Input className="input" placeholder="abc@gmail.com" />
                  </Form.Item>

                  {/* Password */}
                  <Form.Item
                    style={{ marginTop: 10 }}
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    className="form-input-group"
                  >
                    <Input.Password
                      className="input"
                      placeholder="Enter your password!"
                    />
                  </Form.Item>

                  {/* Confirm Password */}
                  <Form.Item
                    name="confirm"
                    dependencies={["password"]}
                    label="Confirm Password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                    className="form-input-group"
                  >
                    <Input.Password
                      className="input"
                      placeholder="Confirm your password!"
                    />
                  </Form.Item>
                </Col>
                <Col
                  className="right-signup"
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  xll={12}
                >
                  {/* Last Name */}
                  <Form.Item
                    className="form-input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your last name!",
                      },
                    ]}
                    label="Last Name"
                    name="last_name"
                  >
                    <Input className="input" placeholder="Last Name" />
                  </Form.Item>

                  {/* Date of birth */}
                  <Form.Item
                    className="form-input-group"
                    label="Date of birth"
                    name="date_of_birth"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your date of brith",
                      },
                    ]}
                  >
                    <DatePicker
                      className="input"
                      allowClear={false}
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>

                  {/* Gender */}
                  <Form.Item
                    label="Gender"
                    name="gender"
                    className="form-input-group gender"
                    rules={[
                      {
                        required: true,
                        message: "Please select your gender!",
                      },
                    ]}
                  >
                    <Radio.Group className="input input-radio">
                      <Radio value="Female">Female</Radio>
                      <Radio value="Male">Male</Radio>
                      <Radio value="Other">Other</Radio>
                    </Radio.Group>
                  </Form.Item>

                  {/* Phone */}
                  <Form.Item
                    className="form-input-group"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone!",
                      },
                    ]}
                    label="Phone"
                    name="phone"
                  >
                    <Input className="input" placeholder="Enter phone" />
                  </Form.Item>
                </Col>
              </Row>

              {/* Button */}
              <Form.Item className="form-input-group">
                <Button type="submit" className="button button--blue--dark">
                  <span>{isLoading ? <Spinner /> : "Sign Up"}</span>
                </Button>
              </Form.Item>
            </Form>

            {/* Sign Up */}
            <p className="signin-text">
              Already have an account?{" "}
              <Link to="/signin" className="signin-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
