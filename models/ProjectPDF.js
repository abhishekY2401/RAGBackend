const { client } = require("../utils/db");
const { insert } = require("../models/PDF");

const ProjectPDF = {
  createProjectPdf: async () => {
    const query = `CREATE TABLE ProjectPDF (
            project_id BIGINT NOT NULL,
            pdf_id BIGINT NOT NULL,
            PRIMARY KEY (project_id, pdf_id),
            FOREIGN KEY (project_id) REFERENCES Project(id) ON DELETE CASCADE,
            FOREIGN KEY (pdf_id) REFERENCES PDF(id) ON DELETE CASCADE
        );`;

    const res = await client.query(query);
    return res;
  },

  insertProjectPdf: async (projectId, pdfIds) => {
    const values = pdfIds
      .map((pdfId, index) => `($1, $${index + 2})`)
      .join(", ");
    const queryParams = [projectId, ...pdfIds];
    const insertProjectPDFText = `
    INSERT INTO ProjectPDF (project_id, pdf_id) 
    VALUES ${values};
  `;
    await pool.query(insertProjectPDFText, queryParams);
  },
};

module.exports = ProjectPDF;
