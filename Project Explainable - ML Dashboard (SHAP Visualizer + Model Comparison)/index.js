const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});

app.get("/metrics", (req, res) => {
  res.json({
    accuracy: 0.89,
    f1Score: 0.87,
    roc: 0.91,
    confusionMatrix: [
      [45, 5],
      [6, 44]
    ]
  });
});

app.get("/shap", (req, res) => {
  res.json([
    { feature: "Stress Score", importance: 0.34 },
    { feature: "Sleep Hours", importance: 0.21 },
    { feature: "Social Interaction", importance: 0.18 },
    { feature: "Study Hours", importance: 0.12 }
  ]);
});

app.listen(5000, () => console.log("Server running on port 5000"));
