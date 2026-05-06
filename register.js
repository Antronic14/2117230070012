const axios = require("axios");

const body = {
  email: "antronic.a.2023.aids@ritchennai.edu.in",
  name: "ANTRONIC A",
  mobileNo: "8015579731",
  githubUsername: "Antronic14",
  rollNo: "2117230070012",
  accessCode: "BTCDqT"
};

axios
  .post(
    "http://20.207.122.201/evaluation-service/register",
    body
  )
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data);
  });