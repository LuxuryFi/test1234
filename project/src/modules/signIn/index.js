import React, { useEffect } from "react";
import { Row, Col, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

// import medcaresLogo from "../../assets/img/medcares-logo.jpg";
import bannerLoginBg from "../../assets/img/banner-login-bg.jpg";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { selectUserIsLoading, signIn } from "../../store/slices/usersSlice";

export default function SigninForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (values) => {
    const account = { email: values.email, password: values.password };
    dispatch(signIn(account));
  };

  return (
    <Row className="sigin-container">
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
            <h2 className="title">Sign in</h2>
            <p className="sub-title">
              A story that will really make you tremble with anticipation!
            </p>
            <Form
              form={form}
              className="formLogin"
              name="formLogin"
              scrollToFirstError
              onFinish={handleSubmit}
            >
              {/* Email */}
              <Form.Item
                className="form-input-group"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
                name="email"
              >
                <Input className="input" placeholder="email@gmail.com" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                style={{ marginTop: 10 }}
                name="password"
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

              {/* Forgot Password */}
              <Form.Item
                style={{ textAlign: "right" }}
                valuePropName="checked"
                name="forgot_password"
                className="form-input-group"
              >
                <span
                  className="forgot-pw"
                  defaultChecked={false}
                  // onClick={() => setForgotPw(true)}
                >
                  Forgot password?
                </span>
              </Form.Item>

              {/* Button */}
              <Form.Item className="form-input-group">
                <Button type="submit" className="button button--blue--dark">
                  <span>{isLoading ? <Spinner /> : "Sign In"}</span>
                </Button>
              </Form.Item>
            </Form>

            {/* Other options */}
            <div className="other-options">
              <h3 className="title">Or sign in by using</h3>
              <ul className="socials">
                <li className="item facebook">
                  <FaFacebookF className="icon" />
                </li>
                <li className="item twitter">
                  <FaTwitter className="icon" />
                </li>
                <li className="item google">
                  <FaGoogle className="icon" />
                </li>
              </ul>
            </div>

            {/* Sign Up */}
            <p className="signup-text">
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
