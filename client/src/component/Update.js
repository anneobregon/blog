import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Compose({match}) {

    const [post, setPost] = useState("");
    const history = useHistory();

    useEffect(() => {
        axios.get(`/post/${match.params.id}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err)) 
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const title = e.target.title.value;
        const content = e.target.post.value;

        axios.post(`/update/${match.params.id}`, {title, content})
            .then(res => console.log(res))
            .catch(err => console.log("ERROR "+err));

        history.push("/");
    }

    return (
        
        <div className="container-fluid">
            {
                console.log("POSTTTT "+JSON.stringify(post))
            }
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" name="title" defaultValue={post.title} required/>
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea className="form-control" name="post" cols="30" rows="10" defaultValue={post.content} required></textarea>
                </div>
                <button className="btn btn-dark" type="submit">Update</button>
            </form>
        </div>
    )
}

export default Compose;
