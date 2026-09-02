import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { requestService } from '../../services/requestService';
import { DiyaIcon, LotusIcon, SectionDivider } from '../../components/common/Motif';
import { Sparkles, CheckCircle2, Phone, MessageSquare, Calendar, MapPin, ArrowRight, Home } from 'lucide-react';

export const ConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [requestData, setRequestData] = useState(location.state?.request || null);
  const [loading, setLoading] = useState(!requestData);

  useEffect(() => {
    if (!requestData && id) {
      // In case user refreshed directly on confirmation page
      const fetchRequest = async () => {
        try {
          // Since getRequestById is admin protected, if public user refreshes without state, show fallback reference
        } catch {
          // Silent fallback
        } finally {
          setLoading(false);
        }
      };
      fetchRequest();
    }
  }, [id, requestData]);

  const requestNumber = requestData?.requestNumber || `UTSAV-${new Date().getFullYear()}-${id ? id.slice(-4).toUpperCase() : '8942'}`;
  const customerName = requestData?.customerName || 'Celebration Host';
  const eventDate = requestData?.eventDate || '';
  const themeName = requestData?.selectedThemeName || '';

  const whatsappMessage = encodeURIComponent(
    `Namaste Utsav Decor! I have just submitted an event decor enquiry (Ref: ${requestNumber}) for my celebration on ${eventDate}. Looking forward to discussing details!`
  );

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', padding: '4rem 0 6rem' }}>
      <div className="container">
        <div className="confirmation-card">
          {/* Auspicious Icon */}
          <div className="auspicious-kalash-icon">
            <DiyaIcon size={44} color="#E66E19" />
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'var(--marigold-light)',
              color: 'var(--marigold)',
              fontSize: '0.85rem',
              fontWeight: 700,
              padding: '0.35rem 1rem',
              borderRadius: 'var(--radius-full)',
              marginBottom: '0.8rem',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={14} /> Shubh Aarambh
          </span>

          <h1 style={{ color: 'var(--maroon-deep)', fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginBottom: '0.6rem' }}>
            Thank You, {customerName}!
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', maxWidth: '580px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Your event decoration inquiry has been received with warmth. 
            Our senior decor stylist will contact you within <strong>24 hours</strong> with a bespoke design concept.
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>
              Your Unique Enquiry Reference
            </span>
            <div className="booking-ref-badge">{requestNumber}</div>
          </div>

          {/* 3-Step Process Timeline */}
          <div className="timeline-steps">
            <div className="timeline-step">
              <div className="step-num">01</div>
              <div className="step-title">Styling Discovery</div>
              <div className="step-desc">
                Our designer calls to understand your floral preferences, muhurtham timings, and stage dimensions.
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-num">02</div>
              <div className="step-title">3D Moodboard</div>
              <div className="step-desc">
                We craft a bespoke color palette, 3D floor plan layout, and itemized proposal tailored to your venue.
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-num">03</div>
              <div className="step-title">Flawless Setup</div>
              <div className="step-desc">
                Our master artisans execute on-site setup hours prior to the muhurtham with fresh flowers and royal precision.
              </div>
            </div>
          </div>

          {/* Quick Contact CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <a
              href={`https://wa.me/919820145872?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-lg"
            >
              <MessageSquare size={18} /> Chat with Decor Stylist on WhatsApp
            </a>

            <Link to="/" className="btn btn-secondary btn-lg">
              <Home size={18} /> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
