import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://control-inventarios-usurban.herokuapp.com/user/";

// const API_URL = "http://127.0.0.1:5000/user";

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getAdminBoard
};