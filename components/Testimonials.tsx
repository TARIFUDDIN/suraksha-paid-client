import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Sarah Reynolds",
    role: "Primary Care Physician",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "MediAssistAI has completely transformed our practice operations. Our appointment no-shows decreased by 47% in just three months, and our staff now spends more time with patients instead of managing schedules.",
    rating: 5
  },
  {
    name: "James Thompson",
    role: "Hospital Administrator",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "The emergency symptom checker has been a lifesaver, literally. We've seen significantly improved triage efficiency and faster response times to critical cases since implementing MediAssistAI.",
    rating: 5
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "My patients appreciate the automated prescription reminders, and I've noticed improved adherence to medication regimens. The system integrates flawlessly with our existing EHR, which was a major concern initially.",
    rating: 4
  },
  {
    name: "Emily Rodriguez",
    role: "Clinic Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    quote: "The telemedicine support features have allowed us to serve 35% more patients daily with the same staff. The AI-powered pre-consultation process saves our doctors valuable time while ensuring they have all relevant patient information.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-900/10 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What <span className="gradient-text">Healthcare Professionals</span> Say
          </h2>
          <p className="text-gray-400">
            Learn how MediAssistAI is transforming healthcare practices across the country
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="glass-card rounded-xl p-8 md:p-10 relative">
                    <Quote className="absolute top-6 left-6 h-12 w-12 text-violet-600/20" />
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="md:w-1/4 flex flex-col items-center md:items-start">
                        <div className="rounded-full overflow-hidden w-24 h-24 mb-4 border-2 border-violet-500/50">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-center md:text-left">{testimonial.name}</h3>
                        <p className="text-violet-400 text-sm mb-3 text-center md:text-left">{testimonial.role}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:w-3/4">
                        <blockquote className="text-lg md:text-xl italic text-gray-300 relative z-10">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-violet-500 scale-125' : 'bg-violet-500/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-violet-900/50 backdrop-blur-sm text-white hover:bg-violet-700/80 rounded-full pointer-events-auto"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-violet-900/50 backdrop-blur-sm text-white hover:bg-violet-700/80 rounded-full pointer-events-auto"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12">
          {['MedClinic', 'CarePath+', 'HealthFirst', 'MedicalOne', 'VitalCare', 'CureWell'].map((partner, i) => (
            <div 
              key={i} 
              className="text-gray-400 text-lg opacity-50 hover:opacity-100 transition-opacity"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;