import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};
const getAllUserPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postUpdateUser = (id, username, role, image) => {
  const data = new FormData();

  data.append("username", username);
  data.append("id", id);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};
const postDeleteUser = (id) => {
  return axios.delete("api/v1/participant", {
    data: { id: id },
  });
};
const postLogin = (userEmail, userPassword) => {
  return axios.post("api/v1/login", {
    email: userEmail,
    password: userPassword,
  });
};
const postRegister = (email, password, username) => {
  const data = new FormData();

  data.append("username", username);
  data.append("email", email);
  data.append("password", password);

  return axios.post("api/v1/register", data);
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};

export {
  postCreateNewUser,
  getAllUser,
  postUpdateUser,
  postDeleteUser,
  getAllUserPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
};
