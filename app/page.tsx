import { CreatePost } from "@/components/create-post";
import { PostList } from "@/components/posts/post-list";

export default function Home() {
    return (
        <div>
            <h2 className="p-4 font-semibold text-xl">Home</h2>
            <CreatePost imageUploadAllowed />
            <PostList />
        </div>
    );
}
