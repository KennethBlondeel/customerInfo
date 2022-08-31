import { Fragment, useEffect, useRef, useState } from "react";
import "./App.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import Icon from "@identitybuilding/idb-react-iconlib";
// import { OsnInputText } from "@identitybuilding/idb-react-ui-elements";
import { useSelector } from "react-redux";

const Main = ({}) => {
  let { ent } = useParams();
  let [establishments, setEstablishments] = useState([]);
  let [filteredEstablishments, setFilteredEstablishments] = useState([]);
  let [loaded, setLoaded] = useState(false);

  const lang = useSelector((state) => state.general.lang);

  useEffect(() => {
    setLoaded(false);
    setEstablishments([]);
    axios
      .get(
        `https://search-osn-management-hkfarflgp5aj2vbhfzvmyycuuy.eu-central-1.es.amazonaws.com/_search?q=from_enterprise.number:${ent}&size=500`,
        {
          auth: {
            username: `osn-admin`,
            password: `O15s19n14!`,
          },
        }
      )
      .then((res) => {
        let copy = [];
        if (res.data.hits.hits.length > 0) {
          res.data.hits.hits.map((item) => {
            let establishment = {};
            let data = item._source;
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
            establishment.id = data.number;
            copy.push(establishment);
          });
          setEstablishments(copy);
          setFilteredEstablishments(copy);
        }
      })
      .then(() => {
        setTimeout(() => {
          setLoaded(true);
        }, 500);
      });
  }, []);

  const FilterResults = (value) => {
    let filteredItems = establishments.filter(
      (establishment) =>
        (establishment.name &&
          establishment.name.toLocaleLowerCase().includes(value)) ||
        (establishment.id &&
          establishment.id.toLocaleLowerCase().includes(value)) ||
        (establishment.address.streetname &&
          establishment.address.streetname
            .toLocaleLowerCase()
            .includes(value)) ||
        (establishment.address.postal_code &&
          establishment.address.postal_code
            .toLocaleLowerCase()
            .includes(value)) ||
        (establishment.address.municipality &&
          establishment.address.municipality
            .toLocaleLowerCase()
            .includes(value)) ||
        (establishment.address.sub_municipality &&
          establishment.address.sub_municipality
            .toLocaleLowerCase()
            .includes(value))
    );
    setFilteredEstablishments(filteredItems);
  };

  return (
    <section className="main_environment">
      <Link to={`BE0718600051/BE2285183012/login`}>login</Link>
      <br />
      <Link to={`BE0718600051/BE2285183012/`}>brief</Link>
      <h2>Welcome {ent}</h2>
      <p>Zoek en selecteer jouw vestiging</p>
      <input onChange={(e) => FilterResults(e.target.value)} />
      <div className="cardWrapper">
        {loaded === true
          ? filteredEstablishments.map((data, index) => (
              <div className={`card`} key={index}>
                <figure>
                  <img src={data.logos[0][`png_${lang}`]} />
                </figure>
                <div className="cardContent">
                  <div className="res_name">
                    <h2>{data.name}</h2>
                    <h2>({data.id})</h2>
                  </div>

                  <div className="cardRow">
                    <div style={{ width: "100%" }}>
                      <span className="card_address">
                        {data.address.streetname +
                          " " +
                          data.address.house_number}
                        {data.address.box_number
                          ? ` ${data.address.box_number}`
                          : ""}
                      </span>
                      <span className="card_address">
                        {`
                                    ${data.address.postal_code}
                                    ${
                                      data.address.sub_municipality
                                        ? data.address.sub_municipality
                                        : data.address.municipality
                                    }
                                    ${
                                      data.address.municipality
                                        ? data.address.sub_municipality !==
                                          data.address.municipality
                                          ? `(${data.address.municipality})`
                                          : ""
                                        : ""
                                    }
                                    `}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="cardLinks">
                  <Link to={`/${ent}/${data.id}/login`}>
                    {/* <Icon name="ArrowRight" /> */}
                  </Link>
                </div>
              </div>
            ))
          : "Loading"}
      </div>
    </section>
  );
};

export default Main;
