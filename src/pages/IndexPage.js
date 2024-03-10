import React, { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await fetch('http://localhost:4000/post');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const postsData = await response.json();
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            ))}
        </>
    );
}
