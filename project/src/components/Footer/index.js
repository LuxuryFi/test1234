import React from "react";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import { Image } from "antd";

export default function Footer() {
  return (
    <footer>
      <section className="footer-container">
        <div className="container-fluid">
          <div className="footer-content">
            <div className="footer-item">
              <h3 className="title">BookStore</h3>
              <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore aliqua.
              </p>
              <ul className="social-list">

              </ul>
            </div>
            {/* <div className="footer-item">
              <h3 className="title">Instagram</h3>
              <ul className="image-list">
                <Image src={doctor1} className="image" />
                <Image src={doctor2} className="image" />
                <Image src={doctor3} className="image" />
                <Image src={doctor1} className="image" />
                <Image src={doctor2} className="image" />
                <Image src={doctor3} className="image" />
              </ul>
            </div> */}
            <div className="footer-item">
              <h3 className="title">Userful Links</h3>
              <ul className="link-list">
                <li className="link-item">
                  <Link to="#home" className="link">
                    Home
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="#about" className="link">
                    About
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="#solution" className="link">
                    Solution
                  </Link>
                </li>
                <li className="link-item">
                  <Link to="#services" className="link">
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-item">
              <h3 className="title">Contact</h3>
              <ul className="contact-list">

              </ul>
            </div>
          </div>
        </div>
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </section>
      <section className="copyright-container">
        <p>
          Copyright © 2023 Bookstore. All Rights Reserved by{" "}
          <Link to="#" className="link">
             Hoa
          </Link>
        </p>
      </section>
    </footer>
  );
}
