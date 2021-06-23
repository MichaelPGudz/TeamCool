import React from 'react'
import { useState, useEffect } from 'react';

const Wall = () => {


    const [isLoading, setIsLoading] = useState(true);
    const [loadedWalls, setLoadedWalls] = useState([]);
    const [loadedPosts, setLoadedPosts] = useState([]);


    useEffect(() => {
        fetch(`https://localhost:5001/api/wall/1`)
            .then(reponse => reponse.json())
            .then(data => {
                setIsLoading(false);
                setLoadedWalls(data)
                setLoadedPosts(data.posts);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    // var posts = loadedWalls.posts;
    return (
        <div>
            {console.log(loadedWalls)}
            {console.log(loadedPosts)}
            <h1>Walls</h1>
            <h2>
                id: {loadedWalls.id}
                {loadedPosts.map(post => (
                    <h2>
                        id: {post.id} <br /> content: {post.postContent}
                    </h2>
                ))}
            </h2>
        </div>
    )
}

export default Wall;
