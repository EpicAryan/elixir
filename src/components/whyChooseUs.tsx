// 'use client';

// import { motion } from 'framer-motion';

// import Image from 'next/image';

// const GradientText = ({ children }: { children: React.ReactNode }) => (
//   <span className="bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text font-manrope text-4xl lg:text-[55px] font-semibold text-transparent">
//     {children}
//   </span>
// );

// export function WhyChooseUs() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     fromLeft: {
//       hidden: { x: -50, opacity: 0 },
//       visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
//     },
//     fromRight: {
//       hidden: { x: 50, opacity: 0 },
//       visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
//     },
//     fromBottom: {
//       hidden: { y: 50, opacity: 0 },
//       visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//     },
//     fadeIn: {
//       hidden: { opacity: 0 },
//       visible: { opacity: 1, transition: { duration: 0.7 } },
//     },
//   };

//   return (
//     <section className="py-8 mb-8 bg-white min-h-full">
//       <div className="container mx-auto px-6 md:px-4 lg:px-12 xl:px-32 ">
//         {/* Section Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: false, amount: 0.5 }}
//           transition={{ duration: 0.5 }}
//         >
//           <p className="text-xs font-semibold text-[#AF7B5B] tracking-[0.11rem] font-gtpro">
//             SERIOUS ABOUT DESIGN, FUN ABOUT EVERYTHING ELSE.
//           </p>
//           <h2 className="text-4xl md:text-5xl font-semibold  tracking-wide text-gray-800 mt-2 inline-flex items-center gap-3 font-gtpro">
//             Why choose
//             <span className="inline-flex items-center border-b-2 border-orange-400">
//               <Image
//                 src='/logo.svg'
//                 alt='logo'
//                 width={20}
//                 height={20}
//                 className='w-11 h-auto'
//               />
//               <span className="font-bold text-orange-500 mx-1 ">Elixir</span>
//               ?
//             </span>
            
//           </h2>
//         </motion.div>

//         {/* Bento Grid */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-6 min-h-[680px]"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: false, amount: 0.1 }}
//         >
//           {/* Item 1: 10 years */}
//           <motion.div
//             variants={itemVariants.fromLeft}
//             className="bg-neutral-50 rounded-xl p-6 border-[1px] border-[#F2672D]/8"
//           >
//             <h3 className="">
//               <GradientText>10 years</GradientText>
//             </h3>
//             <p className="text-gray-600 mt-2 font-gtpro text-base lg:text-xl">flat warranty¹</p>
//           </motion.div>
          


//           {/* Item 2: 20,00,000+ with Drawer Image */}
//           <motion.div
//             variants={itemVariants.fadeIn}
//             className="relative bg-neutral-50 rounded-xl p-6 md:col-span-2 md:row-span-2 overflow-hidden  border-[1px] border-[#F2672D]/8 h-[340px] md:h-auto"
//           >
//             <div className="relative z-10">
//               <h3 className="text-4xl lg:text-5xl font-bold">
//                 <GradientText>20,00,000+</GradientText>
//               </h3>
//               <p className="text-gray-600 mt-2 font-gtpro text-xl">catalogue products</p>
//             </div>
//             <Image
//               src="/whyus/box.svg"
//               alt="Wooden drawer unit"
//               width={400}
//               height={300}
//               className="absolute -bottom-4 -right-4 w-full h-auto xl:max-w-[75%] z-0"
//             />
//           </motion.div>

//           {/* Item 3: #1 Interiors */}
//           <motion.div
//             variants={itemVariants.fromLeft}
//             className="bg-neutral-50 rounded-xl md:row-span-2 flex flex-col justify-between  border-[1px] border-[#F2672D]/8"
//           >
//             {/* Padded content */}
//             <div className="p-6">
//               <h3 className="text-4xl lg:text-5xl font-bold">
//                 <GradientText>#1 Interiors</GradientText>
//               </h3>
//               <p className="text-gray-600 mt-2 font-gtpro text-xl">in Chennai</p>
//             </div>

//             {/* Non-padded image */}
//             <div className="relative w-full h-56">
//               <Image
//                 src="/whyus/chennaiArt.svg"
//                 alt="Chennai skyline"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </motion.div>

//           {/* Item 4: 45-days */}
//           <motion.div
//             variants={itemVariants.fromRight}
//             className="bg-neutral-50 rounded-xl p-6  border-[1px] border-[#F2672D]/8"
//           >
//             <h3 className="text-4xl lg:text-5xl font-bold">
//               <GradientText>45-days</GradientText>
//             </h3>
//             <p className="text-gray-600 mt-2 font-gtpro text-xl">move-in guaranty¹</p>
//           </motion.div>

//           {/* Item 5: 146+ */}
//           <motion.div
//             variants={itemVariants.fromRight}
//             className="bg-neutral-50 rounded-xl p-6  border-[1px] border-[#F2672D]/8 "
//           >
//             <h3 className="text-4xl lg:text-5xl font-bold">
//               <GradientText>146+</GradientText>
//             </h3>
//             <p className="text-gray-600 mt-2 font-gtpro text-xl">Quality checks</p>
//           </motion.div>



