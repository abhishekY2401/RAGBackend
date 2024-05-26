// models/user.js
const {client} = require('../utils/db');

const Query = {
  create: async () => {
    const query = `CREATE TABLE query (
      id BIGSERIAL PRIMARY KEY,
      query_text TEXT NOT NULL,
      query_embeddings BIGINT[],
      response TEXT
  );`;
    
    const res = await client.query(query);
    return res
  },
  insert: async (query_text, query_embeddings, response) => {
    const query = `INSERT INTO Query (query_text, query_embeddings, response) VALUES ($1, $2, $3) RETURNING id`;
    const values = [query_text, query_embeddings, response];
    const res = await client.query(query, values);
    return res.rows[0];
  },

  findAll: async () => {
    const query = 'SELECT * FROM users';
    const res = await pool.query(query);
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

module.exports = Query;
