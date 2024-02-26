import React from "react";
import { Row, Col } from "antd";
import { IoCheckmarkDone } from "react-icons/io5";

import bgAbout from "../../assets/img/about-bg.png";

import { Animate } from "../AnimateIn";

export default function AboutUs() {
  return (
    <section className="about-container container-space">
      <div className="container-fluid">
        <Row className="about-content">
          <Col className="left" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Animate.FadeInLeft>
              <img src={bgAbout} alt="about background" className="image" />
            </Animate.FadeInLeft>
          </Col>
          <Col className="right" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Animate.FadeInDown>
              <h4 className="heading">About Us</h4>
              <h3 className="title">Best bookstore online</h3>
              <p className="description">
                bookstore.com accepts online orders and has home delivery. DO
                NOT support ordering and receiving directly bookstore.com
                accepts online orders and delivers to your door. DO NOT support
                ordering and receiving goods directly at the office as well as
                all bookstore systems nationwide at the office as well as all
                bookstore systems nationwide
              </p>
            </Animate.FadeInDown>
            <ul className="about-features">
              <Animate.FadeInUp>
                <li className="about-item">
                  <div className="content">
                    <IoCheckmarkDone className="icon" />
                    <span className="text"> Manga, Light novel</span>
                  </div>
                </li>
              </Animate.FadeInUp>
              <Animate.FadeInUp>
                <li className="about-item">
                  <div className="content">
                    <IoCheckmarkDone className="icon" />
                    <span className="text">Guide and Textbook</span>
                  </div>
                </li>
              </Animate.FadeInUp>
              <Animate.FadeInUp>
                <li className="about-item">
                  <div className="content">
                    <IoCheckmarkDone className="icon" />
                    <span className="text">Album</span>
                  </div>
                </li>
              </Animate.FadeInUp>
              <Animate.FadeInUp>
                <li className="about-item">
                  <div className="content">
                    <IoCheckmarkDone className="icon" />
                    <span className="text">CD</span>
                  </div>
                </li>
              </Animate.FadeInUp>
              <Animate.FadeInUp>
                <li className="about-item">
                  <div className="content">
                    <IoCheckmarkDone className="icon" />
                    <span className="text">Novel</span>
                  </div>
                </li>
              </Animate.FadeInUp>
              <Animate.FadeInUp>
                <li className="about-item">
                  <div className="content">
                    <IoCheckmarkDone className="icon" />
                    <span className="text">Art</span>
                  </div>
                </li>
              </Animate.FadeInUp>
            </ul>
          </Col>
        </Row>
      </div>
    </section>
  );
}
