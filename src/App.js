import "./App.css";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { HiPhotograph } from "react-icons/hi";
import Tooltip from "./components/Tooltip.js";

function App() {
  const handleLinkClick = (e) => {
    e.preventDefault();
    window.open(e.currentTarget.href, "_blank");
  };

  return (
    <div className="App">
      <div className="div1">
        <span className="backdrop"></span>
        <div className="img-div-wrapper">
          <div className="anim profile-img profile-animation">
            010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101
            {/* <img src="images/profile-blue.png" alt="" /> */}
          </div>
        </div>
        <div className="name">
          <p className="anim name-animation">RUPAK ACHARYA</p>
          <span className="anim handle-animation">@acharyarupak391</span>
          <br />
          <div className="socials-wrapper">
            <a
              onClick={handleLinkClick}
              className="anim fb socials-animation"
              href="https://www.facebook.com/acharyarupak391"
            >
              <FaFacebook />
            </a>
            <a
              onClick={handleLinkClick}
              className="anim tw socials-animation"
              href="https://twitter.com/acharyarupak391"
            >
              <FaTwitter />
            </a>
            <a
              onClick={handleLinkClick}
              className="anim ln socials-animation"
              href="https://www.linkedin.com/in/acharyarupak391/"
            >
              <FaLinkedin />
            </a>
            <Tooltip title="Copy Email" copyText="acharyarupak391@gmail.com">
              <a
                className="anim ev socials-animation"
                href="mailto:acharyarupak391@gmail.com"
              >
                <SiGmail />
              </a>
            </Tooltip>

            <a
              onClick={handleLinkClick}
              className="anim gh socials-animation"
              href="https://github.com/acharyarupak391"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <a
          href="https://unsplash.com/photos/oQuP_XBjOMY"
          onClick={handleLinkClick}
        >
          <p className="unsplash">
            <HiPhotograph /> by Kyle Sung
          </p>
        </a>
        <i className="fas fa-angle-double-down"></i>
      </div>
    </div>
  );
}

export default App;
