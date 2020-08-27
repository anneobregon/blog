import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Home() {

    let history = useHistory();
    const [posts, setPost] = useState([]);
    const [postToDelete, setPostToDelete] = useState("");
    const [refresh, isRefreshed] = useState(false);

    useEffect(() => {
        axios.get("/posts")
            .then( res =>  setPost(res.data))
            .catch(err => console.log(err))

            isRefreshed(false);
    },[refresh]);

    const goToPost = (e, id) => {
        axios.post("/post/"+id, {id})
            .then(res => console.log(res))
            .catch(err =>  console.log(err))
    }

    const handleAddPost = () => {
        history.push('/compose');
    }

    const handleDeletePost = () => {
        axios.post("/delete", {id: postToDelete})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

            isRefreshed(true);
    }

    const handleSortPost = () => {
        let sortTitle = [];
        for( let index in posts) {
            sortTitle.push(posts[index])
        }

        sortTitle.sort((a, b) => a.title.localeCompare(b.title))
        setPost(sortTitle);
    }

    return (
        <div className="container-fluid">
            <h1 className="heading">Home</h1>
            <button class="btn btn-large btn-dark" type="button" onClick={handleAddPost}> Add new post</button>
            <button class="btn btn-large btn-secondary" onClick={handleSortPost}>Sort by title</button>
            <p>At risus viverra adipiscing at in tellus. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Eu sem integer vitae justo. Mauris ultrices eros in cursus. Faucibus vitae aliquet nec ullamcorper sit. Nulla at volutpat diam ut venenatis tellus in metus. </p>
        
            <div className="row">
                {
                    posts.map(post => {
                        let content = "";
                        if(post.content.length > 100) {
                            content = post.content.slice(0,75) + " ...";
                        } else {
                            content = post.content;
                        }

                        const datePosted = new Date(post.date);

                        const newDate = datePosted.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });
                        
                        return(
                            <div className="col-lg-4 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <span>{newDate}</span>
                                        <button type="button" class="close" data-toggle="modal" data-target="#exampleModal" onClick={() => setPostToDelete(post._id)}>
                                        <span aria-hidden="true">&times;</span>
                                        </button>

                                        <h2 className="card-title">{post.title}</h2>
                                        <hr/>
                                        <p className="card-text">{content}</p>  
                                        <Link to={`/post/${post._id}`}>
                                            <a href="#" className="btn btn-dark read-more" onClick={(e) => goToPost(e,post._id)}>Read more</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )    
                    })
                }
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete Post</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this post?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={handleDeletePost} >Yes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
