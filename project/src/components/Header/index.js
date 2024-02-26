import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { BsClock } from "react-icons/bs";
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaTelegramPlane,
  FaPhoneAlt,
} from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";

import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { isLogin } from "../../helpers/isLogin";
import { useDispatch, useSelector } from "react-redux";
import { getIdentity, selectCurrentUser } from "../../store/slices/usersSlice";

export default function Header() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (isLogin() && Object.keys(currentUser).length === 0) {
      dispatch(getIdentity());
    }
  }, [dispatch, currentUser]);

  return (
    <section className="header-container">
      <div className="header-content">
        <Row className="container-fluid">
          <Col className="left" xs={0} sm={0} md={12} lg={12} xl={12}></Col>
          <Col className="right" xs={0} sm={0} md={12} lg={12} xl={12}>
            {isLogin() ? (
              <>
                <Link
                  to="/profile/user-form"
                  className="button button--light profile-btn"
                >
                  <img
                    className="avatar"
                    src={
                      Object.keys(currentUser).length > 0
                        ? `${process.env.REACT_APP_API_URL}/${currentUser.avatar[0].url}`
                        : ""
                    }
                    alt="avatar"
                  />
                  Hello, {currentUser.last_name}
                </Link>
                <Button
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("accessToken");
                    window.location.href = "/signin";
                  }}
                  type="button"
                  className="button button--text--white sign-out-btn"
                >
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" className="button button--text--white">
                  Sign In
                </Link>
                <Link to="/signup" className="button button--light square">
                  Sign Up
                </Link>
              </>
            )}
          </Col>
        </Row>
      </div>
    </section>
  );
}
