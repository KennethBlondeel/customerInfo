import { useState, Fragment, useEffect } from "react";
import axios from "axios";
import store from "../store";
// import Icon from "@identitybuilding/idb-react-iconlib";
// import {
//   Button,
//   input,
// } from "@identitybuilding/idb-react-ui-elements";

const Tijdschema = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(true);
  let [title, setTitle] = useState("");

  const fetchData = () => {
    axios
      .get(
        "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json"
      )
      .then((res) => {
        setData(res.data);
        setLoaded(false);
        setLoaded(true);
      });
  };

  const patchData = (data) => {
    axios
      .put(
        "https://ondernemersnetwerk-4a152-default-rtdb.europe-west1.firebasedatabase.app/.json",
        {
          ...data,
        }
      )
      .then((res) => {
        console.log(res);
        setLoaded(false);
        setLoaded(true);
        fetchData();
      });
  };

  const changeClosed = (event, type, day) => {
    let copy = data;
    copy.timetables[type].table[day][0].closed =
      !copy.timetables[type].table[day][0].closed;

    copy.timetables[type].table[day][0].from = "";
    copy.timetables[type].table[day][0].until = "";

    copy.timetables[type].table[day].length = 1;

    if (
      copy.timetables[type].global &&
      !copy.timetables[type].table[day][0].afwijkend
    ) {
      copy.timetables[type].table[day][0].afwijkend = true;
    }
    // copy.timetables[type].table[day].afwijkend = "";

    setData(copy);
    setLoaded(false);
  };

  const changeAfwijkend = (event, type, day, value) => {
    let copy = [...data.timetables];

    if (copy[type].table[day][0].closed && day !== "global") {
      copy[type].table[day][0].closed = false;
    }

    if (copy[type].table[day][0].afwijkend && day !== "global") {
      copy[type].table[day][0].afwijkend = false;
      copy[type].table[day] = copy[type].table.global;
    } else {
      copy[type].table[day][0].afwijkend = true;
    }
    copy[type].table.global[0].afwijkend = false;

    let fullObjectcopy = data;
    console.log(copy[type].table[day][0].afwijkend);
    fullObjectcopy.timetables = copy;

    setData(fullObjectcopy);
    setLoaded(false);
  };

  const timetableHandler = (value, day, target, i, rowIndex) => {
    let copy = data;

    console.log(
      Number(copy.timetables[i].table[day][rowIndex].until.replace(":", ""))
    );
    console.log(Number(value.replace(":", "")));
    if (target === "from") {
      if (
        Number(value.replace(":", "")) >
          Number(
            copy.timetables[i].table[day][rowIndex].until.replace(":", "")
          ) &&
        Number(
          copy.timetables[i].table[day][rowIndex].until.replace(":", "")
        ) !== 0
      ) {
        props.createNotification(
          "warn",
          "Gelieven een uur te nemen dat lager is dan de sluitingstijd "
        );
        return;
      }
    } else if (target === "until") {
      if (
        Number(value.replace(":", "")) <
        Number(copy.timetables[i].table[day][rowIndex].from.replace(":", ""))
      ) {
        if (
          Number(value.replace(":", "")) < Number("0200") &&
          Number(value.replace(":", "")) > Number("0001")
        ) {
          value = "23:59";
        } else if (
          Number(
            copy.timetables[i].table[day][rowIndex].from.replace(":", "")
          ) !== 0
        ) {
          props.createNotification(
            "warn",
            "Gelieven een uur te nemen dat hoger is dan de sluitingstijd "
          );
          return;
        }
      }
    }

    if (day === "global") {
      copy.timetables[i].table.global[rowIndex][target] = value;

      if (!copy.timetables[i].table.monday[0].afwijkend) {
        copy.timetables[i].table.monday[rowIndex][target] = value;
      }
      if (!copy.timetables[i].table.tuesday[0].afwijkend) {
        copy.timetables[i].table.tuesday[rowIndex][target] = value;
      }
      if (!copy.timetables[i].table.wednesday[0].afwijkend) {
        copy.timetables[i].table.wednesday[rowIndex][target] = value;
      }
      if (!copy.timetables[i].table.thursday[0].afwijkend) {
        copy.timetables[i].table.thursday[rowIndex][target] = value;
      }
      if (!copy.timetables[i].table.friday[0].afwijkend) {
        copy.timetables[i].table.friday[rowIndex][target] = value;
        console.log(copy.timetables[i].table.friday[rowIndex][target]);
      }
      if (!copy.timetables[i].table.saturday[0].afwijkend) {
        copy.timetables[i].table.saturday[rowIndex][target] = value;
      }
      if (!copy.timetables[i].table.sunday[0].afwijkend) {
        copy.timetables[i].table.sunday[rowIndex][target] = value;
      }
    }
    if (typeof rowIndex === "number") {
      copy.timetables[i].table[day][rowIndex][target] = value;
    }

    if (day !== "global") {
      copy.timetables[i].table[day][rowIndex][target] = value;
    }

    if (copy.timetables[i].global === false) {
      if (target === "from") {
        if (copy.timetables[i].table.monday[rowIndex].from.length === 0) {
          copy.timetables[i].table.monday[rowIndex].from = value;
        }
        if (copy.timetables[i].table.tuesday[rowIndex].from.length === 0) {
          copy.timetables[i].table.tuesday[rowIndex].from = value;
        }
        if (copy.timetables[i].table.wednesday[rowIndex].from.length === 0) {
          copy.timetables[i].table.wednesday[rowIndex].from = value;
        }
        if (copy.timetables[i].table.thursday[rowIndex].from.length === 0) {
          copy.timetables[i].table.thursday[rowIndex].from = value;
        }
        if (copy.timetables[i].table.friday[rowIndex].from.length === 0) {
          copy.timetables[i].table.friday[rowIndex].from = value;
        }
        if (copy.timetables[i].table.saturday[rowIndex].from.length === 0) {
          copy.timetables[i].table.saturday[rowIndex].from = value;
        }
        if (copy.timetables[i].table.sunday[rowIndex].from.length === 0) {
          copy.timetables[i].table.sunday[rowIndex].from = value;
        }
      }
      if (target === "until") {
        if (copy.timetables[i].table.monday[rowIndex].until.length === 0) {
          copy.timetables[i].table.monday[rowIndex].until = value;
        }
        if (copy.timetables[i].table.tuesday[rowIndex].until.length === 0) {
          copy.timetables[i].table.tuesday[rowIndex].until = value;
        }
        if (copy.timetables[i].table.wednesday[rowIndex].until.length === 0) {
          copy.timetables[i].table.wednesday[rowIndex].until = value;
        }
        if (copy.timetables[i].table.thursday[rowIndex].until.length === 0) {
          copy.timetables[i].table.thursday[rowIndex].until = value;
        }
        if (copy.timetables[i].table.friday[rowIndex].until.length === 0) {
          copy.timetables[i].table.friday[rowIndex].until = value;
        }
        if (copy.timetables[i].table.saturday[rowIndex].until.length === 0) {
          copy.timetables[i].table.saturday[rowIndex].until = value;
        }
        if (copy.timetables[i].table.sunday[rowIndex].until.length === 0) {
          copy.timetables[i].table.sunday[rowIndex].until = value;
        }
      }
    }

    setData(copy);
    setLoaded(false);
  };

  const addTimetable = (type, i, title) => {
    const copy = data;
    let index;

    if (data.timetables) {
      index = data.timetables.length;
    } else {
      index = 0;
    }
    console.log(type);

    let firstTable = {
      global: type === "easy" ? true : false,
      name: `newDefault${index}`,
      periode: false,
      periode_list: [
        {
          message: false,
          periodeFrom: "",
          periodeMessage: "",
          periodeUntil: "",
        },
      ],
      table: {
        monday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        tuesday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        wednesday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        thursday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        friday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        saturday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        sunday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        global: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
      },
    };
    let newNotGlobal = {
      global: type === "easy" ? true : false,
      name: `newDefault${index}`,
      periode: false,
      periode_list: [
        {
          message: false,
          periodeFrom: "",
          periodeMessage: "",
          periodeUntil: "",
        },
      ],
      table: {
        monday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        tuesday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        wednesday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        thursday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        friday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        saturday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        sunday: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
        global: [
          {
            closed: false,
            from: "",
            until: "",
          },
        ],
      },
    };

    if (!data.timetables) {
      console.log("hsqjkdh");
      let copy = data;

      copy.timetables = [firstTable];
      console.log(copy);
    } else {
      if (type === "easy" || type === "complicated") {
        copy.timetables.push(newNotGlobal);
      }

      if (type === "title" && typeof i === "number") {
        copy.timetables[i].name = title;
      }
    }

    setData(copy);
    setLoaded(false);
  };

  const deleteTable = (e, index) => {
    let copy = data;
    copy.timetables.splice(index, 1);
    // console.log(copy.timetables);

    setData(copy);
    setLoaded(false);
  };

  const changeTitle = (e, index) => {
    for (let i = 0; i < e.target.children.length; i++) {
      if (e.target.children[i].selected) {
        title = e.target.children[i].value;
        addTimetable("title", index, title);
      }
    }
  };

  const AddTime = (e, index, day) => {
    let copy = [...data.timetables];
    let newRow = {
      afwijkend: false,
      closed: false,
      from: "",
      until: "",
    };
    let Row = {
      afwijkend: copy[index].table[day][0].afwijkend,
      closed: false,
      from: "",
      until: "",
    };

    if (day === "global") {
      copy[index].table.global[0].afwijkend = false;
      for (let i = 0; i < 1; i++) {
        copy[index].table.global.push(newRow);
      }
      for (let i = 0; i < 1; i++) {
        if (!copy[index].table.monday[0].afwijkend) {
          let test = [...copy[index].table.global];
          copy[index].table.monday = test;
        }
      }
      for (let i = 0; i < 1; i++) {
        if (!copy[index].table.tuesday[0].afwijkend) {
          let test = [...copy[index].table.global];
          copy[index].table.tuesday = test;
        }
      }
      for (let i = 0; i < 1; i++) {
        if (!copy[index].table.wednesday[0].afwijkend) {
          let test = [...copy[index].table.global];
          copy[index].table.wednesday = test;
        }
      }
      for (let i = 0; i < 1; i++) {
        if (!copy[index].table.thursday[0].afwijkend) {
          let test = [...copy[index].table.global];
          copy[index].table.thursday = test;
        }
      }
      for (let i = 0; i < 1; i++) {
        if (!copy[index].table.friday[0].afwijkend) {
          let test = [...copy[index].table.global];
          copy[index].table.friday = test;
        }
      }
      for (let i = 0; i < 1; i++) {
        if (!copy[index].table.saturday[0].afwijkend) {
          let test = [...copy[index].table.global];
          copy[index].table.saturday = test;
        }
      }
      for (let i = 0; i < 1; i++) {
        if (!copy[index].table.sunday[0].afwijkend) {
          let test = [...copy[index].table.global];
          console.log(test);
          copy[index].table.sunday = test;
        }
      }
    } else {
      for (let i = 0; i < 1; i++) {
        copy[index].table[day].push(Row);
      }
    }

    console.log(copy[index].table.global);

    let fullObjectcopy = data;
    fullObjectcopy.timetables = copy;

    setData(fullObjectcopy);
    setLoaded(false);
  };

  const removeTime = (e, index, rowIndex, day) => {
    // console.log(rowIndex);

    let copy = [...data.timetables];

    copy[index].table[day].splice(rowIndex, 1);

    if (rowIndex === 0 && day !== "global") {
      copy[index].table[day][1].afwijkend = true;
    }

    if (day === "global") {
      if (!copy[index].table.monday[0].afwijkend) {
        copy[index].table.monday = copy[index].table.global;
      }
      if (!copy[index].table.tuesday[0].afwijkend) {
        copy[index].table.tuesday = copy[index].table.global;
      }
      if (!copy[index].table.wednesday[0].afwijkend) {
        copy[index].table.wednesday = copy[index].table.global;
      }
      if (!copy[index].table.thursday[0].afwijkend) {
        copy[index].table.thursday = copy[index].table.global;
      }
      if (!copy[index].table.friday[0].afwijkend) {
        copy[index].table.friday = copy[index].table.global;
      }
      if (!copy[index].table.saturday[0].afwijkend) {
        copy[index].table.saturday = copy[index].table.global;
      }
      if (!copy[index].table.sunday[0].afwijkend) {
        copy[index].table.sunday = copy[index].table.global;
      }
    }

    let fullObjectcopy = data;
    fullObjectcopy.timetables = copy;

    setData(fullObjectcopy);
    setLoaded(false);
  };

  const addPeriode = (e, index, type, periodeIndex) => {
    let copy = data;
    if (type === "check") {
      copy.timetables[index].periode = !copy.timetables[index].periode;

      if (copy.timetables[index].periode === false) {
        copy.timetables[index].periode_list.length = 1;
        copy.timetables[index].periode_list[0].periodeFrom = "";
        copy.timetables[index].periode_list[0].periodeUntil = "";
        copy.timetables[index].periode_list[0].periodeMessage = "";
      }
    }

    if (type === "from") {
      copy.timetables[index].periode_list[periodeIndex].periodeFrom =
        e.target.value;
      console.log(
        copy.timetables[index].periode_list[periodeIndex].periodeFrom
      );
    }
    if (type === "until") {
      copy.timetables[index].periode_list[periodeIndex].periodeUntil =
        e.target.value;
    }
    if (type === "message") {
      copy.timetables[index].periode_list[periodeIndex].periodeMessage =
        e.target.value;
    }

    if (type === "addPeriode") {
      copy.timetables[index].periode_list.push({
        periodeFrom: "",
        periodeMessage: "",
        periodeUntil: "",
        message: false,
      });
    }
    if (type === "removePeriode") {
      console.log(copy.timetables[index].periode_list);
      copy.timetables[index].periode_list.splice(periodeIndex, 1);
      console.log(copy.timetables[index].periode_list);
    }

    if (type === "toggleTrue") {
      copy.timetables[index].periode_list[periodeIndex].message = true;
    }
    if (type === "toggleFalse") {
      copy.timetables[index].periode_list[periodeIndex].message = false;
      copy.timetables[index].periode_list[periodeIndex].periodeMessage = "";
    }

    setData(copy);
    setLoaded(false);
  };

  const addSpecificMessage = (value, day, index, rowIndex, type) => {
    let copy = data;

    if (type === "check") {
      copy.timetables[index].table[day][rowIndex].message =
        !copy.timetables[index].table[day][rowIndex].message;

      if (copy.timetables[index].table[day][rowIndex].message === false) {
        copy.timetables[index].table[day][rowIndex].messageText = "";
      }
    }

    if (type === "message") {
      copy.timetables[index].table[day][rowIndex].messageText = value;
    }

    setData(copy);
    setLoaded(false);
  };

  useEffect(() => {
    setData(props.data);
    setLoaded(true);
  });

  return (
    <section className="c-timetables">
      <div className="intro">
        <h2>
          <span className="typo">10</span>
        </h2>
        <div>
          <h2>Tijdschema's</h2>
          <p>
            Uit onderzoek is gebleken dat men in meer dan 50% van de
            terugkerende opzoekingen op het internet naar openingsuren zoekt.
            Niemand staat graag voor een gesloten deur! <br />
            Wij hebben rekening gehouden met{" "}
            <span className="yellow bold">alle mogelijkheden</span> zodat alles
            voor de bezoeker heel duidelijk is.
            <br />
          </p>
          <p>
            Heb je afhankelijk van seizoenen verschillende uren? Ben je
            marktkramer en sta je dagelijks op verschillende locaties en
            gedurende verschillende tijdstippen? <br />
            Heb je tijdens openingstijden specifieke tijdslots waarbij je
            speciale acties aanbiedt?{" "}
            <span className="yellow bold">
              Dit kan allemaal duidelijk gemaakt worden!
            </span>
          </p>
        </div>
      </div>
      <div className="section-container">
        <section className="add-button__container">
          <div className="add-timetable">
            <div className="timetable-data">
              <h2>Eenvoudig tijschema</h2>
              <p>
                Mijn werkuren zijn regelmatig en op op sommige dagen ben ik
                gesloten.
              </p>
              <h5>VOORBEELD:</h5>
              <p>
                Maandag tot vrijdag: 08:00 - 12:30 & 13:00 - 17:00
                <br /> Gesloten op zaterdag en zondag
              </p>
            </div>
            <div className="add-container">
              {/* <Icon name="AddCircle" onClick={(e) => addTimetable("easy")} /> */}
            </div>
          </div>
          <div className="add-timetable">
            <div className="timetable-data">
              <h2>Ingewikkeld tijdschema</h2>
              <p>
                Mijn werkuren zijn onregelmatig. De meeste werkdagen hebben
                verschillende uren.
              </p>
              <h5>VOORBEELD:</h5>
              <p>
                Maandag, woensdag & vrijdag: 08:00 - 12:30 <br />
                Dinsdag & donderdag: 08:30 - 17:00 <br /> Gesloten op zaterdag &
                zondag
              </p>
            </div>
            <div className="add-container">
              {/* <Icon
                name="AddCircle"
                onClick={(e) => addTimetable("complicated")}
              /> */}
            </div>
          </div>
        </section>
        {data && (
          <Fragment>
            {data.timetables && (
              <div className="c-timetables__item-container">
                {data.timetables.map((item, index) => (
                  <div key={item.name} className={`c-timetables__item`}>
                    <div className="c-timetables_table">
                      <table>
                        <thead>
                          <tr>
                            <td>
                              <td>
                                <p>Type openingsuren:</p>
                              </td>
                              <select onChange={(e) => changeTitle(e, index)}>
                                {item.name.includes("newDefault") && (
                                  <option>Selecteer 1</option>
                                )}
                                {item.name === "office" && (
                                  <option value={"office"}>Kantoor</option>
                                )}
                                {item.name === "holiday" && (
                                  <option value={"holiday"}>Feestdagen</option>
                                )}
                                {item.name === "shop" && (
                                  <option value={"shop"}>Winkel</option>
                                )}
                                {item.name === "showroom" && (
                                  <option value={"showroom"}>showroom</option>
                                )}
                                {item.name === "garage" && (
                                  <option value={"garage"}>Garage</option>
                                )}
                                {item.name === "workenvirement" && (
                                  <option value={"workenvirement"}>
                                    Werkplek
                                  </option>
                                )}
                                {item.name !== "shop" && (
                                  <option value={"shop"}>Winkel</option>
                                )}
                                {item.name !== "showroom" && (
                                  <option value={"showroom"}>showroom</option>
                                )}
                                {item.name !== "Garage" && (
                                  <option value={"garage"}>Garage</option>
                                )}
                                {item.name !== "workenvirement" && (
                                  <option value={"workenvirement"}>
                                    Werkplek
                                  </option>
                                )}
                                {item.name !== "office" && (
                                  <option value={"office"}>Kantoor</option>
                                )}
                                {item.name !== "holiday" && (
                                  <option value={"holiday"}>Feestdagen</option>
                                )}
                              </select>
                            </td>
                          </tr>
                        </thead>

                        <tbody>
                          {!data.timetables[index].global && <tr />}
                          {data.timetables[index].global && (
                            <tr>
                              <td>Standaard uren:</td>
                              <td className="row-container">
                                {data.timetables[index].table.global.map(
                                  (item, rowIndex) => (
                                    <span
                                      key={rowIndex}
                                      className={[
                                        data.timetables[index].table.global
                                          .length > 1
                                          ? "multiple"
                                          : "",
                                        "time-row",
                                      ].join(" ")}
                                    >
                                      <div>
                                        <p>
                                          <input
                                            onBlur={(e) =>
                                              timetableHandler(
                                                e.target.value,
                                                "global",
                                                "from",
                                                index,
                                                rowIndex
                                              )
                                            }
                                            defaultValue={item.from}
                                            type="time"
                                          />
                                        </p>
                                        <p className="score">-</p>
                                        <p>
                                          <input
                                            defaultValue={item.until}
                                            onBlur={(e) =>
                                              timetableHandler(
                                                e.target.value,
                                                "global",
                                                "until",
                                                index,
                                                rowIndex
                                              )
                                            }
                                            type="time"
                                          />
                                        </p>
                                        {!data.timetables[index].table.global[
                                          rowIndex
                                        ].message && (
                                          <img
                                            onClick={(e) =>
                                              addSpecificMessage(
                                                e.target.value,
                                                "global",
                                                index,
                                                rowIndex,
                                                "check"
                                              )
                                            }
                                            alt="message toggle"
                                            width="30px"
                                            src="https://static.thenounproject.com/png/3144347-200.png"
                                          />
                                        )}

                                        {data.timetables[index].table.global
                                          .length !== 1 &&
                                          {
                                            /* <Icon
                                            name="Bin"
                                            onClick={(e) =>
                                              removeTime(
                                                e,
                                                index,
                                                rowIndex,
                                                "global"
                                              )
                                            }
                                            key={rowIndex}
                                          /> */
                                          }}

                                        {data.timetables[index].table.global[
                                          rowIndex
                                        ].message && (
                                          <img
                                            onClick={(e) =>
                                              addSpecificMessage(
                                                e.target.value,
                                                "global",
                                                index,
                                                rowIndex,
                                                "check"
                                              )
                                            }
                                            alt="message toggle"
                                            width="30px"
                                            src="https://static.thenounproject.com/png/3144348-200.png"
                                          />
                                        )}
                                        {/* <Icon
                                          onClick={(e) =>
                                            AddTime(e, index, "global")
                                          }
                                          name="AddCircle"
                                        /> */}
                                      </div>
                                      {data.timetables[index].table.global[
                                        rowIndex
                                      ].message && (
                                        <div className="message">
                                          <input
                                            defaultValue={
                                              data.timetables[index].table
                                                .global[rowIndex].messageText
                                            }
                                            onBlur={(e) =>
                                              addSpecificMessage(
                                                e.target.value,
                                                "global",
                                                index,
                                                rowIndex,
                                                "message"
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </span>
                                  )
                                )}
                              </td>
                              <td></td>

                              <td></td>
                            </tr>
                          )}

                          <tr className="header">
                            <th></th>
                            <th></th>
                            <th>gesloten?</th>
                            {data.timetables[index].global && (
                              <th>afwijkend?</th>
                            )}
                          </tr>
                          <tr>
                            <td>Maandag</td>
                            {!data.timetables[index].table.monday[0].closed &&
                              data.timetables[index].table.monday[0]
                                .afwijkend && (
                                <td className="row-container">
                                  {data.timetables[index].table.monday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.monday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "monday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "monday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table.monday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "monday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table.monday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "monday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "monday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.monday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .monday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "monday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global &&
                              !data.timetables[index].table.monday[0]
                                .closed && (
                                <td className="row-container">
                                  {data.timetables[index].table.monday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.monday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "monday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "monday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table.monday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "monday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table.monday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "monday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "monday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.monday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .monday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "monday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {data.timetables[index].table.monday[0].closed && (
                              <td className="closed">
                                <span className="text">gesloten</span>
                              </td>
                            )}
                            {data.timetables[index].global &&
                              !data.timetables[index].table.monday[0].closed &&
                              !data.timetables[index].table.monday[0]
                                .afwijkend && (
                                <td className="closed row-container">
                                  {data.timetables[index].table.monday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.monday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.until}
                                              type="time"
                                            />
                                          </p>
                                        </div>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}

                            {!data.timetables[index].global && <td />}
                            <td>
                              {data.timetables[index].table.monday.length <
                                2 && (
                                <input
                                  checked={
                                    data.timetables[index].table.monday[0]
                                      .closed
                                  }
                                  name={String(
                                    `${index} table monday 0 closed`
                                  )}
                                  onChange={(e) => {
                                    changeClosed(e, index, "monday");
                                  }}
                                />
                              )}
                              {data.timetables[index].table.monday.length > 1 &&
                                (data.timetables[index].table.monday[0]
                                  .afwijkend ||
                                  !data.timetables[index].global) && (
                                  <span className="row-container">
                                    {data.timetables[index].table.monday.map(
                                      (item, rowIndex) => ({
                                        /* <Icon
                                          name="Bin"
                                          onClick={(e) =>
                                            removeTime(
                                              e,
                                              index,
                                              rowIndex,
                                              "monday"
                                            )
                                          }
                                          key={rowIndex}
                                        /> */
                                      })
                                    )}
                                  </span>
                                )}
                            </td>

                            {data.timetables[index].global && (
                              <td>
                                <input
                                  checked={
                                    data.timetables[index].table.monday[0]
                                      .afwijkend
                                  }
                                  name={String(
                                    `${index} table monday 0 afwijkend`
                                  )}
                                  onChange={(e) => {
                                    changeAfwijkend(
                                      e,
                                      index,
                                      "monday",
                                      data.timetables[index].table.monday[0]
                                        .afwijkend
                                    );
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td>Dinsdag</td>
                            {!data.timetables[index].table.tuesday[0].closed &&
                              data.timetables[index].table.tuesday[0]
                                .afwijkend && (
                                <td className="row-container">
                                  {data.timetables[index].table.tuesday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.tuesday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "tuesday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "tuesday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table
                                            .tuesday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "tuesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table.tuesday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "tuesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "tuesday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.tuesday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .tuesday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "tuesday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global &&
                              !data.timetables[index].table.tuesday[0]
                                .closed && (
                                <td className="row-container">
                                  {data.timetables[index].table.tuesday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.tuesday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "tuesday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "tuesday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table
                                            .tuesday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "tuesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table.tuesday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "tuesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "tuesday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.tuesday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .tuesday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "tuesday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {data.timetables[index].table.tuesday[0].closed && (
                              <td className="closed">
                                <span className="text">gesloten</span>
                              </td>
                            )}
                            {data.timetables[index].global &&
                              !data.timetables[index].table.tuesday[0]
                                .afwijkend && (
                                <td className="closed row-container">
                                  {data.timetables[index].table.tuesday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.tuesday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.until}
                                              type="time"
                                            />
                                          </p>
                                        </div>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global && <td />}
                            <td>
                              {data.timetables[index].table.tuesday.length <
                                2 && (
                                <input
                                  checked={
                                    data.timetables[index].table.tuesday[0]
                                      .closed
                                  }
                                  name={String(
                                    `${index} table tuesday 0 closed`
                                  )}
                                  onChange={(e) => {
                                    changeClosed(e, index, "tuesday");
                                  }}
                                />
                              )}
                              {data.timetables[index].table.tuesday.length >
                                1 &&
                                (data.timetables[index].table.tuesday[0]
                                  .afwijkend ||
                                  !data.timetables[index].global) && (
                                  <span className="row-container">
                                    {data.timetables[index].table.tuesday.map(
                                      (item, rowIndex) => ({
                                        /* <Icon
                                          name="Bin"
                                          onClick={(e) =>
                                            removeTime(
                                              e,
                                              index,
                                              rowIndex,
                                              "tuesday"
                                            )
                                          }
                                          key={rowIndex}
                                        /> */
                                      })
                                    )}
                                  </span>
                                )}
                            </td>
                            {data.timetables[index].global && (
                              <td>
                                <input
                                  checked={
                                    data.timetables[index].table.tuesday[0]
                                      .afwijkend
                                  }
                                  name={String(
                                    `${index} table tuesday 0 afwijkend`
                                  )}
                                  onChange={(e) => {
                                    changeAfwijkend(
                                      e,
                                      index,
                                      "tuesday",
                                      data.timetables[index].table.tuesday[0]
                                        .afwijkend
                                    );
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td>Woensdag</td>
                            {!data.timetables[index].table.wednesday[0]
                              .closed &&
                              data.timetables[index].table.wednesday[0]
                                .afwijkend && (
                                <td className="row-container">
                                  {data.timetables[index].table.wednesday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.wednesday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "wednesday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "wednesday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table
                                            .wednesday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "wednesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table
                                            .wednesday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "wednesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "wednesday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.wednesday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .wednesday[rowIndex]
                                                  .messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "wednesday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global &&
                              !data.timetables[index].table.wednesday[0]
                                .closed && (
                                <td className="row-container">
                                  {data.timetables[index].table.wednesday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.wednesday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "wednesday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "wednesday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>

                                          {!data.timetables[index].table
                                            .wednesday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "wednesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table
                                            .wednesday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "wednesday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "wednesday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.wednesday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .wednesday[rowIndex]
                                                  .messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "wednesday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {data.timetables[index].table.wednesday[0]
                              .closed && (
                              <td className="closed">
                                <span className="text">gesloten</span>
                              </td>
                            )}
                            {!data.timetables[index].global && <td />}
                            {data.timetables[index].global &&
                              !data.timetables[index].table.wednesday[0]
                                .afwijkend && (
                                <td className="closed row-container">
                                  {data.timetables[index].table.wednesday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.wednesday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.until}
                                              type="time"
                                            />
                                          </p>
                                        </div>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}

                            <td>
                              {data.timetables[index].table.wednesday.length <
                                2 && (
                                <input
                                  checked={
                                    data.timetables[index].table.wednesday[0]
                                      .closed
                                  }
                                  name={String(
                                    `${index} table wednesday 0 closed`
                                  )}
                                  onChange={(e) => {
                                    changeClosed(e, index, "wednesday");
                                  }}
                                />
                              )}
                              {data.timetables[index].table.wednesday.length >
                                1 &&
                                (data.timetables[index].table.wednesday[0]
                                  .afwijkend ||
                                  !data.timetables[index].global) && (
                                  <span className="row-container">
                                    {data.timetables[index].table.wednesday.map(
                                      (item, rowIndex) => ({
                                        /* <Icon
                                          name="Bin"
                                          onClick={(e) =>
                                            removeTime(
                                              e,
                                              index,
                                              rowIndex,
                                              "wednesday"
                                            )
                                          }
                                          key={rowIndex}
                                        /> */
                                      })
                                    )}
                                  </span>
                                )}
                            </td>
                            {data.timetables[index].global && (
                              <td>
                                <input
                                  checked={
                                    data.timetables[index].table.wednesday[0]
                                      .afwijkend
                                  }
                                  name={String(
                                    `${index} table wednesday 0 afwijkend`
                                  )}
                                  onChange={(e) => {
                                    changeAfwijkend(e, index, "wednesday");
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td>Donderdag</td>
                            {!data.timetables[index].table.thursday[0].closed &&
                              data.timetables[index].table.thursday[0]
                                .afwijkend && (
                                <td className="row-container">
                                  {data.timetables[index].table.thursday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.thursday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "thursday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "thursday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table
                                            .thursday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "thursday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}
                                          {data.timetables[index].table
                                            .thursday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "thursday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "thursday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.thursday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .thursday[rowIndex]
                                                  .messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "thursday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global &&
                              !data.timetables[index].table.thursday[0]
                                .closed && (
                                <td className="row-container">
                                  {data.timetables[index].table.thursday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.thursday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "thursday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "thursday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table
                                            .thursday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "thursday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}
                                          {data.timetables[index].table
                                            .thursday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "thursday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "thursday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.thursday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .thursday[rowIndex]
                                                  .messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "thursday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {data.timetables[index].table.thursday[0]
                              .closed && (
                              <td className="closed">
                                <span className="text">gesloten</span>
                              </td>
                            )}
                            {data.timetables[index].global &&
                              !data.timetables[index].table.thursday[0]
                                .afwijkend && (
                                <td className="closed row-container">
                                  {data.timetables[index].table.thursday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.thursday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.until}
                                              type="time"
                                            />
                                          </p>
                                        </div>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global && <td />}

                            <td>
                              {data.timetables[index].table.thursday.length <
                                2 && (
                                <input
                                  checked={
                                    data.timetables[index].table.thursday[0]
                                      .closed
                                  }
                                  name={String(
                                    `${index} table thursday 0 closed`
                                  )}
                                  onChange={(e) => {
                                    changeClosed(e, index, "thursday");
                                  }}
                                />
                              )}
                              {data.timetables[index].table.thursday.length >
                                1 &&
                                (data.timetables[index].table.thursday[0]
                                  .afwijkend ||
                                  !data.timetables[index].global) && (
                                  <span className="row-container">
                                    {data.timetables[index].table.thursday.map(
                                      (item, rowIndex) => ({
                                        /* <Icon
                                          name="Bin"
                                          onClick={(e) =>
                                            removeTime(
                                              e,
                                              index,
                                              rowIndex,
                                              "thursday"
                                            )
                                          }
                                          key={rowIndex}
                                        /> */
                                      })
                                    )}
                                  </span>
                                )}
                            </td>

                            {data.timetables[index].global && (
                              <td>
                                <input
                                  checked={
                                    data.timetables[index].table.thursday[0]
                                      .afwijkend
                                  }
                                  name={String(
                                    `${index} table thursday 0 afwijkend`
                                  )}
                                  onChange={(e) => {
                                    changeAfwijkend(e, index, "thursday");
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td>Vrijdag</td>
                            {!data.timetables[index].table.friday[0].closed &&
                              data.timetables[index].table.friday[0]
                                .afwijkend && (
                                <td className="row-container">
                                  {data.timetables[index].table.friday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.friday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "friday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "friday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table.friday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "friday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table.friday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "friday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "friday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.friday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .friday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "friday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global &&
                              !data.timetables[index].table.friday[0]
                                .closed && (
                                <td className="row-container">
                                  {data.timetables[index].table.friday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.friday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "friday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "friday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table.friday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "friday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}
                                          {data.timetables[index].table.friday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "friday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "friday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.friday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .friday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "friday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {data.timetables[index].table.friday[0].closed && (
                              <td className="closed">
                                <span className="text">gesloten</span>
                              </td>
                            )}
                            {data.timetables[index].global &&
                              !data.timetables[index].table.friday[0]
                                .afwijkend && (
                                <td className="closed row-container">
                                  {data.timetables[index].table.friday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.friday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.until}
                                              type="time"
                                            />
                                          </p>
                                        </div>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}

                            {!data.timetables[index].global && <td />}

                            <td>
                              {data.timetables[index].table.friday.length <
                                2 && (
                                <input
                                  checked={
                                    data.timetables[index].table.friday[0]
                                      .closed
                                  }
                                  name={String(
                                    `${index} table friday 0 closed`
                                  )}
                                  onChange={(e) => {
                                    changeClosed(e, index, "friday");
                                  }}
                                />
                              )}
                              {data.timetables[index].table.friday.length > 1 &&
                                (data.timetables[index].table.friday[0]
                                  .afwijkend ||
                                  !data.timetables[index].global) && (
                                  <span className="row-container">
                                    {data.timetables[index].table.friday.map(
                                      (item, rowIndex) => ({
                                        /* <Icon
                                          name="Bin"
                                          onClick={(e) =>
                                            removeTime(
                                              e,
                                              index,
                                              rowIndex,
                                              "friday"
                                            )
                                          }
                                          key={rowIndex}
                                        /> */
                                      })
                                    )}
                                  </span>
                                )}
                            </td>
                            {data.timetables[index].global && (
                              <td>
                                <input
                                  checked={
                                    data.timetables[index].table.friday[0]
                                      .afwijkend
                                  }
                                  name={String(
                                    `${index} table friday 0 afwijkend`
                                  )}
                                  onChange={(e) => {
                                    changeAfwijkend(e, index, "friday");
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td>Zaterdag</td>
                            {!data.timetables[index].table.saturday[0].closed &&
                              data.timetables[index].table.saturday[0]
                                .afwijkend && (
                                <td className="row-container">
                                  {data.timetables[index].table.saturday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.saturday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "saturday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "saturday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table
                                            .saturday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "saturday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table
                                            .saturday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "saturday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "saturday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.saturday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .saturday[rowIndex]
                                                  .messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "saturday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global &&
                              !data.timetables[index].table.saturday[0]
                                .closed && (
                                <td className="row-container">
                                  {data.timetables[index].table.saturday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.saturday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "saturday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "saturday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table
                                            .saturday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "saturday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}
                                          {data.timetables[index].table
                                            .saturday[rowIndex].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "saturday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "saturday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.saturday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .saturday[rowIndex]
                                                  .messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "saturday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {data.timetables[index].table.saturday[0]
                              .closed && (
                              <td className="closed">
                                <span className="text">gesloten</span>
                              </td>
                            )}
                            {data.timetables[index].global &&
                              !data.timetables[index].table.saturday[0]
                                .afwijkend && (
                                <td className="closed row-container">
                                  {data.timetables[index].table.saturday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.saturday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.until}
                                              type="time"
                                            />
                                          </p>
                                        </div>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global && <td />}
                            <td>
                              {data.timetables[index].table.saturday.length <
                                2 && (
                                <input
                                  checked={
                                    data.timetables[index].table.saturday[0]
                                      .closed
                                  }
                                  name={String(
                                    `${index} table saturday 0 closed`
                                  )}
                                  onChange={(e) => {
                                    changeClosed(e, index, "saturday");
                                  }}
                                />
                              )}
                              {data.timetables[index].table.saturday.length >
                                1 &&
                                (data.timetables[index].table.saturday[0]
                                  .afwijkend ||
                                  !data.timetables[index].global) && (
                                  <span className="row-container">
                                    {data.timetables[index].table.saturday.map(
                                      (item, rowIndex) => ({
                                        /* <Icon
                                          name="Bin"
                                          onClick={(e) =>
                                            removeTime(
                                              e,
                                              index,
                                              rowIndex,
                                              "saturday"
                                            )
                                          }
                                          key={rowIndex}
                                        /> */
                                      })
                                    )}
                                  </span>
                                )}
                            </td>
                            {data.timetables[index].global && (
                              <td>
                                <input
                                  checked={
                                    data.timetables[index].table.saturday[0]
                                      .afwijkend
                                  }
                                  name={String(
                                    `${index} table saturday 0 afwijkend`
                                  )}
                                  onChange={(e) => {
                                    changeAfwijkend(e, index, "saturday");
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                          <tr>
                            <td>Zondag</td>
                            {!data.timetables[index].table.sunday[0].closed &&
                              data.timetables[index].table.sunday[0]
                                .afwijkend && (
                                <td className="row-container">
                                  {data.timetables[index].table.sunday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.sunday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "sunday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "sunday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table.sunday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "sunday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}

                                          {data.timetables[index].table.sunday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "sunday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "sunday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.sunday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .sunday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "sunday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global &&
                              !data.timetables[index].table.sunday[0]
                                .closed && (
                                <td className="row-container">
                                  {data.timetables[index].table.sunday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.sunday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              defaultValue={item.from}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "sunday",
                                                  "from",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              defaultValue={item.until}
                                              onBlur={(e) =>
                                                timetableHandler(
                                                  e.target.value,
                                                  "sunday",
                                                  "until",
                                                  index,
                                                  rowIndex
                                                )
                                              }
                                              type="time"
                                            />
                                          </p>
                                          {!data.timetables[index].table.sunday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "sunday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}
                                          {data.timetables[index].table.sunday[
                                            rowIndex
                                          ].message && (
                                            <img
                                              onClick={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "sunday",
                                                  index,
                                                  rowIndex,
                                                  "check"
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            onClick={(e) =>
                                              AddTime(e, index, "sunday")
                                            }
                                            name="AddCircle"
                                          /> */}
                                        </div>
                                        {data.timetables[index].table.sunday[
                                          rowIndex
                                        ].message && (
                                          <div className="message">
                                            <input
                                              defaultValue={
                                                data.timetables[index].table
                                                  .sunday[rowIndex].messageText
                                              }
                                              onBlur={(e) =>
                                                addSpecificMessage(
                                                  e.target.value,
                                                  "sunday",
                                                  index,
                                                  rowIndex,
                                                  "message"
                                                )
                                              }
                                            />
                                          </div>
                                        )}
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {data.timetables[index].table.sunday[0].closed && (
                              <td className="closed">
                                <span className="text">gesloten</span>
                              </td>
                            )}
                            {data.timetables[index].global &&
                              !data.timetables[index].table.sunday[0]
                                .afwijkend && (
                                <td className="closed row-container">
                                  {data.timetables[index].table.sunday.map(
                                    (item, rowIndex) => (
                                      <span
                                        key={rowIndex}
                                        className={[
                                          data.timetables[index].table.sunday
                                            .length > 1
                                            ? "multiple"
                                            : "",
                                          "time-row",
                                        ].join(" ")}
                                      >
                                        <div>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.from}
                                              type="time"
                                            />
                                          </p>
                                          <p className="score">-</p>
                                          <p>
                                            <input
                                              disabled
                                              defaultValue={item.until}
                                              type="time"
                                            />
                                          </p>
                                        </div>
                                      </span>
                                    )
                                  )}
                                </td>
                              )}
                            {!data.timetables[index].global && <td />}
                            <td>
                              {data.timetables[index].table.sunday.length <
                                2 && (
                                <input
                                  checked={
                                    data.timetables[index].table.sunday[0]
                                      .closed
                                  }
                                  name={String(
                                    `${index} table sunday 0 closed`
                                  )}
                                  onChange={(e) => {
                                    changeClosed(e, index, "sunday");
                                  }}
                                />
                              )}
                              {data.timetables[index].table.sunday.length > 1 &&
                                (data.timetables[index].table.sunday[0]
                                  .afwijkend ||
                                  !data.timetables[index].global) && (
                                  <span className="row-container">
                                    {data.timetables[index].table.sunday.map(
                                      (item, rowIndex) => ({
                                        /* <Icon
                                          name="Bin"
                                          onClick={(e) =>
                                            removeTime(
                                              e,
                                              index,
                                              rowIndex,
                                              "sunday"
                                            )
                                          }
                                          key={rowIndex}
                                        /> */
                                      })
                                    )}
                                  </span>
                                )}
                            </td>

                            {data.timetables[index].global && (
                              <td>
                                <input
                                  checked={
                                    data.timetables[index].table.sunday[0]
                                      .afwijkend
                                  }
                                  name={String(
                                    `${index} table sunday 0 afwijkend`
                                  )}
                                  onChange={(e) => {
                                    changeAfwijkend(e, index, "sunday");
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>
                              <p className="yellow">
                                Wil je een periode instellen?{" "}
                              </p>
                              <p className="help">bv. vakantieperiode</p>
                            </td>
                            <td>
                              <div
                                onClick={(e) => addPeriode(e, index, "check")}
                                className={[
                                  "option3",
                                  data.timetables[index].periode
                                    ? "active"
                                    : "",
                                ].join(" ")}
                              >
                                <p className="typo">JA</p>
                                <p className="typo">NEE</p>
                              </div>

                              {data.timetables[index].periode && (
                                <Fragment>
                                  {data.timetables[index].periode_list.map(
                                    (item, periodeIndex) => (
                                      <Fragment key={periodeIndex}>
                                        <div>
                                          <input
                                            defaultValue={item.periodeFrom}
                                            onBlur={(e) =>
                                              addPeriode(
                                                e,
                                                index,
                                                "from",
                                                periodeIndex
                                              )
                                            }
                                            type="date"
                                          />
                                          <p className="score"> -</p>
                                          <input
                                            defaultValue={item.periodeUntil}
                                            onBlur={(e) =>
                                              addPeriode(
                                                e,
                                                index,
                                                "until",
                                                periodeIndex
                                              )
                                            }
                                            type="date"
                                          />
                                          {!item.message && (
                                            <img
                                              onClick={(e) =>
                                                addPeriode(
                                                  e,
                                                  index,
                                                  "toggleTrue",
                                                  periodeIndex
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144347-200.png"
                                            />
                                          )}
                                          {item.message && (
                                            <img
                                              onClick={(e) =>
                                                addPeriode(
                                                  e,
                                                  index,
                                                  "toggleFalse",
                                                  periodeIndex
                                                )
                                              }
                                              alt="message toggle"
                                              width="30px"
                                              src="https://static.thenounproject.com/png/3144348-200.png"
                                            />
                                          )}
                                          {/* <Icon
                                            name="AddCircle"
                                            onClick={(e) =>
                                              addPeriode(
                                                e,
                                                index,
                                                "addPeriode",
                                                periodeIndex
                                              )
                                            }
                                          /> */}
                                          {data.timetables[index].periode_list
                                            .length !== 1 &&
                                            {
                                              /* <Icon
                                              name="Bin"
                                              onClick={(e) =>
                                                addPeriode(
                                                  e,
                                                  index,
                                                  "removePeriode",
                                                  periodeIndex
                                                )
                                              }
                                            /> */
                                            }}
                                        </div>
                                        {item.message && (
                                          <textarea
                                            placeholder="Extra info bij deze periode."
                                            defaultValue={item.periodeMessage}
                                            onBlur={(e) =>
                                              addPeriode(
                                                e,
                                                index,
                                                "message",
                                                periodeIndex
                                              )
                                            }
                                          />
                                        )}
                                      </Fragment>
                                    )
                                  )}
                                </Fragment>
                              )}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="c-timetables__bin">
                      {/* <Icon name="Bin" onClick={(e) => deleteTable(e, index)} /> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!data.timetables && <p>Voeg het gewenste tijdschema toe.</p>}
          </Fragment>
        )}
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
            patchData(data);
            store.dispatch({ type: "countUp" });
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Tijdschema;
