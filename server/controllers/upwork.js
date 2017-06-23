var fs = require("fs");
var contents = fs.readFileSync("upwork.json").toString();
contents.replace(/u"(?=[^:]+')/g, '"');
var jobs = JSON.parse(contents)

module.exports.getJobs = (req, res) => {
    console.log(jobs);
  }

