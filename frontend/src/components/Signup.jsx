import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [eError, setEError] = useState("");
    const [pError, setPError] = useState("");
    const [pcError, setPCError] = useState("");

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

    const changePasswordCheck = (value) => {
        if(password != value) {
            return "Passwords must match";
        } else {
            return ""; 
        }
    }

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

    const handlePasswordCheckChange = (event) => {
        const value = event.target.value;
        setPasswordCheck(value);
        
        setPCError(changePasswordCheck(value));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const e = changeEmail(email);
        const p = changePassword(password);
        const pc = changePasswordCheck(passwordCheck);

        setEError(e);
        setPError(p);
        setPCError(pc);

        if(p !== "" || e !== "" || pc !== "") return;
        
        navigate("/home");
    }
    
    return (
        <div className="login">
            <h1>Sign Up Form</h1>

            <form onSubmit={handleSubmit} noValidate>
                <label>Email:</label>
                <input type="text" id="email" name="email" required value={email} onChange={handleEmailChange}/>
                <p>{eError}</p>

                <label>Password:</label>
                <input type="password" id="password" name="password" required value={password} onChange={handlePasswordChange}/>
                <p>{pError}</p>

                <label>Re-Enter Password:</label>
                <input type="password" id="passwordCheck" name="password" required value={passwordCheck} onChange={handlePasswordCheckChange}/>
                <p>{pcError}</p>

                <label>Get Notified via email</label>
                <input type="checkbox" class="check" name="notify" />

                <label>Accept terms and conditions</label>
                <input type="checkbox" class="check" name="accept" required/>

                <button type="cancel">Cancel</button>
                <button type="submit">Log-in</button>
            </form>
        </div>
    );
}

export default Signup;