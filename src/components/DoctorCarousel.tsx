import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, CheckCircle } from 'lucide-react';
import { useTracking } from './TrackingProvider';
import { useContentSection } from '../hooks/useContent';

interface DoctorCarouselProps {
  className?: string;
}

export const DoctorCarousel: React.FC<DoctorCarouselProps> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { trackClick } = useTracking();
  const doctorsData = useContentSection('doctors');
  const doctors = doctorsData.doctors;

  const nextDoctor = () => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
    trackClick('doctor_carousel_next', {
      utm_content: 'doctor_navigation',
      utm_term: `doctor_${currentIndex + 1}`
    });
  };

  const prevDoctor = () => {
    setCurrentIndex((prev) => (prev - 1 + doctors.length) % doctors.length);
    trackClick('doctor_carousel_prev', {
      utm_content: 'doctor_navigation',
      utm_term: `doctor_${currentIndex + 1}`
    });
  };

  const goToDoctor = (index: number) => {
    setCurrentIndex(index);
    trackClick('doctor_carousel_dot', {
      utm_content: 'doctor_navigation',
      utm_term: `doctor_${index + 1}`
    });
  };

  const handleVideoClick = (doctorId: number) => {
    trackClick('doctor_video_click', {
      utm_content: 'doctor_video',
      utm_term: `doctor_${doctorId}_video`
    });
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const totalCards = doctors.length;
    
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

  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      {/* Carousel Container */}
      <div className="relative h-96 mb-6 overflow-visible px-8">
        {doctors.map((doctor, index) => (
          <div
            key={doctor.id}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={getCardStyle(index)}
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 h-full flex flex-col mx-2">
              {/* Doctor Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://imgur.com/Jsdpslh.png`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 text-base">{doctor.name}</h3>
                  <p className="text-blue-600 text-xs font-medium">{doctor.title}</p>
                  <p className="text-blue-500 text-xs">{doctor.institution}</p>
                </div>
              </div>

              {/* MD Verified Badge */}
              <div className="flex justify-start mb-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  MD VERIFIED
                </div>
              </div>

              {/* Recommendation */}
              <div className="flex-1 mb-4">
                <blockquote className="text-blue-800 text-sm italic leading-relaxed">
                  "{doctor.recommendation}"
                </blockquote>
              </div>

              {/* Video Placeholder */}
              <div className="relative">
                {doctor.videoEmbed ? (
                  <div 
                    className="rounded-lg h-40 overflow-hidden cursor-pointer"
                    onClick={() => handleVideoClick(doctor.id)}
                    dangerouslySetInnerHTML={{ __html: doctor.videoEmbed }}
                  />
                ) : (
                  <div 
                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-40 flex items-center justify-center cursor-pointer group transition-all duration-300 hover:shadow-lg"
                    onClick={() => handleVideoClick(doctor.id)}
                  >
                    <div className="bg-blue-600 rounded-full p-3 group-hover:bg-blue-700 transition-colors duration-300">
                      <Play className="w-8 h-8 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
                {!doctor.videoEmbed && (
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    1:00
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mb-4">
        {doctors.map((_, index) => (
          <button
            key={index}
            onClick={() => goToDoctor(index)}
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