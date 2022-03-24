const mongoose = require("mongoose");
const Joi = require('joi')
var schema = mongoose.Schema(
  {
    code: String,
    firstName: String,
    lastName: String,
    expiration_time: Date
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Model = mongoose.model("meter", schema);

module.exports.Meter = Model;
module.exports.validateMeter = (body) => {
  return Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).validate(body);
};
module.exports.validatIngToken = (body) => {
    return Joi.object({
      token: Joi.string().required(),
      meterNumber: Joi.string().min(6).required()
    }).validate(body);
  };
