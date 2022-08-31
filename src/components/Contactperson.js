import Icon from "@identitybuilding/idb-react-iconlib";
import {
  Button,
  OsnCheckbox,
  OsnDndUpload,
  OsnInputDate,
  OsnInputText,
} from "@identitybuilding/idb-react-ui-elements";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import store from "../store";
import { updateCurrentEstablishment } from "../actions/GeneralAction";
import { useDispatch } from "react-redux";

const Contactperson = (props) => {
  const [data, setData] = useState(props.data);
  const [loaded, setLoaded] = useState(false);
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

  const changePerson = (e, index, target) => {
    let copy = data;

    if (
      target === "dutch" ||
      target === "french" ||
      target === "german" ||
      target === "english"
    ) {
      copy.contact_persons[index].contact_person.language[target] = e;
    } else if (
      target === "birthday" ||
      target === "first_name" ||
      target === "last_name"
    ) {
      copy.contact_persons[index].contact_person[target] = e.target.value;
    } else if (target === "function_title" || target === "section") {
      copy.contact_persons[index][target] = e.target.value;
    } else {
      copy.contact_persons[index].contact_person.personal_contact_methods[
        target
      ].value = e.target.value;
    }

    console.log(copy);

    setData(copy);
    setLoaded(false);
  };

  const addPerson = (e, index, target) => {
    let copy = data;

    let person = {
      contact_person: {
        first_name: "",
        last_name: "",
        birthday: "",
        language: {
          dutch: false,
          french: false,
          german: false,
          english: false,
        },
        biv: null,
        epc: null,
        personal_contact_methods: [
          {
            medium: "Email",
            value: "",
          },
          {
            medium: "Mobile",
            value: "",
          },
          {
            medium: "Fixed",
            value: "",
          },
        ],
        avatar: "",
      },
      business_contact_methods: [],
      function_title: "",
      section: "",
      avatar: "",
    };

    if (!copy.contact_persons) {
      copy.contact_persons = [person];
    } else {
      copy.contact_persons.push(person);
    }

    // console.log(copy);

    setData(copy);
    setLoaded(false);
  };

  const removePerson = (e, index) => {
    let copy = data;

    copy.contact_persons.splice(index, 1);

    setData(copy);
    setLoaded(false);
  };

  useEffect(() => {
    setData(data);
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

      {loaded && (
        <Fragment>
          <div className="container">
            <div className="plus-button">
              <Button
                onClick={(e) => addPerson(e)}
                size="S"
                icon="Add"
                text="Toevoegen"
                type="sub"
              />
            </div>
            <div className="card-container">
              {data.contact_persons.map((item, index) => (
                <div className="item" key={index}>
                  <OsnInputText
                    icon="UserM"
                    defaultValue={item.contact_person.first_name}
                    title="Naam"
                    onBlur={(e) => changePerson(e, index, "first_name")}
                  />

                  <OsnInputText
                    icon="UserM"
                    defaultValue={item.contact_person.last_name}
                    title="Voornaam"
                    onBlur={(e) => changePerson(e, index, "last_name")}
                  />

                  <OsnInputText
                    icon="Chain"
                    defaultValue={item.function_title}
                    title="Functie"
                    onBlur={(e) => changePerson(e, index, "function_title")}
                  />

                  <OsnInputText
                    icon="Chain"
                    defaultValue={item.section}
                    title="Afdeling"
                    onBlur={(e) => changePerson(e, index, "section")}
                  />

                  {item.contact_person.personal_contact_methods.map(
                    (object, i) => {
                      if (object.medium === "Mobile") {
                        return (
                          <OsnInputText
                            key={"dfgdfghhfh"}
                            icon="Cellphone"
                            defaultValue={object.value}
                            title="Mobiele telefoon"
                            onBlur={(e) => changePerson(e, index, i)}
                          />
                        );
                      }
                      if (object.medium === "Email") {
                        return (
                          <OsnInputText
                            key={"hhfh"}
                            icon="Mail"
                            defaultValue={object.value}
                            title="Email"
                            onBlur={(e) => changePerson(e, index, i)}
                          />
                        );
                      }
                      if (object.medium === "Fixed") {
                        return (
                          <OsnInputText
                            key={"dsqgre''"}
                            icon="Phone"
                            defaultValue={object.value}
                            title="Telefoon"
                            onBlur={(e) => changePerson(e, index, i)}
                          />
                        );
                      }
                    }
                  )}

                  <label id="birthdate">
                    <div>
                      <p className="label">Geboortedatum</p>
                      <OsnInputDate
                        defaultValue={item.contact_person.birthday}
                        onChangeDate={(e) => {
                          console.log(e);
                          changePerson(e, index, "birthday");
                        }}
                        template={1}
                      />
                    </div>
                  </label>

                  <label>
                    <div>
                      <p className="label">Afbeelding of avatar</p>

                      <OsnDndUpload type="image" show_example />
                    </div>
                  </label>

                  <label>
                    Gesproken taal:
                    <div className="language-container">
                      {console.log(item)}
                      <div>
                        <OsnCheckbox
                          checked={item.contact_person.language.dutch}
                          name={`${index} dutch`}
                          onChange={(e) => {
                            changePerson(e, index, "dutch");
                          }}
                          value="NL"
                        />
                      </div>
                      <div>
                        <OsnCheckbox
                          checked={item.contact_person.language.french}
                          name={`${index} french`}
                          onChange={(e) => {
                            changePerson(e, index, "french");
                          }}
                          value="FR"
                        />
                      </div>
                      <div>
                        <OsnCheckbox
                          checked={item.contact_person.language.german}
                          name={`${index} german`}
                          onChange={(e) => {
                            changePerson(e, index, "german");
                          }}
                          value="DE"
                        />
                      </div>
                      <div>
                        <OsnCheckbox
                          checked={item.contact_person.language.english}
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
                    {data.contact_persons.length !== 1 && (
                      <Icon
                        onClick={(e) => removePerson(e, index)}
                        name="Bin"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {(!data.contact_persons || data.contact_persons.length === 0) && (
              <p>Gelieve hierboven een contact persoon toe te voegen.</p>
            )}
          </div>
        </Fragment>
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

export default Contactperson;
