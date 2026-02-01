const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "simpleSecret",
    resave: false,
    saveUninitialized: true
}));

// serve html file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// handle form submit
app.post("/submit", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
        return res.send("All fields are required");
    }

    if (!email.includes("@")) {
        return res.send("Invalid email format");
    }

    if (password.length < 6) {
        return res.send("Password must be at least 6 characters");
    }

    // temporary storage (session)
    req.session.user = {
        name: name,
        email: email
    };

    res.send(`
        <h3>Registration Successful</h3>
        Name: ${name}<br>
        Email: ${email}
    `);
});

// start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
