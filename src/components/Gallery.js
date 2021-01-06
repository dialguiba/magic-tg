import React, { useState, useEffect, useContext } from "react";

import "./Gallery.css";
import mtg from "mtgsdk";
import { LanguageContext } from "./LanguageContext";
import loading from "../assets/loading.svg";

function Cards() {
  const [cardsOrig, setCardsOrig] = useState([]);
  const [cards, setCards] = useState([]);
  const [searcher, setSearcher] = useState("");
  const [searcherComplete, setSearcherComplete] = useState("");
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [language] = useContext(LanguageContext);

  useEffect(() => {
    /* axios.get("https://api.magicthegathering.io/v1/cards?pageSize=6").then((res) => {
      console.log(res.data.cards);
      setCards(res.data.cards);
      setLoaded(true);
    }); */
    /*  mtg.card.where({ supertypes: "legendary", subtypes: "goblin" }).then((cards) => {
      console.log(cards); // "Squee, Goblin Nabob"
    }); */
    setLoaded(false);
    if (searcherComplete === "") {
      mtg.card.where({ pageSize: 8, page: page }).then((cartas) => {
        setCardsOrig(cartas);
        setCards(cartas);
        setLoaded(true);
      });
    } else {
      console.log("Searcher defined");

      setCardsOrig([]);
      setCards([]);
      mtg.card.all({ name: searcherComplete }).on("data", (result) => {
        setCardsOrig((prevState) => [...prevState, result]);
        setCards((prevState) => [...prevState, result]);
        setLoaded(true);
      });
    }
  }, [page, searcherComplete]);

  useEffect(() => {
    if (language !== "") {
      let array = cardsOrig.map((carta) => carta.foreignNames);

      let array2 = array.map((y) => y.filter((x) => x.language === language));

      let array3 = array2.map((y) => y[0]);

      cardsOrig.map((carta, index) => {
        if (carta.foreignNames.length === 0 || array3[index] === undefined) {
          return (array3[index] = carta);
        } else {
          return (array3[index].id = carta.id);
        }
      }); /* SET THE ID CARD */

      setCards(array3);
    } else {
      setCards(cardsOrig);
    }
  }, [language, cardsOrig]);

  function nextPage() {
    setPage((prevState) => prevState + 1);
  }

  function previousPage() {
    setPage((prevState) => (prevState !== 0 ? prevState - 1 : prevState));
  }

  function handleSearch() {
    setSearcherComplete(searcher);
  }

  return (
    <div className="gallery">
      <div style={{ display: "block" }}>
        <input value={searcher} onChange={(e) => setSearcher(e.target.value)} className="gallery__input" type="text" name="" id="" />
        {/* <button className="gallery__button-search" onClick={handleSearch}> */}
        <i className="gallery__button-search__icon" class="fas fa-search" onClick={handleSearch}></i>
        {/* </button> */}
      </div>

      {loaded ? (
        <>
          <div className="gallery__cards-group">
            {cards.map((card) => (
              <div key={card.id} className="gallery__cards-group__card">
                <h3>{card.name}</h3>
                <img
                  style={{ width: "60%" }}
                  src={card.imageUrl ? card.imageUrl : "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=140485&type=card"}
                  alt=""
                />
              </div>
            ))}
          </div>
          <button className="gallery__page-button" onClick={previousPage}>
            Previous Page
          </button>
          <button className="gallery__page-button" onClick={nextPage}>
            Next Page
          </button>
        </>
      ) : (
        <div className="gallery__loading">
          <img src={loading} alt="loading" />
        </div>
      )}
    </div>
  );
}

export default Cards;
