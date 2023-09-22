import { LoginModal } from "@/components/modals/login-modal";
import { RegisterModal } from "@/components/modals/register-modal";

export const ModalProvider = () => {
    return (
        <>
            <RegisterModal />
            <LoginModal />
        </>
    );
}
