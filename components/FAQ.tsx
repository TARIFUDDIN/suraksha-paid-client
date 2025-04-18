import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI virtual receptionist work?",
    answer: "Our AI virtual receptionist utilizes natural language processing and machine learning to understand patient requests through voice or text. It can schedule appointments, answer common questions, provide basic medical advice, and route urgent cases to appropriate healthcare professionals. The system integrates with your existing practice management software and continuously learns from interactions to improve its responses."
  },
  {
    question: "Is the emergency symptom checker medically accurate?",
    answer: "Yes, our emergency symptom checker is built on evidence-based medical protocols and has been validated by practicing physicians. It's designed to identify potential emergencies with high sensitivity, meaning it prioritizes patient safety when detecting critical conditions. The system is regularly updated with the latest medical guidelines and fine-tuned based on provider feedback."
  },
  {
    question: "How do you ensure patient data security and privacy?",
    answer: "We take data security and privacy extremely seriously. Our platform is fully HIPAA compliant, employs end-to-end encryption, and undergoes regular security audits. We maintain strict access controls, never sell patient data, and only use anonymized information for system improvements. Our infrastructure uses state-of-the-art security measures to protect all patient information."
  },
  {
    question: "Can MediAssistAI integrate with our existing EHR system?",
    answer: "Yes, MediAssistAI is designed to integrate with all major electronic health record systems through standard APIs and HL7 interfaces. We have pre-built connectors for Epic, Cerner, Allscripts, athenahealth, and many others. Our implementation team will work with your IT department to ensure seamless integration with minimal disruption to your existing workflows."
  },
  {
    question: "What kind of training is required for our staff?",
    answer: "The system is designed to be intuitive and user-friendly, requiring minimal training. We provide comprehensive onboarding that typically takes less than two hours for most staff members. This includes video tutorials, live training sessions, and a dedicated support specialist during the implementation phase. Most practices report that their teams are comfortable with the system within the first week."
  },
  {
    question: "How quickly can we implement MediAssistAI in our practice?",
    answer: "Implementation timelines vary based on practice size and complexity, but most clients are fully operational within 2-4 weeks. Our streamlined implementation process includes system configuration, EHR integration, staff training, and a phased rollout approach. We work closely with your team to minimize disruption and ensure a smooth transition."
  },
  {
    question: "Can the AI handle complex medical terminology and conditions?",
    answer: "Absolutely. Our AI model is specifically trained on medical terminology, clinical guidelines, and healthcare workflows. It can recognize thousands of medical terms, understand complex medical conditions, and process clinical documentation efficiently. The system is continuously updated with new medical knowledge and can differentiate between common conditions and rare diseases."
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400">
            Find answers to common questions about our AI healthcare solutions
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-violet-900/10 rounded-lg border border-violet-800/30 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline">
                  <span className="text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-violet-900/20 border border-violet-800/30 text-violet-300">
              <span className="mr-2">Contact our support team at</span>
              <a href="mailto:support@mediassistai.com" className="text-violet-400 hover:text-violet-300">support@mediassistai.com</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
