import { LoginModal } from "@/components/modals/login-modal";
import { PostModal } from "@/components/modals/post-modal";
import { RegisterModal } from "@/components/modals/register-modal";
import { ThemeModal } from "@/components/modals/theme-modal";

export const ModalProvider = () => {
    return (
        <>
            <RegisterModal />
            <LoginModal />
            <ThemeModal />
            <PostModal />
        </>
    );
}
