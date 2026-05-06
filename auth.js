const axios = require("axios");

const body = {
  email: "antronic.a.2023.aids@ritchennai.edu.in",
  name: "antronic a",
  rollNo: "2117230070012",
  accessCode: "BTCDqT",

  clientID: "b5d7e75b-1aee-4c4b-98cb-3fb55fcc9f8e",
  clientSecret: "yZgxpKtZmwBtMVKK"
};

axios
  .post(
    "http://20.207.122.201/evaluation-service/auth",
    body
  )
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });