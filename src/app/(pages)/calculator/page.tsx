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
            '1': 'small',
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
        package: 'Basic',
        contactInfo: {
            name: '',
            email: '',
            phone: '',
            countryCode: '',
            propertyName: '',
            subscribeWhatsapp: false
        }
    });

    const handleFinalStepCompleted = async (data: FormData): Promise<{ totalPrice: number }> => {
        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                const result = await response.json();
                
                toast.success("Form submitted successfully!", {
                    description: `Your estimated cost is ₹${result.totalPrice.toLocaleString('en-IN')}. We'll get back to you soon.`,
                    duration: 5000,
                });
                
                return { totalPrice: result.totalPrice };
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("There was an error submitting the form", {
                description: "Please check your connection and try again.",
                duration: 5000,
            });
            throw error;
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
