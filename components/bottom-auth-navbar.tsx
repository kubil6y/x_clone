"use client";

import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { Button } from "@/components/ui/button";

export const BottomAuthNavbar = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    return (
        <div className="hidden sm:block fixed bottom-0 left-0 w-full h-20 bg-rose-500">
            <div className="container mx-auto h-full w-[980px] px-4">
                <div className="flex items-center justify-between h-full">
                    <div>
                        <p className="text-2xl text-white font-semibold">
                            Don’t miss what’s happening
                        </p>
                        <p className="text-md text-white font-light">
                            People on CatSocial are the first to know.
                        </p>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                        <Button onClick={loginModal.open} variant="secondary">
                            Log in
                        </Button>

                        <Button onClick={registerModal.open}>Sign up</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
