import { Fragment, useEffect, useRef, useState } from "react";
import Icon from "@identitybuilding/idb-react-iconlib";
import axios from "axios";
import store from "../store";
import {
  Button,
  OsnCheckbox,
  OsnInputText,
} from "@identitybuilding/idb-react-ui-elements";
import { useDispatch } from "react-redux";
import { updateCurrentEstablishment } from "../actions/GeneralAction";

const titles = document.getElementsByClassName("faciTitle");

const Faciliteiten = (props) => {
  const [faciTab, setFaciTab] = useState(localStorage.getItem("faciTab"));
  const [sug, setSug] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [facilities, setFacilities] = useState(
    props.current_establishment.facilities
  );
  const [searchValue, setSearchValue] = useState("");
  const [allData, setAllData] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const patchData = (data) => {
    axios
      .put(
        "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json",
        {
          ...data,
        }
      )
      .then(async (res) => {
        setLoaded(false);
        setLoaded(true);
      });
  };

  const fetchData = () => {
    let copy = {};
    axios
      .get(
        "https://management.100procentlokaal.be/core/api/facilities/?lang=nl"
      )
      .then((res) => {
        let allCopy = allData;
        allCopy.length = 0;
        for (let i = 0; i < res.data.facilities.length; i++) {
          if (!copy[`${res.data.facilities[i].group}`]) {
            copy[`${res.data.facilities[i].group}`] = [];
          }
          if (facilities.includes(res.data.facilities[i].id)) {
            copy[`${res.data.facilities[i].group}`].push({
              ...res.data.facilities[i],
              active: true,
            });
          } else {
            copy[`${res.data.facilities[i].group}`].push({
              ...res.data.facilities[i],
              active: false,
            });
          }
          allCopy.push(res.data.facilities[i]);
        }

        setAllData(allCopy);
        setData(copy);
        setLoaded(true);
      });
  };

  const addSug = (e, index) => {
    let copy = sug;

    if (inputRef.current.childNodes[0].childNodes[1].value.length !== 0) {
      copy.push(inputRef.current.childNodes[0].childNodes[1].value);
    }

    inputRef.current.childNodes[0].childNodes[1].value = "";

    setSug(copy);
    setLoaded(false);
  };

  const removeSug = (e, index) => {
    let copy = sug;

    copy.splice(index, 1);

    setSug(copy);
    setLoaded(false);
  };

  const search = (value) => {
    searchRes.length = 0;
    let copy = searchRes;
    allData.some((item, index) => {
      if (String(item.name).toLocaleLowerCase().includes(String(value))) {
        copy.push(allData[index]);
      }
    });
    setSearchRes(copy);
    setLoaded(true);
  };

  const ChangeFaciliteiten = (value, i, type) => {
    let copy = props.current_establishment;
    let dataCopy = data;
    let allDataCopy = allData;

    if (type === "search") {
      for (let x = 0; x < dataCopy[value.group].length; x++) {
        if (dataCopy[value.group][x].id === value.id) {
          dataCopy[value.group][x].active = !dataCopy[value.group][x].active;
        }
      }
    } else {
      dataCopy[value.group][i].active = !dataCopy[value.group][i].active;

      if (copy.facilities.includes(value.id)) {
        copy.facilities.splice(copy.facilities.indexOf(value.id), 1);
      } else {
        copy.facilities.push(value.id);
      }
    }

    for (let y = 0; y < allDataCopy.length; y++) {
      if (allDataCopy[y].id === value.id) {
        allDataCopy[y].active = !allDataCopy[y].active;
      }
    }

    setAllData(allDataCopy);
    setData(dataCopy);
    setFacilities(copy.facilities);
    setLoaded(false);
    dispatch(updateCurrentEstablishment(copy));
  };

  const changeTab = (e) => {
    for (let i = 0; i < titles.length; i++) {
      if (i === e.target.tabIndex || !localStorage.getItem("faciTab")) {
        titles[i].parentElement.classList.add("active");
        localStorage.setItem("faciTab", i);
        setFaciTab(i);
      } else {
        titles[i].parentElement.classList.remove("active");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(data);
    setLoaded(true);
  });

  const itemsToDisplay = searchValue ? searchRes : data;

  return (
    <section className="c-faciliteiten">
      <div className="intro">
        <h2>
          <span className="typo">09</span>
        </h2>
        <div>
          <h2>
            Welke faciliteiten, diensten, associaties... biedt je als extra aan?
          </h2>
          <p>
            Het zijn niet alleen betaalfaciliteiten waar men in dit digitale
            tijdperk naar uitkijkt.
            <br /> Heel wat andere diensten die jij aanbiedt kunnen belangrijk
            zijn om te communiceren met potentiële klanten. <br />
            Geef hen zoveel mogelijk informatie?
          </p>
        </div>
      </div>
      {data && (
        <section className="faci-container">
          <div className="search-bar">
            <OsnInputText
              onChange={(e) => {
                setSearchValue(e.target.value);
                search(e.target.value);
              }}
              placeholder="zoeken"
            />
          </div>
          {searchValue ? (
            <div className="card-container">
              {itemsToDisplay &&
                itemsToDisplay.map((item, index) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      ChangeFaciliteiten(item, index, "search");
                    }}
                    key={index}
                    className="item"
                  >
                    <figure>
                      <img src={item.icon} alt={item.name} />
                    </figure>
                    <OsnCheckbox
                      checked={item.active}
                      name={item.name}
                      onChange={(e) => {
                        ChangeFaciliteiten(item, index, "search");
                      }}
                    />
                  </div>
                ))}
            </div>
          ) : (
            Object.entries(itemsToDisplay).map(([key, value], index) => (
              <div
                key={key}
                className={["card", index === 0 ? "active" : ""].join(" ")}
              >
                <h3
                  tabIndex={index}
                  onClick={(e) => changeTab(e)}
                  className="card-title faciTitle"
                >
                  {+faciTab === index && <Icon name="ArrowDown" />}
                  {+faciTab !== index && <Icon name="ArrowUp" />}
                  {key}
                </h3>
                <div className="card-container">
                  {value.map((itm, i) => (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        ChangeFaciliteiten(itm, i);
                      }}
                      key={i}
                      className="item"
                    >
                      <figure>
                        <img src={itm.icon} alt={itm.name} />
                      </figure>
                      <OsnCheckbox checked={itm.active} name={itm.name} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {data && (
            <div className="extra">
              <h3>Andere mogelijkheden?</h3>
              <div ref={inputRef} className="input-container">
                <OsnInputText
                  name={"extra"}
                  icon="Edit"
                  size="M"
                  placeholder="Voeg de naam in van jouw extra faciliteit"
                />
                <Icon onClick={(e) => addSug(e)} name="AddCircle" />
              </div>
              <div className="help">
                <Icon name="Info" /> Alles wordt eerst gecontroleerd vooraleer
                het online wordt geplaatst.
              </div>
              <div className="button-container">
                {sug.map((item, index) => (
                  <button className={["select-button", "active"].join(" ")}>
                    <Icon
                      name="CloseCircle"
                      onClick={(e) => removeSug(e, index)}
                    />
                    <p>{item}</p>
                  </button>
                ))}
              </div>
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
        <Button
          text="volgende"
          type="sub"
          size="S"
          brderColor="main"
          onClick={(e) => {
            store.dispatch({ type: "countUp" });
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Faciliteiten;
