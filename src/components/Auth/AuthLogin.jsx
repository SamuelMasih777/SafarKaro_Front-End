import "./Auth.css";
import { validateNumber, validatePassword } from "../../utils";
import { loginHandler } from "../../services";
import { useAuth,useAlert} from "../../context";
// import { useNavigate } from "react-router-dom";

let isNumberValid, isPasswordValid;
export const AuthLogin = () => {
  const { password, number, authDispatch } = useAuth();
  // const navigate = useNavigate();
  const { setAlert } = useAlert();
  const handleLoginClick = () => {};
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
  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    if (isNumberValid && isPasswordValid) {
      const { accessToken, username } = await loginHandler(number, password,setAlert);
      authDispatch({
        type: "SET_ACCESS_TOKEN",
        payload: accessToken,
      });
      authDispatch({
        type: "SET_USER_NAME",
        payload: username,
      });      
    }
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };
  const handleTestCredentialsClick= async ()=>{
    const { accessToken, username } = await loginHandler(8888888888, "Test@321",setAlert);
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: accessToken,
    });
    authDispatch({
      type: "SET_USER_NAME",
      payload: username,
    });
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  }
  return (
    <div className="auth-container">
      <form onSubmit={handleLoginSubmit}>
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
            // onChange={handleNumberChange}
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
            // onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button
            className="button btn-primary btn-login cursor"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </form>
      <div className="cta">
        <button
          className="button btn-outline-primary cursor-pointer"
            onClick={handleTestCredentialsClick}
        >
          Login with Test Credentials
        </button>
      </div>
    </div>
  );
};
