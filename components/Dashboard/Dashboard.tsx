"use client"
import { signIn, useSession } from "next-auth/react"

import { useState, useEffect } from "react"
import { DateTime } from "luxon"

const Dashboard: React.FC = () => {
    const { data: session } = useSession()
    const [timeLeft, setTimeLeft] = useState<string>("")

    useEffect(() => {
        if (session?.expires) {
            const timer = setInterval(() => {
                const expiresAt = DateTime.fromISO(session.expires as string)
                const now = DateTime.now()
                const diff = expiresAt.diff(now, ["hours", "minutes", "seconds"])
                const hours = Math.max(0, Math.floor(diff.hours))
                const minutes = Math.max(0, Math.floor(diff.minutes))
                const seconds = Math.max(0, Math.floor(diff.seconds))
                setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [session])

    return (
        <>
            {session ? (
                <>
                    <h1>Dashboard</h1>
                    <p>Token expires in: {timeLeft} seconds</p>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </>
            ) : (
                <>
                    <h1>Dashboard</h1>
                    <p>You are not logged in</p>
                    <button onClick={() => signIn("auth0")}>Sign In</button>
                </>
            )}
        </>
    )
} 

export default Dashboard