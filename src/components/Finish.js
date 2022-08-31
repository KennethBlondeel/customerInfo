// import Icon from "@identitybuilding/idb-react-iconlib";
// import { Button } from "@identitybuilding/idb-react-ui-elements";
import store from "../store/index";

import plennyParty from "../library/images/plenny-party.png";

const Finish = (props) => {
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
            ideeën en staan ook open voor jouw eventuele inbreng.Daag jij ons
            uit?
          </p>
          <p>
            Klik op de volgende knop om jouw volledige publicatie te bekijken.
          </p>
          <button
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
                if (props.data.socials.facebook.length !== 0) {
                  window.open(props.data.socials.facebook, "_blank");
                } else {
                  window.open("https://www.facebook.com/", "_blank");
                }
              }}
              className="share facebook"
            >
              {/* <Icon name="Facebook" /> */}
            </button>
            <button
              onClick={(e) => {
                if (props.data.socials.instagram.length !== 0) {
                  window.open(props.data.socials.instagram, "_blank");
                } else {
                  window.open("https://www.instagram.com", "_blank");
                }
              }}
              className="share instagram"
            >
              {/* <Icon name="Instagram" /> */}
            </button>
            <button
              onClick={(e) => {
                if (props.data.socials.linkedin.length !== 0) {
                  window.open(props.data.socials.linkedin, "_blank");
                } else {
                  window.open("https://nl.linkedin.com/", "_blank");
                }
              }}
              className="share linkedin"
            >
              {/* <Icon name="Linkedin" /> */}
            </button>
            <button
              onClick={(e) => {
                if (props.data.socials.twitter.length !== 0) {
                  window.open(props.data.socials.twitter, "_blank");
                } else {
                  window.open("https://twitter.com/home", "_blank");
                }
              }}
              className="share twitter"
            >
              {/* <Icon name="Twitter" /> */}
            </button>
            <button
              onClick={(e) => {
                if (props.data.socials.youtube.length !== 0) {
                  window.open(props.data.socials.youtube, "_blank");
                } else {
                  window.open("https://www.youtube.com", "_blank");
                }
              }}
              className="share youtube"
            >
              {/* <Icon name="Youtube" /> */}
            </button>
          </div>
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
        <button
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
