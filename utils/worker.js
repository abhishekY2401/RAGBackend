const { Worker } = require("bullmq");
const axios = require("axios");
const pdfParse = require("pdf-parse");
const Redis = require("ioredis");
const { insert } = require("../models/PDF");

const connection = new Redis({
  maxRetriesPerRequest: null,
});

const pdfWorker = new Worker(
  "pdfQueue",
  async (job) => {
    // get the pdf url
    const { projectId, pdfUrl, content } = job.data;

    try {
      // download the pdf from s3 bucket
      const pdfBuffer = await downloadPdfFromS3(pdfUrl);

      // parse the pdf content
      const pdfData = await pdfParse(pdfBuffer);
      const pdfText = pdfData.text;

      // generate embeddings
      const embeddings = await generateEmbeddings([content]);

      // Store PDF URL and embeddings in PostgreSQL
      const id = await insert(pdfId, pdfUrl, JSON.stringify(embeddings));
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  },
  { connection }
);

async function downloadPdfFromS3(pdfUrl) {
  const params = {
    Bucket: "rag-appdemo",
    Key: pdfUrl.split("/").pop(),
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data.Body);
    });
  });
}

async function generateEmbeddings(texts) {
  const response = await axios.post(
    "https://embeddings-pjuh.onrender.com/generate-embeddings",
    {
      texts: texts,
    }
  );
  return response.data.embeddings;
}

module.exports = { pdfWorker };
