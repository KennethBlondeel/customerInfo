import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Hyperlink from "./components/Hyperlink";
import Kadobon from "./components/Kadobon";
import Faciliteiten from "./components/Faciliteiten";
import Logo from "./components/Logo";
import Nav from "./components/Nav";
import Personal from "./components/Personal";
import Search from "./components/Search";
import Welcome from "./components/Welcome";
import Tijdschema from "./components/Tijdschema";
import Contest from "./components/Contest";
import Finish from "./components/Finish";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import "react-notifications/lib/notifications.css";
import store from "./store";
import Contactperson from "./components/Contactperson";
import Address from "./components/Address";

function App() {
  const dispatch = useDispatch();
  // const Messages = useSelector((state) => state.messages);
  const current_establishment = useSelector(
    (state) => state.general.current_establishment
  );
  // const [data, setData] = useState([]);

  const [oldData, setOldData] = useState([]);

  const [data, setData] = useState(current_establishment);
  const [tab, isTab] = useState();
  // const [faciliteiten, setFaciliteiten] = useState([])
  const history = useHistory();

  const [loaded, isLoaded] = useState(false);
  let { est, ent } = useParams();

  const createNotification = (type, message) => {
    if (type === "info") {
      NotificationManager.info(message);
    } else if (type === "success") {
      NotificationManager.success(message);
    } else if (type === "warning") {
      NotificationManager.warning(message);
    } else if (type === "error") {
      NotificationManager.error(message);
    }
  };

  const setTab = (e) => {
    isTab(localStorage.getItem("tab"));
  };

  const fetchData = async () => {
    await axios
      .get(
        "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json"
      )
      .then((res) => {
        setOldData(res.data);
      })
      .then(() => {
        setData(current_establishment);

        isLoaded(true);
      });

    // axios
    //   .get(
    //     "https://management.100procentlokaal.be/core/api/facilities/?lang=nl"
    //   )
    //   .then((res) => {
    //     setFaciliteiten(res.data.facilities);
    //   });
  };

  // axios
  //   .get(
  //     "https://management.100procentlokaal.be/core/api/facilities/?lang=nl"
  //   )
  //   .then((res) => {
  //     setFaciliteiten(res.data.facilities);
  //   });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(`https://management.100procentlokaal.be/ci/get/${est}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.detail === "Invalid token.") {
            history.push(`/${ent}/${est}/login`);
            dispatch();
          } else {
            // set the data
          }

          // if(json.path) history.push(`/${json.path}/`)
          //   this.setState({ username: json.username });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // history.push(`/${ent}/${est}/login`)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [localStorage.getItem("tab")]);

  useEffect(() => {
    setTab();
  });

  return (
    <div className="App">
      {loaded && (
        <Fragment>
          <Nav />
          <div className="main">
            <h1>
              Beste {data.first_name[0].toUpperCase()}
              {data.first_name.slice(1)}
            </h1>
            <p>
              Klaar om samen te werken aan jouw{" "}
              <strong>'lokale online visibiliteit'</strong>?
            </p>
            <div className="main-card">
              <section className="card-container">
                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "0" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={0}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    01
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "1" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={1}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    02
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "2" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={2}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    03
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "3" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={3}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    04
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "4" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={4}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    05
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "5" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={5}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    06
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "6" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={6}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    07
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "7" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={7}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    08
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "8" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={8}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    09
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "9" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={9}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    10
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "10" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={10}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    11
                  </h3>
                </div>

                <div
                  className={[
                    "card",
                    localStorage.getItem("tab") === "11" ? "active" : "",
                  ].join(" ")}
                >
                  <h3
                    tabIndex={11}
                    onClick={(e) => {
                      store.dispatch({
                        type: "changeTab",
                        data: "im gone test",
                        event: e,
                      });
                      setTab();
                    }}
                    className="card-title"
                  >
                    12
                  </h3>
                </div>
              </section>
              {loaded && (
                <div>
                  {localStorage.getItem("tab") === "0" && (
                    <Welcome
                      fetchData={fetchData}
                      setTab={setTab}
                      data={data}
                      createNotification={createNotification}
                    />
                  )}
                  {localStorage.getItem("tab") === "1" && (
                    <Personal
                      fetchData={fetchData}
                      setTab={setTab}
                      data={data}
                    />
                  )}
                  {localStorage.getItem("tab") === "2" && (
                    <Search
                      setTab={setTab}
                      createNotification={createNotification}
                      data={oldData}
                      category={oldData.category}
                      mainCategory={oldData.main_category}
                    />
                  )}
                  {localStorage.getItem("tab") === "3" && (
                    <Address data={data} setTab={setTab} />
                  )}
                  {localStorage.getItem("tab") === "4" && (
                    <Logo data={data} setTab={setTab} />
                  )}
                  {localStorage.getItem("tab") === "5" && (
                    <Hyperlink setTab={setTab} data={data} />
                  )}
                  {localStorage.getItem("tab") === "6" && (
                    <Contactperson setTab={setTab} data={data} />
                  )}
                  {localStorage.getItem("tab") === "7" && (
                    <Kadobon setTab={setTab} data={data} />
                  )}
                  {localStorage.getItem("tab") === "8" && (
                    // <Payment setTab={setTab} data={data} />
                    <Faciliteiten
                      setTab={setTab}
                      data={data}
                      current_establishment={current_establishment}
                    />
                  )}
                  {localStorage.getItem("tab") === "9" && (
                    <Tijdschema
                      setTab={setTab}
                      createNotification={createNotification}
                      data={oldData}
                    />
                  )}
                  {localStorage.getItem("tab") === "10" && (
                    <Contest setTab={setTab} data={data} />
                  )}
                  {localStorage.getItem("tab") === "11" && (
                    <Finish setTab={setTab} data={oldData} />
                  )}
                </div>
              )}
            </div>
          </div>
          <NotificationContainer />
        </Fragment>
      )}
    </div>
  );
}

export default App;
