"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Appbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#222222] z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="text-2xl font-bold text-white hover:text-[#00ffd5] transition-colors"
          >
            Muzer
          </Link>

          <div className="flex items-center space-x-6">
            {!session ? (
              <>
                <button
                  onClick={() => signIn('google')}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => signIn('google')}
                  className="px-6 py-2.5 bg-[#00ffd5] text-black font-medium rounded hover:bg-[#00ffd5]/90 transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-gray-400 hover:text-[#00ffd5] transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-2.5 border border-[#00ffd5]/20 text-white rounded hover:bg-[#00ffd5]/10 transition-colors"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
