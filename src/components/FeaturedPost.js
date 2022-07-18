import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deletePost, addMessage } from "../utils";

const FeaturedPost = ({ featuredPost, setFeaturedPost, token }) => {
    const [newMessage, setNewMessage] = useState("")
    const history = useHistory()

    const handleClose = () => {
        setFeaturedPost("")
        history.push("/posts")
    }

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        addMessage(token, newMessage, featuredPost._id)
    }

    const handleDeletePost= async (e, post_Id) => {
        e.stopPropagation()
        if (window.confirm("Are you sure"))
        deletePost(token, post_Id)
        history.push(`/posts/`)
    }

    return <article className="featured-post">
        <h2>{featuredPost.title}</h2>
        <div className="postInfo">Description: {featuredPost.description}</div>
        <div className="postInfo">Price: {featuredPost.price}</div>
        <div className="postInfo">Seller: {featuredPost.username}</div>
        <div className="postInfo">Location: {featuredPost.location}</div>
        <div className="postInfo">Will Deliver: {featuredPost.willDeliver ? 'yes' : 'no'}</div>
        <section>
            <h3>Messages</h3>
            <ul>
                {featuredPost.messages.map(message => {
                    return <li key={message._id}>
                        <span> {message.content}</span>
                    </li>
                })
                }
            </ul>
        </section>

        <form onSubmit={handleSubmitMessage}>
            <input
                onChange={(e) => setNewMessage(e.target.value)}
                type="text" name="message"
                placeholder="message" value={newMessage} />
            <button className="submit" type="submit">Submit Message</button>
        </form>

        {featuredPost.isAuthor &&
            <button onClick={(e) => { handleDeletePost(e, featuredPost._id) }}>Delete Post</button>}
        <button className="close" onClick={handleClose}>Close</button>
    </article>
}

export default FeaturedPost;

