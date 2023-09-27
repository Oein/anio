const https = require("https");
const http = require("http");
const parse = require("url").parse;

var httpsAddress = parseInt(process.env.PORT || "3000");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const token =
  "Token ef2715fe34d7fa767b1e0700ef8a0efb3bcf03959562792b5739b42b05fd7f9920a90ec472f3f8a78624cb15d982b51807f5e66b5173c12c4c6944fc138e4971";

let exiting = false;
let lx = false;
process.stdin.resume();
async function exitHandler(options, exitCode) {
  if (lx) process.exit();
  return new Promise((resolve, reject) => {
    console.log("exit handler!", exiting);
    if (exiting) return;
    exiting = true;
    // remove lock file
    console.log("Requesting to delete");
    let req = https.request(
      {
        method: "POST",
        hostname: "ert.im",
        path: "/shutdown",
        port: 443,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
      (res) => {
        const body = [];
        res.on("data", (chunk) => body.push(chunk));
        res.on("end", () => {
          exiting = false;
          console.log(
            "Domain freeing finished with data",
            Buffer.concat(body).toString()
          );
          if (options === 1) return resolve();
          process.exit();
        });
      }
    );
    req.write(
      JSON.stringify({
        port: httpsAddress,
      })
    );
    req.on("error", (e) => {
      console.error(e);
      process.exit();
    });
    req.end();
  });
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", (e) => {
  console.error(e);
  exitHandler(null, { exit: true });
});

const onReady = () => {
  var req = https.request(
    {
      method: "POST",
      hostname: "ert.im",
      path: "/request",
      port: 443,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    },
    (res) => {
      const body = [];
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        let dt = JSON.parse(resString);
        console.log("Doamin allocator request finished with data", dt);
        if (dt.s == false) {
          console.log("Failed to allocate domain.");
          console.error(dt);
          process.exit();
        }

        if (dt.o) {
          console.log("req");
          let req = https.request(
            {
              hostname: dt.d.replace("https://", ""),
              path: "/",
            },
            (res) => {
              res.setEncoding("utf8");
              res.on("data", (chunk) => {});
              res.on("end", () => {
                lx = true;
                console.log("Domain is used by other session.");
                process.exit();
              });
            }
          );
          req.on("error", () => {
            console.log("Domain is not used. Shutdown and try again.");
            exitHandler(1).then(() => {
              onReady();
            });
          });
          req.end();
          return;
        }

        console.log("Allocated domain!", dt.d);
      });
    }
  );
  req.write(
    JSON.stringify({
      port: httpsAddress,
      ...(process.env.DOMAIN ? { lockDomain: process.env.DOMAIN } : {}),
    })
  );
  req.end();
};

onReady()