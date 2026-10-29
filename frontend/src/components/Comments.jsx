function Comments(props) {
    return (
        <div className="comments">
            <h2>Comments:</h2>
            
            { props.comments &&
                <ul>
                    {
                        props.comments.map(comment => (
                            <li>{comment.author}: {comment.comment}</li>
                        ))
                    }
                </ul>
            }

            { !props.comments &&
                <p>No Comments yet</p>
            }
        </div>
    );
}

export default Comments;