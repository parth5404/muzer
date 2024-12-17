import Image from "next/image";
import Link from "next/link";
import { Appbar } from "./components/Appbar";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  
  return (
    
    <main >
      <Appbar></Appbar>
    </main>
  
  );
}
