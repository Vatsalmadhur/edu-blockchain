require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const multer = require("multer");
const pinataSDK = require("@pinata/sdk");
const { Readable } = require("stream");
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.get("/", (_, res) => {
  res.json({ status: true, msg: "Alive!" });
});

app.post("/getIpfsHash", upload.single("file"), async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    const stream = Readable.from(file.buffer);
    const options = {
      pinataMetadata: {
        name,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    };
    const { IpfsHash } = await pinata.pinFileToIPFS(stream, options);
    res.json({
      status: true,
      data: {
        hash: IpfsHash,
      },
      msg: "success",
    });
  } catch (e) {
    res.json({
      status: false,
      msg: e.message || "Unexpected server error",
    });
  }
});

http.listen(port, () => {
  console.log(`running on port ${port}`);
});
