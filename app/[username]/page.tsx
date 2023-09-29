import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface ProfilePageProps {
    params: {
        username: string;
    };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
    const profile = await prisma.user.findFirst({
        where: {
            username: params.username.toLowerCase(),
        },
    });

    if (!profile) {
        return redirect("/");
    }

    return (
        <div>
            <p>ProfilePage.tsx {params.username}</p>
        </div>
    );
};

export default ProfilePage;
