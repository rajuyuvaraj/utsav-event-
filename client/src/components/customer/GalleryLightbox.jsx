import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryLightbox = ({ isOpen, images = [], activeIndex = 0, onClose, onChangeIndex }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChangeIndex((activeIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onChangeIndex((activeIndex - 1 + images.length) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length, onClose, onChangeIndex]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        backgroundColor: 'rgba(20, 5, 8, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          color: '#FFFFFF',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
        }}
      >
        <X size={24} />
      </button>

      {/* Main Image */}
      <div
        style={{
          position: 'relative',
          maxWidth: '90vw',
          maxHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[activeIndex]}
          alt={`Theme preview ${activeIndex + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        />

        {/* Prev / Next controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => onChangeIndex((activeIndex - 1 + images.length) % images.length)}
              style={{
                position: 'absolute',
                left: '-60px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#FFFFFF',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={30} />
            </button>

            <button
              onClick={() => onChangeIndex((activeIndex + 1) % images.length)}
              style={{
                position: 'absolute',
                right: '-60px',
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#FFFFFF',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={30} />
            </button>
          </>
        )}
      </div>

      {/* Counter */}
      <div style={{ marginTop: '1.2rem', color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 600 }}>
        Photo {activeIndex + 1} of {images.length}
      </div>
    </div>
  );
};
