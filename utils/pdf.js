require('dotenv').config();
const { insert, create } = require("../models/PDF");
const AWS = require("aws-sdk");
const { randomUUID } = require("crypto");
const pdfQueue = require("./worker");

// Configure the AWS SDK with your credentials and region from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const createTablePdf = async (req, res) => {
  try {
    response = await create();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadPdf = async (req, res) => {
  // Upload the PDF to S3 or another storage service4
  const pdfFile = req.file;
  const projectId = req.params;

  try {
    const uploadParams = {
      Bucket: "rag-appdemo",
      Key: `pdfs/${Date.now()}_${pdfFile.originalname}`,
      Body: pdfFile.buffer,
    };
    console.log(uploadParams);

    const res = await s3.upload(uploadParams).promise();
    console.log("file uploaded: ", res);

    // add jobs to bullmq worker
    pdfQueue.add("processPDF", {
      projectId: projectId.projectId,
      pdfUrl: res.Location,
      content: pdfFile.buffer,
    });

    res.status(200).send("PDF uploaded and processed successfully");
  } catch (error) {
    console.error("Error uploading and processing PDF:", error);
    res.status(500).send("Error uploading and processing PDF");
  }

  // Assume pdfUrl is the URL to the uploaded PDF

  // Store the PDF and embeddings in the database
  //   const pdfId = await insertPDF(pdfUrl, pdfEmbeddings);

  //   // Link the PDF to the project
  //   await linkProjectPDF(projectId, [pdfId]);
};

// fetch s3 url using bucket and key
const getS3URL = async (bucket, key) => {
  const url = s3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: key,
  });
  return url;
};
// const url = getS3URL("rag-appdemo", "pdfs/1716665756827_Big_Data_Analytics.pdf")
// console.log(url)
module.exports = { createTablePdf, uploadPdf };
