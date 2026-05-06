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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbnRyb25pYy5hLjIwMjMuYWlkc0ByaXRjaGVubmFpLmVkdS5pbiIsImV4cCI6MTc3ODA1MDQ5OCwiaWF0IjoxNzc4MDQ5NTk4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmZjZWQ4NzgtYjkzZS00NGFiLWI5OGEtM2UyOWFkY2M2NjBmIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW50cm9uaWMgYSIsInN1YiI6ImI1ZDdlNzViLTFhZWUtNGM0Yi05OGNiLTNmYjU1ZmNjOWY4ZSJ9LCJlbWFpbCI6ImFudHJvbmljLmEuMjAyMy5haWRzQHJpdGNoZW5uYWkuZWR1LmluIiwibmFtZSI6ImFudHJvbmljIGEiLCJyb2xsTm8iOiIyMTE3MjMwMDcwMDEyIiwiYWNjZXNzQ29kZSI6IkJUQ0RxVCIsImNsaWVudElEIjoiYjVkN2U3NWItMWFlZS00YzRiLTk4Y2ItM2ZiNTVmY2M5ZjhlIiwiY2xpZW50U2VjcmV0IjoieVpneHBLdFptd0J0TVZLSyJ9.ljjRG0Fzc3J1VSbnUkKOvFItd3_TG0zgVnWiGJgSytM";

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
    sortedNotifications.slice(
      0,
      Number(limit)
    );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{
          color: "white",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        Priority Notifications
      </Typography>

      <Grid
        container
        spacing={2}
        marginBottom={3}
      >
        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            sx={{
              backgroundColor:
                "white",
              borderRadius: "8px",
            }}
          >
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
              setLimit(
                e.target.value
              )
            }
            sx={{
              backgroundColor:
                "white",
              borderRadius: "8px",
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {topNotifications.map(
          (item) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={item.ID}
            >
              <Card
                style={{
                  backgroundColor:
                    "#1e293b",
                  color: "white",
                  borderRadius:
                    "16px",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.3)",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{
                      color:
                        "#38bdf8",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {item.Type}
                  </Typography>

                  <Typography
                    variant="body1"
                    style={{
                      color:
                        "#e2e8f0",
                    }}
                  >
                    {item.Message}
                  </Typography>

                  <Typography
                    variant="body2"
                    marginTop={2}
                    style={{
                      color:
                        "#94a3b8",
                    }}
                  >
                    {new Date(
                      item.Timestamp
                    ).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
}

export default App;