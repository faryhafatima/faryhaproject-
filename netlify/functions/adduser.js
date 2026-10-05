
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

        const name = data.name;
        const email = data.email;

        // Temporary response
        // Database will be connected in the next step

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User received successfully!",
                name: name,
                email: email
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error adding user"
            })
        };
    }
};
