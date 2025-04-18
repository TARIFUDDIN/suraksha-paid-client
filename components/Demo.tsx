import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, MessageSquare, Calendar, FileText, Activity } from 'lucide-react';

const features = [
  {
    id: "appointment",
    icon: <Calendar className="h-5 w-5" />,
    title: "Appointment Booking",
    content: (
      <div className="bg-violet-900/20 border border-violet-800/30 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-violet-800/30 flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-violet-400 mr-2" />
            <span className="font-medium">AI Appointment Scheduling</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-violet-800/20 p-3 rounded-lg max-w-[80%]">
            Hello, I'd like to schedule an appointment with Dr. Smith for my annual checkup.
          </div>
          <div className="bg-violet-600/20 p-3 rounded-lg ml-auto max-w-[80%]">
            I'd be happy to help you schedule that appointment. Dr. Smith has availability on Tuesday at 2:00 PM or Thursday at 10:00 AM. Which would you prefer?
          </div>
          <div className="bg-violet-800/20 p-3 rounded-lg max-w-[80%]">
            Thursday at 10:00 AM works better for me.
          </div>
          <div className="bg-violet-600/20 p-3 rounded-lg ml-auto max-w-[80%]">
            Great! I've scheduled your appointment with Dr. Smith for Thursday at 10:00 AM. You'll receive a confirmation email and reminder 24 hours before your appointment. Is there anything else you need help with?
          </div>
          <div className="mt-4 p-3 bg-violet-900/30 rounded-lg border border-violet-700/30">
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 text-violet-400 mr-2" />
              <span className="text-violet-300 text-sm font-medium">System Action</span>
            </div>
            <p className="text-sm text-gray-300">Appointment successfully added to calendar and EHR system. Patient notification email and SMS scheduled.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "symptom",
    icon: <Activity className="h-5 w-5" />,
    title: "Symptom Checker",
    content: (
      <div className="bg-violet-900/20 border border-violet-800/30 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-violet-800/30 flex justify-between items-center">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-violet-400 mr-2" />
            <span className="font-medium">Emergency Symptom Analysis</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-violet-800/20 p-3 rounded-lg max-w-[80%]">
            I've been experiencing severe chest pain and shortness of breath for the past hour.
          </div>
          <div className="bg-red-900/30 p-3 rounded-lg ml-auto max-w-[80%] border border-red-700/50">
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 text-red-400 animate-pulse mr-2" />
              <span className="text-red-300 font-medium">URGENT ALERT</span>
            </div>
            These symptoms require immediate medical attention. I'm alerting the emergency response team now. Please stay on the line.
          </div>
          <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-700/30">
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 text-red-400 mr-2" />
              <span className="text-red-300 text-sm font-medium">Emergency Protocol Activated</span>
            </div>
            <p className="text-sm text-gray-300">Symptoms classified as high-risk cardiac event. Emergency services notified with patient location and medical history.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "prescription",
    icon: <FileText className="h-5 w-5" />,
    title: "Prescription Management",
    content: (
      <div className="bg-violet-900/20 border border-violet-800/30 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-violet-800/30 flex justify-between items-center">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-violet-400 mr-2" />
            <span className="font-medium">Prescription Automation System</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-violet-600/20 p-3 rounded-lg ml-auto max-w-[80%]">
            Good morning John, this is your medication reminder. It's time to take your blood pressure medication (Lisinopril 10mg). Have you taken this medication today?
          </div>
          <div className="bg-violet-800/20 p-3 rounded-lg max-w-[80%]">
            Not yet, but I will now. Thanks for the reminder.
          </div>
          <div className="bg-violet-600/20 p-3 rounded-lg ml-auto max-w-[80%]">
            Great! I've recorded that you'll take your medication now. Your next dose is scheduled for tomorrow morning. Also, your prescription has 3 refills remaining and will need to be renewed in 3 weeks. Would you like me to schedule a follow-up appointment with Dr. Miller?
          </div>
          <div className="bg-violet-800/20 p-3 rounded-lg max-w-[80%]">
            Yes, please schedule that appointment.
          </div>
          <div className="mt-4 p-3 bg-violet-900/30 rounded-lg border border-violet-700/30">
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 text-violet-400 mr-2" />
              <span className="text-violet-300 text-sm font-medium">System Action</span>
            </div>
            <p className="text-sm text-gray-300">Medication adherence recorded. Follow-up appointment scheduled for prescription renewal. EHR updated with compliance information.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "telemedicine",
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Telemedicine",
    content: (
      <div className="bg-violet-900/20 border border-violet-800/30 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-violet-800/30 flex justify-between items-center">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 text-violet-400 mr-2" />
            <span className="font-medium">AI Telemedicine Support</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-violet-600/20 p-3 rounded-lg ml-auto max-w-[80%]">
            Welcome to your telemedicine appointment with Dr. Johnson. Before the doctor joins, I'll help collect some preliminary information. How are you feeling today?
          </div>
          <div className="bg-violet-800/20 p-3 rounded-lg max-w-[80%]">
            I've had a persistent cough for about a week, and it's gotten worse over the last few days.
          </div>
          <div className="bg-violet-600/20 p-3 rounded-lg ml-auto max-w-[80%]">
            I'm sorry to hear that. Do you have any other symptoms like fever, shortness of breath, or chest pain?
          </div>
          <div className="bg-violet-800/20 p-3 rounded-lg max-w-[80%]">
            Yes, I have a slight fever of 100.4°F and feel fatigued, but no chest pain or shortness of breath.
          </div>
          <div className="mt-4 p-3 bg-violet-900/30 rounded-lg border border-violet-700/30">
            <div className="flex items-center mb-2">
              <Activity className="h-4 w-4 text-violet-400 mr-2" />
              <span className="text-violet-300 text-sm font-medium">Pre-Consultation Summary</span>
            </div>
            <p className="text-sm text-gray-300">Patient reports persistent cough (1 week duration, worsening), fever (100.4°F), and fatigue. No shortness of breath or chest pain. Medical history and medication list prepared for doctor review.</p>
          </div>
        </div>
      </div>
    )
  }
];

const Demo = () => {
  const [activeTab, setActiveTab] = useState("appointment");
  
  return (
    <section id="demo" className="py-20 bg-gradient-to-b from-background to-violet-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See <span className="gradient-text">MediAssistAI</span> in Action
          </h2>
          <p className="text-gray-400">
            Explore our interactive demos to see how our AI solutions streamline healthcare workflows and improve patient experiences
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto text-white">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-violet-900/20 p-1 gap-1">
                {features.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                  >
                    <div className="flex items-center">
                      {feature.icon}
                      <span className="ml-2">{feature.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {features.map((feature) => (
              <TabsContent key={feature.id} value={feature.id} className="mt-2 focus-visible:outline-none focus-visible:ring-0">
                {feature.content}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 text-center">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-2 px-6 py-6 text-lg">
              <PlayCircle className="h-5 w-5" />
              <span>Watch Full Demo Video</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;