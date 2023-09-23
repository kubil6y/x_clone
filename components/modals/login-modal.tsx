"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useToast } from "../ui/use-toast";
import { signIn } from "next-auth/react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { RotateCwIcon } from "lucide-react";
import { LoginSchema, loginSchema } from "@/validators/login";
import { AppIcons } from "../app-icons";

export const LoginModal = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { toast } = useToast();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const hasMounted = useHasMounted();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            usernameOrEmail: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginSchema) {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok && !callback?.error) {
                toast({
                    title: "CatSocial",
                    description: "Login successful.",
                });
                form.reset();
                loginModal.close();
                window.location.reload();
            }

            if (callback?.error) {
                toast({
                    title: "Login failed",
                    description: callback?.error ?? "Something went wrong.",
                    variant: "destructive",
                });
            }
        });
    }

    function toggleAuthModals(): void {
        form.reset();
        loginModal.close();
        registerModal.open();
    }

    function onOpenChange(open: boolean): void {
        if (!open) {
            form.reset();
            loginModal.close();
        }
    }

    if (!hasMounted) {
        return null;
    }

    return (
        <Dialog open={loginModal.isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AppIcons.cats className="w-10 h-10 dark:fill-white" />
                        <div className="flex-1 flex flex-col space-y-1">
                            <DialogTitle>Sign In</DialogTitle>
                            <DialogDescription>
                                Welcome back to CatSocial!
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="my-4 px-4 py-1 flex items-center justify-between rounded-md border border-zinc-500 dark:border-white-500 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition bg-transparent">
                    <AppIcons.google />
                    <div
                        onClick={() => signIn("google")}
                        className="flex-1 text-center"
                    >
                        Sign In with Google
                    </div>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="usernameOrEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Credentials</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your email address or your
                                        username.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            isLoading={isLoading}
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </form>
                </Form>
                <DialogDescription>
                    Don't have an account?{" "}
                    <button
                        onClick={toggleAuthModals}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Sign up.
                    </button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
