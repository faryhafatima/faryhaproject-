const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI);

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({
                message: "Method not allowed"
            })
        };
    }

    try {
        const data = JSON.parse(event.body);
        
        await client.connect();
        const db = client.db("yourDB");
        const usersCollection = db.collection("users");

        const newUser = {
            name: data.name,
            email: data.email,
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User added successfully!",
                userId: result.insertedId
            })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error adding user",
                error: error.message
            })
        };
    } finally {
        await client.close();
    }
};
