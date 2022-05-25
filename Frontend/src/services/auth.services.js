import axios from "axios";

const API_URL = "https://control-inventarios-usurban.herokuapp.com/auth/login";

//const API_URL = "http://127.0.0.1:5000/auth/login";

const API_URL_2 = "https://control-inventarios-usurban.herokuapp.com/user/";

// const register = (username, email, password, admin) => {
//   return axios.post(API_URL_2, {
//     username,
//     email,
//     password,
//     admin
//   });
// };

const login = (email, password) => {
  return axios.post(API_URL, {email, password})
    .then((response) => {
      console.log("response: ", response);
      if (response.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
//   register,
  getCurrentUser
};