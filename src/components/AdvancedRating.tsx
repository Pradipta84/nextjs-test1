"use client";

import { useState, useEffect } from 'react';

interface RatingData {
  average: number;
  total: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface AdvancedRatingProps {
  rating: number;
  reviews: number;
  breakdown?: RatingData['breakdown'];
  showBreakdown?: boolean;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function AdvancedRating({
  rating,
  reviews,
  breakdown,
  showBreakdown = false,
  interactive = false,
  size = 'md',
  animated = true
}: AdvancedRatingProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [displayRating, setDisplayRating] = useState(rating);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    sm: { star: 'text-sm', text: 'text-xs', progress: 'h-1' },
    md: { star: 'text-lg', text: 'text-sm', progress: 'h-2' },
    lg: { star: 'text-2xl', text: 'text-base', progress: 'h-3' }
  };

  const currentSize = sizeClasses[size];

  useEffect(() => {
    if (animated) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayRating(rating);
        setIsAnimating(false);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayRating(rating);
    }
  }, [rating, animated]);

  const renderStar = (index: number, filled: boolean) => {
    const isHovered = hoveredStar !== null && index <= hoveredStar;
    const isActive = filled || isHovered;
    
    return (
      <span
        key={index}
        className={`star ${currentSize.star} transition-all duration-300 cursor-pointer ${
          isActive ? 'text-yellow-400' : 'text-gray-300'
        } ${isActive ? 'drop-shadow-lg' : ''} ${
          isAnimating ? 'animate-pulse' : ''
        }`}
        style={{
          filter: isActive ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' : 'none',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={() => interactive && setHoveredStar(index)}
        onMouseLeave={() => interactive && setHoveredStar(null)}
      >
        ⭐
      </span>
    );
  };

  const renderProgressBar = (value: number, max: number, label: string) => {
    const percentage = (value / max) * 100;
    
    return (
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-gray-600 w-8">{label}</span>
        <div className="flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`${currentSize.progress} bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-1000 ease-out`}
            style={{ 
              width: `${percentage}%`,
              animation: animated ? 'slideIn 1s ease-out' : 'none'
            }}
          />
        </div>
        <span className="text-xs text-gray-500 w-8 text-right">{value}</span>
      </div>
    );
  };

  const defaultBreakdown = breakdown || {
    5: Math.floor(reviews * 0.6),
    4: Math.floor(reviews * 0.25),
    3: Math.floor(reviews * 0.1),
    2: Math.floor(reviews * 0.03),
    1: Math.floor(reviews * 0.02)
  };

  return (
    <div className="advanced-rating">
      {/* Main Rating Display */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(index => 
            renderStar(index, index <= Math.floor(displayRating))
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-bold text-gray-800 ${currentSize.text}`}>
            {displayRating.toFixed(1)}
          </span>
          <span className={`text-gray-500 ${currentSize.text}`}>
            ({reviews.toLocaleString()} reviews)
          </span>
        </div>
      </div>

      {/* Rating Breakdown */}
      {showBreakdown && (
        <div className="rating-breakdown mt-3 p-3 bg-gray-50 rounded-lg">
          <h6 className="text-sm font-semibold text-gray-700 mb-2">Rating Distribution</h6>
          {[5, 4, 3, 2, 1].map(star => 
            renderProgressBar(defaultBreakdown[star as keyof typeof defaultBreakdown], reviews, `${star}★`)
          )}
        </div>
      )}

      {/* Rating Summary */}
      <div className="rating-summary mt-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Excellent</span>
          <span>Good</span>
          <span>Average</span>
          <span>Poor</span>
          <span>Terrible</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }

        .star {
          position: relative;
          display: inline-block;
        }

        .star::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .star:hover::before {
          opacity: 1;
        }

        .advanced-rating {
          position: relative;
        }

        .advanced-rating::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.1), transparent);
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .advanced-rating:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
