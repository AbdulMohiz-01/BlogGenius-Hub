import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { registerUser } from "../Service/api";

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register({ closeModal }) {
  const userRef = useRef();
  const errRef = useRef();

  const confirmPasswordRef = useRef();

  // setting up for username
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // setting up for password
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // setting up for confirm password
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPwdFocus, setConfirmPwdFocus] = useState(false);

  // setting up success/error messages
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidConfirmPassword(password === confirmPassword);
  }, [password, confirmPassword]);

  //   set error msg to null when user is typing
  useEffect(() => {
    setErrMsg("");
  }, [username, password, confirmPassword]);

  const handleUsernameChange = (event) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    setValidUsername(USERNAME_REGEX.test(newUsername));
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setValidPassword(PWD_REGEX.test(newPassword));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // if button enabled with JS hack
    const v1 = USERNAME_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    const v3 = password === confirmPassword;
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid username or password");
      return;
    }

    const payload = {
      username,
      password,
    };
    const response = await registerUser(payload, ifErrorFunction);
    console.log(response);
    if (response) {
      setSuccess(true);
    }
  };

  const ifErrorFunction = (err) => {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 409) {
      setErrMsg("Username Taken");
    } else {
      setErrMsg("Registration Failed");
    }
    errRef.current.focus();
  };

  return (
    <div className="container mx-auto py-2 rounded-sm">
      <div className="flex justify-end">
        <button
          className="text-gray-500 rounded-full p-2 hover:bg-red-600 hover:text-white transition duration-300"
          onClick={closeModal}
          aria-label="Close"
        >
          <X />
        </button>
      </div>
      {success ? (
        <section>
          <div className="text-green-500 text-lg mt-2">
            Successfully Registered!
          </div>
          <p className="text-gray-500 text-sm mt-2">
            You can now login with your credentials.
            <Link to="/login" className="text-blue-500">
              {" "}
              Click here to login.
            </Link>
          </p>
        </section>
      ) : (
        <section>
          {/* to display error msg */}
          <p
            ref={errRef}
            className={errMsg ? "text-red-500 text-sm mt-2" : "hidden"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1 className="text-2xl font-bold mb-6 text-center">
            Registration Form
          </h1>
          <form
            className="w-full max-w-sm mx-auto p-8"
            onSubmit={handleFormSubmit}
          >
            {/* UserName */}
            <div className="mb-4">
              <label
                className="text-gray-700 text-sm font-bold mb-2 flex flex-row gap-1"
                htmlFor="username"
              >
                Username:
                <span className={validUsername ? "block" : "hidden"}>
                  <Check color="#00b894" />
                </span>
                <span
                  className={validUsername || !username ? "hidden" : "block"}
                >
                  <X color="#E74C3C" />
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  !validUsername && !username
                    ? "border-gray-300"
                    : validUsername
                    ? "border-indigo-500"
                    : "border-red-500"
                } rounded-md focus:outline-none focus:${
                  validUsername ? "border-indigo-500" : "border-red-500"
                }`}
                type="text"
                ref={userRef}
                id="username"
                name="username"
                placeholder="Username"
                autoComplete="off"
                required
                value={username}
                onChange={handleUsernameChange}
                aria-invalid={!validUsername}
                aria-describedby="usernameError"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />

              {!validUsername && (
                <p
                  id="usernameError"
                  className={
                    userFocus && username && !validUsername
                      ? "text-red-500 text-sm mt-1"
                      : "hidden"
                  }
                >
                  Username must be between 3 and 30 characters. Must begin with
                  a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className="flex flex-row gap-1text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
                <span className={validPassword ? "block" : "hidden"}>
                  <Check color="#00b894" />
                </span>
                <span
                  className={validPassword || !password ? "hidden" : "block"}
                >
                  <X color="#E74C3C" />
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  !validPassword && !password
                    ? "border-gray-300"
                    : validPassword
                    ? "border-indigo-500"
                    : "border-red-500"
                } rounded-md focus:outline-none focus:${
                  validPassword ? "border-indigo-500" : "border-red-500"
                }`}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                aria-invalid={!validPassword}
                aria-describedby="passwordError"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />

              {!validPassword && (
                <div
                  id="passwordError"
                  className={
                    pwdFocus && !validPassword && password
                      ? "text-red-500 text-sm mt-1"
                      : "hidden"
                  }
                >
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                className="flex gap-1 text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password:
                <span
                  className={
                    confirmPassword && validConfirmPassword ? "block" : "hidden"
                  }
                >
                  <Check color="#00b894" />
                </span>
                <span
                  className={
                    validConfirmPassword || !confirmPassword
                      ? "hidden"
                      : "block"
                  }
                >
                  <X color="#E74C3C" />
                </span>
              </label>
              <input
                className={`w-full px-3 py-2 border ${
                  !validConfirmPassword && !confirmPassword
                    ? "border-gray-300"
                    : validConfirmPassword
                    ? "border-indigo-500"
                    : "border-red-500"
                } rounded-md focus:outline-none focus:${
                  validConfirmPassword ? "border-indigo-500" : "border-red-500"
                }`}
                type="password"
                id="confirm-password"
                name="confirm-password"
                aria-invalid={!validConfirmPassword}
                aria-describedby="confirmPasswordError"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                onChange={(event) => setConfirmPassword(event.target.value)}
                onFocus={() => setConfirmPwdFocus(true)}
                onBlur={() => setConfirmPwdFocus(false)}
              />
            </div>
            <p
              id="confirmPasswordError"
              className={
                confirmPwdFocus && !validConfirmPassword && confirmPassword
                  ? "text-red-500 text-sm mt-1 mb-1"
                  : "hidden"
              }
            >
              Must match the first password input field.
            </p>

            {/* Submit */}
            <button
              className={`w-full text-sm font-bold py-3 px-4 rounded-md transition duration-300 ${
                !validUsername || !validPassword || !validConfirmPassword
                  ? "border border-gray-300 bg-gray-300 text-gray-500"
                  : "bg-indigo-500 text-white hover:bg-indigo-600"
              }`}
              type="submit"
              disabled={
                !validUsername || !validPassword || !validConfirmPassword
              }
            >
              Register
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here.
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}

// prop validation
Register.propTypes = {
  closeModal: PropTypes.func,
};
