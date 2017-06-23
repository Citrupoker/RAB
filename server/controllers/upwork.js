var fs = require("fs");
var contents = fs.readFileSync("upwork.json");
contents.replace(/u"(?=[^:]+')/g, '"');
var jobs = JSON.parse(contents)

module.exports.getJobs = (req, res) => {
    console.log(jobs);
  }

