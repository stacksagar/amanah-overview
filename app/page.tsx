import Access from "@/components/sections/Access";
import Architecture from "@/components/sections/Architecture";
import Distinction from "@/components/sections/Distinction";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Intelligence from "@/components/sections/Intelligence";
import Philosophy from "@/components/sections/Philosophy";
import Process from "@/components/sections/Process";
import Statement from "@/components/sections/Statement";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#philosophy", label: "Rethink" },
  { href: "#intelligence", label: "Council" },
  { href: "#access", label: "Early Access" },
];

export default function Home() {
  return (
    <>
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-5 mix-blend-difference pointer-events-none">
        <a
          href="#hero"
          className="pointer-events-auto relative w-16 h-10 sm:w-20 sm:h-12 md:w-28 md:h-16 lg:w-36 lg:h-20"
        >
          <Image
            src="/logo.png"
            alt="Nawah Wealth"
            fill
            sizes="(max-width: 639px) 64px, (max-width: 767px) 80px, (max-width: 1023px) 112px, 144px"
            className="object-contain object-left"
            priority
          />
        </a>
        <div className="flex items-center gap-8 pointer-events-auto">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-[9px] tracking-[0.4em] uppercase text-paper/60
                         font-sans hover:text-paper transition-colors duration-300
                         hidden md:block"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        {/* 11 sections total */}
        <Hero />
        <Philosophy />
        <Distinction />
        <Intelligence />
        <Process />
        <Architecture />
        <Access />
        <Statement />
        <Footer />
      </main>
    </>
  );
}
