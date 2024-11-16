const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');  // For password hashing
const fs = require('fs'); // Add this line at the top
const app = express();
const port = 3000;

// Enable CORS for all origins and methods
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));


app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json()); // Middleware to parse JSON

// MongoDB connection URI
const uri = 'mongodb+srv://Satish:Satya%4023@cluster0.8zasz.mongodb.net/videoLibrary?retryWrites=true&w=majority';
let client; // Declare client to maintain a single MongoDB connection

async function connectToMongoDB() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }
}

// Fetch video data from MongoDB
async function getVideos() {
    try {
        await connectToMongoDB(); // Ensure MongoDB connection
        const database = client.db('videoLibrary');
        const collection = database.collection('videos');
        const videos = await collection.find({}).toArray();
        return videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
}
async function addVideosToDatabase() {
    try {
        await connectToMongoDB();
        const db = client.db('videoLibrary');
        const videosCollection = db.collection('videos');

        const videosDir = path.join(__dirname, 'videos');
        const videoFiles = fs.readdirSync(videosDir);

        for (const file of videoFiles) {
            const title = path.parse(file).name
            const videoUrl = `https://render-nl4l.onrender.com/videos/${file}`;
            const videoExists = await videosCollection.findOne({ url: videoUrl });

            if (!videoExists) {
                await videosCollection.insertOne({
                    _id: new ObjectId(),
                    title: title,  // Creates title like "Tutorial 2" based on file name number
                    url: videoUrl,
                });
                console.log(`Inserted video: ${file}`);
            } else {
                console.log(`Video already exists in database: ${file}`);
            }
        }
    } catch (error) {
        console.error("Error adding videos to the database:", error);
    }
}

// Call this function once during server startup
(async () => {
    try {
        await addVideosToDatabase();
        console.log("Initial video database check completed.");
    } catch (error) {
        console.error("Error during initial video database check:", error);
    }

    // Start the server after initializing videos
    app.listen(port, () => {
        console.log(`Server running on https://render-nl4l.onrender.com:${port}`);
    });
})();
app.get('/videos', async (req, res) => {
    try {
        const videos = await getVideos();
        res.json(videos);
    } catch (error) {
        res.status(500).send('Error fetching videos');
    }
});
app.get('/video.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/video.html'));
});

// Serve login and registration pages
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    try {
        await connectToMongoDB();
        const db = client.db('videoLibrary'); // Change from 'SeniorBrowser' to 'videoLibrary'
        const users = db.collection('users'); // 'users' collection within 'videoLibrary'
        // Check if the user already exists
        const existingUser = await users.findOne({ username });
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        // Insert new user into the database
        await users.insertOne({ username, password: hashedPassword });
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('Error registering user');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        await connectToMongoDB();
        const db = client.db('videoLibrary'); // Change from 'SeniorBrowser' to 'videoLibrary'
        const users = db.collection('users'); // 'users' collection within 'videoLibrary'

        // Find user and compare passwords
        const user = await users.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).send('Login successful');
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send('Error logging in');
    }
});
