"use client"

import Link from "next/link";
import { Users, Radio, Headphones, Music, Heart, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Appbar from "./components/Appbar";

export default function LandingPage() {
  const session = useSession();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Appbar />
      
      {/* Hero Section */}
      <main className="w-full flex-1 pt-24 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Let Your Fans Choose the Beat
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Empower your audience to curate your music stream. Connect with fans like never before.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-purple-600 hover:bg-white/90 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Statistics Section */}
      <section className="w-full py-12 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-purple-400">1M+</h3>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-purple-400">500K+</h3>
              <p className="text-gray-400">Songs Streamed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-purple-400">100K+</h3>
              <p className="text-gray-400">Artists</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Muzer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 p-6 rounded-lg">
              <Music className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Vast Library</h3>
              <p className="text-gray-400">Access millions of tracks from various genres and artists.</p>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-lg">
              <Heart className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Personalized Experience</h3>
              <p className="text-gray-400">Get recommendations based on your taste and listening history.</p>
            </div>
            <div className="bg-gray-800/30 p-6 rounded-lg">
              <Share2 className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Social Sharing</h3>
              <p className="text-gray-400">Share your favorite tracks and playlists with friends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-purple-900/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of music lovers and artists on Muzer. Create your account today and experience music like never before.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-white text-purple-600 hover:bg-white/90 transition-colors font-bold"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-purple-400">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-purple-400">Careers</Link></li>
                <li><Link href="/press" className="text-gray-400 hover:text-purple-400">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Communities</h4>
              <ul className="space-y-2">
                <li><Link href="/artists" className="text-gray-400 hover:text-purple-400">For Artists</Link></li>
                <li><Link href="/developers" className="text-gray-400 hover:text-purple-400">Developers</Link></li>
                <li><Link href="/advertising" className="text-gray-400 hover:text-purple-400">Advertising</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Useful Links</h4>
              <ul className="space-y-2">
                <li><Link href="/support" className="text-gray-400 hover:text-purple-400">Support</Link></li>
                <li><Link href="/mobile" className="text-gray-400 hover:text-purple-400">Mobile App</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-purple-400">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-purple-400">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-purple-400">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-purple-400">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 Muzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
