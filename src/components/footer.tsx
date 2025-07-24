'use client';

import { useRef } from 'react';
import { easeOut, motion, useInView } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si';


const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <motion.div whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
      <Link
        href={href}
        className="text-[#666B71] hover:text-white transition-colors duration-300 font-gtpro"
      >
        {children}
      </Link>
    </motion.div>
  </li>
);


const ContactInfo = ({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-start">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-[#9098A0]" />
      <p className="font-semibold text-[#9098A0] font-gtpro">{title}</p>
    </div>
    <div className="pl-6 text-sm text-[#666B71] font-gtpro">{children}</div>
  </div>
);

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <footer className="w-full bg-[#232529] text-[#9B9B9B] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 2xl:px-12 overflow-x-hidden">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 sm:gap-y-16 py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Column 1 */}
          <motion.div variants={itemVariants} className="relative">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <Image src="/footer-logo.svg" alt="logo" width={40} height={40} />
              <span className="text-3xl font-semibold font-gtpro uppercase tracking-wide text-white">
                Elixir
              </span>
            </Link>
            <p className="text-sm mt-2">SERIOUS ABOUT DESIGN.</p>
            <p className="text-sm">FUN ABOUT EVERYTHING ELSE.</p>
            <div className="relative mt-8 h-56 md:h-40 w-full overflow-hidden">
              <div className="relative h-28 w-full max-w-[12rem]">
                <Image
                  src="/footer/image-1.png"
                  alt="Elixir stamp"
                  width={400}
                  height={400}
                  className="absolute -bottom-24 -right-8 md:-bottom-14 md:-right-5 w-48  h-auto transition-transform duration-300 hover:rotate-[5deg] hover:scale-105 z-30"
                />
                <Image
                  src="/footer/image-2.png"
                  alt="Stamp 2"
                  width={400}
                  height={400}
                  className="absolute top-0 -right-10 w-40 sm:w-44 md:w-36 h-auto transition-transform duration-300 hover:-rotate-[2deg] hover:scale-105 z-20"
                />
                <Image
                  src="/footer/image-3.png"
                  alt="Stamp 3"
                  width={400}
                  height={400}
                  className="absolute -bottom-12 md:-bottom-2 -left-6 sm:-left-10 md:left-0 w-52 md:w-40 h-auto transition-transform duration-300 hover:-rotate-[-5deg] hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Column 2: Links */}
          <motion.div variants={itemVariants} className="md:border-l md:border-[#3F3F3F] md:pl-8">
            <h3 className="font-semibold text-white mb-4 font-gtpro">Elixir Interior Design</h3>
            <ul className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/#us">Why choose us?</FooterLink>
              <FooterLink href="/#projects">Projects</FooterLink>
              <FooterLink href="/#us">Testimonials</FooterLink>
              <FooterLink href="/about">About us</FooterLink>
              <FooterLink href="/experience-center">Visit our Experience center</FooterLink>
            </ul>
          </motion.div>

          {/* Column 3: Contact */}
          <motion.div variants={itemVariants} className="space-y-6 md:border-l md:border-[#3F3F3F] md:pl-8">
            <ContactInfo icon={Mail} title="Email us">
              <a href="mailto:elixirinteriorspvtltd@gmail.com" className="hover:text-white transition-colors">
                elixirinteriorspvtltd@gmail.com
              </a>
            </ContactInfo>
            <ContactInfo icon={Phone} title="Call us">
              <a href="tel:+917200064111" className="hover:text-white transition-colors">
                +91 7200064111
              </a>
            </ContactInfo>
            <ContactInfo icon={MapPin} title="Find us at">
              <p className="mt-1">
                First floor, No 1155, Vellore - Chennai Rd, opposite Rohini Theatre, Koyambedu, Chennai, Tamil Nadu 600107
              </p>
            </ContactInfo>
          </motion.div>

          {/* Column 4: CTA */}
          <motion.div variants={itemVariants} className="md:border-l md:border-[#3F3F3F] md:pl-8">
            <p className="font-semibold text-white mb-4 font-gtpro text-lg">Get a free quote?</p>
            <div className="flex flex-col gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-[#F86642] text-white hover:bg-orange-600 w-full font-gtpro cursor-pointer lg:text-xs xl:text-base">
                  BOOK A FREE CONSULTATION
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="bg-transparent border-[#383E47] text-[#9098A0] hover:bg-[#3F3F3F] hover:text-white w-full font-gtpro cursor-pointer"
                >
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3F3F3F] py-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[#9098A0] text-center sm:text-left font-gtpro">
            © 2025 Elixir Interiors Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#9098A0]">
            <Link href="#" className="text-xs hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <div className="flex gap-3">
              <motion.a  href="https://www.linkedin.com/in/yourprofile" whileHover={{ scale: 1.2, color: '#fff' }} whileTap={{ scale: 0.9 }}><FaLinkedin  size={16} /></motion.a>
              <motion.a  href="https://www.instagram.com/yourprofile" whileHover={{ scale: 1.2, color: '#fff' }} whileTap={{ scale: 0.9 }}><FaInstagram  size={16} /></motion.a>
              <motion.a href="https://wa.me/919999999999" whileHover={{ scale: 1.2, color: '#fff' }} whileTap={{ scale: 0.9 }}><FaWhatsapp  size={16} /></motion.a>
              <motion.a  href="https://maps.google.com/?q=Your+Location+Here" whileHover={{ scale: 1.2, color: '#fff' }} whileTap={{ scale: 0.9 }}><SiGooglemaps   size={16} /></motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
