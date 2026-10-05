let users = [];

exports.handler = async (event) => {

    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            body: JSON.stringify({
                message: "Method not allowed"
            })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(users)
    };
};
