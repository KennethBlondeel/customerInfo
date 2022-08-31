import { Fragment, useEffect, useRef, useState } from "react";
import "./App.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { updateEmail, updatePassword } from "./actions/GeneralAction";
// import { OsnInputText, Button } from "@identitybuilding/idb-react-ui-elements";

const Signin = () => {
  const { est, ent } = useParams();
  const history = useHistory();
  const { lang, correctOTP } = useSelector((state) => state.general);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const createAccount = () => {
    setError("");
    if (email === "") {
      setError("Gelieve email in te vullen");
    } else if (password === "") {
      setError("Gelieve wachtwoord in te vullen");
    } else if (passwordRepeat === "") {
      setError("Gelieve wachtwoord herhalen in te vullen");
    } else if (passwordRepeat.length < 8) {
      setError("Wachtwoord moet minstens 8 characters hebben!");
    } else if (password.length < 8) {
      setError("Wachtwoord moet minstens 8 characters hebben!");
    } else if (
      passwordRepeat === password &&
      email !== "" &&
      password !== "" &&
      passwordRepeat !== ""
    ) {
      // axios.put(`https://management.100procentlokaal.be/ci/create/`,
      axios
        .post(`https://management.100procentlokaal.be/ci/create/`, {
          email: email,
          password: password,
          passwordRepeat: passwordRepeat,
          est: est,
        })
        .then((res) => {
          if (res.data.status === "Succes") {
            localStorage.setItem("token", res.data.token);
            history.push(`/${ent}/${est}/`);
          } else {
            setError("Somehting went wrong");
          }
        })
        .catch((res) => {
          setError(res.response.data.status);
        });
    } else {
      setError("Wachtwoorden komen niet overeen!");
    }
  };
  const onChange = (type, value) => {
    setError("");
    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    } else {
      setPasswordRepeat(value);
    }
  };
  return (
    <section className="signin">
      <div className="signin_wrapper">
        <h2>Maak een account aan</h2>
        <form>
          <input
            icon="Entrepreneur"
            title="E-mailadres"
            onChange={(e) => onChange("email", e.target.value)}
          />
          <input
            icon="Locked"
            title="Wachtwoord"
            type="password"
            onChange={(e) => onChange("password", e.target.value)}
          />
          <input
            icon="Locked"
            title="Herhaal wachtwoord"
            type="password"
            onChange={(e) => onChange("passwordrepeat", e.target.value)}
          />
          <button
            borderColor="sub"
            text="Account aanmaken"
            txtColor="sub"
            type="sub"
            onClick={(e) => {
              createAccount();
            }}
          />
          {error}
        </form>
      </div>
    </section>
  );
};

export default Signin;
