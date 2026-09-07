
import { useState, useEffect, } from "react"

export const useIsOnline = () => {

    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

    useEffect(() => {

        const handleIsOnline = () => setIsOnline(true)
        const handleIsOffline = () => setIsOnline(false)
        window.addEventListener("offline", handleIsOnline)
        window.addEventListener("online", handleIsOffline)

        return () => {
            window.removeEventListener('online', handleIsOnline);
            window.removeEventListener('offline', handleIsOffline);
        };

    }, [])

    return isOnline;
}