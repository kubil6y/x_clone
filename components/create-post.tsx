"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
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
import { PawPrintIcon, XIcon } from "lucide-react";
import { ImageUpload } from "./image-upload";
import Image from "next/image";

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

    console.log(form.getValues());

    function onSubmit(input: CreatePostSchema) {
        console.log(input);
    }

    if (!hasMounted || !session?.user) {
        return null;
    }

    form.watch();

    return (
        <div>
            <div className="flex p-2">
                <div className="mr-4">
                    <UserAvatar user={session.user} />
                </div>

                <div className="flex-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem className="">
                                        <TextareaAutosize
                                            {...field}
                                            className="w-full p-1 focus:ring-0 border-none focus:outline-none shadow-none resize-none focus-visible:ring-0 text-xl placeholder:text-xl placeholder:text-slate-400 overflow-hidden"
                                            placeholder="Type your message here"
                                            minRows={minRows}
                                        />
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
                                {imageUploadAllowed && (
                                    <div className="space-x-3 flex items-center">
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

                                        <PawPrintIcon className="w-5 h-5" />
                                    </div>
                                )}

                                <div className="space-x-3 ml-auto flex items-center">
                                    <div className="w-9 h-9 flex items-center justify-center">
                                        <CircularProgress
                                            value={form.getValues("body") ?? ""}
                                        />
                                    </div>
                                    <Button type="submit">Post</Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};
const img =
    "https://res.cloudinary.com/dnqoeal8o/image/upload/v1695575822/r4hdurldtd2psb432iof.jpg";
