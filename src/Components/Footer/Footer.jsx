import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="logo">
          <p className="logo__text">
            VR<span className="logo__text--blue">OO</span>MY
          </p>
        </div>
        <div className="footer__container">
          <ul className="footer__ul">
            <li className="footer__li">
              <a href="/about">About</a>
            </li>
            <li className="footer__li">
              <a href="/about">FAQ</a>
            </li>
            <li className="footer__li">
              <a href="/about">Team</a>
            </li>
          </ul>
        </div>
        <div className="location">
          <p>Ethiopia, Addis Ababa</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
