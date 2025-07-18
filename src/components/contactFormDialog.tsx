
'use client'

import React, { useState } from 'react';
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneDropdown from './ui-components/phoneDropdown';
import Image from 'next/image';
import { toast } from "sonner";

interface ContactFormDialogProps {
  onClose: () => void;
}

const inputFieldStyles = "w-full px-4 py-4.5 sm:py-6 text-sm border rounded-lg";

export const ContactFormDialog: React.FC<ContactFormDialogProps> = ({ 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    propertyType: '',
    propertyLocation: '',
    name: '',
    phone: '',
    whatsappUpdates: true
  });

  const [errors, setErrors] = useState({
    propertyType: '',
    propertyLocation: '',
    name: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const propertyTypes = ['1 BHK', '2 BHK', '3 BHK', '4 BHK'];
 
  const validateForm = () => {
    const newErrors = {
      propertyType: '',
      propertyLocation: '',
      name: '',
      phone: ''
    };

    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select a property type';
    }

    if (!formData.propertyLocation) {
      newErrors.propertyLocation = 'Please select your property location';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", {
          description: "We'll get back to you soon with your free consultation.",
          duration: 5000,
        });

        onClose();
        setFormData({
          propertyType: '',
          propertyLocation: '',
          name: '',
          phone: '',
          whatsappUpdates: true
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting the form", {
        description: "Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="max-w-xs sm:max-w-sm lg:max-w-4xl p-0  grid lg:grid-cols-2 border-none">
      <div className='hidden lg:block relative w-full h-full overflow-hidden rounded-l-lg'>
        <Image
          src="/hero-1.png"
          alt='picture'
          fill
          className='object-cover'
        />
      </div>

      <div className="relative py-6 overflow-visible">
        {/* Header */}
        <div className="bg-white px-6 lg:px-4">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 font-manrope">
            Get a free design consultation
          </h2>
        </div>

        {/* Form */}
        <div className="px-6 lg:px-4 pt-3 font-gtpro">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Property type
              </label>
              <div className="space-x-1 sm:space-x-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('propertyType', type)}
                    className={`px-2 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      formData.propertyType === type
                        ? 'bg-orange-50 border-orange-500 text-orange-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-500">{errors.propertyType}</p>
              )}
            </div>

            {/* Property Location */}
            <div>
              <Input
                name="propertyLocation"
                placeholder="Property Location"
                value={formData.propertyLocation}
                onChange={(e) => handleInputChange('propertyLocation', e.target.value)}
                className={`${inputFieldStyles} ${errors.propertyLocation ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.propertyLocation && (
                <p className="mt-1 text-sm text-red-500">{errors.propertyLocation}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <Input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`${inputFieldStyles} ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <PhoneDropdown
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* WhatsApp Updates Checkbox */}
            <div className="flex items-center space-x-2 ">
              <Checkbox
                id="whatsapp-updates"
                checked={formData.whatsappUpdates}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, whatsappUpdates: checked === true }))
                }
                className='cursor-pointer'
              />
              <label htmlFor="whatsapp-updates" className="text-xs sm:text-sm text-gray-700 flex items-center gap-1 cursor-pointer">
                Yes, send me updates via WhatsApp. 
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#F86642] hover:bg-orange-600 text-sm sm:text-lg text-white font-medium py-5 shadow-[2px_6px_30px_-3px_#F86642]/60 rounded-lg cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Book a Free Consultation'}
            </Button>

            {/* Privacy Policy */}
            <div className="text-center text-xs text-gray-500">
              By submitting, you consent to{' '}
              <a href="#" className="text-teal-600 hover:underline">
                privacy policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-teal-600 hover:underline">
                terms of use
              </a>
            </div>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};
