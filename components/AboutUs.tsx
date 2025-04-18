import React from 'react';
import { Card } from "@/components/ui/card";
import { Brain, Heart, TrendingUp, Users, Shield, Sparkles } from 'lucide-react';

const values = [
  {
    icon: <Brain className="h-6 w-6 text-violet-400" />,
    title: "Innovation",
    description: "We continuously push the boundaries of AI in healthcare to deliver cutting-edge solutions."
  },
  {
    icon: <Heart className="h-6 w-6 text-violet-400" />,
    title: "Empathy",
    description: "Our technology is designed with deep understanding of patient and provider needs."
  },
  {
    icon: <Shield className="h-6 w-6 text-violet-400" />,
    title: "Security",
    description: "We maintain the highest standards of data privacy and security in all our solutions."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-violet-400" />,
    title: "Excellence",
    description: "We strive for exceptional quality and performance in every feature we develop."
  },
  {
    icon: <Users className="h-6 w-6 text-violet-400" />,
    title: "Collaboration",
    description: "We work closely with healthcare professionals to create truly useful tools."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-violet-400" />,
    title: "Impact",
    description: "We measure our success by the positive difference we make in healthcare outcomes."
  }
];

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-violet-950/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">MediAssistAI</span>
          </h2>
          <p className="text-gray-400">
            We're on a mission to transform healthcare through intelligent automation and AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-semibold mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded by a team of healthcare professionals and AI specialists, MediAssistAI emerged from firsthand experience with the administrative burdens facing modern medical practices.
              </p>
              <p>
                We recognized that doctors and nurses were spending too much time on paperwork and administrative tasks, and not enough time with patients. Our solution was to develop an AI-powered virtual receptionist that could handle routine tasks while improving patient experiences.
              </p>
              <p>
                Since our founding, we've expanded our platform to address multiple aspects of healthcare administration, from emergency triage to prescription management, all designed to reduce workloads and improve outcomes.
              </p>
              <p>
                Today, we partner with hospitals, clinics, and private practices across the country, helping them deliver better care more efficiently through intelligent automation.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass-card glow">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-800/20 via-indigo-800/20 to-purple-800/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Heart className="h-16 w-16 text-violet-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Improving Lives Through Technology</h3>
                    <p className="text-gray-300">Our AI solutions have helped process over</p>
                    <div className="text-4xl font-bold gradient-text mt-2 mb-3">1,000,000+</div>
                    <p className="text-gray-300">patient interactions across 200+ healthcare facilities</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-center">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-violet-900/10 border-violet-800/20 p-6 rounded-xl hover:bg-violet-900/20 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-md bg-violet-900/50 mr-4">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-semibold">{value.title}</h4>
                </div>
                <p className="text-gray-400">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-block glass-card rounded-full px-8 py-4 border border-violet-700/30">
            <span className="text-gray-300">Want to join our team? </span>
            <a href="#" className="text-violet-400 hover:text-violet-300 font-medium ml-2">View open positions →</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;