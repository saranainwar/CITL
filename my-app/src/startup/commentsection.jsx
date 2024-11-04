import React from 'react';
import CommentInput from './comment/CommentInput';
import CommentCard from './comment/CommentCard';
import './comp.css'
const commentData = {
    author: {
        name: "John Doe",
        avatar: "https://via.placeholder.com/150", // Placeholder image URL
    },
    date: "September 10, 2024",
    text: "This is a sample comment to demonstrate the hardcoded input for a comment card in a React component.",
    likes: 42,
    comments: 5
};

export default function CommentSection() {
    return (
        <>
        <div className='c'>
            <CommentInput />
            <CommentCard
                author={commentData.author}
                date={commentData.date}
                text={commentData.text}
                likes={commentData.likes}
                comments={commentData.comments}
                styleClass="orange-background"
            />
            <CommentCard
                author={commentData.author}
                date={commentData.date}
                text={commentData.text}
                likes={commentData.likes}
                comments={commentData.comments}
                styleClass="green-background"
            />
            </div>
        </>
    );
}
