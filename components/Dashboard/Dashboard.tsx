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
                const diff = expiresAt.diff(now, ["seconds"])
                setTimeLeft(Math.max(0, Math.floor(diff.seconds)).toString())
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