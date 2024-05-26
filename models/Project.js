// models/user.js
const {client} = require('../utils/db');

const Project = {
  create: async () => {
    const query = `CREATE TABLE project (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT
    );`
    
    const res = await client.query(query);
    return res
  },
  insert: async (title, description) => {
    const query = `INSERT INTO project (title, description) VALUES ($1, $2) RETURNING id`;
    const values = [title, description]; // Initialize uris and queries as empty arrays
    const res = await client.query(query, values);
    return res.rows[0].id;
  },

  findAll: async () => {
    const query = 'SELECT * FROM project';
    const res = await client.query(query);
    return res.rows;
  },

  update: async (id, firstName, lastName, email) => {
    const query = 'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *';
    const values = [firstName, lastName, email, id];
    const res = await pool.query(query, values);
    return res.rows[0];
  },

  delete: async (id) => {
    const query = 'DELETE FROM users WHERE id = $1';
    await pool.query(query, [id]);
    return { message: 'User deleted successfully' };
  }
};

module.exports = Project;
