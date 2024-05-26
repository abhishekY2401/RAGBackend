const { client } = require("../utils/db");

const ProjectQuery = {
  create: async () => {
    const query = `CREATE TABLE ProjectQuery (
        project_id BIGINT NOT NULL,
        query_id BIGINT NOT NULL,
        PRIMARY KEY (project_id, query_id),
        FOREIGN KEY (project_id) REFERENCES Project(id) ON DELETE CASCADE,
        FOREIGN KEY (query_id) REFERENCES Query(id) ON DELETE CASCADE
    );`;

    const res = await client.query(query);
    return res;
  },
};

module.exports = ProjectQuery;
