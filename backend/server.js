const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const { ObjectId } = require("mongodb");
const { connectDB, getDB } = require("./db");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/exposures", express.static(path.join(__dirname, "exposures")));

//========== Authentication Endpoints ==========

//sign-in endpoint
app.post("/api/sign-in", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    };

    const collection = db.collection("Users");

    const { email, password } = req.body;

    try {
        const user = await collection.findOne({ email: email });

        //check if user exists
        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        //check if password is correct
        if(user.password !== password) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        //return success response with user data
        res.status(200).json({ 
            _id: user._id,
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//sign-up endpoint
app.post("/api/sign-up", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");

    try {
        const existingUser = await collection.findOne({ email: email });

        if(existingUser) {
            res.status(409).json({ error: "User already exists" });
            return;
        }

        const newUser = {
            email: email,
            password: password
        };

        await collection.insertOne(newUser);
        const createdUser = await collection.findOne({ email: email });
        res.status(201).json({ _id: createdUser._id });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//logout endpoint
app.get("/api/logout", (req, res) => {
    res.status(200).json({ success: "User logged out successfully" });
})

//========== User Endpoints ==========

//get user by id endpoint
app.get("/api/users/:id", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");
    const userId = req.params.id;

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_picture: user.profile_picture,
            joined: user.joined,
            admin: user.admin,
            friends: user.friends,
            friendRequests: user.friendRequests,
            albumns: user.albumns
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    } 
})

//update user by id endpoint
app.patch("/api/users/:id", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");

    const userId = req.params.id;

    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    if(!await collection.findOne({ _id: new ObjectId(userId) })) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    try {
        const { username, bio } = req.body;

        if(!username && !bio) {
            res.status(400).json({ error: "At least one field (username or bio) is required to update" });
            return;
        }

        const updateData = {};

        updateData.username = username;
        updateData.bio = bio;

        await collection.updateOne({ _id: new ObjectId(userId) }, { $set: updateData });
        res.status(200).json({ success: "User updated successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//delete user by id endpoint
app.delete("/api/users/:id", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");
    const userId = req.params.id;

    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        await collection.deleteMany({ _id: new ObjectId(userId) });

        res.status(200).json({ success: "User deleted successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//========== Friend Endpoints ==========

//accept friend request endpoint
app.post("/api/users/:id/accept", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");
    const userId = req.params.id;

    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        const { friendId } = req.body;

        if(!friendId) {
            res.status(400).json({ error: "Friend ID is required" });
            return;
        }

        const friendObjectId = new ObjectId(friendId);

        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if(!user.friendRequests.some(id => id.equals(friendObjectId))) {
            res.status(400).json({ error: "Friend request not found" });
            return;
        }

        await collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $pull: { friendRequests: friendObjectId },
                $push: { friends: friendObjectId }
            }
        );

        await collection.updateOne(
            { _id: friendObjectId },
            {
                $push: { friends: new ObjectId(userId) }
            }
        );
    
        res.status(200).json({ success: "Friend request accepted successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//reject friend request endpoint
app.post("/api/users/:id/reject", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");
    const userId = req.params.id;

    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        const { friendId } = req.body;

        if(!friendId) {
            res.status(400).json({ error: "Friend ID is required" });
            return;
        }

        const friendObjectId = new ObjectId(friendId);

        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if(!user.friendRequests.some(id => id.equals(friendObjectId))) {
            res.status(400).json({ error: "Friend request not found" });
            return;
        }

        await collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $pull: { friendRequests: friendObjectId }
            }
        );
    
        res.status(200).json({ success: "Friend request rejected successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//send friend request endpoint
app.post("/api/users/:id/sendRequest", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");
    const userId = req.params.id;

    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        const { friendId } = req.body;

        if(!friendId) {
            res.status(400).json({ error: "Friend ID is required" });
            return;
        }

        const friendObjectId = new ObjectId(friendId);

        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if(user.friendRequests.some(id => id.equals(friendObjectId))) {
            res.status(400).json({ error: "Friend request already sent" });
            return;
        }

        await collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $push: { friendRequests: friendObjectId }
            }
        );

        res.status(200).json({ success: "Friend request sent successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//unfriend endpoint
app.post("/api/users/:id/unfriend", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Users");
    
    const userId = req.params.id;

    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    try {
        const user = await collection.findOne({ _id: new ObjectId(userId) });

        const { friendId } = req.body;

        if(!friendId) {
            res.status(400).json({ error: "Friend ID is required" });
            return;
        }

        const friendObjectId = new ObjectId(friendId);

        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        if(!user.friends.some(id => id.equals(friendObjectId))) {
            res.status(400).json({ error: "Friend not found" });
            return;
        }

        await collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $pull: { friends: friendObjectId }
            }
        );

        await collection.updateOne(
            { _id: friendObjectId },
            {
                $pull: { friends: new ObjectId(userId) }
            }
        );

        res.status(200).json({ success: "Friend removed successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//========== Exposure Endpoints ==========

//creating post with UserID, image, description, and hashtags endpoint

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "exposures/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage: imageStorage });

app.post("/api/exposures", upload.single("file"), async (req, res) => {
    const db = getDB();
    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Exposures");

    if(!req.file) {
        res.status(400).json({ error: "Image file is required" });
        return;
    }

    try {
        const { user_id, description, hashtags } = req.body;
        if(!user_id || !description || !hashtags) {
            res.status(400).json({ error: "UserID, description, and hashtags are required" });
            return;
        }

        const newExposure = {
            image: `/exposures/${req.file.filename}`,
            description: description,
            hashtags: hashtags,
            created: new Date(),
            user_id: new ObjectId(user_id)
        };

        await collection.insertOne(newExposure);
        res.status(201).json({ success: "Exposure created successfully", exposure_id: newExposure._id });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//update exposure endpoint
app.patch("/api/exposures/:id", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Exposures");

    const exposureId = req.params.id;

    if(!exposureId) {
        res.status(400).json({ error: "Exposure ID is required" });
        return;
    }

    try {
        const { description, hashtags, comments } = req.body;

        if(!description && !hashtags && !comments) {
            res.status(400).json({ error: "Need description, hashtags, or acomment" });
            return;
        }

        const updateData = {};
        if(description) updateData.description = description;
        if(hashtags) updateData.hashtags = hashtags;
        if(comments) updateData.comments = comments;

        await collection.updateOne({ _id: new ObjectId(exposureId) }, { $set: updateData });

        res.status(200).json({ success: "Exposure updated successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//delete exposure endpoint
app.delete("/api/exposures/:id", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Exposures");

    const exposureId = req.params.id;

    if(!exposureId) {
        res.status(400).json({ error: "Exposure ID is required" });
        return;
    }

    try {
        const exposure = await collection.findOne({ _id: new ObjectId(exposureId) });

        if(!exposure) {
            res.status(404).json({ error: "Exposure not found" });
            return;
        }

        await collection.deleteOne({ _id: new ObjectId(exposureId) });

        res.status(200).json({ success: "Exposure deleted successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//========== Albumns Enpoints ==========
app.post("/api/albumns", async (req, res) => {
    const db = getDB();
    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Albumns");

    try {
        const { user_id, title, description, hashtags } = req.body;
        if(!user_id || !title || !description || !hashtags) {
            res.status(400).json({ error: "UserID, title, description, and hashtags are required" });
            return;
        }

        const newAlbumn = {
            title: title,
            description: description,
            hashtags: hashtags,
            created: new Date(),
            user_id: new ObjectId(user_id),
            exposures: [],
        };

        await collection.insertOne(newAlbumn);
        res.status(201).json({ success: "Albumn created successfully", albumn_id: newAlbumn._id });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//delete albumn endpoint
app.delete("/api/albumns/:id", async (req, res) => {
    const db = getDB();
    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Albumns");
    
    const albumnId = req.params.id;

    if(!albumnId) {
        res.status(400).json({ error: "Albumn ID is required" });
        return;
    }

    try {
        const albumn = await collection.findOne({ _id: new ObjectId(albumnId) });

        if(!albumn) {
            res.status(404).json({ error: "Albumn not found" });
            return;
        }

        await collection.deleteOne({ _id: new ObjectId(albumnId) });

        res.status(200).json({ success: "Albumn deleted successfully" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})


//update albumn endpoint
app.patch("/api/albumns/:id", async (req, res) => {
    const db = getDB();
    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Albumns");

    const albumnId = req.params.id;

    if(!albumnId) {
        res.status(400).json({ error: "Albumn ID is required" });
        return;
    }

    try {
        const { exposures, title, description, hashtags } = req.body;
        if(!exposures && !title && !description && !hashtags) {
            res.status(400).json({ error: "exposures, title, description, and hashtags are required" });
            return;
        }

        const updateAlbumn = {};
        
        if(exposures) updateAlbumn.exposures = exposures.map(id => new ObjectId(id));
        if(title) updateAlbumn.title = title;
        if(description) updateAlbumn.description = description;
        if(hashtags) updateAlbumn.hashtags = hashtags;

        await collection.updateOne({ _id: new ObjectId(albumnId) }, { $set: updateAlbumn });
        res.status(200).json({ success: "Albumn updated successfully", albumn_id: albumnId });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//========== Activity Endpoints ==========

//get all albumns endpoint
app.get("/api/albumns", async (req, res) => {
    const db = getDB();
    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Albumns");

    try {
        const albumns = await collection.find().toArray();
        res.status(200).json(albumns);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//get all exposures endpoint
app.get("/api/exposures", async (req, res) => {
    const db = getDB();
    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Exposures");

    try {
        const exposures = await collection.find().toArray();
        res.status(200).json(exposures);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

app.get("/api/local/:id", async (req, res) => {
    const db = getDB();

    if(!db) {
        res.status(500).json({ error: "database undefined" })
        return;
    }

    const collection = db.collection("Exposures");
    const userCollection = db.collection("Users");

    const userId = req.params.id;

    if(!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    try {
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });

        if(!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const friends = user.friends.map(friendId => new ObjectId(friendId));

        const exposures = await collection.find({ user_id: { $in: friends } }).toArray();

        res.status(200).json(exposures);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    });