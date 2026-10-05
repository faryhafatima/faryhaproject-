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
    const data = JSON.parse(event.body || "{}");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User added successfully!",
        user: {
          name: data.name || "Guest",
          email: data.email || ""
        }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error adding user",
        error: error.message
      })
    };
  }
};
