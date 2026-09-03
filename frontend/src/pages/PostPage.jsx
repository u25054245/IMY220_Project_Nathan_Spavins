import Post from "../components/Post";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Comments from "../components/Comments";
import EditPost from "../components/EditPost";
import Footnote from "../components/Footnote";

function PostPage() {
    <div className="page">
        <Header />
        <Nav />

        <div className="content">
            <Post />
            <Comments />
            <EditPost />
        </div>

        <Footnote />
    </div>
}

export default PostPage;