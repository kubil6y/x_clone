import { CreatePost } from "@/components/create-post";
import { PostList } from "@/components/posts/post-list";

export default function Home() {
    return (
        <div>
            <h1 className="text-5xl text-rose-600">Home page.tsx</h1>

            <CreatePost imageUploadAllowed />
            <PostList />
        </div>
    );
}
