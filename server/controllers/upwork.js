var fs = require("fs");
var contents = fs.readFileSync("upwork.json");
var jobs = JSON.parse(contents);

module.exports.getJobs = (req, res) => {
    console.log(jobs);
  }

