import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
// import Icon from "@identitybuilding/idb-react-iconlib";
import store from "../store";
// import { Button, input, OsnTextarea } from "@identitybuilding/idb-react-ui-elements";

const Contest = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(true);

  const questionRef = useRef();

  const patchData = (data) => {
    axios
      .put(
        "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json",
        {
          ...data,
        }
      )
      .then(async (res) => {
        // console.log(res);
        setLoaded(false);
        setLoaded(true);
      });
  };

  const Change = (event, type) => {
    let copy = data;
    if (type === "business_page" || "contact" || "participation")
      copy.contest[type] = !copy.contest[type];

    setData(copy);
    setLoaded(false);
  };

  const sendMail = (e) => {
    e.preventDefault();
    console.log(questionRef.current.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "1000px",
      height: "500px",
      maxHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  useEffect(() => {
    setData(props.data);
    setLoaded(true);
  });

  return (
    <section className="c-contest">
      <div className="intro">
        <h2>
          <span className="typo">11</span>
        </h2>
        <div>
          <h2>
            Nog
            {data.contest.participation && " drie "}
            {!data.contest.participation && " twee "}
            puntjes
            {data.contest.participation && " ..."}
            {!data.contest.participation && " .."}
          </h2>
          <p>
            Proficiat!...je hebt nu alle stappen doorlopen en wij danken je
            hiervoor nogmaals!
            <br /> We gaan ervan uit dat je interesse hebt in een Business
            Pagina want deze krijg je het eerste jaar gratis. (voorwaarde is wel
            dat je alles hebt aangevuld wat voor jouw onderneming van toepassing
            is).{" "}
            <b className="yellow">
              {" "}
              Na afloop van het eerste jaar is er ook geen enkele verplichting
              om dit te hernieuwen.
            </b>
          </p>
        </div>
      </div>
      {data && (
        <section className="section-container">
          <div className="c-contest__business">
            <p className="help">
              Ik heb intresse in mijn Business Pagina. (eerste jaar GRATIS - zie
              voorwaarden)
            </p>
            <p className="help">
              {/* <Icon name="Info" /> */}
              Toon mijn persoonlijke Business Pagina -{" "}
              <a className="yellow bold">MEER INFORMATIE</a>
            </p>
            <div
              onClick={(e) => Change(e, "business_page")}
              className={[
                "option",
                data.contest.business_page ? "active" : "",
              ].join(" ")}
            >
              <p className="typo">JA</p>
              <p className="typo">NEEN</p>
            </div>
            {!data.contest.business_page && (
              <div
                className={[
                  data.contest.business_page ? "active" : "",
                  "false-info",
                ].join(" ")}
              >
                {/* <Icon name="Info" /> */}
                <p>
                  Jouw logo met adres en telefoonnummers worden GRATIS
                  weergegeven
                </p>
              </div>
            )}
            {data.contest.business_page && (
              <div
                id={data.contest.business_page}
                className={[
                  data.contest.business_page ? "active" : "",
                  "false-info",
                ].join(" ")}
              >
                {/* <Icon name="Info" /> */}
                <p>Al jouw informatie wordt nu online getoond</p>
              </div>
            )}

            <div className="switch-container">
              {data.contest.business_page && (
                <button
                  text="TOON MIJN BUSINESS PAGE"
                  type="sub"
                  size="S"
                  brderColor="main"
                  onClick={openModal}
                />
              )}
              {!data.contest.business_page && (
                <button
                  text="TOON HOE IK WORD WEERGEGEVEN"
                  type="sub"
                  size="S"
                  brderColor="main"
                  onClick={(e) => {
                    window.open(
                      "https://mijn.ondernemersnetwerk.be/static/v1/pdf/inhoud-osn-businesspage.pdf",
                      "_blank"
                    );
                  }}
                />
              )}
            </div>
          </div>
          <div className="c-contest__contact">
            <input
              value="Ik heb een vraag! Kan een raadgever mij contacteren?"
              checked={data.contest.contact}
              name={data.contest.contact}
              onChange={(e) => {
                Change(e, "contact");
              }}
            />

            {data.contest.contact && (
              <Fragment>
                <form className="question">
                  <input
                    type="textarea"
                    ref={questionRef}
                    placeholder="Plaats jouw vraag hier..."
                    size="S"
                  />
                  <p className="help">
                    {/* <Icon name="Info" /> */}
                    Onze raadgever zal je zo spoedig mogelijk contacteren
                  </p>
                </form>
              </Fragment>
            )}
          </div>
          {data.contest.participation && (
            <div className="c-contest__contest">
              <b>
                Eerder besloot je om deel te nemen aan onze wedstrijd,
                fantastisch!
              </b>
              <p>
                Bevestig hieronder "DEELNAME WEDSTRIJD" om de datum en de tijd
                te registreren dat dit volledige formulier werd ingevuld.
                <br />
                Zoals vermeld in de introductie en het reglement wint elke
                100ste onderneming die haar gegevens volledig heeft ingevuld
                automatsch een jaarabonnement ter waarde van € 1600.
              </p>

              <button
                text="DEELName wedstrijd"
                type="sub"
                size="S"
                brderColor="main"
                onClick={(e) => {
                  patchData(data);
                  store.dispatch({ type: "countUp" });
                  props.setTab();
                }}
              />
              <p className="help">
                {/* <Icon name="Info" /> */}
                Door te klikken op deze knop bevestig je alle gegevens m.b.t.
                jouw onderneming te hebben ingevuld.
              </p>
            </div>
          )}
        </section>
      )}
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
        {!data.contest.participation && (
          <button
            text="volgende"
            type="sub"
            size="S"
            brderColor="main"
            onClick={(e) => {
              patchData(data);
              store.dispatch({ type: "countUp" });
              props.setTab();
            }}
          />
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <iframe
          height={450}
          width={1000}
          src="https://www.ondernemersnetwerk.be/business/BE0718600051/plenny/contact"
        ></iframe>
      </Modal>
    </section>
  );
};

export default Contest;
