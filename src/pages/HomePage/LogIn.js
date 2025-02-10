import React, { useState } from "react";
import { useRedCon } from "../../Context/State";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Alert } from "react-bootstrap";
export const LogIn = () => {
  const { lang, handelChangeLang } = useRedCon();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSucceed, setIsSucceed] = useState("");
  const [alert, setAlert] = useState(false);
  const handelLogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsSucceed(true);
        setAlert(true);
      })
      .catch((err) => {
        setIsSucceed(false);
        setAlert(true);
      });
  };
  const test = () => {
    if (isSucceed) {
      if (lang === "en") {
        return "Log in successful";
      } else {
        return "نجح تسجيل الدخول";
      }
    } else {
      if (lang === "en") {
        return "Log in failed";
      } else {
        return "فشل تسجيل الدخول";
      }
    }
  };

  return (
    <div className="log-in">
      {alert ? (
        <Alert
          className="w-100 text-center"
          variant={isSucceed ? "success" : "danger"}
        >
          {test()}
        </Alert>
      ) : null}
      <div className=" position-relative d-flex flex-column justify-content-center align-items-center">
        <button
          onClick={handelChangeLang}
          style={lang === "en" ? { left: "10px" } : { right: "10px" }}
          className="lang-btn"
        >
          {lang === "en" ? "عربى" : "EN"}
        </button>
        <div className="logo w-50 mb-5 text-center text-warning fs-3">
          <p className="logo-1">Managfiy</p>
        </div>

        <form className="d-flex flex-column w-50 text-center">
          <input
            className="m-0 my-3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder={
              lang === "en" ? "Enter Email" : "ادخل البريد الإلكترونى"
            }
          />
          <input
            className="m-0 my-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder={lang === "en" ? "Enter Password" : "ادخل كلمة السر"}
          />
          <p className="text-light p-0 m-0">
            {" "}
            {lang === "en"
              ? "Are you new? Call 01117829577"
              : "لو حابب تجرب كلم 01117829577"}{" "}
          </p>
          <button
            type="submit"
            onClick={(e) => {
              handelLogIn(e);
            }}
            className="mt-3"
          >
            {lang === "en" ? "Log In" : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
};
