import React, { useContext } from "react";
import "./Nav.css";
import { LanguageContext } from "./LanguageContext";
import spanish from "../assets/espana.svg";
import french from "../assets/francia.svg";
import german from "../assets/alemania.svg";
import italian from "../assets/italia.svg";
import japanese from "../assets/japon.svg";
import portuguese from "../assets/brasil.svg";
import russian from "../assets/rusia.svg";
import chinese from "../assets/china.svg";
import english from "../assets/estados-unidos.svg";

function Nav() {
  const [language, setLanguage] = useContext(LanguageContext);

  return (
    <div className="nav">
      <img className="nav__icon" src={spanish} alt="spanish" onClick={() => setLanguage("Spanish")} />
      <img className="nav__icon" src={french} alt="french" onClick={() => setLanguage("French")} />
      <img className="nav__icon" src={german} alt="spanish" onClick={() => setLanguage("German")} />
      <img className="nav__icon" src={italian} alt="spanish" onClick={() => setLanguage("Italian")} />
      <img className="nav__icon" src={japanese} alt="spanish" onClick={() => setLanguage("Japanese")} />
      <img className="nav__icon" src={portuguese} alt="spanish" onClick={() => setLanguage("Portuguese (Brazil)")} />
      <img className="nav__icon" src={russian} alt="spanish" onClick={() => setLanguage("Russian")} />
      <img className="nav__icon" src={chinese} alt="spanish" onClick={() => setLanguage("Chinese Simplified")} />
      <img className="nav__icon" src={english} alt="spanish" onClick={() => setLanguage("")} />
    </div>
  );
}

export default Nav;
