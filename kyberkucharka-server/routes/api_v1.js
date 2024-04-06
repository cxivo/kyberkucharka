const crypto = require("crypto");
var express = require("express");
const { getMessages, addMessage } = require("../models/messages");
var router = express.Router();

const messages = [
  {
    id: crypto.randomUUID(),
    userId: "123",
    avatar: "images/person-circle.svg",
    text: `You gotta smoke test your hypothesis to gain traction. Social currency problem territories, but
    pre launch, but core competencies. We need to dialog around your choice of work attire screw the
    pooch, for ultimate measure of success, best practices.`,
  },
  {
    id: crypto.randomUUID(),
    userId: "123",
    avatar: "images/person-circle.svg",
    text: `Big picture hit the ground running. If you're not hurting you're not winning. Onward and upward,
    productize the deliverables and focus on the bottom line pig in a python circle back.`,
  },
  {
    id: crypto.randomUUID(),
    userId: "123",
    avatar: "images/person-circle.svg",
    text: `Shotgun approach we're building the plane while we're flying it a set of certitudes based on
    deductions founded on false premise, but quantity, yet i called the it department about that
    ransomware because of the old antivirus, but he said that we were using avast 2021. Locked and
    loaded. We need to follow protocol workflow ecosystem.`,
  },
];

/* GET home page. */
router.get("/messages", function (req, res, next) {
  getMessages()
    .then((messages) => {
      res.json(messages.rows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

router.post("/messages", function (req, res, next) {
  addMessage(req.body)
    .then((r) => res.status(200))
    .catch((e) => {
      console.log(e);
      res.status(500);
    });
});

module.exports = router;
