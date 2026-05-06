const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbnRyb25pYy5hLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsImV4cCI6MTc3ODA0NDM1NywiaWF0IjoxNzc4MDQzNDU3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMDdhNWIxMzEtZjA5YS00YzMzLTg0YzctNWNkNTU5ZGI3Zjc1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW50cm9uaWMgYSIsInN1YiI6ImI1ZDdlNzViLTFhZWUtNGM0Yi05OGNiLTNmYjU1ZmNjOWY4ZSJ9LCJlbWFpbCI6ImFudHJvbmljLmEuMjAyMy5haWRzQHJpdGNoZW5uYWkuZWR1LmluIiwibmFtZSI6ImFudHJvbmljIGEiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMDEyIiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiYjVkN2U3NWItMWFlZS00YzRiLTk4Y2ItM2ZiNTVmY2M5ZjhlIiwiY2xpZW50U2VjcmV0IjoieVpneHBLdFptd0J0TVZLSyJ9.8eiUsIELWQ5Xhsjpii7vmQFMvxbOmQUFvK2R3AGyxso";

async function Log(stack, level, pkg, message) {
  try {
    const response = await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: pkg,
        message: message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

module.exports = Log;