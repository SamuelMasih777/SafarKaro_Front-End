import axios from "axios";

export const loginHandler = async (number, password, setAlert) => {
  try {
    const {
      data: { accessToken, username },
    } = await axios.post(
      "https://travelapp-backend-3xg0.onrender.com/api/auth/login",
      {
        number: number,
        password: password,
      }
    );
    // console.log({data});
    // console.log("Logged IN");
    console.log({ accessToken, username });
    // localStorage.setItem("token", accessToken);
    // localStorage.setItem("username", username);
    setAlert({
      open: true,
      message: "Login Successful!",
      type: "success"
    })
    return { accessToken, username };
  } catch (err) {
    console.log("unable to login");
  }
};
