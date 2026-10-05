
// Test backend
function getMessage() {

    fetch("/api/message")

        .then(response => response.json())

        .then(data => {

            document.getElementById("result").innerText =
                data.message;

        })

        .catch(error => {

            console.log(error);

        });
}


// Add user to database
function addUser() {

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;


    fetch("/api/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: name,
            email: email
        })

    })

    .then(response => response.json())

    .then(data => {

        document.getElementById("userResult").innerText =
            data.message;

        document.getElementById("name").value = "";

        document.getElementById("email").value = "";

        getUsers();

    })

    .catch(error => {

        console.log(error);

    });
}


// Get users from database
function getUsers() {

    fetch("/api/users")

        .then(response => response.json())

        .then(users => {

            let output = "";

            users.forEach(user => {

                output += `
                    <p>
                        ID: ${user.id}
                        |
                        Name: ${user.name}
                        |
                        Email: ${user.email}
                    </p>
                `;

            });

            document.getElementById("usersList").innerHTML =
                output || "<p>No users found.</p>";

        })

        .catch(error => {

            console.log(error);

        });
}
