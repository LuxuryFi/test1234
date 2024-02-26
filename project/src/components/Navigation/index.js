import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineChevronDown } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";

// import medcaresLogo from "../../assets/img/medcares-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypes, selectTypes } from "../../store/slices/articlesSlice";

export default function Navigation({ activeBg }) {
  const dispatch = useDispatch();
  const navRef = useRef();
  // const types = useSelector(selectTypes);

  // useEffect(() => {
  //   dispatch(fetchTypes());
  // }, [dispatch]);

  useEffect(() => {
    const navOffsetHeight = navRef.current.clientHeight;
    const headerOffsetHeight =
      document.querySelector(".header-container").clientHeight;

    const handleScroll = () => {
      if (window.scrollY > navOffsetHeight + headerOffsetHeight) {
        navRef.current.classList.add("active");
      } else {
        navRef.current.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className={`navigation-container ${activeBg ? "activeBg" : ""}`}
    >
      <div className="container-fluid navigation-content">
        <Link to="/" className="logo-container">
          <span className="logo-text">BookStore</span>
        </Link>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink end to="/" className="nav-link">
              <span className="text">Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink end to="/about" className="nav-link">
              <span className="text">About</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink end to="/contact" className="nav-link">
              <span className="text">Contact</span>
            </NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink end to="/articles/type/3" className="nav-link">
              <span className="text">Patient Guide</span>
              <HiOutlineChevronDown className="icon" />
            </NavLink>
            <ul className="sub-nav">
              {types.map((type, index) => (
                <Link
                  key={index}
                  to={`/articles/type/${type.type_id}`}
                  className="sub-item"
                >
                  {type.type_name}
                </Link>
              ))}
            </ul>
          </li> */}
        </ul>
        <div className="other-option">
          <Link
            to="/profile/cart"
            className="button square button--blue--dark"
            type="button"
          >
            <AiOutlineShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
}
