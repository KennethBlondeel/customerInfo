import store from "../store";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Icon from "@identitybuilding/idb-react-iconlib";
import { Button, OsnInputText } from "@identitybuilding/idb-react-ui-elements";
import plenny from "../library/images/plenny-point.png";
import { updateCurrentEstablishment } from "../actions/GeneralAction";
import { useDispatch } from "react-redux";

const Hyperlink = (props) => {
  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState(props.data);
  const dispatch = useDispatch();

  const websiteRef = useRef();
  const facebookRef = useRef();
  const instagramRef = useRef();
  const youtubeRef = useRef();
  const linkedinRef = useRef();
  const twitterRef = useRef();

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

  const changeHyperlink = (value, target) => {
    let copy = data;

    copy[`business_${target}_nl`] = value;

    setData(copy);
    setLoaded(false);
  };

  useEffect(() => {
    setData(props.data);
    setLoaded(true);
  });

  return (
    <section className="c-hyperlink">
      <div className="intro">
        <h2>
          <span className="typo">06</span>
        </h2>
        <div>
          <h2>Voeg jouw internet koppelingen toe.</h2>
          <span>
            Toon jouw bezoekers de verschillende kanalen waar je onderneming op
            het internet kan gevonden worden.
            <br />
            <Icon name="Info" /> Bezoek als controle je persoonlijke pagina's
            per kanaal en kopieer de volledige link inclusief
            <b className="yellow"> http of https.</b>
          </span>
        </div>
      </div>

      {data && (
        <div className="section-container">
          <form>
            <label>
              <OsnInputText
                className="website"
                icon="Website"
                defaultValue={props.data.business_website_nl}
                title="Website"
                onBlur={(e) => changeHyperlink(e.target.value, "website")}
              />
            </label>
            <label>
              <OsnInputText
                className="facebook"
                icon="Facebook"
                defaultValue={props.data.business_facebook_nl}
                title="Facebook"
                onBlur={(e) => changeHyperlink(e.target.value, "facebook")}
              />
            </label>
            <label>
              <OsnInputText
                className="instagram"
                icon="Instagram"
                defaultValue={props.data.business_instagram_nl}
                title="Instagram"
                onBlur={(e) => changeHyperlink(e.target.value, "instagram")}
              />
            </label>
            <label>
              <OsnInputText
                className="youtube"
                icon="Youtube"
                defaultValue={props.data.business_youtube_nl}
                title="YouTube"
                onBlur={(e) => changeHyperlink(e.target.value, "youtube")}
              />
            </label>
            <label>
              <OsnInputText
                className="linkedin"
                icon="Linkedin"
                defaultValue={props.data.business_linkedin_nl}
                title="Linkedin"
                onBlur={(e) => changeHyperlink(e.target.value, "linkedin")}
              />
            </label>
            <label>
              <OsnInputText
                className="twitter"
                icon="Twitter"
                defaultValue={props.data.business_twitter_nl}
                title="Twitter"
                onBlur={(e) => changeHyperlink(e.target.value, "twitter")}
              />
            </label>
            <label>
              <OsnInputText
                className="tiktok"
                icon="TikTok"
                defaultValue={props.data.business_tiktok_nl}
                title="TikTok"
                onBlur={(e) => changeHyperlink(e.target.value, "tiktok")}
              />
            </label>
            <label>
              <OsnInputText
                className="snapchat"
                icon="Snapchat"
                defaultValue={props.data.business_snapchat_nl}
                title="Snapchat"
                onBlur={(e) => changeHyperlink(e.target.value, "snapchat")}
              />
            </label>
            <label>
              <OsnInputText
                className="spotify"
                icon="Spotify"
                defaultValue={props.data.business_spotify_nl}
                title="Spotify"
                onBlur={(e) => changeHyperlink(e.target.value, "spotify")}
              />
            </label>
          </form>
          <div className="plenny-container">
            <img src={plenny} />
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
            e.preventDefault();
            patchData(data);
            store.dispatch({ type: "countUp" });
            changeHyperlink(e);
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Hyperlink;
