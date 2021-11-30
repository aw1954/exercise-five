import React from "react";

function LoginForm({ loginUser }) {
    return (
        <div className="Form">
            <h2>Login Form</h2>
            <form onSubmit={(e) => loginUser(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Enter Email" />

                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Enter Password" />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;