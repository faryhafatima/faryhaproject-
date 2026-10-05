from flask import Flask, render_template, jsonify, request
from dbs.db import get_db, create_database

app = Flask(__name__)


# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Test backend
@app.route("/api/message")
def message():
    return jsonify({
        "message": "Backend is connected!"
    })


# Add user
@app.route("/api/users", methods=["POST"])
def add_user():

    data = request.json

    name = data["name"]
    email = data["email"]

    connection = get_db()

    connection.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        (name, email)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "message": "User added successfully!"
    })


# Get users
@app.route("/api/users", methods=["GET"])
def get_users():

    connection = get_db()

    users = connection.execute(
        "SELECT * FROM users"
    ).fetchall()

    connection.close()

    return jsonify([dict(user) for user in users])


if __name__ == "__main__":

    create_database()

    app.run(debug=True)
