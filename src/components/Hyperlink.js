import store from "../store";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
// import Icon from "@identitybuilding/idb-react-iconlib";
// import { Button, OsnInputText } from "@identitybuilding/idb-react-ui-elements";
import plenny from "../library/images/plenny-point.png";

const Hyperlink = (props) => {
  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState(props.data);

  const websiteRef = useRef();
  const facebookRef = useRef();
  const instagramRef = useRef();
  const youtubeRef = useRef();
  const linkedinRef = useRef();
  const twitterRef = useRef();

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

  const changeHyperlink = (value, target) => {
    let copy = data;

    copy.socials[target] = value;

    // copy.socials.website = websiteRef.current.value;
    // copy.socials.facebook = facebookRef.current.value;
    // copy.socials.instagram = instagramRef.current.value;
    // copy.socials.youtube = youtubeRef.current.value;
    // copy.socials.linkedin = linkedinRef.current.value;
    // copy.socials.twitter = twitterRef.current.value;

    console.log(copy.socials);
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
          <p>
            Toon jouw bezoekers de verschillende kanalen waar je onderneming op
            het internet kan gevonden worden.
            <br />
            {/* <Icon name="Info" />  */}
            Bezoek als controle je persoonlijke pagina's per kanaal en kopieer
            de volledige link inclusief
            <b className="yellow"> http of https.</b>
          </p>
        </div>
      </div>

      {data && (
        <div className="section-container">
          <form>
            <label>
              <input
                className="website"
                icon="Website"
                defaultValue={props.data.socials.website}
                title="Website"
                onBlur={(e) => changeHyperlink(e.target.value, "website")}
              />
            </label>
            <label>
              <input
                className="facebook"
                icon="Facebook"
                defaultValue={props.data.socials.facebook}
                title="Facebook"
                onBlur={(e) => changeHyperlink(e.target.value, "facebook")}
              />
            </label>
            <label>
              <input
                className="instagram"
                icon="Instagram"
                defaultValue={props.data.socials.instagram}
                title="Instagram"
                onBlur={(e) => changeHyperlink(e.target.value, "instagram")}
              />
            </label>
            <label>
              <input
                className="youtube"
                icon="Youtube"
                defaultValue={props.data.socials.youtube}
                title="YouTube"
                onBlur={(e) => changeHyperlink(e.target.value, "youtube")}
              />
            </label>
            <label>
              <input
                className="linkedin"
                icon="Linkedin"
                defaultValue={props.data.socials.linkedin}
                title="Linkedin"
                onBlur={(e) => changeHyperlink(e.target.value, "linkedin")}
              />
            </label>
            <label>
              <input
                className="twitter"
                icon="Twitter"
                defaultValue={props.data.socials.twitter}
                title="Twitter"
                onBlur={(e) => changeHyperlink(e.target.value, "facebook")}
              />
            </label>
            <label>
              <input
                className="tiktok"
                icon="Tiktok"
                defaultValue={props.data.socials.tiktok}
                title="TikTok"
                onBlur={(e) => changeHyperlink(e.target.value, "tiktok")}
              />
            </label>
            <label>
              <input
                className="snapchat"
                icon="Snapchat"
                defaultValue={props.data.socials.snapchat}
                title="Snapchat"
                onBlur={(e) => changeHyperlink(e.target.value, "snapchat")}
              />
            </label>
            <label>
              <input
                className="spotify"
                icon="spotify"
                defaultValue={props.data.socials.spotify}
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
            changeHyperlink(e);
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Hyperlink;
