import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="login">
            <h1>Log in Form</h1>

            <form>
                <label>Email:</label>
                <input type="text" id="email" name="email" required />

                <label>Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="cancel">Cancel</button>
                <Link to={'/home'}><button type="submit">Log-in</button></Link>
            </form>
        </div>
    );
}

export default Login;