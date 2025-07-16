// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';

// interface WhatsAppFloatProps {
//   phoneNumber: string;
//   message?: string;
// }

// export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ 
//   phoneNumber, 
//   message = "Hi! I'm interested in your services." 
// }) => {
//   const handleWhatsAppClick = () => {
//     const encodedMessage = encodeURIComponent(message);
//     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
//     window.open(whatsappUrl, '_blank');
//   };

//   return (
//     <motion.div 
//       className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 xl:bottom-10 xl:right-10 z-50 cursor-pointer group"
//       onClick={handleWhatsAppClick}
//       initial={{ scale: 0, rotate: -180 }}
//       animate={{ scale: 1, rotate: 0 }}
//       transition={{ type: "spring", stiffness: 260, damping: 20 }}
//       whileHover={{ scale: 1.1, rotate: 5 }}
//       whileTap={{ scale: 0.9 }}
//     >
//       {/* Animated background rings */}
//       <motion.div 
//         className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
//         animate={{ 
//           scale: [1, 1.2, 1],
//           opacity: [0.3, 0.1, 0.3]
//         }}
//         transition={{ 
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       />
      
//       {/* Main button */}
//       <motion.div 
//         className="relative bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full p-2 sm:p-3 shadow-2xl"
//         animate={{ 
//           y: [0, -10, 0],
//         }}
//         transition={{ 
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//       >
//         <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
//           <motion.svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="white"
//             className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 drop-shadow-lg"
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.5 }}
//           >
//             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687"/>
//           </motion.svg>
//         </div>
//       </motion.div>
      
//       {/* Tooltip */}
//       <motion.div 
//         className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
//         initial={{ y: 10, opacity: 0 }}
//         whileHover={{ y: 0, opacity: 1 }}
//       >
//         Chat with us on WhatsApp
//         <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900/90"></div>
//       </motion.div>

//       {/* Notification dot */}
//       <motion.div 
//         className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ duration: 1.5, repeat: Infinity }}
//       />
//     </motion.div>
//   );
// };

