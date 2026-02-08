/**
 * Week 6 - Backend Docker Setup
 * 
 * This file sets up a Node.js Express server with MongoDB connection.
 * It exposes RESTful CRUD endpoints for specific 'Pokemon' resources.
 * It also includes Swagger documentation for API exploration.
 */

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests (for our frontend)
app.use(express.json()); // Parse JSON request bodies

/**
 * MongoDB Connection
 * 
 * We connect to the 'active' container named 'prog2700-mongo'.
 * The service name in docker-compose.yml is what resolves to the IP address.
 */
const MONGO_URI = 'mongodb://prog2700-mongo:27017/pokemon';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase(); // Seed data on successful connection
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));

/**
 * Mongoose Schema & Model
 * 
 * We define a schema for our Pokemon data.
 * Keeping it under 6 properties as requested.
 */
const pokemonSchema = new mongoose.Schema({
    name: String,
    type: String,
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

/**
 * Database Seeding
 * 
 * This function checks if the database is empty and populates it with initial data.
 */
async function seedDatabase() {
    try {
        const count = await Pokemon.countDocuments();
        if (count === 0) {
            const initialData = [
                { name: 'Bulbasaur', type: 'Grass/Poison', hp: 45, attack: 49, defense: 49, speed: 45 },
                { name: 'Charmander', type: 'Fire', hp: 39, attack: 52, defense: 43, speed: 65 },
                { name: 'Squirtle', type: 'Water', hp: 44, attack: 48, defense: 65, speed: 43 },
                { name: 'Pikachu', type: 'Electric', hp: 35, attack: 55, defense: 40, speed: 90 },
                { name: 'Jigglypuff', type: 'Normal/Fairy', hp: 115, attack: 45, defense: 20, speed: 20 }
            ];
            await Pokemon.insertMany(initialData);
            console.log('Database seeded with initial Pokemon data.');
        } else {
            console.log('Database already has data, skipping seed.');
        }
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

/**
 * Swagger Configuration
 */
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Week 6 Pokemon API',
            version: '1.0.0',
            description: 'A simple Express API for managing Pokemon data',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./index.js"], // Files containing annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Pokemon:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the pokemon
 *         name:
 *           type: string
 *           description: The name of the pokemon
 *         type:
 *           type: string
 *           description: The type of the pokemon
 *         hp:
 *           type: number
 *         attack:
 *           type: number
 *         defense:
 *           type: number
 *         speed:
 *           type: number
 */

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Returns the list of all the pokemon
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: The list of the pokemon
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */
app.get('/pokemon', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /pokemon/{id}:
 *   get:
 *     summary: Get the pokemon by id
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pokemon id
 *     responses:
 *       200:
 *         description: The pokemon description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: The pokemon was not found
 */
app.get('/pokemon/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json(pokemon);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /pokemon:
 *   post:
 *     summary: Create a new pokemon
 *     tags: [Pokemon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       201:
 *         description: The pokemon was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       500:
 *         description: Some server error
 */
app.post('/pokemon', async (req, res) => {
    const pokemon = new Pokemon({
        name: req.body.name,
        type: req.body.type,
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        speed: req.body.speed
    });

    try {
        const newPokemon = await pokemon.save();
        res.status(201).json(newPokemon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /pokemon/{id}:
 *   put:
 *     summary: Update the pokemon by the id
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pokemon id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       200:
 *         description: The pokemon was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: The pokemon was not found
 *       500:
 *         description: Some error happened
 */
app.put('/pokemon/:id', async (req, res) => {
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json(updatedPokemon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /pokemon/{id}:
 *   delete:
 *     summary: Remove the pokemon by id
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pokemon id
 *     responses:
 *       200:
 *         description: The pokemon was deleted
 *       404:
 *         description: The pokemon was not found
 */
app.delete('/pokemon/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id);
        if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' });
        res.json({ message: 'Pokemon deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
