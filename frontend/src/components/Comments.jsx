function Comments(props) {
    return (
        <div className="comments">
            <h2>Comments:</h2>

            <ul>
                {
                    props.comments.map(comment => (
                        <li>{comment.author}: {comment.comment}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Comments;