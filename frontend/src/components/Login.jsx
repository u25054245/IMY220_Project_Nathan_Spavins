import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eError, setEError] = useState("");
    const [pError, setPError] = useState("");

    const navigate = useNavigate();

    const changeEmail = (value) => {
        if(value.trim().length === 0) {
            return "Email must be filled in";
        } else if(!value.includes('@')) {
            return "Email must include a @";
        } else {
            return "";
        }
    };

    const changePassword = (value) => {
        if(value.trim().length === 0) {
            return "Password must be filled in";
        } else {
            return "";
        }
    };

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);

        setEError(changeEmail(value));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);

        setPError(changePassword(value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const e = changeEmail(email);
        const p = changePassword(password);

        setEError(e);
        setPError(p);

        if(p !== "" || e !== "") return;

        navigate("/home");
    }
    
    return (
        <div className="login">
            <h1>Log in Form</h1>

            <form onSubmit={handleSubmit} noValidate>
                <label>Email:</label>
                <input type="text" id="email" name="email" required value={email} onChange={handleEmailChange}/>
                <p>{eError}</p>

                <label>Password:</label>
                <input type="password" id="password" name="password" required value={password} onChange={handlePasswordChange}/>
                <p>{pError}</p>

                <button type="button">Cancel</button>
                <button type="submit">Log-in</button>
            </form>
        </div>
    );
}

export default Login;