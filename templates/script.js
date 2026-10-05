// Test backend
function getMessage() {

    document.getElementById("result").innerText =
        "Netlify backend is connected!";
}


// Add user
document.getElementById("userForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    fetch("/.netlify/functions/users", {

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

        console.error(error);

        document.getElementById("userResult").innerText =
            "Error adding user.";

    });

});


// Get users
function getUsers() {

    fetch("/.netlify/functions/users")

        .then(response => response.json())

        .then(users => {

            let output = "";

            users.forEach(user => {

                output += `
                    <div class="user">
                        <strong>ID:</strong> ${user.id}<br>
                        <strong>Name:</strong> ${user.name}<br>
                        <strong>Email:</strong> ${user.email}
                    </div>
                `;

            });

            document.getElementById("usersList").innerHTML =
                output || "<p>No users found.</p>";

        })

        .catch(error => {

            console.error(error);

            document.getElementById("usersList").innerHTML =
                "<p>Error loading users.</p>";

        });
}
