import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FocusNotes({ activeTasksCount = 3 }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "FOCUS NOTES · 01/03",
      title: "Make today count.",
      subtitle: "A little focus goes a long way.",
      badge: "NEXT UP",
      badgeColor: "#6366F1",
      cardTitle: "Design landing page",
      progress: 82
    },
    {
      id: 2,
      tag: "FOCUS NOTES · 02/03",
      title: "Small steps, big progress.",
      subtitle: "Keep your priorities in view.",
      badge: "IN PROGRESS",
      badgeColor: "#3B82F6",
      cardTitle: "Fix navigation",
      progress: 65
    },
    {
      id: 3,
      tag: "FOCUS NOTES · 03/03",
      title: "Celebrate the wins.",
      subtitle: "Every completed task moves you forward.",
      badge: "COMPLETED",
      badgeColor: "#10B981",
      cardTitle: "Onboarding copy",
      progress: 100
    }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentSlide];

  return (
    <section className="focus-notes-banner" aria-roledescription="carousel" aria-label="Focus Notes">
      <div className="carousel-slide-content">
        <div className="slide-text-col">
          <span className="slide-tag">{current.tag}</span>
          <h2 className="slide-title">{current.title}</h2>
          <p className="slide-subtitle">{current.subtitle}</p>
        </div>

        {/* Floating task preview card */}
        <div className="slide-preview-card" aria-label={`Featured task preview: ${current.cardTitle}`}>
          <div className="preview-header">
            <span 
              className="preview-badge" 
              style={{ color: current.badgeColor, backgroundColor: `${current.badgeColor}18` }}
            >
              {current.badge}
            </span>
          </div>
          <div className="preview-title">{current.cardTitle}</div>
          <div className="preview-progress-row">
            <div className="preview-progress-track">
              <div 
                className="preview-progress-fill" 
                style={{ width: `${current.progress}%`, backgroundColor: current.badgeColor }}
              ></div>
            </div>
            <span className="preview-percent">{current.progress}%</span>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="carousel-controls">
          <button 
            type="button" 
            className="carousel-arrow-btn prev-btn" 
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            type="button" 
            className="carousel-arrow-btn next-btn" 
            onClick={handleNext}
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="carousel-indicators" role="tablist" aria-label="Slide selectors">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={currentSlide === index}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
