import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navigation from "../../components/Navigation";
import { selectCurrentUser } from "../../store/slices/usersSlice";
import sidebarData from "./sidebarData";

export default function MyProfile() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <ScrollToTop smooth color="#6f00ff" />
      <Header />
      <Navigation activeBg={true} />
      <div className="profile-container mg-header">
        <div className="container-fluid profile-content">
          <Row>
            <Col className="left" sm={24} md={24} lg={6} xl={6} xxl={6}>
              <div className="sidebar-container">
                <div className="sidebar-header">
                  <img
                    className="avatar"
                    src={
                      Object.keys(currentUser).length > 0
                        ? `${process.env.REACT_APP_API_URL}/${currentUser.avatar[0].url}`
                        : ""
                    }
                    alt="avatar"
                  />
                  <h3 className="name">
                    {currentUser.first_name} {currentUser.last_name}
                  </h3>
                </div>
                <ul className="sidebar-list">
                  {sidebarData.map((data, index) => (
                    <li key={index} className="sidebar-item">
                      <NavLink to={data.path} className="sidebar-link">
                        {data.icon}
                        {data.text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col className="right" sm={24} md={24} lg={18} xl={18} xxl={18}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
