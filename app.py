from flask import Flask, render_template, jsonify, request
import sqlite3

app = Flask(__name__)


# Connect to database
def get_db():
    connection = sqlite3.connect("database.db")
    connection.row_factory = sqlite3.Row
    return connection


# Create database and table
def create_database():
    connection = get_db()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Get message from backend
@app.route("/api/message")
def message():
    return jsonify({
        "message": "Backend is connected!"
    })


# Add user to database
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


# Get all users
@app.route("/api/users", methods=["GET"])
def get_users():

    connection = get_db()

    users = connection.execute(
        "SELECT * FROM users"
    ).fetchall()

    connection.close()

    return jsonify([
        dict(user) for user in users
    ])


if __name__ == "__main__":

    create_database()

    app.run(debug=True)
