import Icon from "@identitybuilding/idb-react-iconlib";
import { Button, OsnInputText } from "@identitybuilding/idb-react-ui-elements";
import store from "../store/index";

import plennyParty from "../library/images/plenny-party.png";
import { useEffect, useRef, useState } from "react";

const Finish = (props) => {
  const [sug, setSug] = useState([]);
  const inputRef = useRef();
  const [loaded, setLoaded] = useState(false);

  const addSug = (e, index) => {
    let copy = sug;

    if (inputRef.current.childNodes[0].childNodes[1].value.length !== 0) {
      copy.push(inputRef.current.childNodes[0].childNodes[1].value);
    }

    inputRef.current.childNodes[0].childNodes[1].value = "";

    setSug(copy);
    setLoaded(false);
  };

  const removeSug = (e, index) => {
    let copy = sug;

    copy.splice(index, 1);

    setSug(copy);
    setLoaded(false);
  };

  useEffect(() => {
    setLoaded(true);
  });

  return (
    <section className="c-finish">
      <div className="intro">
        <h2>
          <span className="typo">12</span>
        </h2>
        <div>
          <h2>
            Proficiat, je bent klaar en krijgt jouw Business Pagina 1 jaar{" "}
            <span className="typo sub">GRATIS</span>!{" "}
          </h2>
        </div>
      </div>
      <section>
        <div className="c-finish__thanks">
          <p>
            We willen je van <b> harte bedanken!</b>
          </p>
          <p>
            Wij waarderen je inzet en hierdoor wordt <b>jouw onderneming</b>
            lokaal zichtbaarder.
          </p>
          <p>
            Omdat het internet steeds evolueert engageren wij ons om hierin mee
            te groeien.
            <br />
            Wij zijn nog niet volledig klaar met het realiseren van onze eigen
            ideeën en staan ook open voor jouw eventuele inbreng. Daag jij ons
            uit?
          </p>
          <p>
            Klik op de volgende knop om jouw volledige publicatie te bekijken.
          </p>
          <Button
            text="TOON MIJN BUSINESS PAGE"
            type="sub"
            size="S"
            brderColor="main"
            onClick={(e) => {
              window.open(
                `https://ondernemersnetwerk.be/business/${props.data.number.replaceAll(
                  ".",
                  ""
                )}/${props.data.establishment}/contact/`,
                "_blank"
              );
            }}
          />
          <br />
          <p className="help">
            Je hebt net de allerlaatste stap bereikt en wij gaan ervan uit dat
            je dit initiatief graag deelt.
            <br />
            Toon je dit dan ook even op de sociale media van jouw keuze?
            <br />
            Je kan ook rechtstreeks collega ondernemers een uitnodiging sturen
            om hun gegevens te optimaliseren.
            <br />
            Ook zij zullen genieten van de voordelen die jij zopas hebt
            verkregen.
          </p>
          <div className="share__container">
            <button
              onClick={(e) => {
                if (props.data.business_facebook_nl !== null) {
                  window.open(props.data.business_facebook_nl, "_blank");
                } else {
                  window.open("https://www.facebook.com/", "_blank");
                }
              }}
              className="share facebook"
            >
              <Icon name="Facebook" />
            </button>
            <button
              onClick={(e) => {
                if (props.data.business_instagram_nl !== null) {
                  window.open(props.data.business_instagram_nl, "_blank");
                } else {
                  window.open("https://www.instagram.com", "_blank");
                }
              }}
              className="share instagram"
            >
              <Icon name="Instagram" />
            </button>
            <button
              onClick={(e) => {
                if (props.data.business_linkedin_nl !== null) {
                  window.open(props.data.business_linkedin_nl, "_blank");
                } else {
                  window.open("https://nl.linkedin.com/", "_blank");
                }
              }}
              className="share linkedin"
            >
              <Icon name="Linkedin" />
            </button>
            <button
              onClick={(e) => {
                if (props.data.business_twitter_nl !== null) {
                  window.open(props.data.business_twitter_nl, "_blank");
                } else {
                  window.open("https://twitter.com/home", "_blank");
                }
              }}
              className="share twitter"
            >
              <Icon name="Twitter" />
            </button>
            <button
              onClick={(e) => {
                if (props.data.business_youtube_nl !== null) {
                  window.open(props.data.business_youtube_nl, "_blank");
                } else {
                  window.open("https://www.youtube.com", "_blank");
                }
              }}
              className="share youtube"
            >
              <Icon name="Youtube" />
            </button>
          </div>
          {loaded && (
            <div className="extra">
              <div ref={inputRef} className="input-container">
                <OsnInputText
                  name={"extra"}
                  icon="Mail"
                  size="M"
                  placeholder="Voeg een email adres toe van een collega ondernemer (optioneel)"
                />
                <Icon onClick={(e) => addSug(e)} name="AddCircle" />
              </div>
              <div className="button-container">
                {sug.map((item, index) => (
                  <button className={["select-button", "active"].join(" ")}>
                    <Icon
                      name="CloseCircle"
                      onClick={(e) => removeSug(e, index)}
                    />
                    <p>{item}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="image-container">
          <img
            className="c-finish__plenny-cards"
            alt="plennt logo"
            src={plennyParty}
          />
        </div>
      </section>
      <div className="button-container">
        <Button
          text="vorige"
          type="sub"
          size="S"
          brderColor="main"
          onClick={(e) => {
            store.dispatch({ type: "countDown" });
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Finish;
