"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function QuoteSummaryContent() {
    const searchParams = useSearchParams();
    
    // const bhk = searchParams.get('bhk');
    // const size = searchParams.get('size');
    // const packageType = searchParams.get('package');
    const priceRange = searchParams.get('priceRange');
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    // const location = searchParams.get('location');


    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Success Header */}
                    <div className="bg-green-50 px-6 py-8 text-center border-b">
                        <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="size-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">
                            Thank you, {name}!
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">
                            Here&apos;s your estimated budget range
                        </p>
                        
                        {/* Price Range Display */}
                        <div className="mb-4">
                            <p className="text-xl sm:text-4xl font-bold text-green-600 mb-2">
                                ₹{priceRange}*
                            </p>
                        </div>

                        <p className="text-sm text-gray-600">
                            This isn&apos;t a final quote and can be customised to suit your needs.
                        </p>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 sm:p-8 ">
                        {/* <div className='w-full justify-self-center max-w-lg'>
                            <div className="gap-8 mb-8 ">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">BHK Type:</span>
                                            <span className="font-medium">{bhk} BHK</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Size:</span>
                                            <span className="font-medium capitalize">{size}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Package:</span>
                                            <span className="font-medium">{packageType}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="text-gray-600">Location:</span>
                                            <span className="font-medium">{location}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> */}

                        {/* Why Choose Us Section */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                                Why choose us
                            </h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                {/* 45 day guarantee */}
                                <div className="flex flex-col items-center">
                                    <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                                        <svg className="size-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">45 day move-in</div>
                                    <div className="text-xs text-gray-600">guarantee*</div>
                                </div>

                                {/* 10 year warranty */}
                                <div className="flex flex-col items-center">
                                    <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                        <svg className="size-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">Flat 10-year</div>
                                    <div className="text-xs text-gray-600">warranty**</div>
                                </div>

                                {/* Quality checks */}
                                <div className="flex flex-col items-center">
                                    <div className="size-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                        <svg className="size-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">146 quality checks</div>
                                </div>

                                {/* Easy EMIs */}
                                <div className="flex flex-col items-center">
                                    <div className="size-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                                        <svg className="size-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">Easy EMI&apos;s</div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-blue-50 rounded-lg p-6 mb-6">
                            <h4 className="font-semibold text-blue-800 mb-2">Our team will contact you soon!</h4>
                            <p className="text-sm text-blue-700">
                                We&apos;ll reach out to you at <strong>{email}</strong> and <strong>{phone}</strong> within 24 hours to discuss your project in detail.
                            </p>
                        </div>

                        {/* Important Notes */}
                        <div className="text-xs text-gray-500 space-y-2 mb-6">
                            <p>*This is only an indicative price based on typical project spends. The final price may vary depending on factors like finish material, amount of furniture, civil work required (painting, flooring, plumbing, etc.), design elements, and wood type. Don&apos;t worry — our designers will help you understand it all better.</p>
                            <p>** Terms and conditions apply</p>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center flex flex-col sm:flex-row gap-3 sm:px-8 md:px-20">
                            <Link
                                href="/contact"
                                className="w-full inline-block bg-[#F86642] hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors mr-4"
                            >
                                Book Consultation
                            </Link>
                            
                            <Link
                                href="/calculator"
                                className="w-full inline-block border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition-colors"
                            >
                                Start New Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function QuoteSummaryPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your quote...</p>
                </div>
            </div>
        }>
            <QuoteSummaryContent />
        </Suspense>
    );
}
