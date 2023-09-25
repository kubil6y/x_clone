"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterModal } from "@/hooks/use-register-modal";
import { useForm } from "react-hook-form";
import { registerFormSchema, RegisterFormSchema } from "@/validators/register";
import { AppIcons } from "../app-icons";
import { useLoginModal } from "@/hooks/use-login-modal";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export const RegisterModal = () => {
    const { toast } = useToast();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const router = useRouter();
    const hasMounted = useHasMounted();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    function togglePasswordVisibility() {
        setShowPassword((x) => !x);
    }

    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (input: RegisterFormSchema) => {
            const { data } = await axios.post("/api/register", input);
            return data;
        },
        onSuccess: () => {
            form.reset();
            router.refresh();
            registerModal.close();
            loginModal.open();
        },
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                toast({
                    title: "CatSocial",
                    description:
                        err.response?.data?.message ?? "Something went wrong",
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "CatSocial",
                description: "Something went wrong",
                variant: "destructive",
            });
        },
    });

    function onOpenChange(open: boolean): void {
        if (!open) {
            form.reset();
            registerModal.close();
        }
    }

    function toggleAuthModals(): void {
        form.reset();
        registerModal.close();
        loginModal.open();
    }

    if (!hasMounted) {
        return null;
    }

    return (
        <Dialog open={registerModal.isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AppIcons.cats className="w-10 h-10 dark:fill-white" />
                        <div className="flex-1 flex flex-col space-y-1">
                            <DialogTitle>Welcome to CatSocial!</DialogTitle>
                            <DialogDescription>
                                Join CatSocial and improve your daily
                                productivity.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) =>
                            registerMutation.mutate(data)
                        )}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="johndoe123"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        It is important to choose an appropriate
                                        username to expand your reach.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@example.com"
                                            {...field}
                                        />
                                    </FormControl>
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
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Password"
                                                {...field}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                                                {showPassword ? (
                                                    <EyeOffIcon
                                                        className="h-6 w-6"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (x) => !x
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <EyeIcon
                                                        className="h-6 w-6"
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (x) => !x
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Password"
                                                {...field}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                                                {showConfirmPassword ? (
                                                    <EyeOffIcon
                                                        className="h-6 w-6"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                (x) => !x
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <EyeIcon
                                                        className="h-6 w-6"
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                (x) => !x
                                                            )
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            isLoading={registerMutation.isLoading}
                            disabled={registerMutation.isLoading}
                            className="w-full"
                        >
                            Register
                        </Button>
                    </form>
                </Form>
                <DialogDescription>
                    Already have an account?{" "}
                    <button
                        onClick={toggleAuthModals}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Sign in.
                    </button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};
