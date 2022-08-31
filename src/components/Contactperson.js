// import Icon from "@identitybuilding/idb-react-iconlib";
// import {
//   Button,
//   OsnCheckbox,
//   OsnDndUpload,
//   OsnInputDate,
//   OsnInputText,
// } from "@identitybuilding/idb-react-ui-elements";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import store from "../store";

const Contactperson = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(false);

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

  const changePerson = (e, index, target) => {
    let copy = data;

    if (
      target === "dutch" ||
      target === "french" ||
      target === "german" ||
      target === "english"
    ) {
      copy.contact_person[index][target] = e;
    } else {
      copy.contact_person[index][target] = e.target.value;
    }

    setData(copy);
    setLoaded(false);
  };

  const addPerson = (e, index, target) => {
    let copy = data;

    let person = {
      name: "",
      prename: "",
      function: "",
      section: "",
      phone: "",
      mobile: "",
      email: "",
      date: "",
      dutch: false,
      french: false,
      german: false,
      english: false,
    };

    if (!copy.contact_person) {
      copy.contact_person = [person];
    } else {
      copy.contact_person.push(person);
    }

    setData(copy);
    setLoaded(false);
  };

  const removePerson = (e, index) => {
    let copy = data;

    copy.contact_person.splice(index, 1);

    setData(copy);
    setLoaded(false);
  };

  useEffect(() => {
    // setData(props.data);
    setLoaded(true);
  });

  return (
    <section className="c-contact-person">
      <div className="intro">
        <h2>
          <span className="typo">07</span>
        </h2>
        <div>
          <h2>Contactpersonen</h2>
          <p>
            Omdat bepaalde ondernemingen er de voorkeur aan geven om te
            verwijzen naar een contactpersoon is het mogelijk om hieronder deze
            gegevens in te vullen.
            <br />
            <span>
              <span className=" yellow">bv. </span>
              een verantwoordelijke van een afdelling...
            </span>
          </p>
        </div>
      </div>

      {data && (
        <Fragment>
          <div className="container">
            <div className="plus-button">
              <button
                onClick={(e) => addPerson(e)}
                size="S"
                icon="Add"
                text="Toevoegen"
                type="sub"
              />
            </div>
            {data.contact_person && (
              <div className="card-container">
                {data.contact_person.map((item, index) => (
                  <div className="item" key={index}>
                    <input
                      icon="UserM"
                      defaultValue={item.name}
                      title="Naam"
                      onBlur={(e) => changePerson(e, index, "name")}
                    />

                    <input
                      icon="UserM"
                      defaultValue={item.prename}
                      title="Voornaam"
                      onBlur={(e) => changePerson(e, index, "prename")}
                    />

                    <input
                      icon="Chain"
                      defaultValue={item.function}
                      title="Functie"
                      onBlur={(e) => changePerson(e, index, "function")}
                    />

                    <input
                      icon="Chain"
                      defaultValue={item.section}
                      title="Afdeling"
                      onBlur={(e) => changePerson(e, index, "section")}
                    />

                    <input
                      icon="Cellphone"
                      defaultValue={item.mobile}
                      title="Mobiele telefoon"
                      onBlur={(e) => changePerson(e, index, "mobile")}
                    />

                    <input
                      icon="Phone"
                      defaultValue={item.phone}
                      title="Telefoon"
                      onBlur={(e) => changePerson(e, index, "phone")}
                    />

                    <input
                      icon="Mail"
                      defaultValue={item.email}
                      title="Email"
                      onBlur={(e) => changePerson(e, index, "email")}
                    />

                    <label id="birthdate">
                      <div>
                        <p className="label">Geboortedatum</p>
                        <input
                          defaultValue={item.date}
                          onChangeDate={(e) => {
                            console.log(e);
                            changePerson(e, index, "date");
                          }}
                          template={1}
                        />
                      </div>
                    </label>

                    <label>
                      <div>
                        <p className="label">Afbeelding of avatar</p>

                        {/* <OsnDndUpload type="image" show_example /> */}
                      </div>
                    </label>

                    <label>
                      Gesproken taal:
                      <div className="language-container">
                        <div>
                          <input
                            checked={item.dutch}
                            name={`${index} dutch`}
                            onChange={(e) => {
                              changePerson(e, index, "dutch");
                            }}
                            value="NL"
                          />
                        </div>
                        <div>
                          <input
                            checked={item.french}
                            name={`${index} french`}
                            onChange={(e) => {
                              changePerson(e, index, "french");
                            }}
                            value="FR"
                          />
                        </div>
                        <div>
                          <input
                            checked={item.german}
                            name={`${index} german`}
                            onChange={(e) => {
                              changePerson(e, index, "german");
                            }}
                            value="DE"
                          />
                        </div>
                        <div>
                          <input
                            checked={item.english}
                            name={`${index} english`}
                            onChange={(e) => {
                              changePerson(e, index, "english");
                            }}
                            value="EN"
                          />
                        </div>
                      </div>
                    </label>

                    <div className="remove-container">
                      {data.contact_person.length !== 1 &&
                        {
                          /* <Icon
                          onClick={(e) => removePerson(e, index)}
                          name="Bin"
                        /> */
                        }}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {(!data.contact_person || data.contact_person.length === 0) && (
              <p>Gelieve hierboven een contact persoon toe te voegen.</p>
            )}
          </div>
        </Fragment>
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
            patchData(data);
            store.dispatch({ type: "countUp" });
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Contactperson;
