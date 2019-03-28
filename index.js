import express from "express";
const app = express();

const PORT = 4000;

const handleLinstening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('hello from home');

const handleProfile = (req, res) => res.send("You are on profile");

const betweenHome = (req, res, next) => {
    console.log("I'm middleware");
    next();
}

app.get("/", betweenHome, handleHome);

app.get("/profile", handleProfile);

app.listen(4000, handleLinstening);