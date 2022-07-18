import React from "react";
import { useState } from "react";
import { registerUser, loginUser, getUser } from "../utils";

const Home = ({ user, setUser, token, setToken, setUserData }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isRegistered) {
            const { user, token } = await registerUser(username, password)
            setUser(user)
            setToken(token)
        }
        else {
            const { user, token } = await loginUser(username, password)
            setUser(user)
            setToken(token)
            const data = await getUser(token);
            setUserData(data.data)
        }
    }
    const logout = () => {
        setUser(false);
        setToken("");
    }

    const toggleRegistration = () => {
        console.log('toggle', isRegistered)
        setIsRegistered(!isRegistered)
    }

    return <>
        {(user && token) ?
            <>
                <h1 className="welcome">{user} Welcome back {username}!</h1>
                <h2 className="welcome" >Check your Profile for Messages or Posts for what's new today! </h2>
                <button className="logOut" onClick={logout}>Log Out</button>
            </> :
            <>
                <div className="home">
                    <h2 className="loginTitle">{isRegistered ? "Registration" : "Log in"}</h2>
                    <form onSubmit={handleSubmit}>
                        <input className="login"
                            onChange={(e) => setUsername(e.target.value)}
                            name="username" type="text"
                            placeholder="Username" value={username}></input>
                        <input className="login"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password" type="password"
                            placeholder="Password" value={password}>
                        </input>
                        <button className="submitBtn" type='submit'>Submit</button>
                    </form>
                    <button className="homeBtn" onClick={toggleRegistration}> Register/Login</button>
                </div>
            </>
        }
            </>
        }

export default Home;
