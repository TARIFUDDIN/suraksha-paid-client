import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Patient Input Layer",
    description: "Multiple channels for patient interaction via voice calls, web-based interfaces, and messaging.",
    details: [
      "Patient Call/Voice Input", 
      "Twilio Voice API", 
      "Ultravox Speech-to-Text"
    ],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Core AI Processing",
    description: "Intelligent analysis of patient inputs to determine urgency and appropriate actions.",
    details: [
      "Emergency Symptom Checker AI", 
      "Critical vs Non-Critical Routing", 
      "Appointment Scheduling", 
      "AI-Driven Medical Document Processing"
    ],
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    title: "Backend Automation",
    description: "Streamlined processes for patient management, medical records, and communications.",
    details: [
      "Telemedicine Support", 
      "EHR Extraction", 
      "SMS/Email Alerts", 
      "Medication Reminders", 
      "Patient Follow-Up/Revisit Alerts"
    ],
    color: "from-emerald-500/20 to-green-500/20"
  }
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-background -z-10">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white ">
            How <span className="gradient-text">SurakshaAI</span> Works
          </h2>
          <p className="text-gray-400">
            Our end-to-end AI solution transforms patient interaction with seamless integration across multiple touchpoints
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className={`bg-gradient-to-br ${step.color} border border-white/5 p-6 rounded-xl transition-all duration-500 ${activeStep === index ? 'scale-105 shadow-lg shadow-violet-500/10' : 'opacity-80'}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep === index ? 'bg-violet-600' : 'bg-violet-900/50'} mr-3`}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-4">{step.description}</p>
              
              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mr-2"></div>
                    <span className="text-sm text-gray-400">{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        
        {/* Workflow diagram */}
        <div className="bg-violet-900/10 border border-violet-800/20 rounded-xl p-4 md:p-8 overflow-hidden">
          <div className="aspect-video relative">
            <img 
              src="/blockdg.png" 
              alt="AI-Powered Virtual Medical Receptionist - System Architecture" 
              className="w-full h-full object-contain"
            />
            
            {/* Highlight overlay based on active step */}
            <div className="absolute inset-0 flex">
              <div className={`w-1/3 transition-opacity duration-500 ${activeStep === 0 ? 'bg-blue-500/10' : 'bg-transparent'}`}></div>
              <div className={`w-1/3 transition-opacity duration-500 ${activeStep === 1 ? 'bg-violet-500/10' : 'bg-transparent'}`}></div>
              <div className={`w-1/3 transition-opacity duration-500 ${activeStep === 2 ? 'bg-emerald-500/10' : 'bg-transparent'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;