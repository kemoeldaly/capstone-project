// src/server.js
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/api/events", async (req, res) => {
  try {
    const response = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        format: "json",
        list: "embeddedin",
        eititle: "Template:History",
        eilimit: 5, // Adjust the limit as needed
      },
    });

    res.json(response.data.query.embeddedin);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
