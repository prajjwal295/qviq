const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const Port = process.env.PORT || 4000;

// db connect
database.connect();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "social-view-762f9.web.app",
    "https://social-view-762f9.firebaseapp.com/",
    "https://qviq-three.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

cloudinaryConnect();

// app.use("/api/v1/auth", authRoutes);

const {
  signup,
  updateProfile,
  getUserData,
  signupWithGoogle,
  deleteUser,
} = require("./controller/Auth");

const { auth } = require("./middleware/auth");

app.post("/api/v1/auth/signup", auth, signup);
app.post("/api/v1/auth/signupWithGoogle", auth, signupWithGoogle);
app.put("/api/v1/auth/updateProfile", auth, updateProfile);
app.get("/api/v1/auth/getUserDetails/:id", getUserData);
app.delete("/api/v1/auth/deleteUser", auth, deleteUser);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is running",
  });
});

// activate server
app
  .listen(Port, () => {
    console.log(`app listens at ${Port}`);
  })
  .on("error", (err) => {
    console.error("Server start error:", err);
  });
