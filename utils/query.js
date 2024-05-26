const {insert, create} = require("../models/Query")

const createTableQuery = async (req, res) => {
    try {
        response = await create();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {createTableQuery}