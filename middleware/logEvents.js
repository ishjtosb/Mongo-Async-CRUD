const fs = require('fs');
const { v4: uuid} = require('uuid');
const {format} = require("date-fns");
const path = require("path")

const logEvent = async (message, logFile) => {

    const uuidKey = uuid();
    const dateTime = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuidKey}\t${message}\n`

    try {
        if(!fs.existsSync(path.join(__dirname, "..", "logs", logFile))){
            fs.writeFileSync(path.join(__dirname, "..", "logs", logFile), logItem)
        }
        else {
            fs.appendFileSync(path.join(__dirname, "..", "logs", logFile), logItem)
        }
        
    }
    catch(err) {
        console.log(err);
    }

}

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLogs.txt");
    next();
}

module.exports = {logger, logEvent};
