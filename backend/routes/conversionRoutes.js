// const express = require("express");
// const router = express.Router();
// const Conversion = require("../models/Conversion");

// // 🟢 Get all conversion history
// router.get("/", async (req, res) => {
//   try {
//     const history = await Conversion.find().sort({ timestamp: -1 });
//     res.json(history);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// });

// // 🔵 Add new conversion record
// router.post("/", async (req, res) => {
//   try {
//     const { originalName, convertedName, fromType, toType, downloadUrl } =
//       req.body;

//     const newRecord = new Conversion({
//       originalName,
//       convertedName,
//       fromType,
//       toType,
//       downloadUrl,
//     });

//     await newRecord.save();
//     res.status(201).json(newRecord);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save record" });
//   }
// });

// module.exports = router;


import express from "express";
import Conversion from "../model/conversion.js";

const router = express.Router();

// Get history
router.get("/", async (req, res) => {
  try {
    const history = await Conversion.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// Save new record
router.post("/", async (req, res) => {
  try {
    const record = new Conversion(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: "Failed to save record" });
  }
});

export default router;
