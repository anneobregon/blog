import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Post({ match }) {

    const history = useHistory();
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get(`/post/${match.params.id}`)
            .then(res => setPost(res.data))
            .catch(err => console.log(err)) 

            console.log("match " +JSON.stringify(match));
    },[]);

    const handleEditPost = () => {
        history.push(`/update/${match.params.id}`);
    }

    return (
        <div className="container-fluid">
            <h1>{post.title}</h1>
            <button className="btn btn-secondary" onClick={handleEditPost}>Edit</button>
            <hr />
            <p>{post.content}</p>
        </div>
    )
}

export default Post
