"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { usePostModal } from "@/hooks/use-post-modal";
import { CreatePostSchema, createPostSchema } from "@/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./user-avatar";
import { useSession } from "next-auth/react";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { useToast } from "@/components/ui/use-toast";
import TextareaAutosize from "react-textarea-autosize";
import { CircularProgress } from "./circular-progress";
import { Separator } from "./ui/separator";
import { XIcon } from "lucide-react";
import { ImageUpload } from "./image-upload";
import Image from "next/image";
import { EmojiPicker } from "./emoji-picker";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const testImageUrl =
    "https://res.cloudinary.com/dnqoeal8o/image/upload/v1695575822/r4hdurldtd2psb432iof.jpg";

interface CreatePostProps {
    minRows?: number;
    imageUploadAllowed?: boolean;
}

export const CreatePost = ({
    imageUploadAllowed,
    minRows = 2,
}: CreatePostProps) => {
    const postModal = usePostModal();

    const hasMounted = useHasMounted();
    const { toast } = useToast();
    const { data: session } = useSession();

    const form = useForm<CreatePostSchema>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            body: "",
            imageUrl: "",
        },
    });

    const postMutation = useMutation({
        mutationFn: async (input: CreatePostSchema) => {
            const response = await axios.post("/api/posts", input);
            return response.data;
        },
        onSuccess: (newData) => {
            form.reset();
            if (postModal.isOpen) {
                postModal.close();
            }
            // TODO: optimistic update posts
            console.log(newData);
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

    function onSubmit(input: CreatePostSchema) {
        if (!input?.body && !input?.imageUrl) {
            return;
        }
        postMutation.mutate(input);
    }

    useEffect(() => {
        function listener(e: KeyboardEvent) {
            if (e.ctrlKey && e.key === "Enter" && !postMutation.isLoading) {
                onSubmit(form.getValues());
            }
        }

        document.addEventListener("keydown", listener);
        return () => document.removeEventListener("keydown", listener);
    }, []);

    if (!hasMounted || !session?.user) {
        return null;
    }

    form.watch();

    return (
        <div>
            <div className="flex p-4">
                <div className="mr-4">
                    <UserAvatar user={session.user} isClickable />
                </div>

                <div className="flex-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <div className="relative">
                                            <TextareaAutosize
                                                {...field}
                                                className="w-full p-2 focus:ring-0 border-none focus:outline-none shadow-none resize-none focus-visible:ring-0 text-xl placeholder:text-xl placeholder:text-slate-400 overflow-hidden dark:bg-black"
                                                placeholder="Type your message here"
                                                minRows={minRows}
                                            />
                                            <kbd className=" absolute top-0 right-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                                <span className="text-xs">
                                                    ⌘ + ↵
                                                </span>
                                            </kbd>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <Separator />

                            <FormMessage />

                            {form.getValues("imageUrl") && (
                                <div className="relative min-w-48 w-full mx-auto py-2 aspect-auto">
                                    <Image
                                        className="w-full h-full"
                                        width={500}
                                        height={500}
                                        src={form.getValues("imageUrl")!}
                                        alt="image upload"
                                    />
                                    <div
                                        className="absolute right-0 top-0 cursor-pointer"
                                        onClick={() =>
                                            form.setValue("imageUrl", "")
                                        }
                                    >
                                        <XIcon className="w-8 h-8 text-white rounded-full bg-red-500" />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center p-2">
                                <div className="space-x-2 flex items-center">
                                    {imageUploadAllowed && (
                                        <FormField
                                            control={form.control}
                                            name="imageUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <ImageUpload
                                                            value={
                                                                field.value ??
                                                                ""
                                                            }
                                                            onChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <EmojiPicker
                                        onChange={(emoji: string) => {
                                            return form.setValue(
                                                "body",
                                                form.getValues("body") + emoji
                                            );
                                        }}
                                    />
                                </div>

                                <div className="space-x-4 ml-auto flex items-center">
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        <CircularProgress
                                            value={form.getValues("body") ?? ""}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        isLoading={postMutation.isLoading}
                                        disabled={
                                            postMutation.isLoading ||
                                            (!form.getValues("body") &&
                                                !form.getValues("imageUrl"))
                                        }
                                    >
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
