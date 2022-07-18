import React, { useEffect, useState } from "react";
import { submitPost, deletePost, getPost } from "../utils/index";
import { useHistory } from "react-router-dom";

const Posts = ({ user, token, posts, setPosts, setFeaturedPost }) => {

    const [search, setSearch] = useState("");
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [willDeliver, setWillDeliver] = useState("false");
    const history = useHistory()

    useEffect(() => {
        (async () => {
            const fetched = await getPost(token)
            setPosts(fetched.data.posts)
        })()
    }, [])

    const searchPost = (post) => {
        return `${post.title} ${post.location} ${post.description} ${post.author.username}`
            .toLowerCase()
            .includes(search.toLowerCase())
    }

    const handlePostClick = (e, posts) => {
        if (user && token) {
            setFeaturedPost(posts)
            history.push(`/posts/${posts._id}`)
        } else {
            alert("not logged in")
        }
    }

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        const newPost = await submitPost(token, title, description, price, location, willDeliver)
        setPosts([...posts, newPost])
    }

    const handleDeletePost = async (e, post_Id) => {
        e.stopPropagation()
        if (window.confirm("Are you sure"))
        deletePost(token, post_Id)
        history.push(`/posts/`)
    }

    return <>

        <h2 className="titlePosts">Posts</h2>

        {<input className="search" onChange={(event) => {
            setSearch(event.target.value);
        }}
            type="text" name="Search Post" placeholder="Search" />}

        {user && token &&
            <form onSubmit={handleSubmitPost}>
                <input className="postValue" onChange={(e) => setLocation(e.target.value)}
                    type="text" name="location"
                    placeholder="location" value={location} />

                <input className="postValue" onChange={(e) => setDescription(e.target.value)}
                    type="text" name="description"
                    placeholder="description" value={description} />

                <input className="postValue" onChange={(e) => setTitle(e.target.value)}
                    type="text" name="title"
                    placeholder="title" value={title} />

                <input className="postValue" onChange={(e) => setPrice(e.target.value)}
                    type="text" name="price"
                    placeholder="price" value={price} />

                <select className="postValue" onChange={(e) => setWillDeliver(e.target.value)}
                    type="text" name="WillDeliver"
                    placeholder="willDeliver" value={willDeliver} >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <button className="submitPost" type="submit">Submit Post</button>
            </form>}

        <div>
            {
                posts.filter(post => {
                    return searchPost(post)
                })
                    .map((post) => {
                        return <div className="posts" onClick={(e) => { handlePostClick(e, post) }} key={post._id}>
                            <h2>{post.title}</h2>
                            <div className="postInfo">Description: {post.description}</div>
                            <div className="postInfo">Price: {post.price}</div>
                            <div className="postInfo">Seller: {post.author.username}</div>
                            <div className="postInfo">Location: {post.location}</div>
                            <div className="postInfo">Will Deliver: {post.willDeliver ? 'yes' : 'no'}</div>

                            {post.isAuthor && token &&
                                <button className="delete" onClick={(e) => handleDeletePost(e, post._id)}>Delete Post</button>}
                        </div>
                    })
            } 
        </div>
    </>
}

export default Posts