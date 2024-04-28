import Image from "next/image";
import { Navigation } from "@/components/Navigation";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between px-10 py-5 bg-gray-100">
      <div className="logo">
        <Image
          src="/assets/images/cheer_wave/cheer_wave_logo.png"
          alt="Logo"
          width={80}
          height={80}
        />
      </div>
      <div className="navigation">
        <Navigation />
      </div>
      <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Connect Wallet
      </button>
    </header>
  );
}
