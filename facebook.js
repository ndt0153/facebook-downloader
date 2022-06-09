const Page = require("./models/page.model");
const _ = require("lodash");
const FacebookAnalytic = require("./download");
const saveToDB = async (result) => {};
const findInDB = async () => {
  return Page.find({})
    .select("id url text img -_id")
    .select("-__v")
    .exec()
    .then((result) => {
      return result;
    });
};
const uniques = async (db, result) => {
  return _.xorWith(db, result, _.isEqual);
};
module.exports = { findInDB, saveToDB, uniques };
