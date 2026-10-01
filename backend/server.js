import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { connectDB, getDB } from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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
    } catch (error) {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//logout endpoint
app.get("/api/logout", (req, res) => {
    res.status(200).json({ success: "User logged out successfully" });
})

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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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