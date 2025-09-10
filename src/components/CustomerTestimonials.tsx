import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Star } from 'lucide-react';
import { useTracking } from './TrackingProvider';
import { useContentSection } from '../hooks/useContent';

interface CustomerTestimonialsProps {
  className?: string;
}

export const CustomerTestimonials: React.FC<CustomerTestimonialsProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { trackClick } = useTracking();
  const testimonialsData = useContentSection('testimonials');
  const customers = testimonialsData.customers;

  const nextCustomer = () => {
    setCurrentIndex((prev) => (prev + 1) % customers.length);
    trackClick('customer_carousel_next', {
      utm_content: 'customer_navigation',
      utm_term: `customer_${currentIndex + 1}`
    });
  };

  const prevCustomer = () => {
    setCurrentIndex((prev) => (prev - 1 + customers.length) % customers.length);
    trackClick('customer_carousel_prev', {
      utm_content: 'customer_navigation',
      utm_term: `customer_${currentIndex + 1}`
    });
  };

  const goToCustomer = (index: number) => {
    setCurrentIndex(index);
    trackClick('customer_carousel_dot', {
      utm_content: 'customer_navigation',
      utm_term: `customer_${index + 1}`
    });
  };

  const handleTestimonialClick = (customerId: number) => {
    trackClick('customer_testimonial_click', {
      utm_content: 'customer_testimonial',
      utm_term: `customer_${customerId}_testimonial`
    });
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalCards = customers.length;
    
    // Normalize difference to handle circular array
    const normalizedDiff = ((diff % totalCards) + totalCards) % totalCards;
    const adjustedDiff = normalizedDiff > totalCards / 2 ? normalizedDiff - totalCards : normalizedDiff;
    
    if (adjustedDiff === 0) {
      // Center card
      return {
        transform: 'translateX(0%) scale(1)',
        zIndex: 30,
        opacity: 1,
        filter: 'blur(0px)'
      };
    } else if (adjustedDiff === 1) {
      // Right card
      return {
        transform: 'translateX(50%) translateY(-15%) scale(0.75) rotate(8deg)',
        zIndex: 20,
        opacity: 0.8,
        filter: 'blur(1px)'
      };
    } else if (adjustedDiff === -1) {
      // Left card
      return {
        transform: 'translateX(-50%) translateY(-15%) scale(0.75) rotate(-8deg)',
        zIndex: 20,
        opacity: 0.8,
        filter: 'blur(1px)'
      };
    } else {
      // Hidden cards
      return {
        transform: 'translateX(0%) scale(0.6)',
        zIndex: 10,
        opacity: 0,
        filter: 'blur(2px)'
      };
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      {/* Carousel Container */}
      <div className="relative h-96 mb-6 overflow-visible px-8">
        {customers.map((customer, index) => (
          <div
            key={customer.id}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={getCardStyle(index)}
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 h-full flex flex-col mx-2">
              {/* Customer Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={customer.photo}
                    alt={customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://imgur.com/uEGrHTs.png`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 text-base">{customer.name}</h3>
                  <p className="text-blue-600 text-sm font-medium">{customer.location}</p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="flex justify-start mb-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  VERIFIED
                </div>
              </div>

              {/* Testimonial */}
              <div className="flex-1 mb-4">
                <blockquote className="text-blue-800 text-sm italic leading-relaxed">
                  "{customer.testimonial}"
                </blockquote>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {renderStars(customer.rating)}
                <span className="text-blue-800 font-bold text-sm ml-2">{customer.rating.toFixed(1)}</span>
              </div>

              {/* Customer Photo/Video Placeholder */}
              <div className="relative">
                {customer.videoEmbed ? (
                  <div 
                    className="rounded-lg h-32 overflow-hidden cursor-pointer"
                    onClick={() => handleTestimonialClick(customer.id)}
                    dangerouslySetInnerHTML={{ __html: customer.videoEmbed }}
                  />
                ) : (
                  <div 
                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-32 flex items-center justify-center cursor-pointer group transition-all duration-300 hover:shadow-lg"
                    onClick={() => handleTestimonialClick(customer.id)}
                  >
                    <div className="flex flex-col items-center justify-center text-blue-600">
                      <div className="text-3xl mb-2">🎥</div>
                      <div className="text-xs font-bold">Video Testimonial</div>
                      <div className="text-xs opacity-70">{customer.name}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mb-4">
        {customers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCustomer(index)}
            className={`w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};