"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WhatsAppFloatProps {
  phoneNumber: string;
  message?: string;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ 
  phoneNumber, 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const whatsappMessage = `Hi! Here are my details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPincode: ${formData.pincode}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    setIsOpen(false);
    setFormData({ name: '', email: '', phone: '', pincode: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Container attached to right side */}
        <motion.div 
          className="fixed bottom-20 right-0 z-50 cursor-pointer group"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background container that extends to the edge */}
          <div className="relative bg-gradient-to-l from-green-500 to-green-600 rounded-l-2xl shadow-lg pl-3 sm:pl-4 pr-2 py-3">
            {/* WhatsApp icon with shaky animation */}
            <motion.div 
              className="relative"
              animate={{ 
                x: [0, -1, 1, -1, 1, 0],
                y: [0, -1, 1, -1, 1, 0]
              }}
              transition={{ 
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="60"
                height="60"
                viewBox="0 0 1024 1024"
                className="size-7 sm:size-9 lg:size-12 drop-shadow-lg"
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.3 }}
              >
                <defs>
                  <path id="b" d="M1023.941 765.153c0 5.606-.171 17.766-.508 27.159-.824 22.982-2.646 52.639-5.401 66.151-4.141 20.306-10.392 39.472-18.542 55.425-9.643 18.871-21.943 35.775-36.559 50.364-14.584 14.56-31.472 26.812-50.315 36.416-16.036 8.172-35.322 14.426-55.744 18.549-13.378 2.701-42.812 4.488-65.648 5.3-9.402.336-21.564.505-27.15.505l-504.226-.081c-5.607 0-17.765-.172-27.158-.509-22.983-.824-52.639-2.646-66.152-5.4-20.306-4.142-39.473-10.392-55.425-18.542-18.872-9.644-35.775-21.944-50.364-36.56-14.56-14.584-26.812-31.471-36.415-50.314-8.174-16.037-14.428-35.323-18.551-55.744-2.7-13.378-4.487-42.812-5.3-65.649-.334-9.401-.503-21.563-.503-27.148l.08-504.228c0-5.607.171-17.766.508-27.159.825-22.983 2.646-52.639 5.401-66.151 4.141-20.306 10.391-39.473 18.542-55.426C34.154 93.24 46.455 76.336 61.07 61.747c14.584-14.559 31.472-26.812 50.315-36.416 16.037-8.172 35.324-14.426 55.745-18.549 13.377-2.701 42.812-4.488 65.648-5.3 9.402-.335 21.565-.504 27.149-.504l504.227.081c5.608 0 17.766.171 27.159.508 22.983.825 52.638 2.646 66.152 5.401 20.305 4.141 39.472 10.391 55.425 18.542 18.871 9.643 35.774 21.944 50.363 36.559 14.559 14.584 26.812 31.471 36.415 50.315 8.174 16.037 14.428 35.323 18.551 55.744 2.7 13.378 4.486 42.812 5.3 65.649.335 9.402.504 21.564.504 27.15l-.082 504.226z"></path>
                </defs>
                <linearGradient id="a" x1="512.001" x2="512.001" y1=".978" y2="1025.023" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#61fd7d"></stop>
                  <stop offset="1" stopColor="#2bb826"></stop>
                </linearGradient>
                <use xlinkHref="#b" fill="url(#a)"></use>
                <path fill="#FFF" d="M783.302 243.246c-69.329-69.387-161.529-107.619-259.763-107.658-202.402 0-367.133 164.668-367.214 367.072-.026 64.699 16.883 127.854 49.017 183.522l-52.096 190.229 194.665-51.047c53.636 29.244 114.022 44.656 175.482 44.682h.151c202.382 0 367.128-164.688 367.21-367.094.039-98.087-38.121-190.319-107.452-259.706zM523.544 808.047h-.125c-54.767-.021-108.483-14.729-155.344-42.529l-11.146-6.612-115.517 30.293 30.834-112.592-7.259-11.544c-30.552-48.579-46.688-104.729-46.664-162.379.066-168.229 136.985-305.096 305.339-305.096 81.521.031 158.154 31.811 215.779 89.482s89.342 134.332 89.312 215.859c-.066 168.243-136.984 305.118-305.209 305.118zm167.415-228.515c-9.177-4.591-54.286-26.782-62.697-29.843-8.41-3.062-14.526-4.592-20.645 4.592-6.115 9.182-23.699 29.843-29.053 35.964-5.352 6.122-10.704 6.888-19.879 2.296-9.176-4.591-38.74-14.277-73.786-45.526-27.275-24.319-45.691-54.359-51.043-63.543-5.352-9.183-.569-14.146 4.024-18.72 4.127-4.109 9.175-10.713 13.763-16.069 4.587-5.355 6.117-9.183 9.175-15.304 3.059-6.122 1.529-11.479-.765-16.07-2.293-4.591-20.644-49.739-28.29-68.104-7.447-17.886-15.013-15.466-20.645-15.747-5.346-.266-11.469-.322-17.585-.322s-16.057 2.295-24.467 11.478-32.113 31.374-32.113 76.521c0 45.147 32.877 88.764 37.465 94.885 4.588 6.122 64.699 98.771 156.741 138.502 21.892 9.45 38.982 15.094 52.308 19.322 21.98 6.979 41.982 5.995 57.793 3.634 17.628-2.633 54.284-22.189 61.932-43.615 7.646-21.427 7.646-39.791 5.352-43.617-2.294-3.826-8.41-6.122-17.585-10.714z"></path>
              </motion.svg>
            </motion.div>
          </div>
          
          {/* Tooltip - shows on hover of whole component */}
          <div 
            className="absolute bottom-full right-2 mb-2 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          >
            Connect with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-900/90"></div>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="relative">
          {/* Header Image */}
          <div className="h-48 bg-gradient-to-r from-red-400 to-red-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-xl font-bold">Design a home</h2>
              <h3 className="text-lg">away from home</h3>
              <p className="text-sm opacity-90 mt-1">Choose Livspace - India&apos;s</p>
              <p className="text-sm opacity-90">most trusted home interiors brand</p>
            </div>
            <div className="absolute top-4 right-4 text-white text-sm">
              *T&C 2024
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  name="pincode"
                  placeholder="Enter Your Property Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-semibold text-lg"
              >
                BOOK NOW
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
