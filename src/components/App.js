import React, { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import  Profile from "./Profile";
import Home from "./Home";
import FeaturedPost from "./FeaturedPost";
import Posts from "./Posts";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState("");
    const [featuredPost, setFeaturedPost] = useState("");
    const [user, setUser] = useState(false);
    const [userData, setUserData] = useState(false);
    const [message, setMessage] = useState("");

    return <main>
    <nav>
        <h1 className="title">Stranger's Things</h1>
        <NavLink exact to="/login" className="navLink" activeClassName="active">
        <h2>Home</h2>
        </NavLink>

        <NavLink  exact to="/profile" className="navLink" activeClassName="active">
        <h2>Profile</h2>
        </NavLink>

        <NavLink  exact to="/posts" className="navLink" activeClassName="active">
        <h2>Posts</h2>
        </NavLink>
    </nav>

        <Route exact path="/login">
            <Home posts = {posts} user= {user} setUser={setUser} token = {token} setToken = {setToken} message = {message} userData = {userData} setUserData = {setUserData} />
        </Route>

        <Route path="/profile">
            <Profile 
            user={user} setUser={setUser}
            token = {token} setToken = {setToken}
            userData = {userData} setUserData = {setUserData}
            />
        </Route>

        <Route path="/posts">
            <Route path= "/posts/:postId">
            {user && token &&
            <FeaturedPost
            user = {user} 
            token = {token}
            featuredPost = {featuredPost} 
            setFeaturedPost = {setFeaturedPost}
            message = {message}
            setMessage = {setMessage}
            />}
        </Route>
            <Posts user = {user} token={token} featuredPost = {featuredPost}
             setFeaturedPost= {setFeaturedPost}
            posts = {posts} setPosts = {setPosts}/>
        </Route>
    </main>
}

export default App;