const db = require("../models");

const {
  validateMeter,
  Meter,
  validateLoadToken,
} = require("../models/meter.model");
const { Token } = require("../models/token.model");
const {
  generateMeterNumber,
  getDaysDifference,
  validateUUID,
  getTokenExpirationDate,
} = require("../utils/Common");

// Create and Save a new Meter
exports.create = (req, res) => {
  // Validate request
  const { error } = validateMeter(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  // Save Meter in the database
  Meter.create({
    code: generateMeterNumber(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || " error occurred during generating the meter number.",
      });
    });
};

// Load token
exports.loadToken = async (req, res) => {
  // Validate request
  const { error } = validateLoadToken(req.body);
  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }
  if (!validateUUID(req.body.token))
    return res.status(400).send({ message: "invalid token" });

  const meter = await Meter.findOne({ code: req.body.meter_number });
  if (!meter) return res.status(404).send({ message: "meter number doesn't exist"});

  const token = await Token.findOne({
    meter_number: req.body.meter_number,
    code: req.body.token,
  });
  if (token.status == "USED")
    return res.status(400).send({ message: "token has been already used!!" });

  Token.findOneAndUpdate(
    {
      code: req.body.token,
      meter_number: req.body.meter_number,
      status: "NOT_USED",
    },
    { status: "USED" },
    {
      useFindAndModify: false,
    }
  )
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: "Token doesn't exist.",
        });
        // add the duration count
      } else {
        await Meter.updateOne(
          { _id: meter._id },
          {
            expiration_time: getTokenExpirationDate(
              data.totalAmount,
              meter.expiration_time
            ),
          }
        );

        const daysBefore = meter.expiration_time
            ? getDaysDifference(meter.expiration_time)
            : 0,
          added = data.totalAmount / 100;

        res.send({
          message: `${added} days added, now you have ${
            daysBefore + added
          } days remaining`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  const number = req.params.number;

  Meter.findOne({ code: number })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found Meter with number " + number,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Meter with number=" + number,
      });
    });
};


exports.getMeterDetails = (req, res) => {
    const number = req.params.number;
  
    Meter.findOne({ code: number })
      .then((data) => {
        if (!data)
          res.status(404).send({
            message: "No found Meter with number " + number,
          });
        else return res.send({message: `You have ${getDaysDifference(data.expiration_time)} days remaining`});
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Meter with number=" + number,
        });
      });
  };

exports.update = (req, res) => {
  const { error } = validateMeter(req.body);
  if (error) {
    res.status(400).send({ message: error.deatails[0].message });
    return;
  }

  const number = req.params.number;

  Meter.findOneAndUpdate({ code: number }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Not Found",
        });
      } else res.send({ message: "Meter was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Meter with number=" + number,
      });
    });
};
exports.delete = (req, res) => {
  const number = req.params.number;

  Meter.findOneAndDelete({ code: number }, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Could not delete Meter with number=" + number
        });
      } else {
        res.send({
          message: "Meter was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Meter with number=" + number,
      });
    });
};
