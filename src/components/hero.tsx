"use client";
import Image from 'next/image';
import { motion, easeOut } from 'motion/react';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { InfiniteMovingCardsDemo } from './ui-components/infiniteMovingCards';

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
        hover: { scale: 1.05 },
    };



  return (
    <section className="relative pt-8 overflow-hidden min-h-screen">
      <div className=" pt-10 md:pt-16  pb-20 md:pb-24 px-4 sm:px-6 md:px-16 lg:px-16 2xl:px-24">
        <motion.div 
          className="relative aspect-[7/12] sm:aspect-[1/1.1] md:aspect-[1/1] lg:aspect-[16/8] xl:aspect-[16/7] rounded-4xl sm:rounded-3xl overflow-hidden "
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
          <div className="absolute inset-0 bg-black/20 sm:bg-black/10" />

          {/* mobile view */}
            <motion.div
              className="md:hidden absolute inset-0 flex items-center justify-center -translate-y-20 sm:-translate-y-24"
              variants={itemVariants2}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/90 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-5 rounded-2xl drop-shadow-2xl max-w-sm">
                  <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-600 font-gtpro">CHENNAIS&apos; FAVORITE INTERIORS</p>
                <div className="flex items-center justify-center gap-2 text-yellow-500">
                  <h2 className="text-base sm:text-lg ont-normal text-slate-900 font-gtpro">
                    4.3k+ Ratings
                  </h2>
                  <Star fill="currentColor" className="w-5 h-5" />
                </div>
              </div>
         </motion.div>

          <div className="md:hidden absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl text-center z-10">
            <div>
              <span className="inline-flex items-center gap-2 font-geist font-medium">
                Move in with a smile
                <Image
                  src="/smile.svg"
                  alt="smile pic"
                  width={36}
                  height={36}
                  className="inline-block"
                />
              </span>
              <br />
              Interiors That Feel Like <span className='italic'>You.</span>

            </div>
          </div>

          <motion.div 
              className="absolute bottom-2 md:hidden z-10 bg-white p-4 sm:p-6 rounded-3xl drop-shadow-2xl max-w-xl sm:max-w-2xl mx-2 border-[1px]"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
          >
              <h3 className="text-xl sm:text-2xl font-normal text-black">Make yourself at Home</h3>
              <p className="mt-2 text-base sm:text-lg text-slate-600">Chennai&apos;s No.1 interior design — just share your floor plan and we&apos;ll handle the rest.</p>
              <Button className="relative mt-4 mb-2 w-full bg-[#F86642] hover:bg-orange-600 text-lg sm:text-xl text-white font-medium py-7 shadow-[2px_14px_30px_-6px_#F86642]/60 rounded-xl">
                  BOOK A FREE CONSULTATION
              </Button>
          </motion.div>
        </motion.div>

        {/* desktop view */}
        <motion.div
          className="hidden md:block absolute top-[10rem] left-[4%] ] "
          variants={itemVariants2}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl drop-shadow-2xl max-w-sm">
            <div className="flex items-center gap-2 text-yellow-500">
              <Star fill="currentColor" className="w-5 h-auto lg:w-4 " />
              <p className="text-[11px] xl:text-xs font-semibold tracking-wider text-slate-600 font-gtpro">CHENNAIS&apos; FAVORITE INTERIORS</p>
            </div>
            <h2 className="text-lg xl:text-2xl font-normal text-slate-900 xl:mt-2 font-gtpro">
              4.3k+ Ratings
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="hidden absolute inset-0 md:flex justify-end items-center -translate-x-10  -translate-y-10  "
          variants={itemVariants1}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-white p-6 lg:p-4 xl:p-6 rounded-2xl drop-shadow-xl max-w-xs xl:max-w-[420px] border-[1px]">
              <div className="flex items-center gap-3">
                  <Image src="/Avatar.png" alt="Aishwarya R." width={48} height={48} className="rounded-full w-10 h-auto xl:w-12 " />
                  <div>
                      <p className="font-bold text-sm xl:text-base text-[#010101] font-gtpro">Aishwarya R.</p>
                      <p className="text-xs xl:text-sm text-[#868686] font-gtpro">3BHK in Anna Nagar, Chennai.</p>
                  </div>
              </div>
              <p className="mt-4 lg:mt-2 xl:mt-4 text-sm/[26px] xl:text-lg/[26px] text-black  font-gtpro">
                  “They really listened, understood my ideas, and turned them into a space that feels like mine.”
              </p>
              <p className="w-full flex justify-end">
                <Image
                    src="/signature.svg"
                    alt='signature'
                    width={180}
                    height={60}
                    className='w-40 xl:w-[180px]'
                />
              </p>
          </div>
        </motion.div>
        <div className='flex gap-1'>
          <motion.div 
              className="hidden md:block ml-6 2xl:ml-8 translate-y-4 -mt-20 z-10 bg-white p-4 2xl:p-6 rounded-2xl drop-shadow-2xl max-w-[30%] lg:max-w-[30%] 2xl:max-w-[25%] border-[1px]"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)' }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
              <h3 className="text-sm xl:text-lg 2xl:text-xl font-normal text-black font-gtpro">Make yourself at Home</h3>
              <p className="mt-2 text-[10px] xl:text-sm 2xl:text-base text-slate-600 font-gtpro">Chennai&apos;s No.1 interior design — just share your floor plan and we&apos;ll handle the rest.</p>
              <Button className="relative mt-4 w-full bg-[#F86642] hover:bg-orange-600 text-[10px] xl:text-sm 2xl:text-base text-white font-medium py-6 lg:py-3 xl:py-6 shadow-[2px_10px_30px_-6px_#F86642]/60 rounded-xl cursor-pointer active:scale-102 font-gtpro">
                  BOOK A FREE CONSULTATION
              </Button>
          </motion.div>

          

          <motion.div 
            className="mt-4 2xl:mt-6  overflow-hidden max-w-xl sm:max-w-3xl md:max-w-lg lg:max-w-[68%] xl:max-w-[72%] "
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
              <h4 className="ml-4 md:text-xs xl:text-base 2xl:text-lg font-semibold font-geist tracking-widest text-[#ABABAB] 2xl:mb-6 text-center md:text-start">OUR TRUSTED PARTNERS</h4>
              <div className="relative w-full overflow-hidden">
                  <InfiniteMovingCardsDemo/>
              </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
