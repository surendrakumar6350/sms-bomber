import React from 'react'
import { Turnstile } from "next-turnstile";
import axios, { AxiosError } from 'axios';
import { AlertCircle } from "lucide-react";

interface TurnstileWrapperProps {
    setHasBotToken: React.Dispatch<React.SetStateAction<boolean>>;
    turnstileKey: number;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    error: string | null;
}

const TurnstileWrapper: React.FC<TurnstileWrapperProps> = ({
    setHasBotToken,
    turnstileKey,
    setError,
    error,
}) => {
    return (
        <>
            <Turnstile
                key={turnstileKey}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                retry="auto"
                refreshExpired="auto"
                onError={() => {
                    setError("Security check failed. Please try again.");
                }}
                onExpire={() => {
                    setError("Security check expired. Please verify again.");
                }}
                onLoad={() => {
                    setError(null);
                }}
                onVerify={async (token: string) => {
                    setError(null);

                    try {
                        await axios.post("/api/token/generate", {
                            token,
                        });

                        setHasBotToken(true);
                    } catch (err) {
                        const error = err as AxiosError<{ message?: string }>;
                        const errorMessage =
                            error.response?.data?.message || error.message || "Server error";

                        setError(errorMessage);
                    }
                }}
            />

            {error && (
                <div
                    className="flex items-center gap-2 text-red-500 text-sm mb-2"
                    aria-live="polite"
                >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}
        </>
    )
}

export default TurnstileWrapper