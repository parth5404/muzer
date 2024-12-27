"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Appbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 w-full bg-gray-900/60 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-white">
            Muzer
          </Link>

          <div className="flex items-center space-x-4">
            {!session ? (
              <>
                <Link
                  href={{
                    pathname: "/auth",
                    query: { authType: "login" },
                  }}
                  className="px-4 py-2 text-white hover:text-purple-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href={{
                    pathname: "/auth",
                    query: { authType: "signUp" },
                  }}
                  className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-white hover:text-purple-400 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
