const db = require("../models");
const { validateToken, Token } = require("../models/token.model");
const { Meter } = require("../models/meter.model");
const { v4: uuidv4 } = require("uuid");
const { getTokenExpirationDate } = require("../utils/Common");


exports.create = async (req, res) => {
  const { error } = validateToken(req.body);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  } else if (req.body.total_amount % 100)
    return res
      .status(400)
      .send({ message: "total amount should be >100" });

  const meter = await Meter.findOne({ code: req.body.meter_number });

  if (!meter)
    return res.status(404).send({
      message: "Wrong meter number",
    });

  Token.create({
    code: uuidv4(),
    meter_number: req.body.meter_number,
    total_amount: req.body.total_amount,
    status: "NOT_USED",
  })
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred during creating a Token.",
      });
    });
};

exports.findOne = (req, res) => {
  const code = req.params.code;

  Token.findOne({ code })
    .then((response) => {
      if (!response)
        res.status(404).send({
          message: "Not found Token with code " + code,
        });
      else res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Token with code=" + code,
      });
    });
};
