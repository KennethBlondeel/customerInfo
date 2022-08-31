import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import Icon from "@identitybuilding/idb-react-iconlib";
import store from "../store";
import { updateCurrentEstablishment } from "../actions/GeneralAction";
import { useDispatch } from "react-redux";
import {
  Button,
  OsnInputText,
  OsnSelect,
} from "@identitybuilding/idb-react-ui-elements";

const Search = (props) => {
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [dropdownloaded, setDropdownLoaded] = useState(true);
  const [data, setData] = useState(props.data);
  const [selected, setSelected] = useState(props.category);
  const [mainSelected, setMainSelected] = useState(props.mainCategory);
  const [result, setResult] = useState([]);
  const [mainResult, setMainResult] = useState([]);
  const searchRef = useRef();
  const searchMainRef = useRef();

  const publicFaxRef = useRef();
  const publicNameRef = useRef();
  const publicCellphoneRef = useRef();
  const publicPhoneRef = useRef();
  const publicEmailRef = useRef();
  const ITAARef = useRef();
  const APBRef = useRef();
  const FMSARef = useRef();
  const dispatch = useDispatch();

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

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

  const changeCategory = (e, action, type) => {
    const copy = data;

    let sub = {
      name: e,
      active: data.paid_version,
    };
    if (action === "ADD" && copy.category[0].name.length !== 0) {
      if (
        action === "ADD" &&
        !selected.some((item) => item.name === e) &&
        mainSelected.name !== e
      ) {
        if (e) {
          copy.category.push(sub);
          result.length = 0;
          props.createNotification("info", "Item is toegevoegd.");
          setData(copy);
          setLoaded(false);
          return;
        }
      }
    } else if (
      action === "ADD" &&
      copy.category.length === 1 &&
      copy.category[0].name.length === 0
    ) {
      copy.category[0].name = e;
      result.length = 0;
      props.createNotification("info", "Item is toegevoegd.");
    }

    if (action === "REMOVE") {
      if (
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Vastgoed (binnenland)" ||
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Agentschappen in onroerende goederen (binnenland)" ||
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Onroerende goederen (binnenland)" ||
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Immobiliën (binnenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML === "Vastgoed (binnenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML ===
          "Agentschappen in onroerende goederen (binnenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML === "Onroerende goederen (binnenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML === "Immobiliën (binnenland)"
      ) {
        data.BIV.length = 1;
        data.BIV[0].name = "";
        data.BIV[0].number = "";
        data.BIV[0].email = "";
        data.BIV[0].mobile = "";
      }
      if (
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Vastgoed (buitenland)" ||
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Agentschappen in onroerende goederen (buitenland)" ||
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Onroerende goederen (buitenland)" ||
        e.target.parentElement.parentElement.childNodes[1].innerHTML ===
          "Immobiliën (buitenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML === "Vastgoed (buitenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML ===
          "Agentschappen in onroerende goederen (buitenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML === "Onroerende goederen (buitenland)" ||
        e.target.parentElement.parentElement.parentElement.childNodes[0]
          .childNodes[1].innerHTML === "Immobiliën (buitenland)"
      ) {
        data.EPC.length = 1;
        data.EPC[0].name = "";
        data.EPC[0].number = "";
        data.EPC[0].email = "";
        data.EPC[0].mobile = "";
      }

      if (copy.category.length < 2) {
        copy.category[0].name = "";
      } else {
        copy.category.splice(type, 1);
      }
    }

    if (action === "REMOVEMAIN") {
      if (copy.main_category.length === 1) {
        let main = { active: false, name: "" };
        setMainSelected(main);
        copy.main_category[0] = main;
        if (
          type === "Vastgoed (binnenland)" ||
          type === "Agentschappen in onroerende goederen (binnenland)" ||
          type === "Onroerende goederen (binnenland)" ||
          type === "Immobiliën (binnenland)"
        ) {
          data.BIV.length = 1;
          data.BIV[0].name = "";
          data.BIV[0].number = "";
          data.BIV[0].email = "";
          data.BIV[0].mobile = "";
        }
        if (
          type === "Vastgoed (buitenland)" ||
          type === "Agentschappen in onroerende goederen (buitenland)" ||
          type === "Onroerende goederen (buitenland)" ||
          type === "Immobiliën (buitenland)"
        ) {
          data.EPC.length = 1;
          data.EPC[0].name = "";
          data.EPC[0].number = "";
          data.EPC[0].email = "";
          data.EPC[0].mobile = "";
        }
        // changeCategory(e, "ADD");
        else {
          props.createNotification(
            "warning",
            "Uw hoofdactiviteit is gewijzigd"
          );
        }
        setData(copy);
      }
    }

    if (action === "ADDMAIN") {
      if (copy.main_category[0].name.length === 0) {
        if (
          !selected.some((item) => item.name === e) &&
          mainSelected.name !== e
        ) {
          mainResult.length = 0;
          let main = { active: true, name: e };
          setMainSelected(main);
          copy.main_category[0] = main;
          // changeCategory(e, "REMOVE");
          props.createNotification("info", "Hoofdactiviteit toegevoegd");
          setData(copy);
        } else {
          props.createNotification(
            "error",
            "Deze activiteit is al geselecteerd."
          );
        }
      } else {
        props.createNotification(
          "error",
          "Bij de gratis versie is slechts 1 activiteit mogelijk!"
        );
      }
    }

    if (action === "ACTIVE") {
      if (!copy.category[type].active && !copy.paid_version) {
        if (!copy.category.some((item) => item.active)) {
          copy.category[type].active = !copy.category[type].active;
        } else {
          props.createNotification("error", "Maar 1 hoofdactiviteit te gelijk");
        }
      } else if (copy.paid_version) {
        copy.category[type].active = !copy.category[type].active;
      } else {
        copy.category[type].active = false;
      }
    }

    if (action === "KBOSUBACTIVE" && copy.paid_version) {
      copy.sub[type].active = !copy.sub[type].active;
    }
    if (action === "KBOMAINACTIVE" && copy.paid_version) {
      copy.main[type].active = !copy.main[type].active;
    }
    setData(copy);
    setLoaded(false);
  };

  const changeVastgoed = (index, type, value, target) => {
    let copy = data;

    let newVal;

    if (type === "mobile") {
      newVal = value
        .replace("+32 (0)", "0")
        .replace("+32", "0")
        .replace("0032", "0")
        .replace("32", "0")
        .replace("/", "")
        .replace("/", "")
        .replace("(0)", "0")
        .replace(".", "")
        .replace("-", "")
        .replace(" ", "");
    } else {
      newVal = value;
    }

    if (type === "email" && (!value.includes("@") || !value.includes("."))) {
      props.createNotification(
        "warning",
        "Jouw email werd niet opgeslaan vergeet '@' en '.' niet"
      );
      return;
    }

    copy[target][index][type] = newVal;

    setData(copy);
    setLoaded(false);
  };

  const addVastgoed = (e, target) => {
    let copy = data;
    let item;

    if (target === "BIV") {
      item = {
        BIV: "",
        prename: "",
        name: "",
        mobile: "",
        email: "",
        number: "",
      };
    } else if (target === "EPC") {
      item = {
        EPC: "",
        prename: "",
        name: "",
        mobile: "",
        email: "",
        number: "",
      };
    }

    if (target === "BIV" || target === "EPC") {
      copy[target].push(item);
    }

    console.log(copy);

    setData(copy);
    setLoaded(false);
  };

  const removeVastgoed = (index, target) => {
    let copy = data;

    copy[target].splice(index, 1);

    setData(copy);
    setLoaded(false);
  };

  const changePublic = (e) => {
    e.preventDefault();
    let copy = data;

    copy.name_nl =
      publicNameRef.current.childNodes[0].childNodes[0].childNodes[1].value;
    copy.public_email =
      publicEmailRef.current.childNodes[0].childNodes[0].childNodes[1].value;
    copy.public_cellphone =
      publicCellphoneRef.current.childNodes[0].childNodes[0].childNodes[1].value
        .replace("+32 (0)", "0")
        .replace("+32", "0")
        .replace("0032", "0")
        .replace("32", "0")
        .replace("/", "")
        .replace("/", "")
        .replace("(0)", "0")
        .replace(".", "")
        .replace("-", "")
        .replace(" ", "");
    copy.public_phone =
      publicPhoneRef.current.childNodes[0].childNodes[0].childNodes[1].value
        .replace("+32", "0")
        .replace("+32 (0)", "0")
        .replace("+32", "0")
        .replace("0032", "0")
        .replace("32", "0")
        .replace("/", "")
        .replace("/", "")
        .replace("(0)", "0")
        .replace(".", "")
        .replace("-", "")
        .replace(" ", "");
    copy.public_fax =
      publicFaxRef.current.childNodes[0].childNodes[0].childNodes[1].value
        .replace("+32", "0")
        .replace("+32 (0)", "0")
        .replace("+32", "0")
        .replace("0032", "0")
        .replace("32", "0")
        .replace("/", "")
        .replace("/", "")
        .replace("(0)", "0")
        .replace(".", "")
        .replace("-", "")
        .replace(" ", "");

    if (
      selected.some(
        (item) =>
          item.name === "Accountants" ||
          item.name === "Boekhouders" ||
          item.name === "Inrichting van boekhouding"
      ) ||
      data.main_category.some(
        (item) =>
          item.name === "Accountants" ||
          item.name === "Boekhouders" ||
          item.name === "Inrichting van boekhouding"
      ) ||
      copy.sub.some(
        (item) =>
          (item.name === "Accountants" && item.active) ||
          (item.name === "Boekhouders" && item.active) ||
          (item.name === "Inrichting van boekhouding" && item.activ)
      ) ||
      copy.category.some(
        (item) =>
          item.name === "Accountants" ||
          item.name === "Boekhouders" ||
          item.name === "Inrichting van boekhouding"
      )
    ) {
      copy.ITAA =
        ITAARef.current.childNodes[0].childNodes[0].childNodes[1].value;
    } else copy.ITAA = "";
    if (
      selected.some(
        (item) =>
          item.name === "Inrichting van apotheken" ||
          item.name === "Apothekers" ||
          item.name === "Apotheken (benodigdheden)"
      ) ||
      data.main_category.some(
        (item) =>
          item.name === "Inrichting van apotheken" ||
          item.name === "Apothekers" ||
          item.name === "Apotheken (benodigdheden)"
      ) ||
      copy.sub.some(
        (item) =>
          (item.name === "Inrichting van apotheken" && item.active) ||
          (item.name === "Apothekers" && item.active) ||
          (item.name === "Apotheken (benodigdheden)" && item.active)
      ) ||
      copy.category.some(
        (item) =>
          item.name === "Inrichting van apotheken" ||
          item.name === "Apothekers" ||
          item.name === "Apotheken (benodigdheden)"
      )
    ) {
      copy.APB = APBRef.current.childNodes[0].childNodes[0].childNodes[1].value;
    } else copy.APB = "";

    if (
      selected.some(
        (item) =>
          item.name === "Banques" ||
          item.name === "Banken" ||
          item.name === "Spaarbanken" ||
          item.name === "Privé-spaarbanken" ||
          item.name === "Banken, geldautomaten" ||
          item.name === "Banques, guichets automatiques" ||
          item.name === "Sociale verzekeringsfondsen" ||
          item.name === "Reisverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, autoverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, brandverzekeringen" ||
          item.name ===
            "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" ||
          item.name ===
            "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, kredietverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, levensverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, pensioenverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, transportverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, ziekteverzekeringen" ||
          item.name === "verzekeringsmakelaars" ||
          item.name === "verzekeringsmakelaars, autoverzekeringen" ||
          item.name === "verzekeringsmakelaars, brandverzekeringen" ||
          item.name === "verzekeringsmakelaars, hospitalisatieverzekeringen" ||
          item.name === "verzekeringsmakelaars, kredietverzekeringen" ||
          item.name === "verzekeringsmakelaars, levensverzekeringen" ||
          item.name === "verzekeringsmakelaars, pensioenverzekeringen" ||
          item.name === "verzekeringsmakelaars, ziekteverzekeringen" ||
          item.name ===
            "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen"
      ) ||
      data.main_category.some(
        (item) =>
          item.name === "Banques" ||
          item.name === "Banken" ||
          item.name === "Spaarbanken" ||
          item.name === "Privé-spaarbanken" ||
          item.name === "Banken, geldautomaten" ||
          item.name === "Banques, guichets automatiques" ||
          item.name === "Sociale verzekeringsfondsen" ||
          item.name === "Reisverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, autoverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, brandverzekeringen" ||
          item.name ===
            "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" ||
          item.name ===
            "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, kredietverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, levensverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, pensioenverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, transportverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, ziekteverzekeringen" ||
          item.name === "verzekeringsmakelaars" ||
          item.name === "verzekeringsmakelaars, autoverzekeringen" ||
          item.name === "verzekeringsmakelaars, brandverzekeringen" ||
          item.name === "verzekeringsmakelaars, hospitalisatieverzekeringen" ||
          item.name === "verzekeringsmakelaars, kredietverzekeringen" ||
          item.name === "verzekeringsmakelaars, levensverzekeringen" ||
          item.name === "verzekeringsmakelaars, pensioenverzekeringen" ||
          item.name === "verzekeringsmakelaars, ziekteverzekeringen" ||
          item.name ===
            "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen"
      ) ||
      copy.sub.some(
        (item) =>
          (item.name === "Banques" && item.active) ||
          (item.name === "Banken" && item.active) ||
          (item.name === "Spaarbanken" && item.active) ||
          (item.name === "Privé-spaarbanken" && item.active) ||
          (item.name === "Banken, geldautomaten" && item.active) ||
          (item.name === "Banques, guichets automatiques" && item.active) ||
          (item.name === "Sociale verzekeringsfondsen" && item.active) ||
          (item.name === "Reisverzekeringen" && item.active) ||
          (item.name === "Verzekeringsmaatschappijen, autoverzekeringen" &&
            item.active) ||
          (item.name === "Verzekeringsmaatschappijen, brandverzekeringen" &&
            item.active) ||
          (item.name ===
            "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" &&
            item.active) ||
          (item.name ===
            "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" &&
            item.active) ||
          (item.name === "Verzekeringsmaatschappijen, kredietverzekeringen" &&
            item.active) ||
          (item.name === "Verzekeringsmaatschappijen, levensverzekeringen" &&
            item.active) ||
          (item.name === "Verzekeringsmaatschappijen, pensioenverzekeringen" &&
            item.active) ||
          (item.name === "Verzekeringsmaatschappijen, transportverzekeringen" &&
            item.active) ||
          (item.name === "Verzekeringsmaatschappijen, ziekteverzekeringen" &&
            item.active) ||
          (item.name === "verzekeringsmakelaars" && item.active) ||
          (item.name === "verzekeringsmakelaars, autoverzekeringen" &&
            item.active) ||
          (item.name === "verzekeringsmakelaars, brandverzekeringen" &&
            item.active) ||
          (item.name === "verzekeringsmakelaars, hospitalisatieverzekeringen" &&
            item.active) ||
          (item.name === "verzekeringsmakelaars, kredietverzekeringen" &&
            item.active) ||
          (item.name === "verzekeringsmakelaars, levensverzekeringen" &&
            item.active) ||
          (item.name === "verzekeringsmakelaars, pensioenverzekeringen" &&
            item.active) ||
          (item.name === "verzekeringsmakelaars, ziekteverzekeringen" &&
            item.active) ||
          (item.name ===
            "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen" &&
            item.active)
      ) ||
      copy.category.some(
        (item) =>
          item.name === "Banques" ||
          item.name === "Banken" ||
          item.name === "Spaarbanken" ||
          item.name === "Privé-spaarbanken" ||
          item.name === "Banken, geldautomaten" ||
          item.name === "Banques, guichets automatiques" ||
          item.name === "Sociale verzekeringsfondsen" ||
          item.name === "Reisverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, autoverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, brandverzekeringen" ||
          item.name ===
            "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" ||
          item.name ===
            "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, kredietverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, levensverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, pensioenverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, transportverzekeringen" ||
          item.name === "Verzekeringsmaatschappijen, ziekteverzekeringen" ||
          item.name === "verzekeringsmakelaars" ||
          item.name === "verzekeringsmakelaars, autoverzekeringen" ||
          item.name === "verzekeringsmakelaars, brandverzekeringen" ||
          item.name === "verzekeringsmakelaars, hospitalisatieverzekeringen" ||
          item.name === "verzekeringsmakelaars, kredietverzekeringen" ||
          item.name === "verzekeringsmakelaars, levensverzekeringen" ||
          item.name === "verzekeringsmakelaars, pensioenverzekeringen" ||
          item.name === "verzekeringsmakelaars, ziekteverzekeringen" ||
          item.name ===
            "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen"
      )
    ) {
      copy.FSMA =
        FMSARef.current.childNodes[0].childNodes[0].childNodes[1].value;
    } else copy.FSMA = "";

    setData(copy);
    setLoaded(false);
  };

  useEffect(() => {
    setLoaded(false);
    setLoaded(true);
  }, [selected, mainSelected, data, result]);

  const getSearchdata = (value, type) => {
    if (typingTimeout) clearTimeout(typingTimeout);

    setDropdownLoaded(false);
    let option = {
      size: 15,
      query: {
        bool: {
          must: [
            {
              query_string: {
                query: `*${value}*`,
                fields: ["name_nl", "name_fr", "name_de", "name_en"],
              },
            },
          ],
        },
      },
    };
    setTimeout(async () => {
      source.cancel();
    }, 1000);
    console.log(source.token);
    setTypingTimeout(
      setTimeout(async () => {
        axios
          .get(
            "https://search-osn-management-hkfarflgp5aj2vbhfzvmyycuuy.eu-central-1.es.amazonaws.com/categories/_search",
            {
              auth: { username: "osn-admin", password: "O15s19n14!" },
              params: {
                source_content_type: "application/json",
                source: JSON.stringify(option),
              },
              cancelToken: source.token,
            }
          )
          .then((res) => {
            console.log(res);
            if (type === "main" && data.main_category[0].name.length === 0) {
              let copy = mainResult;
              mainResult.length = 0;

              for (let i = 0; i < res.data.hits.hits.length; i++) {
                copy.push({
                  id: res.data.hits.hits[i]._id,
                  text: res.data.hits.hits[i]._source.name_nl,
                });
              }
              setMainResult(copy);
              setDropdownLoaded(true);
            } else if (type === "main") {
              props.createNotification("warning", "U heeft al een activiteit");
            }
            if (type === "sub" && data.paid_version) {
              let copy = result;
              result.length = 0;

              for (let i = 0; i < res.data.hits.hits.length; i++) {
                copy.push({
                  id: res.data.hits.hits[i]._id,
                  text: res.data.hits.hits[i]._source.name_nl,
                });
              }
              setResult(copy);
              setDropdownLoaded(true);
            } else if (type === "sub") {
              props.createNotification(
                "warning",
                "Dit hoort bij de betalende versie."
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500)
    );
  };

  const changeVersion = (type) => {
    let copy = data;

    copy.paid_version = type;

    if (type === false) {
      for (let x = 0; x < data.category.length; x++) {
        if (
          data.category[x].name === "Vastgoed (binnenland)" ||
          data.category[x].name ===
            "Agentschappen in onroerende goederen (binnenland)" ||
          data.category[x].name === "Onroerende goederen (binnenland)" ||
          data.category[x].name === "Immobiliën (binnenland)"
        ) {
          data.BIV.length = 1;
          data.BIV[0].name = "";
          data.BIV[0].number = "";
          data.BIV[0].email = "";
          data.BIV[0].mobile = "";
        }
        if (
          data.category[x].name === "Vastgoed (buitenland)" ||
          data.category[x].name ===
            "Agentschappen in onroerende goederen (buitenland)" ||
          data.category[x].name === "Onroerende goederen (buitenland)" ||
          data.category[x].name === "Immobiliën (buitenland)"
        ) {
          result.length = 0;
          data.EPC.length = 1;
          data.EPC[0].name = "";
          data.EPC[0].number = "";
          data.EPC[0].email = "";
          data.EPC[0].mobile = "";
        }
      }
      for (let i = 0; i < copy.category.length; i++) {
        copy.category[i].active = false;
        copy.category.length = 1;
        copy.category[0].name = "";
      }
      for (let v = 0; v < copy.sub.length; v++) {
        copy.sub[v].active = false;
      }
    }

    if (type === true) {
      for (let k = 0; k < copy.category.length; k++) {
        copy.category[k].active = true;
      }
      for (let j = 0; j < copy.sub.length; j++) {
        copy.sub[j].active = true;
      }
    }

    setData(copy);
    setLoaded(false);
  };

  useEffect(() => {
    setData(props.data);
    setLoaded(true);
  });

  return (
    <section className="c">
      <div className="intro">
        <h2>
          <span className="typo">03</span>
        </h2>
        <div>
          <h2>Hoe kunnen bezoekers je bereiken?</h2>
          <span>
            Je begrijpt dat het heel belangrijk is om correcte gegevens van je
            onderneming te publiceren.
            <br /> Op deze manier kunnen bezoekers je ook bereiken.
            <br />
            <span className="extra">
              <Icon name="Info" />
              De volgende informatie zal <b>ZICHTBAAR ZIJN VOOR IEDEREEN!</b>
            </span>
          </span>
        </div>
      </div>

      {data && (
        <div className="category">
          <div className="section-container">
            <form className="section">
              <div className="public-inputs">
                <div>
                  <OsnInputText
                    title="Maatschappelijke Naam (staat vast)"
                    icon="Briefcase"
                    required
                    defaultValue={data.establishment}
                    className="input"
                    disabled
                  />
                </div>
                <label className="commercieleNaam">
                  <span ref={publicNameRef}>
                    <OsnInputText
                      title="Commerciële naam"
                      icon="Briefcase"
                      required
                      defaultValue={data.name_nl}
                      className="input"
                    />
                  </span>

                  <div className="info">
                    <p>
                      Indien uw "Commerciële naam" verschilt van uw "Officiële
                      naam (ook Maatschappelijke naam genoemd)" kan je deze hier
                      invoeren.
                    </p>
                    <p>
                      Wij respecteren alle leestekens zoals je deze hier zelf
                      invoert. Gebruik dus HOOFDLETTERS en kleine letters waar
                      nodig!
                    </p>
                  </div>
                </label>
                <div>
                  <span ref={publicEmailRef}>
                    <OsnInputText
                      title="Email (wordt dus nooit zichtbaar)"
                      icon="Mail"
                      required
                      defaultValue={data.public_email}
                      className="input"
                    />
                  </span>
                </div>
                <br />
                <span className="help">
                  <Icon name="Info" />
                  De publicatie van 1 telefoonnummer is een{" "}
                  <a
                    href="https://news.economie.fgov.be/203683-deze-info-moet-u-zeker-vermelden-op-uw-bedrijfswebsite"
                    target="_blank"
                    rel="noreferrer"
                    className="yellow bold"
                  >
                    vereiste
                  </a>{" "}
                  van FOD Economie
                </span>
                <div>
                  <span ref={publicCellphoneRef}>
                    <OsnInputText
                      title="Mobiele telefoon"
                      icon="Cellphone"
                      required
                      defaultValue={data.public_cellphone}
                      className="input"
                    />
                  </span>
                </div>

                <span ref={publicPhoneRef}>
                  <OsnInputText
                    title="Telefoon"
                    icon="Phone"
                    required
                    defaultValue={data.public_phone}
                    className="input"
                  />
                </span>

                <span ref={publicFaxRef}>
                  <OsnInputText
                    title="Fax"
                    icon="Fax"
                    required
                    defaultValue={data.public_fax}
                    className="input"
                  />
                </span>
                <label className="select">
                  Handel je met consumenten (particulieren)?
                  <OsnSelect
                    onChange={(e) => {
                      let copy = data;

                      copy.particulieren = e.id;

                      setData(copy);
                      setLoaded(false);
                    }}
                    active={
                      data.particulieren === 0
                        ? "Gelieve een optie te kiezen!"
                        : data.particulieren === 1
                        ? "Nee"
                        : data.particulieren === 2
                        ? "Ja"
                        : "Ja, ik handel met bedrijven (B2B) en consumenten (B2C)"
                    }
                    options={[
                      {
                        id: 0,
                        name: "Gelieve een optie te kiezen!",
                      },
                      {
                        id: 1,
                        name: "Nee",
                      },
                      {
                        id: 2,
                        name: "Ja",
                      },
                      {
                        id: 3,
                        name: "Ja, ik handel met bedrijven (B2B) en consumenten (B2C)",
                      },
                    ]}
                  />
                </label>
                <label className="select">
                  Wat bied je aan?
                  <OsnSelect
                    onChange={(e) => {
                      let copy = data;
                      copy.kind = e.id;
                      setData(copy);
                      setLoaded(false);
                    }}
                    active={
                      data.kind === 0
                        ? "Gelieve een optie te kiezen!"
                        : data.kind === 1
                        ? "Goederen & diensten"
                        : data.kind === 2
                        ? "Diensten"
                        : "Goederen"
                    }
                    options={[
                      {
                        id: 0,
                        name: "Gelieve een optie te kiezen!",
                      },
                      {
                        id: 1,
                        name: "Goederen & diensten",
                      },
                      {
                        id: 2,
                        name: "Diensten",
                      },
                      {
                        id: 3,
                        name: "Goederen",
                      },
                    ]}
                  />
                </label>
              </div>
            </form>

            <div className="section">
              <p>
                Jouw onderneming kan gevonden worden onder de volgende
                {data.paid_version && <b className="yellow"> activiteit(en)</b>}
                {!data.paid_version && <b className="yellow"> activiteit</b>}:
              </p>
              <div
                onClick={() => {
                  changeVersion(!data.paid_version);
                }}
                className={["option2", !data.paid_version ? "active" : ""].join(
                  " "
                )}
              >
                <p className="typo">GRATIS</p>
                <p className="typo">BETALEND</p>
              </div>
              {!data.paid_version && (
                <div
                  className={[
                    data.paid_version ? "active" : "",
                    "false-info",
                  ].join(" ")}
                >
                  <Icon name="Info" />
                  <p>Je wordt enkel gevonden onder jouw hoofdactiviteit!</p>
                </div>
              )}
              {data.paid_version && (
                <div
                  className={[
                    data.paid_version ? "active" : "",
                    "false-info",
                  ].join(" ")}
                >
                  <Icon name="Info" />
                  <p>
                    Voeg alle activiteiten toe die jouw onderneming aanbiedt!
                  </p>
                </div>
              )}

              <section>
                <h1 className="typo">Jouw hoofdactiviteit:</h1>
                <div className="c-selected__list">
                  {data.main.map((category, index) => (
                    <Fragment key={index}>
                      <button
                        className={[
                          "select-button",
                          data.main_category[0].name.length < 1
                            ? "active"
                            : "inactive",
                        ].join(" ")}
                      >
                        <p
                          onClick={(e) => {
                            changeCategory(e, "KBOMAINACTIVE", index);
                          }}
                        >
                          {category.name}
                        </p>
                      </button>
                    </Fragment>
                  ))}

                  {data.main_category[0].name !== "" && (
                    <Fragment>
                      {data.main_category.map((category) => (
                        <Fragment key={category}>
                          <button className="select-button active">
                            <Icon
                              className="c-selected-icon"
                              onClick={(e) => {
                                changeCategory(e, "REMOVEMAIN", category.name);
                              }}
                              name="CloseCircle"
                            />
                            {category.name}
                          </button>
                        </Fragment>
                      ))}
                    </Fragment>
                  )}
                </div>
                <span className="search-bar" ref={searchMainRef}>
                  <OsnInputText
                    dropdown_result={dropdownloaded ? [...mainResult] : []}
                    required
                    placeholder="Wens je jouw activiteit aan te passen?"
                    onMouseDown={(e) => {
                      changeCategory(e.text, "ADDMAIN");
                    }}
                    onChange={(e) => {
                      getSearchdata(
                        searchMainRef.current.childNodes[0].childNodes[0].value,
                        "main"
                      );
                    }}
                  />
                </span>
                {data.main_category.some(
                  (item) =>
                    item.name === "Accountants" ||
                    item.name === "Boekhouders" ||
                    item.name === "Inrichting van boekhouding"
                ) && (
                  <label>
                    <div>
                      <span ref={ITAARef}>
                        <OsnInputText
                          required
                          title="ITAA registratie"
                          defaultValue={data.ITAA}
                          icon="Afternoon"
                        />
                      </span>
                    </div>
                  </label>
                )}
                {data.main_category[0].name.length === 0 &&
                  data.main.some(
                    (item) =>
                      item.name === "Accountants" ||
                      item.name === "Boekhouders" ||
                      item.name === "Inrichting van boekhouding"
                  ) && (
                    <label>
                      <div>
                        <span ref={ITAARef}>
                          <OsnInputText
                            required
                            title="ITAA registratie"
                            defaultValue={data.ITAA}
                            icon="Afternoon"
                          />
                        </span>
                      </div>
                    </label>
                  )}
                {data.main_category.some(
                  (item) =>
                    item.name === "Inrichting van apotheken" ||
                    item.name === "Apothekers" ||
                    item.name === "Apotheken (benodigdheden)"
                ) && (
                  <span ref={APBRef}>
                    <OsnInputText
                      required
                      title="APB registratie"
                      defaultValue={data.APB}
                      icon="Afternoon"
                    />
                  </span>
                )}
                {data.main_category[0].name.length === 0 &&
                  data.main.some(
                    (item) =>
                      item.name === "Inrichting van apotheken" ||
                      item.name === "Apothekers" ||
                      item.name === "Apotheken (benodigdheden)"
                  ) && (
                    <span ref={APBRef}>
                      <OsnInputText
                        required
                        title="APB registratie"
                        defaultValue={data.APB}
                        icon="Afternoon"
                      />
                    </span>
                  )}
                {data.main_category.some(
                  (item) =>
                    item.name === "Banques" ||
                    item.name === "Banken" ||
                    item.name === "Spaarbanken" ||
                    item.name === "Privé-spaarbanken" ||
                    item.name === "Banken, geldautomaten" ||
                    item.name === "Banques, guichets automatiques" ||
                    item.name === "Sociale verzekeringsfondsen" ||
                    item.name === "Reisverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, autoverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, brandverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, kredietverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, levensverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, pensioenverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, transportverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen, ziekteverzekeringen" ||
                    item.name === "verzekeringsmakelaars" ||
                    item.name === "verzekeringsmakelaars, autoverzekeringen" ||
                    item.name === "verzekeringsmakelaars, brandverzekeringen" ||
                    item.name ===
                      "verzekeringsmakelaars, hospitalisatieverzekeringen" ||
                    item.name ===
                      "verzekeringsmakelaars, kredietverzekeringen" ||
                    item.name ===
                      "verzekeringsmakelaars, levensverzekeringen" ||
                    item.name ===
                      "verzekeringsmakelaars, pensioenverzekeringen" ||
                    item.name ===
                      "verzekeringsmakelaars, ziekteverzekeringen" ||
                    item.name ===
                      "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen"
                ) && (
                  <label>
                    <div>
                      <span ref={FMSARef}>
                        <OsnInputText
                          required
                          title="FSMA registratie"
                          defaultValue={
                            data.FSMA.length === 0
                              ? data.number
                                  .replaceAll(".", "")
                                  .slice(2, data.number.length)
                              : data.FSMA
                          }
                          icon="Afternoon"
                        />
                      </span>
                    </div>
                  </label>
                )}
                {data.main_category[0].name.length === 0 &&
                  data.main.some(
                    (item) =>
                      item.name === "Banques" ||
                      item.name === "Banken" ||
                      item.name === "Spaarbanken" ||
                      item.name === "Privé-spaarbanken" ||
                      item.name === "Banken, geldautomaten" ||
                      item.name === "Banques, guichets automatiques" ||
                      item.name === "Sociale verzekeringsfondsen" ||
                      item.name === "Reisverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, autoverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, brandverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, kredietverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, levensverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, pensioenverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, transportverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, ziekteverzekeringen" ||
                      item.name === "verzekeringsmakelaars" ||
                      item.name ===
                        "verzekeringsmakelaars, autoverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, brandverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, hospitalisatieverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, kredietverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, levensverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, pensioenverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, ziekteverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen"
                  ) && (
                    <label>
                      <div>
                        <span ref={FMSARef}>
                          <OsnInputText
                            required
                            title="FSMA registratie"
                            defaultValue={
                              data.FSMA.length === 0
                                ? data.number
                                    .replaceAll(".", "")
                                    .slice(2, data.number.length)
                                : data.FSMA
                            }
                            icon="Afternoon"
                          />
                        </span>
                      </div>
                    </label>
                  )}
                {data.main_category.some(
                  (item) =>
                    item.name ===
                      "Agentschappen in onroerende goederen (binnenland)" ||
                    item.name === "Onroerende goederen (binnenland)" ||
                    item.name === "Vastgoed (binnenland)" ||
                    item.name === "Immobiliën (binnenland)"
                ) && (
                  <Fragment>
                    {data.BIV.map((value, index) => (
                      <div
                        key={index}
                        className={[
                          "biv-row",
                          data.BIV.length - 1 === index ? "last" : "",
                        ].join(" ")}
                      >
                        <div>
                          <OsnInputText
                            size="M"
                            required
                            title="BIV registratie"
                            defaultValue={value.number}
                            icon="Afternoon"
                            onBlur={(e) =>
                              changeVastgoed(
                                index,
                                "number",
                                e.target.value,
                                "BIV"
                              )
                            }
                          />
                          <OsnInputText
                            size="M"
                            required
                            icon="UserM"
                            title="Voornaam"
                            defaultValue={value.prename}
                            onBlur={(e) =>
                              changeVastgoed(
                                index,
                                "prename",
                                e.target.value,
                                "BIV"
                              )
                            }
                          />
                          <label>
                            <div>
                              <OsnInputText
                                size="M"
                                icon="UserM"
                                required
                                title="Naam"
                                defaultValue={value.name}
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "name",
                                    e.target.value,
                                    "BIV"
                                  )
                                }
                              />
                            </div>
                          </label>
                          <label>
                            <div>
                              <OsnInputText
                                required
                                size="M"
                                icon="Cellphone"
                                title="Mobiel"
                                defaultValue={value.mobile}
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "mobile",
                                    e.target.value,
                                    "BIV"
                                  )
                                }
                              />
                            </div>
                          </label>
                          <label className="email">
                            <div>
                              <OsnInputText
                                required
                                size="L"
                                icon="Mail"
                                title="Email (wordt dus nooit zichtbaar)"
                                defaultValue={value.email}
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "email",
                                    e.target.value,
                                    "BIV"
                                  )
                                }
                              />
                            </div>
                          </label>
                        </div>
                        <div className="buttons">
                          {data.BIV.length !== 1 && (
                            <label
                              onClick={(e) => removeVastgoed(index, "BIV")}
                            >
                              <Icon name="CloseCircle" />
                            </label>
                          )}
                          {data.BIV.length === index + 1 && (
                            <label onClick={(e) => addVastgoed(e, "BIV")}>
                              <Icon name="AddCircle" />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </Fragment>
                )}
                {data.main_category[0].name.length === 0 &&
                  data.main.some(
                    (item) =>
                      item.name ===
                        "Agentschappen in onroerende goederen (binnenland)" ||
                      item.name === "Onroerende goederen (binnenland)" ||
                      item.name === "Vastgoed (binnenland)" ||
                      item.name === "Immobiliën (binnenland)"
                  ) && (
                    <Fragment>
                      {data.BIV.map((value, index) => (
                        <div
                          key={index}
                          className={[
                            "biv-row",
                            data.BIV.length - 1 === index ? "last" : "",
                          ].join(" ")}
                        >
                          <div>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  title="BIV registratie"
                                  defaultValue={value.number}
                                  icon="Afternoon"
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "number",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  icon="UserM"
                                  title="Voornaam"
                                  defaultValue={value.prename}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "prename",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  icon="UserM"
                                  required
                                  title="Naam"
                                  defaultValue={value.name}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "name",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  required
                                  size="M"
                                  icon="Cellphone"
                                  title="mobiel"
                                  defaultValue={value.mobile}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "mobile",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label className="email">
                              <div>
                                <OsnInputText
                                  required
                                  size="L"
                                  icon="Mail"
                                  title="Email"
                                  defaultValue={value.email}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "email",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                          </div>
                          <div className="buttons">
                            {data.BIV.length !== 1 && (
                              <label
                                onClick={(e) => removeVastgoed(index, "BIV")}
                              >
                                <Icon name="CloseCircle" />
                              </label>
                            )}
                            {data.BIV.length === index + 1 && (
                              <label onClick={(e) => addVastgoed(e, "BIV")}>
                                <Icon name="AddCircle" />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  )}
                {data.main_category.some(
                  (item) =>
                    item.name ===
                      "Agentschappen in onroerende goederen (buitenland)" ||
                    item.name === "Onroerende goederen (buitenland)" ||
                    item.name === "Immobiliën (buitenland)" ||
                    item.name === "Vastgoed (buitenland)"
                ) && (
                  <Fragment>
                    {data.EPC.map((value, index) => (
                      <div key={index} className="biv-row">
                        <div>
                          <label>
                            <div>
                              <OsnInputText
                                size="M"
                                required
                                title="EPC registratie"
                                defaultValue={value.number}
                                icon="Afternoon"
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "number",
                                    e.target.value,
                                    "EPC"
                                  )
                                }
                              />
                            </div>
                          </label>
                          <label>
                            <div>
                              <OsnInputText
                                size="M"
                                required
                                icon="UserM"
                                title="Voornaam"
                                defaultValue={value.Prename}
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "prename",
                                    e.target.value,
                                    "EPC"
                                  )
                                }
                              />
                            </div>
                          </label>
                          <label>
                            <div>
                              <OsnInputText
                                size="M"
                                icon="UserM"
                                required
                                title="Naam"
                                defaultValue={value.name}
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "name",
                                    e.target.value,
                                    "EPC"
                                  )
                                }
                              />
                            </div>
                          </label>
                          <label>
                            <div>
                              <OsnInputText
                                required
                                size="M"
                                icon="Cellphone"
                                title="mobiel"
                                defaultValue={value.mobile}
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "mobile",
                                    e.target.value,
                                    "EPC"
                                  )
                                }
                              />
                            </div>
                          </label>
                          <label className="email">
                            <div>
                              <OsnInputText
                                required
                                size="L"
                                icon="Mail"
                                title="Email"
                                defaultValue={value.email}
                                onBlur={(e) =>
                                  changeVastgoed(
                                    index,
                                    "email",
                                    e.target.value,
                                    "EPC"
                                  )
                                }
                              />
                            </div>
                          </label>
                        </div>
                        <div className="buttons">
                          {data.EPC.length !== 1 && (
                            <label
                              onClick={(e) => removeVastgoed(index, "EPC")}
                            >
                              <Icon name="CloseCircle" />
                            </label>
                          )}
                          {data.EPC.length === index + 1 && (
                            <label onClick={(e) => addVastgoed(e, "EPC")}>
                              <Icon name="AddCircle" />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </Fragment>
                )}
                {data.main_category[0].name.length === 0 &&
                  data.main.some(
                    (item) =>
                      item.name ===
                        "Agentschappen in onroerende goederen (buitenland)" ||
                      item.name === "Onroerende goederen (buitenland)" ||
                      item.name === "Immobiliën (buitenland)" ||
                      item.name === "Vastgoed (buitenland)"
                  ) && (
                    <Fragment>
                      {data.EPC.map((value, index) => (
                        <div
                          key={index}
                          className={[
                            "biv-row",
                            data.EPC.length - 1 === index ? "last" : "",
                          ].join(" ")}
                        >
                          <div>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  title="EPC registratie"
                                  defaultValue={value.number}
                                  icon="Afternoon"
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "number",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  icon="UserM"
                                  title="Voornaam"
                                  defaultValue={value.Prename}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "prename",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  icon="UserM"
                                  required
                                  title="Naam"
                                  defaultValue={value.name}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "name",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  required
                                  size="M"
                                  icon="Cellphone"
                                  title="mobiel"
                                  defaultValue={value.mobile}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "mobile",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label className="email">
                              <div>
                                <OsnInputText
                                  required
                                  size="L"
                                  icon="Mail"
                                  title="Email"
                                  defaultValue={value.email}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "email",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                          </div>
                          <div className="buttons">
                            {data.EPC.length !== 1 && (
                              <label
                                onClick={(e) => removeVastgoed(index, "EPC")}
                              >
                                <Icon name="CloseCircle" />
                              </label>
                            )}
                            {data.EPC.length === index + 1 && (
                              <label onClick={(e) => addVastgoed(e, "EPC")}>
                                <Icon name="AddCircle" />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  )}
              </section>

              {data.paid_version && (
                <section>
                  <h1 className="typo">Jouw activiteiten opgehaald uit KBO:</h1>
                  {data.paid_version !== "" && (
                    <Fragment>
                      <p></p>

                      <div className="c-selected__list">
                        {data.sub.map((category, index) => (
                          <Fragment key={index}>
                            <button
                              className={[
                                "select-button",
                                category.active ? "active" : "",
                              ].join(" ")}
                            >
                              <Icon
                                className="c-selected-icon"
                                onClick={(e) => {
                                  changeCategory(e, "KBOSUBACTIVE", index);
                                }}
                                name={[
                                  category.active ? "Checked" : "Unchecked",
                                ]}
                              />
                              <p
                                onClick={(e) => {
                                  changeCategory(e, "KBOSUBACTIVE", index);
                                }}
                              >
                                {category.name}
                              </p>
                            </button>
                          </Fragment>
                        ))}
                      </div>
                      <br />
                      {data.category[0].name.length !== 0 && (
                        <Fragment>
                          <p>
                            Jouw keuze voor extra activiteiten: (geen beperking
                            bij betalende optie)
                          </p>
                          <div className="c-selected__list">
                            {selected.map((category, index) => (
                              <Fragment key={index}>
                                <button
                                  className={[
                                    "select-button",
                                    category.active ? "active" : "",
                                  ].join(" ")}
                                >
                                  <Icon
                                    className="c-selected-icon"
                                    onClick={(e) => {
                                      changeCategory(e, "REMOVE", index);
                                    }}
                                    name="CloseCircle"
                                  />

                                  <p
                                    onClick={(e) => {
                                      changeCategory(e, "ACTIVE", index);
                                    }}
                                  >
                                    {category.name}
                                  </p>
                                </button>
                              </Fragment>
                            ))}
                          </div>
                        </Fragment>
                      )}
                      <p>
                        Hier kan je meerdere activiteiten toevoegen. Bij invoer
                        van een trefwoord kan je kiezen uit de verschillende
                        suggesties:
                      </p>
                      <span className="search-bar" ref={searchRef}>
                        <OsnInputText
                          dropdown_result={dropdownloaded ? [...result] : []}
                          required
                          placeholder="Wens je een activiteit aan te passen of toe te voegen?"
                          onMouseDown={(e) => {
                            changeCategory(e.text, "ADD");
                          }}
                          onChange={(e) => {
                            getSearchdata(
                              searchRef.current.childNodes[0].childNodes[0]
                                .value,
                              "sub"
                            );
                          }}
                        />
                      </span>
                    </Fragment>
                  )}

                  {data.category.some(
                    (item) =>
                      (item.name === "Accountants" && item.active) ||
                      (item.name === "Boekhouders" && item.active) ||
                      (item.name === "Inrichting van boekhouding" &&
                        item.active)
                  ) && (
                    <label>
                      <div>
                        <span ref={ITAARef}>
                          <OsnInputText
                            required
                            title="ITAA registratie"
                            defaultValue={data.ITAA}
                            icon="Afternoon"
                          />
                        </span>
                      </div>
                    </label>
                  )}
                  {data.sub.some(
                    (item) =>
                      item.name === "Accountants" ||
                      item.name === "Boekhouders" ||
                      item.name === "Inrichting van boekhouding"
                  ) &&
                    !data.sub.some(
                      (item) =>
                        item.name === "Accountants" ||
                        item.name === "Boekhouders" ||
                        item.name === "Inrichting van boekhouding"
                    ) && (
                      <label>
                        <div>
                          <span ref={ITAARef}>
                            <OsnInputText
                              required
                              title="ITAA registratie"
                              defaultValue={data.ITAA}
                              icon="Afternoon"
                            />
                          </span>
                        </div>
                      </label>
                    )}

                  {data.category.some(
                    (item) =>
                      (item.name === "Inrichting van apotheken" &&
                        item.active) ||
                      (item.name === "Apothekers" && item.active) ||
                      (item.name === "Apotheken (benodigdheden)" && item.active)
                  ) && (
                    <span ref={APBRef}>
                      <OsnInputText
                        required
                        title="APB registratie"
                        defaultValue={data.APB}
                        icon="Afternoon"
                      />
                    </span>
                  )}
                  {data.sub.some(
                    (item) =>
                      (item.name === "Inrichting van apotheken" &&
                        item.active) ||
                      (item.name === "Apothekers" && item.active) ||
                      (item.name === "Apotheken (benodigdheden)" && item.active)
                  ) &&
                    !data.category.some(
                      (item) =>
                        item.name === "Inrichting van apotheken" ||
                        item.name === "Apothekers" ||
                        item.name === "Apotheken (benodigdheden)"
                    ) && (
                      <span ref={APBRef}>
                        <OsnInputText
                          required
                          title="APB registratie"
                          defaultValue={data.APB}
                          icon="Afternoon"
                        />
                      </span>
                    )}
                  {data.category.some(
                    (item) =>
                      item.name === "Banques" ||
                      item.name === "Banken" ||
                      item.name === "Spaarbanken" ||
                      item.name === "Privé-spaarbanken" ||
                      item.name === "Banken, geldautomaten" ||
                      item.name === "Banques, guichets automatiques" ||
                      item.name === "Sociale verzekeringsfondsen" ||
                      item.name === "Reisverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, autoverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, brandverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, kredietverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, levensverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, pensioenverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, transportverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen, ziekteverzekeringen" ||
                      item.name === "verzekeringsmakelaars" ||
                      item.name ===
                        "verzekeringsmakelaars, autoverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, brandverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, hospitalisatieverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, kredietverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, levensverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, pensioenverzekeringen" ||
                      item.name ===
                        "verzekeringsmakelaars, ziekteverzekeringen" ||
                      item.name ===
                        "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen"
                  ) && (
                    <label>
                      <div>
                        <span ref={FMSARef}>
                          <OsnInputText
                            required
                            title="FSMA registratie"
                            defaultValue={
                              data.FSMA.length === 0
                                ? data.number
                                    .replaceAll(".", "")
                                    .slice(2, data.number.length)
                                : data.FSMA
                            }
                            icon="Afternoon"
                          />
                        </span>
                      </div>
                    </label>
                  )}
                  {data.sub.some(
                    (item) =>
                      (item.name === "Banques" && item.active) ||
                      (item.name === "Banken" && item.active) ||
                      (item.name === "Spaarbanken" && item.active) ||
                      (item.name === "Privé-spaarbanken" && item.active) ||
                      (item.name === "Banken, geldautomaten" && item.active) ||
                      (item.name === "Banques, guichets automatiques" &&
                        item.active) ||
                      (item.name === "Sociale verzekeringsfondsen" &&
                        item.active) ||
                      (item.name === "Reisverzekeringen" && item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, autoverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, brandverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, kredietverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, levensverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, pensioenverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, transportverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen, ziekteverzekeringen" &&
                        item.active) ||
                      (item.name === "verzekeringsmakelaars" && item.active) ||
                      (item.name ===
                        "verzekeringsmakelaars, autoverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "verzekeringsmakelaars, brandverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "verzekeringsmakelaars, hospitalisatieverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "verzekeringsmakelaars, kredietverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "verzekeringsmakelaars, levensverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "verzekeringsmakelaars, pensioenverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "verzekeringsmakelaars, ziekteverzekeringen" &&
                        item.active) ||
                      (item.name ===
                        "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen" &&
                        item.active)
                  ) &&
                    !data.category.some(
                      (item) =>
                        item.name === "Banques" ||
                        item.name === "Banken" ||
                        item.name === "Spaarbanken" ||
                        item.name === "Privé-spaarbanken" ||
                        item.name === "Banken, geldautomaten" ||
                        item.name === "Banques, guichets automatiques" ||
                        item.name === "Sociale verzekeringsfondsen" ||
                        item.name === "Reisverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, autoverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, brandverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, herverzekeringsmaatschappijen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, hospitalisatieverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, kredietverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, levensverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, pensioenverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, transportverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen, ziekteverzekeringen" ||
                        item.name === "verzekeringsmakelaars" ||
                        item.name ===
                          "verzekeringsmakelaars, autoverzekeringen" ||
                        item.name ===
                          "verzekeringsmakelaars, brandverzekeringen" ||
                        item.name ===
                          "verzekeringsmakelaars, hospitalisatieverzekeringen" ||
                        item.name ===
                          "verzekeringsmakelaars, kredietverzekeringen" ||
                        item.name ===
                          "verzekeringsmakelaars, levensverzekeringen" ||
                        item.name ===
                          "verzekeringsmakelaars, pensioenverzekeringen" ||
                        item.name ===
                          "verzekeringsmakelaars, ziekteverzekeringen" ||
                        item.name ===
                          "Verzekeringsmaatschappijen en vertegenwoordigers van verzekeringsmaatschappijen"
                    ) && (
                      <label>
                        <div>
                          <span ref={FMSARef}>
                            <OsnInputText
                              required
                              title="FSMA registratie"
                              defaultValue={
                                data.FSMA.length === 0
                                  ? data.number
                                      .replaceAll(".", "")
                                      .slice(2, data.number.length)
                                  : data.FSMA
                              }
                              icon="Afternoon"
                            />
                          </span>
                        </div>
                      </label>
                    )}

                  {data.category.some(
                    (item) =>
                      item.name ===
                        "Agentschappen in onroerende goederen (binnenland)" ||
                      item.name === "Onroerende goederen (binnenland)" ||
                      item.name === "Vastgoed (binnenland)" ||
                      item.name === "Immobiliën (binnenland)"
                  ) && (
                    <Fragment>
                      {data.BIV.map((value, index) => (
                        <div
                          key={index}
                          className={[
                            "biv-row",
                            data.BIV.length - 1 === index ? "last" : "",
                          ].join(" ")}
                        >
                          <div>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  title="BIV registratie"
                                  defaultValue={value.number}
                                  icon="Afternoon"
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "number",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  icon="UserM"
                                  title="Voornaam"
                                  defaultValue={value.prename}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "prename",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  icon="UserM"
                                  required
                                  title="Naam"
                                  defaultValue={value.name}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "name",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  required
                                  size="M"
                                  icon="Cellphone"
                                  title="mobiele telefoon"
                                  defaultValue={value.mobile}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "mobile",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label className="email">
                              <div>
                                <OsnInputText
                                  required
                                  size="L"
                                  icon="Mail"
                                  title="Email"
                                  defaultValue={value.email}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "email",
                                      e.target.value,
                                      "BIV"
                                    )
                                  }
                                />
                              </div>
                            </label>
                          </div>
                          <div className="buttons">
                            {data.BIV.length !== 1 && (
                              <label
                                onClick={(e) => removeVastgoed(index, "BIV")}
                              >
                                <Icon name="CloseCircle" />
                              </label>
                            )}
                            {data.BIV.length === index + 1 && (
                              <label onClick={(e) => addVastgoed(e, "BIV")}>
                                <Icon name="AddCircle" />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  )}
                  {data.sub.some(
                    (item) =>
                      (item.name ===
                        "Agentschappen in onroerende goederen (binnenland)" &&
                        item.active) ||
                      (item.name === "Onroerende goederen (binnenland)" &&
                        item.active) ||
                      (item.name === "Vastgoed (binnenland)" && item.active) ||
                      (item.name === "Immobiliën (binnenland)" && item.active)
                  ) &&
                    !data.category.some(
                      (item) =>
                        item.name ===
                          "Agentschappen in onroerende goederen (binnenland)" ||
                        item.name === "Onroerende goederen (binnenland)" ||
                        item.name === "Vastgoed (binnenland)" ||
                        item.name === "Immobiliën (binnenland)"
                    ) && (
                      <Fragment>
                        {data.BIV.map((value, index) => (
                          <div
                            key={index}
                            className={[
                              "biv-row",
                              data.BIV.length - 1 === index ? "last" : "",
                            ].join(" ")}
                          >
                            <div>
                              <label>
                                <div>
                                  <OsnInputText
                                    size="M"
                                    required
                                    title="BIV registratie"
                                    defaultValue={value.number}
                                    icon="Afternoon"
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "number",
                                        e.target.value,
                                        "BIV"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label>
                                <div>
                                  <OsnInputText
                                    size="M"
                                    required
                                    icon="UserM"
                                    title="Voornaam"
                                    defaultValue={value.prename}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "prename",
                                        e.target.value,
                                        "BIV"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label>
                                <div>
                                  <OsnInputText
                                    size="M"
                                    icon="UserM"
                                    required
                                    title="Naam"
                                    defaultValue={value.name}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "name",
                                        e.target.value,
                                        "BIV"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label>
                                <div>
                                  <OsnInputText
                                    required
                                    size="M"
                                    icon="Cellphone"
                                    title="Mobiele telefoon"
                                    defaultValue={value.mobile}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "mobile",
                                        e.target.value,
                                        "BIV"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label className="email">
                                <div>
                                  <OsnInputText
                                    required
                                    size="L"
                                    icon="Mail"
                                    title="Email"
                                    defaultValue={value.email}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "email",
                                        e.target.value,
                                        "BIV"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                            </div>
                            <div className="buttons">
                              {data.BIV.length !== 1 && (
                                <label
                                  onClick={(e) => removeVastgoed(index, "BIV")}
                                >
                                  <Icon name="CloseCircle" />
                                </label>
                              )}
                              {data.BIV.length === index + 1 && (
                                <label onClick={(e) => addVastgoed(e, "BIV")}>
                                  <Icon name="AddCircle" />
                                </label>
                              )}
                            </div>
                          </div>
                        ))}
                      </Fragment>
                    )}
                  {data.sub.some(
                    (item) =>
                      item.name ===
                        "Agentschappen in onroerende goederen (buitenland)" ||
                      item.name === "Onroerende goederen (buitenland)" ||
                      item.name === "Immobiliën (buitenland)" ||
                      item.name === "Vastgoed (buitenland)"
                  ) &&
                    !data.category.some(
                      (item) =>
                        item.name ===
                          "Agentschappen in onroerende goederen (buitenland)" ||
                        item.name === "Onroerende goederen (buitenland)" ||
                        item.name === "Immobiliën (buitenland)" ||
                        item.name === "Vastgoed (buitenland)"
                    ) && (
                      <Fragment>
                        {data.EPC.map((value, index) => (
                          <div
                            key={index}
                            className={[
                              "biv-row",
                              data.EPC.length - 1 === index ? "last" : "",
                            ].join(" ")}
                          >
                            <div>
                              <label>
                                <div>
                                  <OsnInputText
                                    size="M"
                                    required
                                    title="EPC registratie"
                                    defaultValue={value.number}
                                    icon="Afternoon"
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "number",
                                        e.target.value,
                                        "EPC"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label>
                                <div>
                                  <OsnInputText
                                    size="M"
                                    required
                                    icon="UserM"
                                    title="Voornaam"
                                    defaultValue={value.prename}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "prename",
                                        e.target.value,
                                        "EPC"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label>
                                <div>
                                  <OsnInputText
                                    size="M"
                                    icon="UserM"
                                    required
                                    title="Naam"
                                    defaultValue={value.name}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "name",
                                        e.target.value,
                                        "EPC"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label>
                                <div>
                                  <OsnInputText
                                    required
                                    size="M"
                                    icon="Cellphone"
                                    title="mobiel"
                                    defaultValue={value.mobile}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "mobile",
                                        e.target.value,
                                        "EPC"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                              <label className="email">
                                <div>
                                  <OsnInputText
                                    required
                                    size="L"
                                    icon="Mail"
                                    title="Email"
                                    defaultValue={value.email}
                                    onBlur={(e) =>
                                      changeVastgoed(
                                        index,
                                        "email",
                                        e.target.value,
                                        "EPC"
                                      )
                                    }
                                  />
                                </div>
                              </label>
                            </div>
                            <div className="buttons">
                              {data.EPC.length !== 1 && (
                                <label
                                  onClick={(e) => removeVastgoed(index, "EPC")}
                                >
                                  <Icon name="CloseCircle" />
                                </label>
                              )}
                              {data.EPC.length === index + 1 && (
                                <label onClick={(e) => addVastgoed(e, "EPC")}>
                                  <Icon name="AddCircle" />
                                </label>
                              )}
                            </div>
                          </div>
                        ))}
                      </Fragment>
                    )}
                  {data.category.some(
                    (item) =>
                      item.name ===
                        "Agentschappen in onroerende goederen (buitenland)" ||
                      item.name === "Onroerende goederen (buitenland)" ||
                      item.name === "Immobiliën (buitenland)" ||
                      item.name === "Vastgoed (buitenland)"
                  ) && (
                    <Fragment>
                      {data.EPC.map((value, index) => (
                        <div
                          key={index}
                          className={[
                            "biv-row",
                            data.EPC.length - 1 === index ? "last" : "",
                          ].join(" ")}
                        >
                          <div>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  title="EPC registratie"
                                  defaultValue={value.number}
                                  icon="Afternoon"
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "number",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  icon="UserM"
                                  title="Voornaam"
                                  defaultValue={value.prename}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "prename",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  icon="UserM"
                                  required
                                  title="Naam"
                                  defaultValue={value.name}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "name",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  required
                                  size="M"
                                  icon="Cellphone"
                                  title="mobiel"
                                  defaultValue={value.mobile}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "mobile",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label className="email">
                              <div>
                                <OsnInputText
                                  required
                                  size="L"
                                  icon="Mail"
                                  title="Email"
                                  defaultValue={value.email}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "email",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                          </div>
                          <div className="buttons">
                            {data.EPC.length !== 1 && (
                              <label
                                onClick={(e) => removeVastgoed(index, "EPC")}
                              >
                                <Icon name="CloseCircle" />
                              </label>
                            )}
                            {data.EPC.length === index + 1 && (
                              <label onClick={(e) => addVastgoed(e, "EPC")}>
                                <Icon name="AddCircle" />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  )}
                  {data.sub.some(
                    (item) =>
                      (item.name ===
                        "Agentschappen in onroerende goederen (buitenland)" &&
                        item.active) ||
                      (item.name === "Onroerende goederen (buitenland)" &&
                        item.active) ||
                      (item.name === "Immobiliën (buitenland)" &&
                        item.active) ||
                      (item.name === "Vastgoed (buitenland)" && item.active)
                  ) && (
                    <Fragment>
                      {data.EPC.map((value, index) => (
                        <div
                          key={index}
                          className={[
                            "biv-row",
                            data.EPC.length - 1 === index ? "last" : "",
                          ].join(" ")}
                        >
                          <div>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  title="EPC registratie"
                                  defaultValue={value.number}
                                  icon="Afternoon"
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "number",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  required
                                  icon="UserM"
                                  title="Voornaam"
                                  defaultValue={value.prename}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "prename",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  size="M"
                                  icon="UserM"
                                  required
                                  title="Naam"
                                  defaultValue={value.name}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "name",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label>
                              <div>
                                <OsnInputText
                                  required
                                  size="M"
                                  icon="Cellphone"
                                  title="mobiel"
                                  defaultValue={value.mobile}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "mobile",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                            <label className="email">
                              <div>
                                <OsnInputText
                                  required
                                  size="L"
                                  icon="Mail"
                                  title="Email"
                                  defaultValue={value.email}
                                  onBlur={(e) =>
                                    changeVastgoed(
                                      index,
                                      "email",
                                      e.target.value,
                                      "EPC"
                                    )
                                  }
                                />
                              </div>
                            </label>
                          </div>
                          <div className="buttons">
                            {data.EPC.length !== 1 && (
                              <label
                                onClick={(e) => removeVastgoed(index, "EPC")}
                              >
                                <Icon name="CloseCircle" />
                              </label>
                            )}
                            {data.EPC.length === index + 1 && (
                              <label onClick={(e) => addVastgoed(e, "EPC")}>
                                <Icon name="AddCircle" />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  )}

                  {selected.length === 0 && <p>please select a category</p>}
                </section>
              )}
            </div>
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
            changePublic(e);
            // patchData(data);
            store.dispatch({ type: "countUp" });
            props.setTab();
          }}
        />
      </div>
    </section>
  );
};

export default Search;
