import axios from "axios";
export const signupHandler = async (username, number, email, password,setAlert) => {
  try {
    const data = await axios.post(
      "https://travelapp-backend-3xg0.onrender.com/api/auth/register",
      {
        username: username,
        number: number,
        email: email,
        password: password,
      }
    );
    console.log({data});
    setAlert({
      open: true,
      message: `Account Created:: username - ${username}`,
      type: "success"
    })
  } catch (error) {
    console.log(" adding user to Database");
  }
};
