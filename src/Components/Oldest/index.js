import { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import "../../App.css";
import icon from "../../icon.png";
import Menu from "../Menu";
import data from "../../data.json";

function Oldest() {
  const [isVisible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [randomizedData, setRandomizedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const imageFiles = data;

    const imageArray = imageFiles.map((fileName) => ({
      id: parseInt(fileName.replace(".jpg", "")),
      src: `https://laplo69.com/images/${fileName}`,
    }));

    const sortedImages = [...imageArray].sort((a, b) => a.id - b.id);
    setRandomizedData(sortedImages);
    scrollToTop();

    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.onkeydown = function (e) {
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) ||
        (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) ||
        (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
      ) {
        return false;
      }
    };

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.onkeydown = null;
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRandom = () => {
    navigate("/");
  };

  const handleNewest = () => {
    navigate("/newest");
  };

  const handleOldest = () => {
    navigate("/oldest");
  };

  const handleFavorite = () => {
    // const sortedByFavorite = [...data].sort((a, b) => b.likes - a.likes);
    // setData(sortedByFavorite);
  };

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  return (
    <div
      className="App"
      style={{
        display: "grid",
        justifyItems: "center",
        gap: 10,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "grid",
          justifyItems: "center",
          gap: 10,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Menu
          onRandom={handleRandom}
          onNewest={handleNewest}
          onOldest={handleOldest}
          onFavorite={handleFavorite}
        />
        {randomizedData.map(
          (image) =>
            image.src !== "" && (
              <img
                key={image.id}
                src={image.src}
                alt="image.id"
                style={{ width: "100%", maxWidth: 500 }}
              />
            )
        )}
        {isVisible && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <img src={icon} style={{ width: 40, height: 40 }}></img>
          </button>
        )}
      </div>

      <div className="ads">
        <span>laplo6969@gmail.com</span>
      </div>
    </div>
  );
}

export default Oldest;
