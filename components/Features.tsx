import React from 'react';
import { MessageSquare, Bell, CalendarClock, Video, FileText } from 'lucide-react';

const features = [
  {
    icon: <CalendarClock className="h-8 w-8 text-violet-400" />,
    title: "AI Virtual Receptionist",
    description: "Manages appointments, provides basic medical advice, and ensures patients receive timely care without administrative delays."
  },
  {
    icon: <Bell className="h-8 w-8 text-indigo-400" />,
    title: "Emergency Symptom Checker",
    description: "Detects critical cases through advanced AI algorithms and automatically alerts doctors for immediate intervention."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-purple-400" />,
    title: "Prescription Automation",
    description: "AI-driven reminders and follow-ups ensure patients adhere to medication schedules and treatment plans."
  },
  {
    icon: <Video className="h-8 w-8 text-violet-400" />,
    title: "AI Telemedicine Support",
    description: "Enables seamless virtual consultations with intelligent pre-screening and post-appointment documentation."
  },
  {
    icon: <FileText className="h-8 w-8 text-indigo-400" />,
    title: "EHR Processing",
    description: "Automates patient record updates, ensuring all digital medical records are accurate, up-to-date, and securely maintained."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Powerful <span className="gradient-text">AI Features</span> for Modern Healthcare
          </h2>
          <p className="text-gray-400">
            Our AI-powered virtual receptionist streamlines healthcare operations and improves patient experiences through innovative technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card rounded-xl p-6 hover:bg-violet-900/10 transition-all duration-300 group"
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="mb-4 p-3 bg-violet-900/30 rounded-lg w-fit group-hover:bg-violet-600/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-violet-700/50 bg-violet-900/20 text-violet-300 hover:bg-violet-900/30 transition-colors">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
            </span>
            <span>Continuously learning AI for better healthcare outcomes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;