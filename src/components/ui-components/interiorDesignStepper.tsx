"use client";

import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormData } from "../../types/stepper";
import { Button } from "../ui/button";
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperSeparator,
} from "@/components/ui/stepper";
import Image from "next/image";
import Link from "next/link";
 import { useRouter } from 'next/navigation';

interface StepperProps {
    children: React.ReactNode;
    initialStep?: number;
    onStepChange?: (step: number) => void;
    onFinalStepCompleted?: (data: FormData) => void;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}


export default function InteriorDesignStepper({
    children,
    initialStep = 1,
    onStepChange = () => {},
    onFinalStepCompleted = () => {},
    formData,
    setFormData
}: StepperProps) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;
    const isLastStep = currentStep === totalSteps;
    const router = useRouter();

    const stepLabels = ["BHK TYPE", "ROOMS TO DESIGN", "PACKAGE", "GET QUOTE"];

    const isNextDisabled = (currentStep: number, formData: FormData): boolean => {
        switch (currentStep) {
            case 1: 
                return !formData.bhkType || formData.bhkType === '';
            case 2:  
                return Object.values(formData.rooms).every(value => value === 0);
            case 3: 
                return !formData.package;
            case 4: 
                const { name, email, phone, propertyName } = formData.contactInfo;
                return !name || !email || !phone || !propertyName;
            default:
                return false;
        }
    };

    const updateStep = (newStep: number) => {
        setCurrentStep(newStep);
        onStepChange(newStep);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            updateStep(currentStep - 1);
        }
    };

    const handleNext = () => {
        if (!isLastStep && !isNextDisabled(currentStep, formData)) {
            setDirection(1);
            updateStep(currentStep + 1);
        }
    };

    const handleComplete = async () => {
        if (!isNextDisabled(currentStep, formData)) {
            setIsSubmitting(true);
            try {
                await onFinalStepCompleted(formData);
                setIsCompleted(true);
            } catch (error) {
                console.error('Submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleBackToStepOne = () => {
        setCurrentStep(1);
        setIsCompleted(false);
        setDirection(-1);
        setFormData({
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
            package: "essentials",
            contactInfo: {
                name: '',
                email: '',
                phone: '',
                countryCode: '',
                propertyName: '',
                subscribeWhatsapp: false
            }
        });
    };

    const handleGoToHome = () => {
        router.push('/');
    };

    return (
        <div className="flex flex-col h-screen w-full bg-gray-200">
            {/* Top Navbar */}
            <header className="bg-white px-10 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.08)] border-b border-gray-200/80">
                <div className="flex items-center justify-between mx-auto">
                    {/* Logo */}
                    <div className="flex items-center">
                        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} className="cursor-pointer">
                            <Link href="/" className="flex items-center gap-2">
                                <Image 
                                    src="/logo.svg" 
                                    alt="Elixir Logo" 
                                    width={32} 
                                    height={32} 
                                    className="w-7 h-7 sm:w-8 sm:h-8"
                                />
                                <span className="text-xl sm:text-2xl font-semibold text-slate-800 font-gtpro uppercase tracking-wide">
                                    Elixir
                                </span>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Progress Bar with Step Indicators */}
                    <div className="flex-1 mx-12 max-w-6xl">
                        <Stepper value={currentStep}>
                            {stepsArray.map((_, index) => {
                                const step = index + 1;
                                const isLast = step === stepsArray.length;

                                return (
                                    <StepperItem
                                        key={step}
                                        step={step}
                                        className="relative flex-1 flex-col!"
                                    >
                                        <StepperTrigger className="flex flex-col items-center gap-1">
                                            <StepperIndicator />
                                            <StepperTitle
                                                className={`text-xs font-medium transition-colors duration-300 ${
                                                    currentStep === step
                                                        ? "text-gray-800"
                                                        : currentStep > step
                                                        ? "text-gray-700"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {stepLabels[index]}
                                            </StepperTitle>
                                        </StepperTrigger>

                                        {!isLast && (
                                            <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                                        )}
                                    </StepperItem>
                                );
                            })}
                        </Stepper>
                    </div>

                    {/* Step Counter */}
                    <div className="flex items-center text-lg font-semibold">
                        <span className="text-red-500">{currentStep}</span>
                        <span className="text-gray-400 mx-1">/</span>
                        <span className="text-gray-600">{totalSteps}</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-hidden flex justify-center items-stretch px-4 pt-8 bg-gray-50">
                <div className="bg-white rounded-t-xl shadow-md w-full max-w-3xl flex flex-col flex-1 overflow-hidden">
                    {/* Main Step Content */}
                    <main className="flex-1 overflow-auto">
                        <StepContentWrapper
                            isCompleted={false}
                            currentStep={currentStep}
                            direction={direction}
                            className="h-full"
                        >
                            <div className="p-8">
                                {isCompleted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                                        <p className="text-gray-600 mb-8">Your form has been submitted successfully.</p>
                                        
                                        {/* Navigation Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                            <Button
                                                onClick={handleBackToStepOne}
                                                variant="outline"
                                                className="px-8 py-3 text-gray-600 hover:text-gray-800 font-semibold border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                                Start New Form
                                            </Button>
                                            
                                            <Button
                                                onClick={handleGoToHome}
                                                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                Go to Home
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    stepsArray[currentStep - 1]
                                )}

                            </div>
                        </StepContentWrapper>
                    </main>

                    {/* Bottom Navigation */}
                    {!isCompleted && (
                        <footer className="border-t border-gray-200 px-6 py-6">
                            <div className="flex justify-between items-center">
                                {currentStep !== 1 ? (
                                    <Button
                                        variant="outline"
                                        onClick={handleBack}
                                        disabled={isSubmitting}
                                        className="px-8 py-3 text-gray-600 hover:text-gray-800 font-semibold border-2 border-gray-300 rounded-lg"
                                    >
                                        BACK
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                <Button
                                    onClick={isLastStep ? handleComplete : handleNext}
                                    disabled={isNextDisabled(currentStep, formData) || isSubmitting}
                                    className={`px-8 py-3 font-semibold rounded-xl transition-all duration-200 ${
                                        isNextDisabled(currentStep, formData) || isSubmitting
                                            ? 'bg-red-400 cursor-not-allowed text-gray-200'
                                            : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                                >
                                    {isSubmitting ? "SUBMITTING..." : (isLastStep ? "SUBMIT" : "NEXT")}
                                </Button>
                            </div>
                        </footer>
                    )}
                </div>
            </div>
        </div>
    );
}


function StepContentWrapper({
    isCompleted,
    currentStep,
    direction,
    children,
    className,
}: {
    isCompleted: boolean;
    currentStep: number;
    direction: number;
    children: React.ReactNode;
    className: string;
}) {
    const [parentHeight, setParentHeight] = useState(0);

    return (
        <motion.div
            style={{ position: "relative", overflow: "hidden" }}
            animate={{ height: isCompleted ? 0 : parentHeight }}
            transition={{ type: "spring", duration: 0.4 }}
            className={className}
        >
            <AnimatePresence initial={false} mode="sync" custom={direction}>
                {!isCompleted && (
                    <SlideTransition
                        key={currentStep}
                        direction={direction}
                        onHeightReady={(h) => setParentHeight(h)}
                    >
                        {children}
                    </SlideTransition>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function SlideTransition({
    children,
    direction,
    onHeightReady,
}: {
    children: React.ReactNode;
    direction: number;
    onHeightReady: (height: number) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            onHeightReady(containerRef.current.offsetHeight);
        }
    }, [children, onHeightReady]);

    return (
        <motion.div
            ref={containerRef}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", left: 0, right: 0, top: 0 }}
        >
            {children}
        </motion.div>
    );
}

const stepVariants = {
    enter: (dir: number) => ({
        x: dir >= 0 ? "100%" : "-100%",
        opacity: 0,
    }),
    center: {
        x: "0%",
        opacity: 1,
    },
    exit: (dir: number) => ({
        x: dir >= 0 ? "-100%" : "100%",
        opacity: 0,
    }),
};
