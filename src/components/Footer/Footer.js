import facebookIcon from "../../assets/icons/icon-facebook.png";
import instagramIcon from "../../assets/icons/icon-instagram.png";
import twitterIcon from "../../assets/icons/icon-twitter.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div>
          <a href="https://www.facebook.com/">
            <img
              className="icon__footer"
              src={facebookIcon}
              alt="Facebook icon"
            />
          </a>
          <a href="https://www.instagram.com/">
            <img
              className="icon__footer"
              src={instagramIcon}
              alt="Instagram icon"
            />
          </a>
          <a href="https://twitter.com/">
            <img
              className="icon__footer"
              src={twitterIcon}
              alt="Twitter icon"
            />
          </a>
        </div>
        <a className="footer__anchor" href="mailto:admin@skybanquethalls.com">
          <p className="footer__text">Contact: admin@skybanquethalls.com</p>
        </a>
      </div>
    </>
  );
};

export default Footer;
