'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'Why Us', href: '#' },
  { name: 'About', href: '#' },
];

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="relative group"
  >
    <Link href={href} className="text-slate-700 hover:text-[#F2672D] font-gtpro transition-colors">
      {children}
      <span className="block h-[2px] bg-[#F2672D] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
    </Link>
  </motion.div>
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const scrollYProgress = useSpring(scrollY, { damping: 15, stiffness: 120 });

  useEffect(() => {
    return scrollYProgress.on('change', (y) => setIsScrolled(y > 20));
  }, [scrollYProgress]);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-white/70 backdrop-blur-lg shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="cursor-pointer">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Elixir Logo" width={32} height={32} />
                <span className="text-2xl font-semibold text-slate-800 font-gtpro uppercase tracking-wide">
                  Elixir
                </span>
              </Link>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
              <Button className="bg-[#F86642] text-white hover:bg-orange-600 font-gtpro rounded-md">
                Contact Us
              </Button>
            </motion.div>

            {/* Hamburger */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                whileTap={{ scale: 0.9 }}
                className="text-slate-800 p-2 rounded-md"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isMobileOpen ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 md:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-6"
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-3xl font-semibold text-slate-800 hover:text-[#F2672D] font-gtpro"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6"
            >
              <Button className="w-full py-6 text-lg bg-[#F86642] text-white hover:bg-orange-600 font-gtpro rounded-md">
                Contact Us
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
