const admin = require("../config/firebaseAdmin");

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log({ token });
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    console.log({ decodedToken });
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
