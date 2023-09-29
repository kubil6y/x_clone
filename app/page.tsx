import { CreatePost } from "@/components/create-post";
import { PostList } from "@/components/posts/post-list";
import { getAuthSession } from "@/lib/nextauth";

export default async function Home() {
    const session = await getAuthSession();
    return (
        <div>
            <h2 className="p-4 font-semibold text-xl">Home</h2>
            <CreatePost imageUploadAllowed />
            <PostList session={session} />
        </div>
    );
}
