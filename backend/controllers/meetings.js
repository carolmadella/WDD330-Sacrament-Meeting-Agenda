const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db(process.env.DB_NAME)
    .collection("meetings")
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({
          message: err,
        });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid meeting id to find a meeting.");
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db(process.env.DB_NAME)
    .collection("meetings")
    .find({
      _id: userId,
    })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({
          message: err,
        });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result[0]);
    });
};

const createMeeting = async (req, res) => {
  const meeting = {
    date: req.body.date,
    presiding: req.body.presiding,
    conductor: req.body.conductor,
    chorister: req.body.chorister,
    accompanist: req.body.accompanist,
    openingHymn: req.body.openingHymn,
    openingPrayer: req.body.openingPrayer,
    announcements: req.body.announcements,
    speaker1: req.body.speaker1,
    speaker1Theme: req.body.speaker1Theme,
    speaker2: req.body.speaker2,
    speaker2Theme: req.body.speaker2Theme,
    speaker3: req.body.speaker3,
    speaker3Theme: req.body.speaker3Theme,
    closingHymn: req.body.closingHymn,
    closingPrayer: req.body.closingPrayer,
  };
  const response = await mongodb
    .getDb()
    .db(process.env.DB_NAME)
    .collection("meetings")
    .insertOne(meeting);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the meeting."
      );
  }
};

const updateMeeting = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid meeting id to update a meeting.");
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const meeting = {
    date: req.body.date,
    presiding: req.body.presiding,
    conductor: req.body.conductor,
    chorister: req.body.chorister,
    accompanist: req.body.accompanist,
    openingHymn: req.body.openingHymn,
    openingPrayer: req.body.openingPrayer,
    announcements: req.body.announcements,
    speaker1: req.body.speaker1,
    speaker1Theme: req.body.speaker1Theme,
    speaker2: req.body.speaker2,
    speaker2Theme: req.body.speaker2Theme,
    speaker3: req.body.speaker3,
    speaker3Theme: req.body.speaker3Theme,
    closingHymn: req.body.closingHymn,
    closingPrayer: req.body.closingPrayer,
  };
  const response = await mongodb
    .getDb()
    .db(process.env.DB_NAME)
    .collection("meetings")
    .replaceOne(
      {
        _id: userId,
      },
      meeting
    );
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json({ message: "Meeting updated successfully" });
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the meeting."
      );
  }
};

const deleteMeeting = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid meeting id to delete a meeting.");
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db(process.env.DB_NAME)
    .collection("meetings")
    .remove(
      {
        _id: userId,
      },
      true
    );
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).json({ message: "Meeting deleted successfully" });
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the meeting."
      );
  }
};

const getLatestMeeting = async (req, res) => {
  const response = await mongodb
    .getDb()
    .db(process.env.DB_NAME)
    .collection("meetings")
    .find()
    .sort({ updatedAt: -1 })
    .limit(1)
    .toArray();
  if (response.length > 0) {
    res.status(200).json(response[0]);
  } else {
    res.status(404).json({ message: "No meetings found" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  getLatestMeeting,
};
