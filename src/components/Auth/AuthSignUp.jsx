import "./Auth.css";
import { useAuth, useAlert} from "../../context";
import {
  validateEmail,
  validateName,
  validateNumber,
  validatePassword,
} from "../../utils";
import { signupHandler } from "../../services";

let isNumberValid,
  isNameValid,
  isEmailvalid,
  isPasswordValid,
  isConfirmPasswordValid;

export const AuthSignUp = () => {
  const { username, email, password, number, confirmPassword, authDispatch } =
    useAuth();
    const { setAlert } = useAlert();

  //   console.log({
  //     username,
  //     email,
  //     password,
  //     number,
  //     confirmPassword,
  //     authDispatch,
  //   });

  const handleNumberChange = (event) => {
    isNumberValid = validateNumber(event.target.value);
    // console.log(isNumberValid)
    if (isNumberValid) {
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Number");
    }
  };
  const handleNameChange = (event) => {
    isNameValid = validateName(event.target.value);
    if (isNameValid) {
      authDispatch({
        type: "NAME",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Name");
    }
  };
  const handleEmailChange = (event) => {
    isEmailvalid = validateEmail(event.target.value);
    if (isEmailvalid) {
      authDispatch({
        type: "EMAIL",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Email");
    }
  };
  const handlePasswordChange = (event) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Password");
    }
  };
  const handleConfirmPasswordChange = (event) => {
    isConfirmPasswordValid = validatePassword(event.target.value);
    if (isConfirmPasswordValid) {
      authDispatch({
        type: "CONFIRM_PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Password");
    }
  };
  const handleFormSubmit =  (event) => {
    event.preventDefault();    
    if (
      isNumberValid &&
      isNameValid &&
      isEmailvalid &&
      isPasswordValid &&
      isConfirmPasswordValid
    ) {
       signupHandler(username, number, email, password,setAlert);
    }
    authDispatch({
        type:"CLEAR_USER_DATA",
    })
  //   authDispatch({
  //     type:"SET_TO_LOGIN",
  // })
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Name <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={username}
            className="auth-input"
            placeholder="Enter Name"
            required
            onChange={handleNameChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Email <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={email}
            className="auth-input"
            placeholder="Enter Email"
            type="email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Confirm Password <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={confirmPassword}
            className="auth-input"
            placeholder="Re-Enter Password"
            type="password"
            required
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={number}
            type="number"
            className="auth-input"
            maxLength="10"
            placeholder="Enter Mobile Number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button className="button btn-primary btn-login cursor">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
