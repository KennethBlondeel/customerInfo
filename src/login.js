import { Fragment, useEffect, useRef, useState } from "react";
import "./App.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  updateCurrentEstablishment,
  updateCorrectOTP,
} from "./actions/GeneralAction";
import plennypoint from "./library/images/plenny-point-2.png";

import Icon from "@identitybuilding/idb-react-iconlib";

const Login = () => {
  const btwRef = useRef("BE0718.600.051");
  let { est, ent } = useParams();
  const OTPref = useRef();
  const history = useHistory();
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [hasAcount, setHasAcount] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const lang = useSelector((state) => state.general.lang);

  const dispatch = useDispatch();

  const getData = async () => {
    axios
      .get(
        `https://search-osn-management-hkfarflgp5aj2vbhfzvmyycuuy.eu-central-1.es.amazonaws.com/_search?q=number:${est}&size=500`,
        {
          auth: {
            username: `osn-admin`,
            password: `O15s19n14!`,
          },
        }
      )
      .then((res) => {
        let establishment = {};

        let data = res.data.hits.hits[0]._source;
        establishment.address = {};
        establishment.address.streetname =
          data.address[`streetname${lang}`] ||
          data.address[`streetname_nl`] ||
          data.address[`streetname_fr`] ||
          data.address[`streetname_de`] ||
          data.address[`streetname_en`];
        establishment.address.municipality =
          data.address[`municipality${lang}`] ||
          data.address[`municipality_nl`] ||
          data.address[`municipality_fr`] ||
          data.address[`municipality_de`] ||
          data.address[`municipality_en`];
        establishment.address.municipality =
          establishment.address.municipality.replace(" (Stad)", "");
        establishment.address.house_number = data.address.house_number;
        establishment.address.box_number = data.address.box_number;
        establishment.address.postal_code = data.address.postal_code;
        establishment.address.sub_municipality =
          data.address[`sub_municipality${lang}`] ||
          data.address[`sub_municipality_nl`] ||
          data.address[`sub_municipality_fr`] ||
          data.address[`sub_municipality_de`] ||
          data.address[`sub_municipality_en`];
        establishment.name =
          data[`name${lang}`] ||
          data[`name_nl`] ||
          data[`name_fr`] ||
          data[`name_de`] ||
          data[`name_en`];
        establishment.logos = data.logolinks;
        establishment.enterprise_id = data.from_enterprise.number;
        establishment.id = data.number;
        establishment.juridical_form =
          data.from_enterprise[`juridical_form_${lang}`] ||
          data.from_enterprise.juridical_form_nl ||
          data.from_enterprise.juridical_form_fr ||
          data.from_enterprise.juridical_form_de ||
          data.from_enterprise.juridical_form_en;
        establishment.contact = {};
        for (let i = 0; i < data.contactmethodlinks.length; i++) {
          if (data.contactmethodlinks[i].medium === "Fixed") {
            establishment.contact.phone =
              data.contactmethodlinks[i].value_nl ||
              data.contactmethodlinks[i].value_fr ||
              data.contactmethodlinks[i].value_de ||
              data.contactmethodlinks[i].value_en;
          }
          if (data.contactmethodlinks[i].medium === "Fax") {
            establishment.contact.phone =
              data.contactmethodlinks[i].value_nl ||
              data.contactmethodlinks[i].value_fr ||
              data.contactmethodlinks[i].value_de ||
              data.contactmethodlinks[i].value_en;
          }
        }

        for (let x = 0; x < data.establishmentactivitylinks.length; x++) {
          if (data.establishmentactivitylinks[x].score === 70) {
            establishment.mainActivity = data.establishmentactivitylinks[x];
          }
        }

        if (!establishment.mainActivity) {
          console.log(data);
          for (
            let y = 0;
            y < data.from_enterprise.enterpriseactivitylinks.length;
            y++
          ) {
            if (
              data.from_enterprise.enterpriseactivitylinks[y].score === 70 ||
              data.from_enterprise.enterpriseactivitylinks[y].score === 50
            ) {
              establishment.mainActivity =
                data.from_enterprise.enterpriseactivitylinks[y];
            }
          }
        }

        axios
          .get(
            `https://management.100procentlokaal.be/geo/api/municipality/${establishment.address.municipality}/?lang=nl`
          )
          .then((resp) => {
            establishment.address.has_collaboration =
              resp.data.municipality.has_collaboration;
            setData(establishment);
            dispatch(updateCurrentEstablishment(establishment));
          });
      })

      .then(() => {
        setLoaded(true);
      });
  };

  useEffect(() => {
    // fetchData();
    getData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("ok");
      fetch("https://management.100procentlokaal.be/ci/current_user/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.path) history.push(`/${json.path}/`);
          //   this.setState({ username: json.username });
        });
    }
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (forgotPassword) {
      if (email) {
        axios
          .post(
            `https://management.100procentlokaal.be/ci/send_password_reset/`,
            {
              email: email,
            }
          )
          .then((res) => console.log(res));
      } else {
        setError("Gelieve een E-mailadres mee te geven!");
      }
    } else if (hasAcount) {
      // axios.get(`https://management.100procentlokaal.be/ci/login/`,
      axios
        .post(
          `https://management.100procentlokaal.be/ci/login/`,
          // axios.post(`https://management.100procentlokaal.be/auth/api/token/`,
          {
            email: email,
            password: password,
          }
        )
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          history.push(`/${ent}/${est}/`);
          // if(res.data.status === "Succes") { history.push(`/${ent}/${est}/`) }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(
          `https://management.100procentlokaal.be/ci/validate/BE2285183012/`,
          {
            OTP: OTPref.current.value,
          }
        )
        .then((res) => {
          if (res.data.valid) {
            dispatch(updateCorrectOTP(true));
            history.push(`/${ent}/${est}/signin`);
          }
        });
    }
    // if (OTPref.current.value === "test") {
    //
    // }
  };

  return (
    <section className="p-login">
      {data && loaded && (
        <Fragment>
          <h1 className="p-login__title">Beste Erik</h1>
          <div className="p-login__bar">
            <p>
              {/* Jouw bedrijf, {data.name} ({data.enterprise_id}) ({data.id}), heeft
              geoptimaliseerde informatie nodig! */}
              Onderstaande info van jouw onderneming, {data.name} (
              {data.enterprise_id}), kan misschien geoptimaliseerde informatie
              nodig hebben?
            </p>
          </div>
          <section>
            <div className="p-login__intro-body">
              <div>
                <div className="text">
                  <h1>Samen werken we aan een "STERK" verhaal </h1>
                  <p>
                    {/* Het gemeentebestuur van {data.address.municipality} nam een beslissing om de{" "}
                  <span className="highligth">lokale economie</span> extra te{" "}
                  <span className="highligth">ondersteunen</span>. */}
                    identityBuilding ontwikkelt www.100procentlokaal.be om de{" "}
                    <span className="highligth">lokale economie</span> te{" "}
                    <span className="highligth">ondersteunen</span> en extra
                    zuurstof te geven. Samen met jullie bouwen wij
                    <span className="highligth">
                      {" "}
                      “HET&nbsp;STERKSTE&nbsp;NETWERK”
                    </span>
                  </p>
                  <p>
                    {/* In deze periode, waarbij de COVID-19 crisis wellicht ook op uw
                  onderneming een negatieve invloed heeft gehad, zal deze
                  beslissing welkom zijn. identityBuilding BV heeft het genoegen
                  om zich aan u te mogen voorstellen in het kader van de
                  samenwerking met het lokale bestuur van {data.address.municipality}. */}
                    Dit is het grootste en belangrijkste Belgische initiatief
                    waarbij alle ondernemers en haar klanten als doelgroep
                    centraal staan. Verdeeld over{" "}
                    <span className="highligth">581 steden en gemeenten</span>{" "}
                    kan de gebruiker uit{" "}
                    <span className="highligth" style={{ color: "var(--sub)" }}>
                      1.511.753{" "}
                    </span>
                    actieve vestigingen zoeken naar elke activiteit.
                  </p>
                  <p>
                    {/* Deze zoekbalk zal een plaats krijgen op de home-pagina van{" "}
                  <a target="_blank" href={`https://${data.address.municipality.toLowerCase()}.100procentlokaal.be`} className="highligth">www.{data.address.municipality.toLowerCase()}.be</a> en zal de
                  gebruiker de mogelijkheid bieden om kennis te maken met alle
                  ondernemingen van “groot {data.address.municipality}”. */}
                    Een aantal steden en gemeenten ondersteunen dit initiatief
                    en hebben intussen{" "}
                    <span className="highligth">hun samenwerking </span> reeds
                    <span className="highligth"> bevestigd</span>.
                    {data.address.has_collaboration
                      ? ` Het lokaal bestuur van ${data.address.municipality} bevestigde ook de samenwerking.`
                      : ` Het lokaal bestuur van ${data.address.municipality} bevestigde de samenwerking nog niet, help jij mee om hen te overtuigen?`}
                  </p>
                  <p>
                    {/* Het netwerk dat hiervoor wordt ontwikkeld is{" "}
                  <span className="highligth">rechtstreeks toegankelijk</span>{" "}
                  via: */}
                    Ontdek de <span className="highligth"> meerwaarde</span>{" "}
                    voor jouw onderneming op:
                  </p>
                  <p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://${data.address.municipality.toLowerCase()}.100procentlokaal.be`}
                    >
                      <span>{data.address.municipality.toLowerCase()}</span>
                      .100procentlokaal.be
                    </a>
                    <span className="highligth"> of</span> <br />
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://${data.address.municipality.toLowerCase()}.ondernemersnetwerk`}
                    >
                      <span>{data.address.municipality.toLowerCase()}</span>
                      .ondernemersnetwerk
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="image-container">
              <div className="flex-container">
                <div className="percent-card">
                  <div className="image-container">
                    <img
                      alt="logo"
                      src={
                        data.logos[0].png_nl ||
                        data.logos[0].png_fr ||
                        data.logos[0].png_de ||
                        data.logos[0].png_en
                      }
                    />
                  </div>
                  <p className="name">
                    {data.name} {data.juridical_form}
                  </p>
                  <div className="data-container">
                    <div className="adres">
                      <Icon name="Mapmarker" />
                      <p>
                        {data.address.streetname} {data.address.house_number}{" "}
                        <br />
                        {data.address.postal_code}{" "}
                        {data.address.sub_municipality} (
                        {data.address.municipality})
                      </p>
                    </div>
                    <span>
                      <Icon name="Phone" />
                      <p>{data.contact.phone}</p>
                    </span>
                    <span>
                      <Icon name="Fax" />
                      <p>{data.contact.phone}</p>
                    </span>
                  </div>
                  <div className="contact-button">
                    <span>
                      <Icon name="Website" />
                      Bezoek website
                    </span>
                    <span>
                      Ontdek meer <Icon name="ArrowRight" />
                    </span>
                  </div>
                </div>
                <div>
                  <img
                    alt="plenny next to card"
                    className="plenny"
                    src={plennypoint}
                  />
                  <div className="info-card">
                    <div className="adres-line">
                      <span>
                        <Icon name="ArrowRight" />
                        Adres (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href="https://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&la=N&cn=2019032309&table_name=wet&&caller=list&N&fromtab=wet&tri=dd+AS+RANK&rech=1&numero=1&sql=(text+contains+(%27%27))#Art.2:19"
                          className="yellow bold"
                        >
                          is wettelijk verplicht
                        </a>
                        )
                      </span>
                    </div>
                    <span>
                      <Icon name="ArrowRight" />
                      Telefoon of mobiel (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://news.economie.fgov.be/203683-deze-info-moet-u-zeker-vermelden-op-uw-bedrijfswebsite"
                        className="yellow bold"
                      >
                        1 nr. is wettelijk verplicht
                      </a>
                      )
                    </span>
                    <span>
                      <Icon name="ArrowRight" />
                      Fax (niet verplicht)
                    </span>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <p className="email">
                  E-mail adres (
                  <a
                    href="https://www.ejustice.just.fgov.be/cgi_loi/loi_a1.pl?language=nl&la=N&cn=2019032309&table_name=wet&&caller=list&N&fromtab=wet&tri=dd+AS+RANK&rech=1&numero=1&sql=(text+contains+(%27%27))#Art.2:19"
                    target="_blank"
                    className="yellow"
                  >
                    is wettelijk verplicht
                  </a>
                  )
                  <Icon name="ArrowRight" />
                  <span>******@*************** .be</span>
                </p>
                <span className="help">
                  <Icon name="Info" />
                  Ondanks deze verplichting zijn wij erin geslaagd om met FOD
                  Economie tot een vergelijk te komen en{" "}
                  <b className="yellow">tonen</b> wij, om SPAM te voorkomen,{" "}
                  <b className="yellow">NOOIT een e-mail adres</b>! Er werd een
                  contactformulier ontwikkeld dat 100% tegemoet komt aan de
                  wettelijke normvereisten.
                </span>
                <p>
                  Je hoofdactiviteit (<span className="yellow">in KBO</span>):
                </p>
                <button className={["select-button", "active"].join(" ")}>
                  <p>{data.mainActivity.category__name_nl}</p>
                </button>
              </div>
            </div>

            <div className="form">
              <form>
                <div>
                  <p>
                    Meld je aan en vul eventuele extra nuttige info aan zodat
                    jouw doelgroep je nog beter kan vinden! Je verdient hiermee
                    € 100!
                  </p>
                  {!hasAcount ? (
                    <p>
                      Registreer hier met jouw persoonlijk OTP (One Time
                      Password)
                    </p>
                  ) : (
                    <p>
                      Hier kan je aanmelden met jouw persoonlijk aangemaakt
                      account.
                    </p>
                  )}
                </div>
                <div style={{ width: "100%", marginTop: "50px" }}>
                  {hasAcount ? (
                    <div className="inputs">
                      <div className="input__container"></div>
                      {error && <span className="error">{error}</span>}
                      <div className="input__container">
                        <label>
                          <b>E-mailadres</b>
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={"input"}
                            type="text"
                          />
                        </label>
                      </div>
                      {!forgotPassword ? (
                        <div className="input__container">
                          <label>
                            <b>Wachtwoord</b>
                            <input
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className={["input", "underline"].join(" ")}
                              type="password"
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="input__container">
                          <p style={{ fontSize: "12px" }}>
                            We sturen jou een e-mail om jouw wachtwoord te
                            resetten, kijk zeker ook eens in{" "}
                            <span style={{ color: "var(--sub)" }}>
                              jouw spambox!
                            </span>
                          </p>
                        </div>
                      )}
                      {!forgotPassword ? (
                        <p
                          onClick={() => setForgotPassword(!forgotPassword)}
                          className="forgotPass hasAccount"
                        >
                          Wachtwoord vergeten
                        </p>
                      ) : (
                        <p
                          onClick={() => setForgotPassword(!forgotPassword)}
                          className="forgotPass hasAccount"
                        >
                          Log in
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="inputs">
                      <div className="input__container">
                        <label>
                          <b>{"Jouw ondernemingsnummer"}</b>
                          <input
                            defaultValue={ent}
                            required
                            className="input nummer"
                            type="text"
                            disabled
                          />
                        </label>
                      </div>
                      <div className="input__container">
                        <label>
                          <b>
                            {est
                              ? "Jouw vestigingsnummer"
                              : "Ondernemingsnummer"}
                          </b>
                          <input
                            ref={btwRef}
                            defaultValue={est}
                            required
                            className={[
                              "input",
                              btwRef.current && btwRef.current.value
                                ? btwRef.current.value.length === 0
                                  ? "underline"
                                  : ""
                                : "",
                            ].join(" ")}
                            type="text"
                            disabled
                          />
                        </label>
                      </div>
                      <div className="input__container">
                        <label>
                          <b>One Time Password (OTP)</b>
                          <input
                            ref={OTPref}
                            required
                            className={["input", "underline"].join(" ")}
                            type="password"
                          />
                        </label>
                      </div>
                      <p className="forgotPass hasAccount">Ik heb geen OTP</p>
                    </div>
                  )}

                  <input
                    onClick={(e) => login(e)}
                    className="submit"
                    type="submit"
                    value={
                      hasAcount
                        ? forgotPassword
                          ? "PASSWORD RESET"
                          : "LOG IN"
                        : "OK, IK BEN KLAAR"
                    }
                  />
                </div>
                <p
                  className="hasAccount"
                  onClick={() => {
                    setForgotPassword(false);
                    setHasAcount(!hasAcount);
                  }}
                >
                  {hasAcount
                    ? "Ik heb nog geen account"
                    : "Ik heb je al een account!"}
                </p>
              </form>
            </div>
          </section>
        </Fragment>
      )}
    </section>
  );
};

export default Login;
