const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

//Get all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Add a subscriber
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedChannel: req.body.subscribedChannel
  });
  try {
    const newSub = await subscriber.save();
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Get one subscriber
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

//Update a subscriber
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedChannel != null) {
    res.subscriber.subscribedChannel = req.body.subscribedChannel;
  }
  try {
    const updatedSub = await res.subscriber.save();
    res.status(200).json(updatedSub);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete a subscriber
router.delete("/:id", getSubscriber, (req, res) => {
  try {
    res.subscriber.remove();
    res.status(200).json("Subscriber Deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) return res.status(404).json("Subscriber not found");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
}
module.exports = router;
