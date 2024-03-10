import React, { useEffect, useState } from "react";
import Post from "../Post";
import axios from 'axios'; // Import Axios

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await axios.get('https://api-ct45.onrender.com/post'); // Use Axios for GET request
            if (response.status !== 200) {
                throw new Error('Failed to fetch posts');
            }
            setPosts(response.data);
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
