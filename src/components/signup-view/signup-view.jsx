import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const SingupView = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(event);
        const isoDate = new Date(birthday);

        const data = {
            UserName: username,
            Email: email,
            Birthday: isoDate,
            Password: password
        };

        fetch("https://movie-api-project14-def5aeaaa6a3.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            console.log(data)
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else if (username.length < 5) {
                alert("Username must be 5 characters or longer.");
            } else if (password === "") {
                alert("You have to enter a password.");
            } else if (email.includes("@") === false) {
                alert("Please enter a valid email adress.")
            } else {
                alert("Signup failed");
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <br />
            <h1> Create an account </h1>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    minLength={5}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label> Birthday: </Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formEmail">
                <Form.Label> Email: </Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" onClick={handleSubmit}> Sign up </Button>
        </Form>
    );
}