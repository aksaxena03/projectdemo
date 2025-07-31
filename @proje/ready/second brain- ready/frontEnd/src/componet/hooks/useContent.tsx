import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { Backend_url } from "../../../config"

interface Content {
    // Define your content type here
    [key: string]: any;
}

export function useContent() {
    const [content, setContent] = useState<Content | null>(null);

    const refresh = useCallback(() => {
        axios.get(`${Backend_url}/api/v1/content`, {
            headers: { "Authorization": localStorage.getItem("token") || '' }
        }).then((response) => {
            setContent(response.data.content);
        }).catch((error) => {
            console.error("Error fetching content:", error);
            setContent(null);
        });
    }, []);

    useEffect(() => {
        const interval = setTimeout(() => {
            refresh();
        }, 10 * 10000);

        return () => {
            clearTimeout(interval);
        };
    }, [refresh]);

    return { content, refresh };
}