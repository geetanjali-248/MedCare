import React from 'react';

export interface AppLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  priority?: boolean;
  showTitle?: boolean;
  titleClassName?: string;
}

export default function AppLogo({
  size = 'md',
  className = '',
  onClick,
  showTitle = false,
  titleClassName = '',
}: AppLogoProps) {
  // Mapping sizes to proportional heights while preserving aspect ratio
  const sizeClasses = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9',
    md: 'h-12 sm:h-14',
    lg: 'h-20 sm:h-24',
    xl: 'h-28 sm:h-32',
  };

  const titleSizeClasses = {
    xs: 'text-xs',
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const imageElement = (
    <img
      src="/images/medcare-logo.png"
      alt="MedCare Logo - Healthcare for a Healthier Tomorrow"
      className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 ${
        onClick && !showTitle ? 'cursor-pointer hover:opacity-90 active:scale-95' : ''
      } ${className}`}
      loading="eager"
      onError={(e) => {
        // Fallback to root path if /images/ fails in any environment
        const target = e.currentTarget;
        if (!target.src.endsWith('/medcare-logo.png')) {
          target.src = '/medcare-logo.png';
        }
      }}
    />
  );

  const content = showTitle ? (
    <div className="inline-flex items-center gap-2">
      {imageElement}
      <span
        className={`font-black tracking-wider text-blue-600 uppercase select-none leading-none ${titleSizeClasses[size]} ${titleClassName}`}
      >
        MEDCARE
      </span>
    </div>
  ) : (
    imageElement
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center p-0 bg-transparent border-0 focus:outline-none cursor-pointer hover:opacity-90 active:scale-95 transition-opacity"
        aria-label="MedCare Home"
      >
        {content}
      </button>
    );
  }

  return content;
}
