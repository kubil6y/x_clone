"use client";

import { FileImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";

declare global {
    var cloudinary: any;
}

const uploadPreset = "jdpmmmwk";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

export const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url);
        },
        [onChange]
    );

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={uploadPreset}
            options={{ maxFiles: 1 }}
        >
            {({ open }) => {
                return (
                    <FileImageIcon
                        onClick={() => open?.()}
                        className="w-5 h-5 cursor-pointer"
                    />
                );
            }}
        </CldUploadWidget>
    );
};
