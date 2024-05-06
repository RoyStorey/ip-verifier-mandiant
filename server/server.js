import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import schedule from "node-schedule";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors());
app.use("/", routes);

// Token refresh function
async function refreshAccessToken() {
  try {
    const auth = {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET,
    };

    const data = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "X-App-Name": "89CSIPTool",
    };

    const response = await axios.post(
      "https://api.intelligence.mandiant.com/token",
      data,
      { headers, auth }
    );

    const { access_token } = response.data;
    process.env.BEARER_TOKEN = access_token; // Update the environment variable

    console.log("Access token refreshed successfully!");
    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
}

// Schedule the token refresh every 6 hours
schedule.scheduleJob("0 */6 * * *", function () {
  console.log("Refreshing token...");
  refreshAccessToken();
});

refreshAccessToken();

app.listen(port, () => {
  console.log(`App is running on port ${port}.`);
});
