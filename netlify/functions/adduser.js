let users = [];

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

        const newUser = {
            id: users.length + 1,
            name: data.name,
            email: data.email
        };

        users.push(newUser);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "User added successfully!"
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
