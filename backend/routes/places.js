const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Place, validate } = require("../models/place");
const authMiddleware = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

router.post("/", authMiddleware, async (req, res) => {
  const data = req.body;
  const { error } = validate(data);
  if (!error)
    return res.status(400).send({ message: error.details[0].message });

  const place = await Place.create({
    owner: req.user._id,
    ...data,
  });

  res.status(201).send({ data: place });
});

router.get("/", authMiddleware, async (req, res) => {
  const places = await Place.find({ owner: req.user._id }).select("-__v");
  res.send({ data: places });
});

router.get("/list",  async (req, res) => {
  const places = await Place.find().select("-__v");
  res.send({ data: places });
});

router.get("/:id", [validateObjectId, authMiddleware], async (req, res) => {
  const place = await Place.findById(req.params.id).select("-__v");
  res.send({ data: place });
});

router.put("/:id", [authMiddleware, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (!error)
    return res.status(400).send({ message: error.details[0].message });

  const place = await Place.findById(req.params.id);
  if (req.user._id !== place.owner.toString())
    return res.status(400).send({ message: "access denied" });

  place.set(req.body);
  await place.save();
  res.send({ message: "updated successfully" });
});

module.exports = router;
