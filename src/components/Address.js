import Icon from "@identitybuilding/idb-react-iconlib";
import { Button, OsnInputText } from "@identitybuilding/idb-react-ui-elements";
import axios from "axios";
import { useState } from "react";
import store from "../store";
import { updateCurrentEstablishment } from "../actions/GeneralAction";
import { useDispatch } from "react-redux";

const Address = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(true);
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
    //   .then((res) => {
    //     setLoaded(false);
    //     setLoaded(true);
    //   });
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
            <OsnInputText
              required
              title="Straatnaam"
              defaultValue={data.address.street}
              icon="Home"
              onBlur={(e) => changeAddress(e, "street")}
            />
          </span>
          <span className="XS">
            <OsnInputText
              required
              title="Huisnr"
              defaultValue={data.address.number}
              onBlur={(e) => changeAddress(e, "number")}
            />
          </span>
          <span className="XS">
            <OsnInputText
              required
              title="Bus"
              defaultValue={data.address.box}
              onBlur={(e) => changeAddress(e, "box")}
            />
          </span>
          <span className="XS">
            <OsnInputText
              required
              title="Postcode"
              defaultValue={data.address.postal_code}
              onBlur={(e) => changeAddress(e, "postal_code")}
            />
          </span>
          <span className="M">
            <OsnInputText
              required
              title="Deelgemeente"
              defaultValue={data.address.city}
              icon="Mapmarker"
              onBlur={(e) => changeAddress(e, "city")}
            />
          </span>
          <span className="S">
            <OsnInputText
              required
              title="Stad of Gemeente"
              defaultValue={data.address.municipality}
              icon="Mapmarker"
              onBlur={(e) => changeAddress(e, "municipality")}
            />
          </span>
          <span className="XL">
            <OsnInputText
              required
              title="Extra adres info"
              defaultValue={data.address.extra}
              icon="Edit"
              onBlur={(e) => changeAddress(e, "extra")}
            />
          </span>
          <span className="help">
            <Icon name="Info" />
            Voorbeeld: Ingang langs een zijstraat -{" "}
            <a
              href="https://ternat.100procentlokaal.be/zoeken/in/ternat/naar/delhaize/pagina=1"
              target="_blank"
              className="yellow bold"
            >
              Bekijk een live voorbeeld
            </a>
          </span>
          <span className="MM">
            <OsnInputText
              required
              title="Longitude"
              defaultValue={data.address.long}
              icon="Mapmarker"
              onBlur={(e) => changeAddress(e, "long")}
            />
          </span>
          <span className="MM">
            <OsnInputText
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
