"use client";
import Image from 'next/image';
import { motion, easeOut } from 'motion/react';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { InfiniteMovingCardsDemo } from './ui-components/infiniteMovingCards';
import Carousel from './ui-components/hero-testimonials';

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
    <section className="relative pt-8 min-h-screen">
      <div className="pt-10 md:pt-16 pb-12 md:pb-16 container mx-auto px-6 lg:px-8 2xl:px-12">
        <div className="relative">
          <motion.div 
            className="relative h-[70vh] rounded-4xl sm:rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/hero-1.png"
              alt="Modern living room"
              fill
              className="object-cover rounded-4xl sm:rounded-3xl"
              priority
            />
            <div className="absolute inset-0 bg-black/20 sm:bg-black/10 rounded-4xl sm:rounded-3xl" />

            {/* **Mobile View Elements** */}

            <motion.div
              className="md:hidden absolute left-1/2 transform -translate-x-1/2 z-20 w-full p-6 sm:p-12 px-12"
              variants={itemVariants2}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            >
              <div className="bg-white/90 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-5 rounded-2xl drop-shadow-2xl max-w-lg">
                <p className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-600 font-gtpro text-center">CHENNAIS&apos; FAVORITE INTERIORS</p>
                <div className="flex items-center justify-center gap-2 text-yellow-500">
                  <h2 className="text-base sm:text-lg font-normal text-slate-900 font-gtpro">
                    4.3k+ Ratings
                  </h2>
                  <Star fill="currentColor" className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            {/* Mobile Center Text */}
            <div className="md:hidden absolute inset-0 flex items-center justify-center text-white text-lg sm:text-xl text-center z-10">
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

            {/* Mobile Bottom Card */}
            <motion.div 
              className="md:hidden absolute bottom-2 left-2 right-2 z-10 bg-white p-4 sm:p-6 rounded-3xl drop-shadow-2xl border-[1px]"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex gap-2 items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Elixir Logo" 
                  width={32} 
                  height={32} 
                  className="size-6 sm:size-7"
                />
                <h3 className="text-lg sm:text-2xl font-normal text-black">Make yourself at Home</h3>
              </div>
              <p className="mt-2 text-sm sm:text-lg text-slate-600">Chennai&apos;s No.1 interior design — just share your floor plan and we&apos;ll handle the rest.</p>
              <Button className="relative mt-4 w-full bg-[#F86642] hover:bg-orange-600 text-sm sm:text-xl text-white font-medium py-5 shadow-[2px_6px_30px_-3px_#F86642]/60 rounded-xl">
                BOOK A FREE CONSULTATION
              </Button>
            </motion.div>

          </motion.div>
            {/* **Desktop Right Testimonial Card - Inside container** */}
            <motion.div
              className="hidden md:block absolute top-[20%] -right-[2rem] z-20"
              variants={itemVariants1}
              initial="hidden"
              animate="visible"
            >
               <Carousel
                   baseWidth={{
                      sm: 160,
                      md: 280,
                      lg: 320,
                      xl: 400
                    }}
                  autoplay={true}
                  autoplayDelay={4000}
                  pauseOnHover={true}
                />
            </motion.div>

          {/* **Desktop Top Left Rating Card ** */}
          <motion.div
            className="hidden md:block absolute top-[calc(12%+2.5rem)] -left-[2rem] z-30"
            variants={itemVariants2}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl drop-shadow-2xl max-w-sm">
              <div className="flex items-center gap-2 text-yellow-500">
                <Star fill="currentColor" className="w-5 h-auto lg:w-4" />
                <p className="text-[11px] xl:text-xs font-semibold tracking-wider text-slate-600 font-gtpro">CHENNAIS&apos; FAVORITE INTERIORS</p>
              </div>
              <h2 className="text-lg xl:text-2xl font-normal text-slate-900 xl:mt-2 font-gtpro">
                4.3k+ Ratings
              </h2>
            </div>
          </motion.div>
        </div>

        {/* **Bottom Section ** */}
        <div className='flex gap-1'>
          {/* Desktop Bottom Left Card */}
          <motion.div 
            className="hidden md:block ml-6 2xl:ml-8 z-10 bg-white p-4 2xl:p-6 rounded-2xl drop-shadow-2xl max-w-[30%] lg:max-w-[30%] 2xl:max-w-[25%] border-[1px] -translate-y-12"
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

          {/* Partners Section */}
          <motion.div 
            className="mt-4 2xl:mt-6 overflow-hidden max-w-xl sm:max-w-3xl md:max-w-lg lg:max-w-[68%] xl:max-w-[72%]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="ml-4 md:text-xs xl:text-base 2xl:text-lg font-semibold font-geist tracking-widest text-[#ABABAB] mb-3 2xl:mb-6 text-center md:text-start">OUR TRUSTED PARTNERS</h4>
            <div className="relative w-full overflow-hidden  mask-fade-x">
              <InfiniteMovingCardsDemo/>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
