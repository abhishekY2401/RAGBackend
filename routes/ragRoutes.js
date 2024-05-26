const {createProject, createTableProject} = require("../utils/project")
const {createTableQuery} = require("../utils/query")
const {createTablePdf} = require("../utils/pdf")
const express = require("express");
// const {upload} = require("../server")
var multer = require('multer');
var upload = multer();
const {uploadPdf} = require("../utils/pdf")

const router = express.Router()


// routes to create a new project, upload pdfs or querying and retrieval

// routes to create tables
router.get('/create-table-project', createTableProject)
router.get('/create-table-query', createTableQuery)
router.get('/create-table-pdf', createTablePdf)

// routes to insert values in all the related tables
router.post('/create-project', createProject)
router.post('/upload-pdf/:projectId', upload.single('file'), uploadPdf)

module.exports = {router}