//           {/* Item 6: 10+ Awards */}
//           <motion.div
//             variants={itemVariants.fromBottom}
//             className="bg-neutral-50 rounded-xl p-6  border-[1px] border-[#F2672D]/8"
//           >
//             <h3 className="text-4xl lg:text-5xl font-bold">
//               <GradientText>10+ Awards</GradientText>
//             </h3>
//             <p className="text-gray-600 mt-2 font-gtpro text-xl">for Innovative Designs</p>
//           </motion.div>

//           {/* Item 7: 12+ Years with Kitchen Image */}
//           <motion.div
//             variants={itemVariants.fromBottom}
//             className="relative bg-neutral-50 rounded-xl p-6  overflow-hidden border border-[#F2672D]/10 md:col-span-2"
//           >
//             <div className="relative z-10">
//               <h3 className="text-4xl lg:text-5xl font-bold">
//                 <GradientText>12+ Years</GradientText>
//               </h3>
//               <p className="text-gray-600 mt-2 font-gtpro text-xl">of legacy</p>
//             </div>

//             {/* Optional background layer for safety */}
//             <div className="absolute inset-0 bg-neutral-50 z-0" />

//             {/* Actual image */}
//             <Image
//               src="/whyus/kitchen.png"
//               alt="Faded sketch of a modern kitchen"
//               fill
//               className="object-contain object-right z-0"
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />

//             {/* Left gradient overlay to blend the image */}
//             <div className="absolute left-1/2 -translate-x-3 md:translate-0 top-0 h-full w-40 lg:w-20 bg-gradient-to-r from-neutral-50 to-neutral-10 z-10 pointer-events-none" />
//           </motion.div>

//         </motion.div>
//       </div>
//     </section>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text font-manrope text-4xl lg:text-[55px] font-semibold text-transparent">
    {children}
  </span>
);

export function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const hoverEffect = {
    whileHover: { scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" },
  };

  const itemVariants = {
    fromLeft: { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5 } } },
    fromRight: { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.5 } } },
    fromBottom: { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5 } } },
    fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7 } } },
  };

  return (
    <section className="py-8 mb-8 bg-white min-h-full">
      <div className="container mx-auto px-6 md:px-4 lg:px-12 xl:px-32">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold text-[#AF7B5B] tracking-[0.11rem] font-gtpro">
            SERIOUS ABOUT DESIGN, FUN ABOUT EVERYTHING ELSE.
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-wide text-gray-800 mt-2 inline-flex items-center gap-3 font-gtpro">
            Why choose
            <span className="inline-flex items-center border-b-2 border-orange-400">
              <Image src="/logo.svg" alt="logo" width={20} height={20} className="w-11 h-auto" />
              <span className="font-bold text-orange-500 mx-1">Elixir</span>
              ?
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-6 min-h-[680px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Card 1 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromLeft} className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3><GradientText>10 years</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-base lg:text-xl">flat warranty¹</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div {...hoverEffect} variants={itemVariants.fadeIn} className="relative bg-neutral-50 rounded-xl p-6 md:col-span-2 md:row-span-2 overflow-hidden border border-[#F2672D]/8 h-[380px] sm:h-[340px] md:h-auto">
            <div className="relative z-10">
              <h3 className="text-4xl lg:text-5xl font-bold"><GradientText>20,00,000+</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">catalogue products</p>
            </div>
            <Image src="/whyus/box.svg" alt="Drawer unit" width={400} height={300} className="absolute -bottom-4 -right-4 w-full h-auto xl:max-w-[75%] z-0" />
          </motion.div>

          {/* Card 3 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromLeft} className="bg-neutral-50 rounded-xl md:row-span-2 flex flex-col justify-between border border-[#F2672D]/8">
            <div className="p-6">
              <h3 className="text-4xl lg:text-5xl font-bold"><GradientText>#1 Interiors</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">in Chennai</p>
            </div>
            <div className="relative w-full h-56">
              <Image src="/whyus/chennaiArt.svg" alt="Chennai skyline" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromRight} className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3 className="text-4xl lg:text-5xl font-bold"><GradientText>45-days</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-xl">move-in guaranty¹</p>
          </motion.div>

          {/* Card 5 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromRight} className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3 className="text-4xl lg:text-5xl font-bold"><GradientText>146+</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-xl">Quality checks</p>
          </motion.div>

          {/* Card 6 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromBottom} className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3 className="text-4xl lg:text-5xl font-bold"><GradientText>10+ Awards</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-xl">for Innovative Designs</p>
          </motion.div>

          {/* Card 7 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromBottom} className="relative bg-neutral-50 rounded-xl p-6 overflow-hidden border border-[#F2672D]/10 md:col-span-2">
            <div className="relative z-10">
              <h3 className="text-4xl lg:text-5xl font-bold"><GradientText>12+ Years</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">of legacy</p>
            </div>
            <div className="absolute inset-0 bg-neutral-50 z-0" />
            <Image src="/whyus/kitchen.png" alt="Kitchen" fill className="object-contain object-right z-0" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute left-1/2 -translate-x-3 md:translate-x-0 top-0 h-full w-40 lg:w-20 bg-gradient-to-r from-neutral-50 to-neutral-10 z-10 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
