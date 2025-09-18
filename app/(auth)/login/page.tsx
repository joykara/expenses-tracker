'use client'
import { signInAction, signInWithGoogle } from '@/app/actions/auth';
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const supabase = createClient()

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
                redirectTo: `${location.origin}/auth/callback`
            },
        })
    }

    // const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value
    //     const { error } = await supabase.auth.signInWithOtp({ email })
    //     if (!error) alert('Check your email for the login link!')
    // }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Welcome to Expense Tracker</h1>

            <form action={signInAction} className="flex flex-col gap-2 mb-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Sign in with Email
                </button>
            </form>

            <button
                onClick={handleGoogleLogin}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Sign in with Google
            </button>

            {/* <form action={signInWithGoogle}>
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                    Sign in with Google
                </button>
            </form> */}
        </div>
    )
}