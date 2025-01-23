import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import icon from "./icon.png";
import Menu from "./Components/Menu";
import data from "./data.json";

function App() {
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

    setImages(imageArray);
    const shuffled = [...imageArray].sort(() => Math.random() - 0.5);
    setRandomizedData(shuffled);

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
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setRandomizedData(shuffled);
    scrollToTop();
  };

  const handleNewest = () => {
    const sortedImages = [...images].sort((a, b) => b.id - a.id);
    setRandomizedData(sortedImages);
    scrollToTop();
    // navigate("/newest");
  };

  const handleOldest = () => {
    const sortedImages = [...images].sort((a, b) => a.id - b.id);
    setRandomizedData(sortedImages);
    scrollToTop();
    // navigate("/oldest");
  };

  const handleFavorite = () => {
    // const sortedByFavorite = [...data].sort((a, b) => b.likes - a.likes);
    // setData(sortedByFavorite);
  };

  const renderImages = () => {
    return randomizedData.flatMap((image, index) => {
      const elements = [];

      if (image.src !== "") {
        elements.push(
          <img
            key={image.id}
            src={image.src}
            alt={`image-${image.id}`}
            style={{ width: "100%", maxWidth: 500 }}
          />
        );
      }

      // Thêm đoạn script sau mỗi 2 tấm hình
      if ((index + 1) % 2 === 0) {
        elements.push(
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9675988342604441"
            crossOrigin="anonymous"
            key={`ad-${index}`}
          ></script>
        );
      }

      return elements;
    });
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
          onNewest={handleRandom}
          onOldest={handleOldest}
          onFavorite={handleFavorite}
        />
        {renderImages()}
        {isVisible && (
          <button className="scroll-to-top" onClick={scrollToTop}>
            <img src={icon} style={{ width: 40, height: 40 }}></img>
          </button>
        )}
      </div>

      {/* <div className="ads">
        <span>laplo6969@gmail.com</span>
      </div> */}
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
