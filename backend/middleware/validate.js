const validator = require("../helpers/validate");

const saveMeeting = (req, res, next) => {
  const requiredFields = [
    "date",
    "presiding",
    "conductor",
    "chorister",
    "accompanist",
    "openingHymn",
    "openingPrayer",
    "announcements",
    "speaker1",
    "speaker1Theme",
    "speaker2",
    "speaker2Theme",
    "speaker3",
    "speaker3Theme",
    "closingHymn",
    "closingPrayer",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(412)
        .json({ error: `Missing required field: ${field}` });
    }
  }

  next();
};

const saveAnnouncement = (req, res, next) => {
  const validationRule = {
    date: "required|string",
    announcement: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveActivity = (req, res, next) => {
  const validationRule = {
    date: "required|string",
    startTime: "required|string",
    endTime: "required|string",
    place: "required|string",
    activity: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveNeedHelp = (req, res, next) => {
  const validationRule = {
    date: "required|string",
    name: "required|string",
    contact: "required|string",
    email: "email",
    phone: "string",
    whatHelpINeed: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMeeting,
  saveAnnouncement,
  saveActivity,
  saveNeedHelp,
};
