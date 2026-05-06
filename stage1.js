const axios = require("axios");

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbnRyb25pYy5hLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsImV4cCI6MTc3ODA0OTAyMSwiaWF0IjoxNzc4MDQ4MTIxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOGM4ODRhMDUtZWU3Ni00ODU4LWI5NTUtYjQyODA2NGUyNTc1IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW50cm9uaWMgYSIsInN1YiI6ImI1ZDdlNzViLTFhZWUtNGM0Yi05OGNiLTNmYjU1ZmNjOWY4ZSJ9LCJlbWFpbCI6ImFudHJvbmljLmEuMjAyMy5haWRzQHJpdGNoZW5uYWkuZWR1LmluIiwibmFtZSI6ImFudHJvbmljIGEiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMDEyIiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiYjVkN2U3NWItMWFlZS00YzRiLTk4Y2ItM2ZiNTVmY2M5ZjhlIiwiY2xpZW50U2VjcmV0IjoieVpneHBLdFptd0J0TVZLSyJ9.7oMbmG_AyhR8Pgk5cT6ydoCphMXeF6QV6vfHdp9gM0g";

const TYPE_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getPriorityNotifications() {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const notifications =
      response.data.notifications;

    const sortedNotifications =
      notifications.sort((a, b) => {
        const weightDifference =
          TYPE_WEIGHT[b.Type] -
          TYPE_WEIGHT[a.Type];

        if (weightDifference !== 0) {
          return weightDifference;
        }

        return (
          new Date(b.Timestamp) -
          new Date(a.Timestamp)
        );
      });

    const top10 =
      sortedNotifications.slice(0, 10);

    console.log(
      "\nTOP 10 PRIORITY NOTIFICATIONS\n"
    );

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.Type}`
      );
      console.log(
        `Message: ${item.Message}`
      );
      console.log(
        `Time: ${item.Timestamp}`
      );
      console.log("----------------");
    });
  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
}

getPriorityNotifications();