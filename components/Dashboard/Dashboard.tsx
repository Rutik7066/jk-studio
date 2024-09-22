"use client"
import { signIn, useSession } from "next-auth/react"

const Dashboard : React.FC = () => {
    const {data : session} = useSession()
    return (
        <>
            {session ?(
                <>
                    <h1>Dashboard</h1>
                    <p>You are logged in as {session.user?.email}</p>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </>
            ): (
                <>
                    <h1>Dashboard</h1>
                    <p>You are not logged in</p>
                <button  onClick={() => signIn("auth0")}>Sign In</button>
                </>
            ) 
            }
        </>
    )
} 

export default Dashboard