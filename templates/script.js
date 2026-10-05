// Test backend
function getMessage() {
    document.getElementById("result").innerText =
        "Netlify backend is connected!";
}


// Add user
function addUser() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    fetch("/.netlify/functions/add-user", {
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


// Get users
function getUsers() {

    fetch("/.netlify/functions/get-users")
        .then(response => response.json())
        .then(users => {

            let output = "";

            users.forEach(user => {

                output += `
                    <p>
                        Name: ${user.name} |
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
