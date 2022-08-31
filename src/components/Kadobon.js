import { useRef, useState } from "react";
import axios from "axios";
import store from "../store";
import plenny from "../library/images/plenny-point.png";
import { Button, OsnCheckbox } from "@identitybuilding/idb-react-ui-elements";
import { updateCurrentEstablishment } from "../actions/GeneralAction";
import { useDispatch } from "react-redux";

const Kadobon = (props) => {
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
    //   .then(async (res) => {
    //     // console.log(res);
    //   });
  };

  const changeKadobon = () => {
    let copy = data;
    copy.allow_local_voucher = !copy.allow_local_voucher;
    setData(copy);
    setLoaded(!loaded);
  };

  return (
    <section className="c-kadobon">
      <div className="intro">
        <h2>
          <span className="typo">08</span>
        </h2>
        <div>
          <h2>
            {data.bon.municipality} biedt de "{data.bon.name}" aan:
          </h2>
          <p>{data.bon.intro_text}</p>
        </div>
      </div>
      {data && (
        <div className="section-container">
          <div className="info">
            <p className="typo yellow">{data.bon.info_title}</p>
            <p>{data.bon.info_text}</p>
            <br />
            <p>Meer informatie kan bekeken worden op onderstaande link:</p>
            <div className="c-kadobon__info">
              <Button
                text={data.bon.name}
                type="sub"
                size="S"
                brderColor="main"
                onClick={(e) => {
                  window.open(data.bon.link, "_blank");
                }}
              />
              <br />
            </div>

            <div>
              <OsnCheckbox
                checked={data.allow_local_voucher}
                name="accept"
                onChange={(e) => {
                  changeKadobon();
                }}
                value="Ik sta toe dat mijn klanten hiermee kunnen betalen."
              />
            </div>
          </div>
          <div className="plenny-container">
            <img alt="plenny" src={plenny} />
          </div>
        </div>
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

export default Kadobon;
