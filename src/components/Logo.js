import { Fragment, useState } from "react";
// import Icon from "@identitybuilding/idb-react-iconlib";

import hankard from "../library/logos/hankard.png";
import angeloVercauteren from "../library/logos/angeloVercauteren.png";
import cleaning from "../library/logos/cleaning.png";
import luxas from "../library/logos/luxas.png";
import onor from "../library/logos/onor.png";
import newEnergy from "../library/logos/newEnergy.png";

import download from "../library/images/download.png";
import store from "../store";
// import {
//   Button,
//   OsnDndUpload,
//   OsnInputText,
//   OsnCheckbox,
// } from "@identitybuilding/idb-react-ui-elements";

const Logo = (props) => {
  const [hasLogo, setHasLogo] = useState(undefined);
  const [localFile, setLocalFile] = useState(false);
  const [externalFile, setExternalFile] = useState(false);
  const [contact, setContact] = useState(false);
  const [data, setData] = useState(props.data);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "1000px",
      "max-height": "70vh",
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
    },
  };

  return (
    <section className="c-logo">
      <div className="intro">
        <h2>
          <span className="typo">05</span>
        </h2>
        <div>
          <h2>Met jouw logo val je meer op!</h2>
          <p>
            Ongeveer 85% van de ondernemingen heeft een logo als identificatie.
            Hiermee trek je ook meer de aandacht.
          </p>
          <p>
            Met jouw LOGO kom je ook <b className="yellow">GEGARANDEERD</b>{" "}
            vooraan in de zoekresultaten!{" "}
          </p>
        </div>
      </div>
      <div className="c-logo__container">
        <div className="c-logo-option__container">
          <div className="c-logo-option first">
            <div className="section">
              <p>Heeft jouw onderneming of vestiging een logo?</p>
              <div
                onClick={() => {
                  setHasLogo(!hasLogo);
                }}
                className={["option", hasLogo ? "active" : ""].join(" ")}
              >
                <p className="typo">JA</p>
                <p className="typo">NEE</p>
              </div>
              {hasLogo && (
                <Fragment>
                  <div>
                    <h4>Laadt jouw logo zelf op:</h4>
                    {/* <OsnDndUpload type="image" show_example /> */}
                    <p className="help">
                      {/* <Icon name="Info" /> */}
                      <div>
                        Toegestane bestandsformaten: .ai-.svg-.cdr-.eps-.pdf
                        (geen .jpg of .png) <br />
                        <b className=" yellow">AANDACHT</b> jouw logo wordt
                        eerst nagekeken. Na validatie komt dit zichtbaar!
                      </div>
                    </p>
                    {data.logo && (
                      <div className="logo-container">
                        <img src={data.logo} />{" "}
                      </div>
                    )}
                    <p className="info">
                      <span className="typo">Logo opgeladen door:</span>
                      <strong>ONDERNEMER</strong>
                    </p>
                  </div>

                  <div className="button-container">
                    <button
                      text="bewaar mijn logo"
                      type="sub"
                      size="S"
                      brderColo="main"
                      onClick={(e) => {
                        setLocalFile(true);
                      }}
                    />
                  </div>
                </Fragment>
              )}
              {!hasLogo && (
                <Fragment>
                  <div>
                    <h2 className="typo title">. . . maar ik heb interesse!</h2>
                    <p>
                      Jij wil een uniek en toepasselijk logo laten maken.
                      <br />
                      Hiervoor kan kan je bij ons terecht! <br />{" "}
                      identityBuilding toont hieronder enkele van haar creaties.
                    </p>
                    <div className="logo-examples">
                      <div className="logo-container">
                        <img alt="logo Roland Hankard" src={hankard} />
                      </div>
                      <div className="logo-container">
                        <img
                          alt="logo angelo vercauteren"
                          src={angeloVercauteren}
                        />
                      </div>
                      <div className="logo-container">
                        <img alt="logo cleaning" src={cleaning} />
                      </div>
                      <div className="logo-container">
                        <img alt="logo luxas" src={luxas} />
                      </div>
                      <div className="logo-container">
                        <img alt="logo onor" src={onor} />
                      </div>
                      <div className="logo-container">
                        <img alt="logo new energy" src={newEnergy} />
                      </div>
                    </div>
                    <input
                      checked={contact}
                      type="checkbox"
                      name="dataAgree"
                      value="Contacteer mij om een voorstel te ontvangen."
                      onChange={(e) => setContact(!contact)}
                    />
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          <div className="c-logo-option">
            {hasLogo && (
              <Fragment>
                <div>
                  <h4>
                    Contacteer mijn drukker/grafisch bureau om mijn logo op te
                    vragen:
                  </h4>
                  <div>
                    <input
                      icon="UserM"
                      title="Bedrijfsnaam of verantwoordelijke"
                    />
                  </div>
                  <div>
                    <input icon="Mail" title="Email van je contactpersoon" />
                  </div>
                  <p className="help">
                    {/* <Icon name="Info" /> */}
                    Je krijgt automatisch een <b className="yellow"> kopie </b>
                    van deze mail
                  </p>
                  <div>
                    <input icon="Phone" title="Telefoon" />
                  </div>
                </div>
                <div className="button-container">
                  <button
                    text="dit zijn de gegevens"
                    type="sub"
                    size="S"
                    brderColo="main"
                    onClick={(e) => {
                      setExternalFile(true);
                    }}
                  />
                </div>
              </Fragment>
            )}

            {!hasLogo && (
              <Fragment>
                <div>
                  <h2 className="typo title">. . . en ik heb geen intresse!</h2>
                  <p>
                    Met een logo trek je altijd meer bezoekers aan!
                    <br /> Zonder logo tonen wij de volgende afbeelding:
                  </p>
                  <div className="c-logo__image-container">
                    <img alt="logo" className="c-logo__image" src={download} />
                  </div>
                  <div className="button-container">
                    <button
                      text="Ja, ik ben zeker!"
                      type="sub"
                      icon="Sad"
                      size="S"
                      brderColor="main"
                      onClick={(e) => {
                        e.preventDefault();
                        store.dispatch({ type: "countUp" });
                        props.setTab();
                      }}
                    />
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
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
          <button
            text="volgende"
            type="sub"
            size="S"
            brderColor="main"
            onClick={(e) => {
              e.preventDefault();
              store.dispatch({ type: "countUp" });
              props.setTab();
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Logo;
