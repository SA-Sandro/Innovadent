"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { SessionContextProps, SessionData } from "@/lib/definitions";
import { getPlainSession } from "@/lib/session";

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSessionState] = useState<SessionData | undefined>(undefined);
    useEffect(() => {
        const fetchSession = async () => {
            const actualSession = await getPlainSession();
            if (actualSession) {
                setSessionState({
                    isLoggedIn: actualSession.isLoggedIn,
                    role: actualSession.role,
                    image_url: actualSession.image_url,
                    userName: actualSession.userName
                });
                return;
            }
            setSessionState(undefined)
        };
        fetchSession();
    }, []);

    const setSession = (newSession: SessionData) => {
        setSessionState(newSession);
    };

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
};
