import { useEffect, useState } from "react";
import axios from "axios";
import store from "../store";
import plenny from "../library/images/plenny-point.png";
// import { Button, OsnInputText } from "@identitybuilding/idb-react-ui-elements";

const Personal = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(false);

  const patchData = () => {
    axios
      .put(
        "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json",
        {
          ...data,
        }
      )
      .then(async (res) => {
        // console.log(res);
      });
  };

  const changePrive = (e, type) => {
    e.preventDefault();
    let copy = data;

    if (type === "prive_prename") {
      copy.prive_prename =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }
    if (type === "prive_name") {
      copy.prive_name =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }
    if (type === "prive_cellphone") {
      copy.prive_cellphone = e.target.value
        .replace("+32", "0")
        .replace("+32 (0)", "0")
        .replace("+32", "0")
        .replace("0032", "0")
        .replace("32", "0")
        .replace("/", "")
        .replace("/", "")
        .replace("(0)", "0")
        .replace(".", "")
        .replace("-", "")
        .replace(" ", "");
    }
    if (type === "prive_phone") {
      copy.prive_phone = e.target.value
        .replace("+32", "0")
        .replace("+32 (0)", "0")
        .replace("+32", "0")
        .replace("0032", "0")
        .replace("32", "0")
        .replace("/", "")
        .replace("/", "")
        .replace("(0)", "0")
        .replace(".", "")
        .replace("-", "")
        .replace(" ", "");
    }
    if (type === "prive_email") {
      copy.prive_email = e.target.value;
    }

    console.log(copy);
    setData(copy);
    setLoaded(false);
  };

  useEffect(() => {
    setData(props.data);
    setLoaded(true);
  });

  return (
    <section className="c-personal">
      <div className="intro">
        <h2>
          <span className="typo">02</span>
        </h2>
        <div>
          <h2>Laten we starten met je persoonlijke gegevens</h2>
          <p>
            Onderstaande gegevens worden <b className="yellow">NOOIT</b> online
            gepubliceerd maar ook niet gedeeld met uw lokaal bestuur. <br />{" "}
            Deze zijn uitsluitend voor intern gebruik om je te contacteren
            wanneer er toch iets niet correct is ingevuld.
          </p>
        </div>
      </div>

      <section className="form-container">
        <form onSubmit={(e) => changePrive(e)}>
          <div className="prive-inputs">
            <div>
              <input
                title="Voornaam"
                icon="UserM"
                required
                defaultValue={data.prive_prename}
                className="input"
                onBlur={(e) => changePrive(e, "prive_prename")}
              />
            </div>
            <div>
              <input
                title="Naam"
                icon="UserM"
                required
                defaultValue={data.prive_name}
                className="input"
                onBlur={(e) => changePrive(e, "prive_name")}
              />
            </div>

            <div>
              <input
                title="Mobiele telefoon"
                icon="Cellphone"
                required
                defaultValue={data.prive_cellphone}
                className="input"
                onBlur={(e) => changePrive(e, "prive_cellphone")}
              />
            </div>

            <div>
              <input
                title="Telefoon"
                icon="Phone"
                required
                defaultValue={data.prive_phone}
                className="input"
                type="tel"
                onBlur={(e) => changePrive(e, "prive_phone")}
              />
            </div>
          </div>
          <div>
            <input
              title="Email"
              icon="Mail"
              required
              defaultValue={data.prive_email}
              className="input wide"
              onBlur={(e) => changePrive(e, "prive_email")}
            />
          </div>
        </form>
        <img alt="plenny" src={plenny} />
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
      </div>
    </section>
  );
};

export default Personal;
