import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

const genAI = new GoogleGenerativeAI("...");

app.get("/test", async (req, res) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent("Say hello from Gemini");

    res.json({
      response: result.response.text()
    });

  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});