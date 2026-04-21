import Access from "@/components/sections/Access";
import Architecture from "@/components/sections/Architecture";
import Distinction from "@/components/sections/Distinction";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Intelligence from "@/components/sections/Intelligence";
import Marquee from "@/components/sections/Marquee";
import Numbers from "@/components/sections/Numbers";
import Philosophy from "@/components/sections/Philosophy";
import Process from "@/components/sections/Process";
import Statement from "@/components/sections/Statement";

const NAV_LINKS = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#intelligence", label: "The Council" },
  { href: "#access", label: "Join Waitlist" },
];

export default function Home() {
  return (
    <>
      {/* Sticky Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                      px-6 md:px-16 py-5 mix-blend-difference pointer-events-none"
      >
        <span className="font-serif font-bold tracking-[0.15em] text-paper text-sm pointer-events-auto">
          AMANAH
        </span>
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
        <Marquee />
        <Philosophy />
        <Numbers />
        <Distinction />
        <Statement />
        <Intelligence />
        <Process />
        <Architecture />
        <Access />
        <Footer />
      </main>
    </>
  );
}
