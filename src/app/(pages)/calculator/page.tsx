"use client";

import InteriorDesignStepper from "@/components/ui-components/interiorDesignStepper";
import BHKSelectionStep from "@/components/steps/bhkSelectionStep";
import ContactFormStep from "@/components/steps/contactFormStep";
import PackageSelectionStep from "@/components/steps/packageSelectionStep";
import RoomSelectionStep from "@/components/steps/roomSelectionStep";
import React, { useState } from "react";
import { FormData } from "../../../types/stepper";
import { toast } from "sonner";

export default function InteriorCalculator() {
    const [formData, setFormData] = useState<FormData>({
        bhkType: '',
        bhkSizes: {
            '2': 'small',
            '3': 'small',
            '4': 'small'
        }, 
        rooms: {
            livingRoom: 1,
            kitchen: 1,
            bedroom: 1,
            bathroom: 1,
            dining: 1
        },
        package: 'essentials',
        contactInfo: {
            name: '',
            email: '',
            phone: '',
            countryCode: '',
            propertyName: '',
            subscribeWhatsapp: false
        }
        });

        const handleFinalStepCompleted = async (data: FormData) => {
          try {
            const response = await fetch('/api/submit-form', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            
            if (response.ok) {
                toast.success("Form submitted successfully!", {
                  description: "Thank you for your submission. We'll get back to you soon.",
                  duration: 5000,
                });
            }
          } catch (error) {
            console.error('Error:', error);
            toast.error("There was an error submitting the form", {
              description: "Please check your connection and try again.",
              duration: 5000,
            });
          } 
        };

    return (
        <InteriorDesignStepper
            formData={formData}
            setFormData={setFormData}
            onFinalStepCompleted={handleFinalStepCompleted}
        >
            <BHKSelectionStep formData={formData} setFormData={setFormData} />
            <RoomSelectionStep formData={formData} setFormData={setFormData} />
            <PackageSelectionStep
                formData={formData}
                setFormData={setFormData}
            />
            <ContactFormStep formData={formData} setFormData={setFormData} />
        </InteriorDesignStepper>
    );
}
