import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Icon from "@identitybuilding/idb-react-iconlib";
import store from "../store";
import {
  Button,
  OsnCheckbox,
  OsnTextarea,
} from "@identitybuilding/idb-react-ui-elements";
import { updateCurrentEstablishment } from "../actions/GeneralAction";
import { useDispatch } from "react-redux";

const Contest = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(true);
  const dispatch = useDispatch();

  const questionRef = useRef();

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
    //     // console.log(res);
    //     setLoaded(false);
    //     setLoaded(true);
    //   });
  };

  const Change = (event, type) => {
    let copy = data;
    if (
      type === "interest_in_businesspage" ||
      type === "contact_me" ||
      type === "enter_competition"
    ) {
      copy[type] = !copy[type];

      if (copy.contact_me === false) {
        copy.contact_me_question = "";
      }
    } else if (type === "contact_me_question") {
      copy[type] = event.target.value;
    }

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
            {data.enter_competition && " drie "}
            {!data.enter_competition && " twee "}
            puntjes
            {data.enter_competition && " ..."}
            {!data.enter_competition && " .."}
          </h2>
          <p>
            Proficiat!...je hebt nu alle stappen doorlopen en wij danken je hier
            nogmaals voor!
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
            <span className="help">
              <Icon name="Info" />
              Toon mijn persoonlijke Business Pagina -{" "}
              <a className="yellow bold">MEER INFORMATIE</a>
            </span>
            <div
              onClick={(e) => Change(e, "interest_in_businesspage")}
              className={[
                "option",
                data.interest_in_businesspage ? "active" : "",
              ].join(" ")}
            >
              <p className="typo">JA</p>
              <p className="typo">NEEN</p>
            </div>
            {!data.interest_in_businesspage && (
              <div
                className={[
                  data.interest_in_businesspage ? "active" : "",
                  "false-info",
                ].join(" ")}
              >
                <Icon name="Info" />
                <p>
                  Jouw logo met adres en telefoonnummers worden GRATIS
                  weergegeven
                </p>
              </div>
            )}
            {data.interest_in_businesspage && (
              <div
                className={[
                  data.interest_in_businesspage ? "active" : "",
                  "false-info",
                ].join(" ")}
              >
                <Icon name="Info" />
                <p>Al jouw informatie wordt nu online getoond</p>
              </div>
            )}

            <div className="switch-container">
              {data.interest_in_businesspage && (
                <Button
                  text="TOON MIJN BUSINESS PAGE"
                  type="sub"
                  size="S"
                  brderColor="main"
                  onClick={(e) => {
                    console.log(props.data);
                    window.open(
                      `https://ondernemersnetwerk.be/business/BE0718600051/identityBuilding/contact/`,
                      "_blank"
                    );
                  }}
                />
              )}
              {!data.interest_in_businesspage && (
                <Button
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
            <OsnCheckbox
              value="Ik heb een vraag! Kan een raadgever mij contacteren?"
              checked={data.contact_me}
              name="contact_check"
              onChange={(e) => {
                Change(e, "contact_me");
              }}
            />

            {data.contact_me && (
              <Fragment>
                <form className="question">
                  <OsnTextarea
                    defaultValue={data.contact_me_question}
                    placeholder="Plaats jouw vraag hier..."
                    size="S"
                    onChange={(e) => {
                      Change(e, "contact_me_question");
                    }}
                  />
                  <span className="help">
                    <Icon name="Info" />
                    Onze raadgever zal je zo spoedig mogelijk contacteren
                  </span>
                </form>
              </Fragment>
            )}
          </div>
          {data.enter_competition && (
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

              <Button
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
              <span className="help">
                <Icon name="Info" /> Door te klikken op deze knop bevestig je
                alle gegevens m.b.t. jouw onderneming te hebben ingevuld.
              </span>
            </div>
          )}
        </section>
      )}
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
        {!data.enter_competition && (
          <Button
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
