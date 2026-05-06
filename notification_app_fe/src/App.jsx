import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

import API from "./services/api";

function App() {
  const [notifications, setNotifications] =
    useState([]);

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [limit, setLimit] = useState(10);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbnRyb25pYy5hLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsImV4cCI6MTc3ODA0ODQ0MCwiaWF0IjoxNzc4MDQ3NTQwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjc4ZmYyOWYtODRjYy00NjlmLWIzYTQtMjljZjA2Y2I4ZWIwIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW50cm9uaWMgYSIsInN1YiI6ImI1ZDdlNzViLTFhZWUtNGM0Yi05OGNiLTNmYjU1ZmNjOWY4ZSJ9LCJlbWFpbCI6ImFudHJvbmljLmEuMjAyMy5haWRzQHJpdGNoZW5uYWkuZWR1LmluIiwibmFtZSI6ImFudHJvbmljIGEiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMDEyIiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiYjVkN2U3NWItMWFlZS00YzRiLTk4Y2ItM2ZiNTVmY2M5ZjhlIiwiY2xpZW50U2VjcmV0IjoieVpneHBLdFptd0J0TVZLSyJ9.nA3Z329AbfYzBrLkNiXTD74xc_cTYz0eXJpEUIxpCZM";

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await API.get(
        "/notifications",
        {
          headers: {
            Authorization: `Bearer ${TOKEN.trim()}`,
          },
        }
      );

      setNotifications(
        response.data.notifications
      );
    } catch (error) {
      console.log(error);
    }
  };

  let filteredNotifications =
    notifications;

  if (typeFilter !== "All") {
    filteredNotifications =
      notifications.filter(
        (item) =>
          item.Type === typeFilter
      );
  }

  const sortedNotifications =
    filteredNotifications.sort((a, b) => {
      const diff =
        weights[b.Type] -
        weights[a.Type];

      if (diff !== 0) {
        return diff;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

  const topNotifications =
    sortedNotifications.slice(0, limit);

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
      >
        Priority Notifications
      </Typography>

      <Grid
        container
        spacing={2}
        marginBottom={3}
      >
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>
              Filter Type
            </InputLabel>

            <Select
              value={typeFilter}
              label="Filter Type"
              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }
            >
              <MenuItem value="All">
                All
              </MenuItem>

              <MenuItem value="Placement">
                Placement
              </MenuItem>

              <MenuItem value="Result">
                Result
              </MenuItem>

              <MenuItem value="Event">
                Event
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Top N Notifications"
            value={limit}
            onChange={(e) =>
              setLimit(e.target.value)
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {topNotifications.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={item.ID}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                >
                  {item.Type}
                </Typography>

                <Typography
                  variant="body1"
                >
                  {item.Message}
                </Typography>

                <Typography
                  variant="body2"
                  marginTop={2}
                >
                  {item.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;