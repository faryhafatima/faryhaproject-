
exports.handler = async (event) => {

    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            body: JSON.stringify({
                message: "Method not allowed"
            })
        };
    }

    // Temporary empty list
    // Database will be connected in the next step

    return {
        statusCode: 200,
        body: JSON.stringify([])
    };
};
