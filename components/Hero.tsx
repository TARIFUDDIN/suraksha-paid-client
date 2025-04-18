import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { MessageSquare, Play, ArrowRight, Activity } from 'lucide-react';

const Hero = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [])
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-background z-0">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-violet-900/30 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-indigo-900/20 rounded-full filter blur-3xl opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-900/30 border border-violet-800/50 text-sm text-violet-300 mb-6 animate-pulse-slow">
                <Activity className="h-4 w-4 mr-2" />
                <span>AI-Powered Healthcare Assistant</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="gradient-text">Revolutionize</span> Your Medical Reception With AI
              </h1>
              <p className="text-lg text-gray-300 mb-8 md:pr-10">
                Streamline patient care, automate appointments, and improve healthcare outcomes with our intelligent virtual medical receptionist.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
            <Button
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-base"
                onClick={() => router.push("/assistant")} // 👈 Added navigation
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-violet-700 hover:bg-violet-900/20 text-white px-8 py-6 text-base">
                <Play className="mr-2 h-5 w-5 text-violet-400" />
                Watch Demo
              </Button>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-400 mb-2">Trusted by leading healthcare providers</p>
              <div className="flex flex-wrap items-center gap-6">
                {['MedClinic', 'HealthPlus', 'CarePoint', 'MedTech'].map((name, i) => (
                  <div 
                    key={i} 
                    className={`text-gray-400 font-semibold opacity-50 hover:opacity-100 transition-opacity animate-pulse-slow`}
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`relative ${isVisible ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <div className="relative bg-gradient-to-br from-violet-900/80 via-indigo-900/40 to-purple-900/40 p-1 rounded-2xl glass-card glow">
              <div className="absolute -top-10 -right-10 bg-violet-600/80 h-24 w-24 rounded-full blur-2xl"></div>
              
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-950 to-gray-950 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-lg font-bold">MediAssistAI</div>
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-violet-900/30 px-4 py-3 rounded-lg max-w-[80%]">
                    Hello, I'm your AI medical assistant. How can I help you today?
                  </div>
                  
                  <div className="bg-violet-600/20 px-4 py-3 rounded-lg ml-auto max-w-[80%]">
                    I need to schedule an appointment for tomorrow.
                  </div>
                  
                  <div className="bg-violet-900/30 px-4 py-3 rounded-lg max-w-[80%]">
                    I'd be happy to help you schedule an appointment. What time works best for you?
                  </div>
                  
                  <div className="animate-pulse flex items-center space-x-2 text-xs text-violet-300">
                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                    <div>AI is typing...</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-violet-900/20 rounded-full px-4 py-2 text-gray-400">
                    Type your message...
                  </div>
                  <Button size="sm" className="aspect-square bg-violet-600 p-2">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Animated elements */}
                <div className="absolute -bottom-16 -left-16 bg-violet-600/20 h-32 w-32 rounded-full blur-2xl animate-pulse-slow"></div>
                <div className="absolute -top-8 right-32 bg-indigo-600/20 h-16 w-16 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-violet-600/80 rounded-full p-3 shadow-lg animate-float">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="absolute bottom-8 -left-8 bg-indigo-600/80 rounded-full p-3 shadow-lg animate-bounce-subtle">
              <Activity className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;