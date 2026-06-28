import { useEffect, useState } from "react";

const STORAGE_KEY = "intro-played";

export function useSplash() {
    const [finished, setFinished] = useState(() => {
        return sessionStorage.getItem(STORAGE_KEY) === "true";
    });

    const complete = () => {
        sessionStorage.setItem(STORAGE_KEY, "true");
        setFinished(true);
    };

    return {
        finished,
        complete,
    };
}