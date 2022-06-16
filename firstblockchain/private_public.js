
const path = require("path");
const fs = require("fs");

var jwt = require("jsonwebtoken");
// doc bang utf8
var privateKey = fs.readFileSync("./private.key", "utf8");
var publicKey = fs.readFileSync("./public.key", "utf8");

var payload = {};

payload.field01 = "Data 01";
payload.field02 = "Data 02";
payload.field03 = "Data 03";

console.log("Payload: " + JSON.stringify(payload));


console.log(" ");

// Values for the rfc7519 fields

var iss = "Blitzkrieg Software";
var sub = "joe@user.org";
var aud = "http://blitzkriegsoftware.net";

// Expiration timespan: https://github.com/auth0/node-jsonwebtoken#token-expiration-exp-claim
var exp = "24h";

// JWT Token Options, see: https://tools.ietf.org/html/rfc7519#section-4.1 for the meaning of these
// Notice the `algorithm: "RS256"` which goes with public/private keys
var signOptions = {
  issuer: iss,
  subject: sub,
  audience: aud,
  expiresIn: exp,
  algorithm: "RS256",
};
console.log("Options: " + JSON.stringify(signOptions));

var token = jwt.sign(payload, privateKey, signOptions);
console.log("Token: " + token);
console.log(" ");

var verifyOptions = {
  issuer: iss,
  subject: sub,
  audience: aud,
  maxAge: exp,
  algorithms: ["RS256"],
};

var verified = jwt.verify(token, publicKey, verifyOptions);
console.log("Verified: " + JSON.stringify(verified));

/*
    Decode
*/

console.log(" ");

var decoded = jwt.decode(token, { complete: true });
console.log("Docoded Header: " + JSON.stringify(decoded.header));
console.log("Docoded Payload: " + JSON.stringify(decoded.payload));

process.exitCode = 0;
