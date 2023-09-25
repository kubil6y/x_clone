interface  PostDetailsPageProps {
    params: {
        username: string;
        postId: string;
    }
}

const PostDetailsPage = ({params}: PostDetailsPageProps) => {
    return (
        <div>
            <p>PostDetailsPage.tsx</p>
            <p>{params.username} {params.postId}</p>
        </div>
    );
};

export default PostDetailsPage;
