// import Icon from "@identitybuilding/idb-react-iconlib";
// import { Button, input , OsnInputText} from "@identitybuilding/idb-react-ui-elements";
import axios from "axios";
import { useState } from "react";
import store from "../store";

const Address = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(true);

  const patchData = (data) => {
    axios
      .put(
        "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json",
        {
          ...data,
        }
      )
      .then((res) => {
        setLoaded(false);
        setLoaded(true);
      });
  };

  const changeAddress = (e, target) => {
    let copy = data;

    copy.address[target] = e.target.value;

    setData(copy);
    setLoaded(false);
  };

  return (
    <section className="c-address">
      <div className="intro">
        <h2>
          <span className="typo">04</span>
        </h2>
        <div>
          <h2>Waar kunnen bezoekers jou bereiken?</h2>
          <p>
            Het is belangrijk dat bezoekers jou op de juiste locatie kunnen
            vinden! <br /> Via de kaart is het mogelijk om de positie van de
            marker (pointer) te corrigeren. De coördinaten zullen automatisch
            worden gecorrigeerd.
          </p>
        </div>
      </div>
      <div className="section-container">
        <form className="section">
          <span className="L">
            <input
              required
              title="Straatnaam"
              defaultValue={data.address.street}
              icon="Home"
              onBlur={(e) => changeAddress(e, "street")}
            />
          </span>
          <span className="XS">
            <input
              required
              title="Huisnr"
              defaultValue={data.address.number}
              onBlur={(e) => changeAddress(e, "number")}
            />
          </span>
          <span className="XS">
            <input
              required
              title="Bus"
              defaultValue={data.address.box}
              onBlur={(e) => changeAddress(e, "box")}
            />
          </span>
          <span className="XS">
            <input
              required
              title="Postcode"
              defaultValue={data.address.postal_code}
              onBlur={(e) => changeAddress(e, "postal_code")}
            />
          </span>
          <span className="M">
            <input
              required
              title="Deelgemeente"
              defaultValue={data.address.city}
              icon="Mapmarker"
              onBlur={(e) => changeAddress(e, "city")}
            />
          </span>
          <span className="S">
            <input
              required
              title="Stad of Gemeente"
              defaultValue={data.address.municipality}
              icon="Mapmarker"
              onBlur={(e) => changeAddress(e, "municipality")}
            />
          </span>
          <span className="XL">
            <input
              required
              title="Extra adres info"
              defaultValue={data.address.extra}
              icon="Edit"
              onBlur={(e) => changeAddress(e, "extra")}
            />
          </span>
          <p className="help">
            {/* <Icon name="Info" /> */}
            Voorbeeld: Ingang langs een zijstraat -{" "}
            <a className="yellow bold">Bekijk een live voorbeeld</a>
          </p>
          <span className="MM">
            <input
              required
              title="Longitude"
              defaultValue={data.address.long}
              icon="Mapmarker"
              onBlur={(e) => changeAddress(e, "long")}
            />
          </span>
          <span className="MM">
            <input
              required
              title="Latitude"
              defaultValue={data.address.lat}
              icon="Mapmarker"
              onBlur={(e) => changeAddress(e, "lat")}
            />
          </span>
        </form>
        <div className="section map">
          <div className="new-map" />
          <div id="map"></div>
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
            patchData(data);
            store.dispatch({ type: "countUp" });
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Address;
