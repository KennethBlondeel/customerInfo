import { useEffect, useState } from "react";
import axios from "axios";
import store from "../store";
import plenny from "../library/images/plenny-point.png";
import { Button, OsnInputText } from "@identitybuilding/idb-react-ui-elements";
import { updateCurrentEstablishment } from "../actions/GeneralAction";
import { useDispatch } from "react-redux";

const Personal = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const patchData = () => {
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
    //   });
  };

  const changePrive = (e, type) => {
    e.preventDefault();
    let copy = data;

    if (type === "first_name") {
      copy.first_name =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }
    if (type === "last_name") {
      copy.last_name =
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    }
    if (type === "personal_mobile_phone") {
      copy.personal_mobile_phone = e.target.value
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
    if (type === "personal_fixed_phone") {
      copy.personal_fixed_phone = e.target.value
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
    if (type === "personal_email") {
      copy.personal_email = e.target.value;
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
              <OsnInputText
                title="Voornaam"
                icon="UserM"
                required
                defaultValue={data.first_name}
                className="input"
                onBlur={(e) => changePrive(e, "first_name")}
              />
            </div>
            <div>
              <OsnInputText
                title="Naam"
                icon="UserM"
                required
                defaultValue={data.last_name}
                className="input"
                onBlur={(e) => changePrive(e, "last_name")}
              />
            </div>

            <div>
              <OsnInputText
                title="Mobiele telefoon"
                icon="Cellphone"
                required
                defaultValue={data.personal_mobile_phone}
                className="input"
                onBlur={(e) => changePrive(e, "personal_mobile_phone")}
              />
            </div>

            <div>
              <OsnInputText
                title="Telefoon"
                icon="Phone"
                required
                defaultValue={data.personal_fixed_phone}
                className="input"
                type="tel"
                onBlur={(e) => changePrive(e, "personal_fixed_phone")}
              />
            </div>
          </div>
          <div>
            <OsnInputText
              title="Email"
              icon="Mail"
              required
              defaultValue={data.personal_email}
              className="input wide"
              onBlur={(e) => changePrive(e, "personal_email")}
            />
          </div>
        </form>
        <img alt="plenny" src={plenny} />
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
      </div>
    </section>
  );
};

export default Personal;
