// src/components/Menu.jsx
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Menu = ({ onRandom, onNewest, onOldest, onFavorite }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const userLanguage = navigator.language || navigator.languages[0];
    setLanguage(userLanguage);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="menu-container" ref={menuRef}>
      <div className="circle-button" onClick={toggleMenu}>
        ☰
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div
            onClick={() => {
              onRandom();
              setIsOpen(false);
            }}
          >
            {language.includes("vi") ? "Ngẫu nhiên" : "Random order"}
          </div>
          <div
            onClick={() => {
              onNewest();
              setIsOpen(false);
            }}
          >
            {language.includes("vi") ? "Mới nhất" : "Latest order"}
          </div>
          <div
            onClick={() => {
              onOldest();
              setIsOpen(false);
            }}
          >
            {language.includes("vi") ? "Cũ nhất" : "Oldest oder"}
          </div>
          {/* <div
            onClick={() => {
              onFavorite();
              setIsOpen(false);
            }}
          >
            Thích
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Menu;
