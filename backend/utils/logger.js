import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");

/* ==========================================
   CREATE LOG DIRECTORY
========================================== */

if (!fs.existsSync(logDirectory)) {

    fs.mkdirSync(logDirectory, {

        recursive: true

    });

}

/* ==========================================
   LOG FILE
========================================== */

const logFile = path.join(

    logDirectory,

    "application.log"

);

/* ==========================================
   WRITE LOG
========================================== */

const writeLog = (

    level,

    message

) => {

    const log = `[${new Date().toISOString()}] [${level}] ${message}\n`;

    fs.appendFileSync(

        logFile,

        log,

        "utf8"

    );

};

/* ==========================================
   INFO
========================================== */

export const info = (message) => {

    console.log(message);

    writeLog(

        "INFO",

        message

    );

};

/* ==========================================
   WARNING
========================================== */

export const warn = (message) => {

    console.warn(message);

    writeLog(

        "WARN",

        message

    );

};

/* ==========================================
   ERROR
========================================== */

export const error = (

    message,

    err = null

) => {

    console.error(message);

    if (err) {

        console.error(err);

    }

    writeLog(

        "ERROR",

        `${message} ${err ? err.stack || err.message : ""}`

    );

};

/* ==========================================
   DEBUG
========================================== */

export const debug = (message) => {

    if (process.env.NODE_ENV === "development") {

        console.debug(message);

        writeLog(

            "DEBUG",

            message

        );

    }

};

export default {

    info,

    warn,

    error,

    debug

};