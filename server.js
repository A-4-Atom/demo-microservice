const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Public route (no auth) – to quickly test if service is alive
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "demo-microservice" });
});

// "Protected" route – in real life this would require a valid user
app.get("/me", (req, res) => {
  // In production, APIM would validate the token and optionally
  // forward user info via headers like x-user-id.
  const userId = req.headers["x-user-id"] || "anonymous";
  res.json({
    message: "Hello from backend microservice",
    userId,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Demo microservice running on http://localhost:${PORT}`);
});
