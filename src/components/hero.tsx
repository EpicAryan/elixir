// import React from 'react'

// const HeroSection = () => {
//   return (
//     <div>HeroSection</div>
//   )
// }

// export default HeroSection

"use client";
import Image from 'next/image';
import { motion, easeOut  } from 'motion/react';
import { Button } from './ui/button';
import { Star } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

    const itemVariants1 = {
            hidden: {
                x: 70,     
                opacity: 0,
                scale: 0.95,   
            },
            visible: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.5,
                    ease: easeOut,
                },
            },
    };

    const itemVariants2 = {
        hidden: {
            x: -70,     
            opacity: 0,
            scale: 0.95,   
        },
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: easeOut,
            },
        },
    };

  
    const partners = [
    { src: '/partner/casagrand.png', alt: 'Casagrand', width: 110, height: 40 },
    { src: '/partner/sis-logo.png', alt: 'SIS', width: 60, height: 20 },
    { src: '/partner/vgn.png', alt: 'VGN', width: 90, height: 35 },
    { src: '/partner/godrej.png', alt: 'Godrej', width: 70, height: 40 },
    { src: '/partner/roca.png', alt: 'Roca', width: 68, height: 30 },
    { src: '/partner/puravankara.png', alt: 'Puravankara', width: 110, height: 35 },
    { src: '/partner/greenply.png', alt: 'Greenply', width: 60, height: 40 },
    ];



  return (
    <section className="relative pt-8 overflow-hidden max-h-screen">
      <div className="px-4 sm:px-6 lg:px-28 pt-16 pb-24">
        <motion.div 
          className="relative aspect-[16/7] w-full rounded-3xl overflow-hidden "
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/hero-1.png"
            alt="Modern living room"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        <motion.div
          className="absolute top-[10rem] left-[5%]"
          variants={itemVariants2}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl drop-shadow-2xl max-w-sm">
            <div className="flex items-center gap-2 text-yellow-500">
              <Star fill="currentColor" className="w-5 h-5" />
              <p className="text-xs font-semibold tracking-wider text-slate-600">CHENNAI&apos;S FAVORITE INTERIORS</p>
            </div>
            <h2 className="text-2xl font-normal text-slate-900 mt-2">
              4.3k+ Ratings
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[20rem] right-[4%] sm:bottom-[10rem] lg:bottom-1/2 lg:translate-y-6"
          variants={itemVariants1}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white p-6 rounded-2xl drop-shadow-xl max-w-[420px] border-[1px]">
              <div className="flex items-center gap-3">
                  <Image src="/Avatar.png" alt="Aishwarya R." width={48} height={48} className="rounded-full" />
                  <div>
                      <p className="font-bold text-base text-[#010101]">Aishwarya R.</p>
                      <p className="text-sm text-[#868686]">3BHK in Anna Nagar, Chennai.</p>
                  </div>
              </div>
              <p className="mt-4 text-lg/[26px] text-black ">
                  “They really listened, understood my ideas, and turned them into a space that feels like mine.”
              </p>
              <p className="w-full flex justify-end">
                <Image
                    src="/signature.svg"
                    alt='signature'
                    width={180}
                    height={60}
                    className='w-[180px]'
                />
              </p>
          </div>
        </motion.div>

        <motion.div 
            className="absolute translate-x-20 translate-y-4 -mt-20 z-10 bg-white p-6 rounded-2xl shadow-xl max-w-sm mx-auto"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
        >
            <h3 className="text-xl font-normal text-black">Make yourself at Home</h3>
            <p className="mt-2 text-slate-600">Chennai&apos;s No.1 interior design — just share your floor plan and we&apos;ll handle the rest.</p>
            <Button className="relative mt-4 w-full bg-[#F86642] hover:bg-orange-600 text-lg text-white font-medium py-6 shadow-[2px_10px_30px_-6px_#F86642]/60">
                BOOK A FREE CONSULTATION
            </Button>
        </motion.div>

        <motion.div 
          className="mt-6 ml-[30%] relative overflow-hidden "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
            <h4 className="text-lg font-semibold font-geist tracking-widest text-[#ABABAB] mb-6">OUR TRUSTED PARTNERS</h4>
            <div className="relative w-full overflow-hidden">
    
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                className="flex gap-12 animate-marquee whitespace-nowrap"
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: 30,
                }}
                >
                {[...partners, ...partners].map(({ src, alt, width, height }, i) => (
                    <Image
                    key={`${alt}-${i}`}
                    src={src}
                    alt={alt}
                    width={width || 80}
                    height={height || 40}
                    className="opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                    />
                ))}
                </motion.div>
            </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
