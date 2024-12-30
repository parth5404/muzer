"use client"

import Link from "next/link";
import { Users, Radio, Headphones, Music, Heart, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Appbar from "./components/Appbar";

export default function LandingPage() {
  const session = useSession();

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
      <Appbar />
      
      {/* Hero Section */}
      <main className="w-full flex-1 pt-24 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                Let Your Fans Choose
                <span className="block text-[#00ffd5]">the Beat</span>
              </h1>
              <p className="mx-auto max-w-[800px] text-gray-400 md:text-xl">
                Empower your audience to curate your music stream.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6">
              <Link
                href="/signup"
                className="px-8 py-4 bg-[#00ffd5] text-black font-medium rounded hover:bg-[#00ffd5]/90 transition-colors"
              >
                Get Started
              </Link>
              <button className="px-8 py-4 border border-[#00ffd5]/20 text-white rounded hover:bg-[#00ffd5]/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Music, title: "Vast Library", desc: "Access millions of tracks" },
              { icon: Heart, title: "Personalized", desc: "AI-powered recommendations" },
              { icon: Share2, title: "Social Sharing", desc: "Connect with friends" }
            ].map((feature, index) => (
              <div key={index} className="p-8 bg-[#111111] rounded-lg border border-[#00ffd5]/10 hover:border-[#00ffd5]/30 transition-colors">
                <feature.icon className="h-12 w-12 text-[#00ffd5] mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full py-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: "1M+", label: "Active Users" },
              { number: "500K+", label: "Songs Streamed" },
              { number: "100K+", label: "Artists" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-[#00ffd5] mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#111111] border-t border-[#222222]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                title: "Company",
                links: ["About", "Careers", "Press"]
              },
              {
                title: "Community",
                links: ["Artists", "Developers", "Advertising"]
              },
              {
                title: "Resources",
                links: ["Support", "Mobile App", "Blog"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookies"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-medium mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href="#" 
                        className="text-gray-400 hover:text-[#00ffd5] transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-[#222222] text-center text-gray-400">
            © 2024 Muzer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
