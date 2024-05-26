const express = require("express");
const cors = require("cors");
const { router } = require("./routes/ragRoutes");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(`/api/rag`, router);

// define storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, files, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({storage: storage})

const port = 6000;

app.get("/", (req, res) => res.status(200).json({ msg: "hello" }));
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// module.exports = {upload}