import React from 'react';
import { FormData } from '../../types/stepper';
import FloatingInput from '../ui-components/floatingInput';
import PhoneDropdown from '../ui-components/phoneDropdown';

interface ContactFormStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function ContactFormStep({ formData, setFormData }: ContactFormStepProps) {
  const updateContactInfo = (
    field: keyof FormData['contactInfo'],
    value: string | boolean
  ) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };


  return (
    <div className="max-w-sm mx-auto text-center mt-4">
      <h2 className="text-sm sm:text-xl font-semibold text-gray-900 mb-6 font-gtpro">
        Your estimate is almost ready
      </h2>

      <div className="space-y-4 text-left">
        <FloatingInput
          label="Name"
          type="text"
          value={formData.contactInfo.name}
          onChange={(e) => updateContactInfo('name', e.target.value)}
        />

        <FloatingInput
          label="Email ID"
          type="email"
          value={formData.contactInfo.email}
          onChange={(e) => updateContactInfo('email', e.target.value)}
        />

        <PhoneDropdown
          value={formData.contactInfo.phone}
          onChange={(value) => updateContactInfo('phone', value || '')}
        />

        <div className="flex items-center text-sm pt-2">
          <input
            type="checkbox"
            id="whatsapp"
            className="w-4 h-4 text-red-500 mr-3 accent-red-500"
            checked={formData.contactInfo.subscribeWhatsapp}
            onChange={(e) => updateContactInfo('subscribeWhatsapp', e.target.checked)}
          />

          <label htmlFor="whatsapp" className="text-xs sm:text-base text-gray-700">
            Send me updates on WhatsApp
          </label>
        </div>

        <FloatingInput
          label="Property Name"
          type="text"
          value={formData.contactInfo.propertyName}
          onChange={(e) => updateContactInfo('propertyName', e.target.value)}
        />

        <div className="text-xs text-gray-500 mt-6 leading-relaxed">
          <p>
            By submitting this form, you agree to the{' '}
            <span className="text-red-500 hover:underline cursor-pointer">privacy policy</span> &{' '}
            <span className="text-red-500 hover:underline cursor-pointer">terms and conditions</span>
          </p>
          {/* <p className="mt-2">
            This site is protected by reCAPTCHA and the Google{' '}
            <span className="text-red-500 hover:underline cursor-pointer">Privacy Policy</span> and{' '}
            <span className="text-red-500 hover:underline cursor-pointer">Terms of Service</span> apply.
          </p> */}
        </div>
      </div>
    </div>
  );
}
