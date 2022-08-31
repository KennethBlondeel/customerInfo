import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCurrentEstablishment } from "../actions/GeneralAction";

import {
  Button,
  OsnCheckbox,
  OsnSelect,
} from "@identitybuilding/idb-react-ui-elements";

import store from "../store/index";
import Icon from "@identitybuilding/idb-react-iconlib";

const Welcome = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(props.data);

  const dispatch = useDispatch();

  const patchData = (data) => {
    dispatch(updateCurrentEstablishment(data));
    // axios
    //   .put(
    //     "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json",
    //     {
    //       ...data,
    //     }
    //   )
    //   .then(async (res) => {
    //     setLoaded(false);
    //     setLoaded(true);
    //   });
  };

  const changeData = (value, type) => {
    let copy = data;

    copy[type] = value;

    setData(copy);
    setLoaded(false);
  };

  const changeWelcome = () => {
    let copy = data;

    patchData(data);

    if (data.accept_GDPR && data.accept_terms && data.active) {
      store.dispatch({ type: "countUp", data: "im gone test" });
    }

    props.setTab();
    setData(copy);
    setLoaded(false);
  };

  const changeSelect = (e) => {
    const copy = data;

    copy.support_city_meaning = e.id;

    setData(copy);
    setLoaded(false);
  };

  const changeContest = () => {
    let copy = data;

    if (copy.active) {
      copy.enter_competiton = !copy.enter_competiton;
    } else {
      props.createNotification(
        "warning",
        "deze actie is niet mogelijk aangezien uw onderneming op inactief staat."
      );
    }
    setData(copy);

    setLoaded(false);
  };

  useEffect(() => {
    setData(props.data);
    setLoaded(true);
  });

  return (
    <section className="c-welcome">
      <div className="intro">
        <h2>
          <span className="typo">01</span>
        </h2>
        <div>
          <h2> Welkom bij 100% Lokaal</h2>
          <p>
            Dank je!...om mee te werken aan het beheren en optimaliseren van de
            gegevens van jouw onderneming. Wij helpen je zoveel mogelijk! <br />{" "}
            Deze bijkomende informatie zal nuttig zijn voor elke bezoeker die
            jouw onderneming heeft gevonden.
          </p>
        </div>
      </div>

      {data && (
        <div className="container">
          <div className=" option-container container-item">
            <h1 className="yellow">MIJN ONDERNEMING IS ACTIEF?</h1>
            <div className="card-data">
              <div
                onClick={() => {
                  let copy = data;
                  copy.active = !copy.active;
                  if (!copy.active) {
                    copy.enter_competiton = false;
                  }
                  setData(copy);
                  setLoaded(false);
                  // patchData(data);
                }}
                className={["option", data.active ? "active" : ""].join(" ")}
              >
                <p className="typo">JA</p>
                <p className="typo">NEE</p>
              </div>
              {!data.active && (
                <div
                  className={[data.active ? "active" : "", "false-info"].join(
                    " "
                  )}
                >
                  <Icon name="Info" />
                  <p className="typo">Uw onderneming wordt gedeactiveerd :)</p>
                </div>
              )}
              {data.active && (
                <div
                  className={[data.active ? "active" : "", "false-info"].join(
                    " "
                  )}
                >
                  <Icon name="Info" />
                  <p className="typo">Nu kunnen we verder!</p>
                </div>
              )}
            </div>
            {data.active && (
              <form className="conditions">
                <label>
                  <OsnCheckbox
                    onChange={(e) => changeData(e, "accept_GDPR")}
                    name="accept_GDPR"
                    checked={data.accept_GDPR}
                    type="checkbox"
                    value="Ik aanvaard de verwerking van mijn gegevens volgens de GDPR."
                  />
                </label>
                <p className="detail">
                  Laatst aanvaard op: {data.last_accepted_GDPR}
                </p>
                <OsnCheckbox
                  checked={data.accept_terms}
                  name="accept_terms"
                  onChange={(e) => {
                    changeData(e, "accept_terms");
                  }}
                  // value={` Ik aanvaard de algemene voorwaarden.
                  // `}
                  value={[
                    <span key={"text before title"}>Ik aanvaard de&nbsp;</span>,
                    <a
                      key={"link"}
                      href="https://www.ondernemersnetwerk.be/privacy/policy#terms"
                      target="_blank"
                      rel="noreferrer"
                    >
                      algemene voorwaarden
                    </a>,
                  ]}
                />
                <p className="detail">
                  Laatst aanvaard op: {data.last_accepted_terms}
                </p>
                <OsnCheckbox
                  checked={data.accept_share_with_municipality}
                  type="checkbox"
                  name="accept_share_with_municipality"
                  value="Ik aanvaard dat mijn gegevens - in combinatie met
                100procentlokaal - gedeeld worden met mijn stad of gemeente."
                  onChange={(e) => {
                    changeData(e, "accept_share_with_municipality");
                  }}
                />
                <label className="select">
                  Vind je de ondersteuning van dit initiatief door jouw stad of
                  gemeente een goed idee?
                  <OsnSelect
                    onChange={(e) => changeSelect(e)}
                    active={
                      data.support_city_meaning === 0
                        ? "Gelieve een optie te kiezen!"
                        : data.support_city_meaning === 1
                        ? "Ja! Ik waardeer de ondersteuning van dit initiatief door mijn stad of gemeente."
                        : "Ik heb geen mening over dit project"
                    }
                    options={[
                      {
                        id: 0,
                        name: "Gelieve een optie te kiezen!",
                      },
                      {
                        id: 1,
                        name: "Ja! Ik waardeer de ondersteuning van dit initiatief door mijn stad of gemeente.",
                      },
                      {
                        id: 2,
                        name: "Ik heb geen mening over dit project",
                      },
                    ]}
                  />
                </label>
              </form>
            )}
          </div>
          <div className="option-container container-item">
            <h1>
              WEDSTRIJD!<span className="typo">Jij doet toch ook mee?</span>
            </h1>
            <div
              onClick={() => {
                changeContest();
              }}
              className={["option", data.enter_competiton ? "active" : ""].join(
                " "
              )}
            >
              <p className="typo">JA</p>
              <p className="typo">NEE</p>
            </div>
            {!data.enter_competiton && (
              <div
                className={[
                  data.enter_competiton ? "active" : "",
                  "false-info",
                ].join(" ")}
              >
                <Icon name="Info" />
                <p className="typo">Je weet niet wat je mist :)</p>
              </div>
            )}
            {data.enter_competiton && (
              <div
                id={data.enter_competiton}
                className={[
                  data.enter_competiton ? "active" : "",
                  "false-info",
                ].join(" ")}
              >
                <Icon name="Info" />
                <p className="typo">Fantastisch!</p>
              </div>
            )}

            <p>
              Voor de <b className="yellow">Business Pagina in 100%Lokaal</b>{" "}
              betaalt de ondernemer € 100/jaar. Dit is het éénmalig voordeel dat
              je verkrijgt wanneer je alle gegevens voor jouw onderneming
              aanvult!
            </p>
            <p>
              Bovendien doet iedere ondernemer die deelneemt ook automatisch mee
              met de grote wedstrijd. Elke 100ste ondernemer wint een
              jaarabonnement voor een compleet dienstenpakket ter waarde van €
              1600.
            </p>
            <p>
              <strong>OPGELET!</strong> Het aanleveren van het Logo (.ai, .eps,
              .svg, .pdf-vector) maakt deel uit van het wedstrijdreglement voor
              deelname.
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://mijn.ondernemersnetwerk.be/static/v1/pdf/contest-rules-nl.pdf"
              className="help"
            >
              Lees of haal hier het wedstrijdreglement op.
            </a>
          </div>
        </div>
      )}
      <div
        className={[
          "button-container",
          !data.accept_GDPR || !data.accept_terms || !data.active
            ? "disabled"
            : "",
        ].join(" ")}
      >
        <Button
          text="volgende"
          type="sub"
          size="S"
          brderColor="main"
          onClick={(e) => changeWelcome()}
        />
      </div>
    </section>
  );
};

export default Welcome;
