import { Fragment, useEffect, useRef, useState } from "react";
import "./App.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { updateEmail, updatePassword } from "./actions/GeneralAction";
// import { OsnInputText, Button } from "@identitybuilding/idb-react-ui-elements";

const Signin = () => {
  const { token } = useParams();
  const history = useHistory();
  const { lang, correctOTP } = useSelector((state) => state.general);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const resetPassword = () => {
    if (password !== passwordRepeat) {
      setError("Wachtwoorden komen niet overeen!");
    } else if (password.length < 8) {
      setError("Wachtwoord moet minstens 8 characters hebben!");
    } else {
      setError("");
      axios
        .post(`https://management.100procentlokaal.be/ci/password_reset/`, {
          email: email,
          password: password,
          token: token,
        })
        .then((res) => history.push(`/${res.data.ent}/${res.data.est}/login`));
    }
  };

  return (
    <section className="signin">
      <div className="signin_wrapper">
        <h2>Reset Wachtwoord:</h2>
        <form>
          <input
            icon="Mail"
            title="E-mailadres"
            type="text"
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
          />
          <input
            icon="Locked"
            title="Wachtwoord"
            type="password"
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
          <input
            icon="Locked"
            title="Herhaal wachtwoord"
            type="password"
            onChange={(e) => {
              setError("");
              setPasswordRepeat(e.target.value);
            }}
          />
          <button
            borderColor="sub"
            text="Wachtwoord resetten"
            txtColor="sub"
            type="sub"
            onClick={(e) => {
              resetPassword();
            }}
          />
          {error}
        </form>
      </div>
    </section>
  );
};

export default Signin;
