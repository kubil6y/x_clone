"use client";

import { useEffect, useState } from "react";

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>();
    useEffect(() => {
        setHasMounted(true);
    }, [])
    return hasMounted;
}
