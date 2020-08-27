import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Compose() {

    // const [title, setTitle] = useState("");
    // const [post, setPost] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const post = e.target.post.value;

        // setTitle(e.target.title.value);
        // setPost(e.target.post.value);

        axios.post("/compose", {title, post})
            .then(res => console.log(res))
            .catch(err => console.log("ERROR "+err));


        history.push("/");
        
    }

    return (
        <div className="container-fluid">
            <h1>Compose</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" name="title" required/>
                </div>
                <div className="form-group">
                    <label>Post</label>
                    <textarea className="form-control" name="post" cols="30" rows="10" required></textarea>
                </div>
                <button className="btn btn-dark" type="submit">Publish</button>
            </form>
        </div>
    )
}

export default Compose;
