import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-indigo-900/10 to-transparent -z-10"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto glass-card rounded-2xl p-8 md:p-12 border border-violet-800/30 glow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="gradient-text">Healthcare Practice?</span>
              </h2>
              <p className="text-gray-300 mb-8">
                Join hundreds of healthcare providers who have already streamlined their operations and improved patient care with MediAssistAI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="bg-transparent border-violet-700 text-white hover:bg-violet-900/20 px-8 py-6 text-lg">
                  Schedule a Demo
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-900/20 via-indigo-900/20 to-purple-900/20 p-6 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-violet-900/50 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Reduce administrative burden by up to 70%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-violet-900/50 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Decrease patient waiting times by 45%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-violet-900/50 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Improve medication adherence rates by 35%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-violet-900/50 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Enhance emergency response time by 50%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-violet-900/50 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">Easy integration with your existing systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-violet-900/50 p-1.5 rounded-full">
                    <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">HIPAA compliant and secure data handling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;