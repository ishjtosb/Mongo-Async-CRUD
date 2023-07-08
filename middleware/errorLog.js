const {logEvent} = require('./logEvents');

const errorLog = (err, req, res, next) => {
    logEvent(`${err.name}\t${err.message}`, "errorLogs.txt");
    console.log(err.stack);
    res.status(500).send(err.message);
}

module.exports = errorLog;