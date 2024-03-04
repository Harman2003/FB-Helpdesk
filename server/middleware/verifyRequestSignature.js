const crypto = require("crypto");
const verifyRequestSignature = (req, res, next) => {
  const signature = req.headers["x-hub-signature-256"];

  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
    return res.sendStatus(403);
  }
  const elements = signature.split("=");
  const signatureHash = elements[1];
  const expectedHash = crypto
    .createHmac("sha256", process.env.APP_SECRET)
    .update(req.rawBody)
    .digest("hex");
  if (signatureHash != expectedHash) {
    throw new Error("Couldn't validate the request signature.");
  } else {
    next();
  }
};

module.exports = verifyRequestSignature;
