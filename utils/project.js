const {insert, create} = require("../models/Project")

const createTableProject = async (req, res) => {
    try {
        response = await create();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createProject = async (req, res) => {
    console.log("Received request body:", req.body); // Log request body for debugging
    const {title, description} = req.body;
    console.log(title)
    try {
        product = await insert(title, description);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const fetchProjects = () => {
    
}

module.exports = {createProject, createTableProject}