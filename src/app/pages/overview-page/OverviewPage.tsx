import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";

interface Data {
  id: number;
  name: string;
  email: string;
  age: number;
  Job: string;
}

const OverviewPage: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data>("https://azure-ad-test-fa.azurewebsites.net/api/httpTrigger1");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Content>
      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <UserInputForm />
      </Box> */}

      <Box
        sx={{
          display: "flex",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : data ? (
          <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                color: "black",
              }}
            >
              User Details From Admin Protected API
            </Typography>
            <Typography className="fs-3" variant="body1">
              <strong>ID:</strong> {data.id}
            </Typography>
            <Typography className="fs-3" variant="body1">
              <strong>Name:</strong> {data.name}
            </Typography>
            <Typography className="fs-3" variant="body1">
              <strong>Email:</strong> {data.email}
            </Typography>
            <Typography className="fs-3" variant="body1">
              <strong>Age:</strong> {data.age}
            </Typography>
            <Typography className="fs-3" variant="body1">
              <strong>Job:</strong> {data.Job}
            </Typography>
          </Paper>
        ) : (
          <Typography variant="body1">No data available</Typography>
        )}
      </Box>
    </Content>
  );
};

export { OverviewPage };
