'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ProductsEnquiryModalProps {
  onClose: () => void;
}

interface FormData {
  industry: string;
  industryDetail: string;
  region: string;
  market: string;
  motivation: string;
  entityType: string;
  companySize: string;
  name: string;
  email: string;
  company: string;
  challenge: string;
}

const marketsByRegion: Record<string, string[]> = {
  'uk': ['More Markets', 'England', 'Scotland', 'Wales', 'Northern Ireland'],
  'europe': ['More Markets', 'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland'],
  'north-america': [
    'More Markets',
    // US States
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    // Canadian Provinces
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland And Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
    // Mexico
    'Mexico'
  ],
  'asia-pacific': ['More Markets', 'Australia', 'Bangladesh', 'Cambodia', 'China', 'Hong Kong', 'India', 'Indonesia', 'Japan', 'Malaysia', 'New Zealand', 'Pakistan', 'Philippines', 'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan', 'Thailand', 'Vietnam'],
  'middle-east': ['More Markets', 'Bahrain', 'Egypt', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Qatar', 'Saudi Arabia', 'Turkey', 'UAE'],
  'africa': ['More Markets', 'Algeria', 'Angola', 'Egypt', 'Ethiopia', 'Ghana', 'Kenya', 'Morocco', 'Nigeria', 'South Africa', 'Tanzania', 'Tunisia', 'Uganda'],
  'latin-america': ['More Markets', 'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Costa Rica', 'Dominican Republic', 'Ecuador', 'Guatemala', 'Mexico', 'Panama', 'Paraguay', 'Peru', 'Uruguay', 'Venezuela'],
  'global': ['Multiple Markets', 'Digital-first / No Primary Market']
};

export default function ProductsEnquiryModal({ onClose }: ProductsEnquiryModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    industry: '',
    industryDetail: '',
    region: '',
    market: '',
    motivation: '',
    entityType: '',
    companySize: '',
    name: '',
    email: '',
    company: '',
    challenge: '',
  });

  const availableMarkets = formData.region ? marketsByRegion[formData.region] || [] : [];
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/products-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setCurrentStep(7); // Show confirmation
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again or email us directly at hello@prismaticalab.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="modal active" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 z-[1000]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 z-[1000] flex items-center justify-center md:p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <Dialog.Panel
              className="modal-content"
              style={{
                backgroundColor: '#fff',
                padding: isMobile ? '20px 20px 24px' : '40px',
                paddingTop: isMobile ? '56px' : '40px', // Extra space for close button on mobile
                borderRadius: isMobile ? '0' : '16px',
                maxWidth: isMobile ? '100%' : '540px',
                width: '100%',
                height: isMobile ? '100vh' : 'auto',
                maxHeight: isMobile ? '100vh' : 'calc(100vh - 80px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
              }}
            >
              <button
                type="button"
                className="modal-close"
                style={{
                  position: 'absolute',
                  top: isMobile ? '16px' : '20px',
                  right: isMobile ? '16px' : '20px',
                  fontSize: '32px',
                  fontWeight: 300,
                  color: '#999',
                  cursor: 'pointer',
                  lineHeight: 1,
                  transition: 'color 0.2s',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  zIndex: 10,
                }}
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#D43225';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#999';
                }}
              >
                ×
              </button>

              <div style={{ marginBottom: '24px' }}>
                <Dialog.Title
                  as="h3"
                  style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '18px', fontWeight: 700, marginTop: 0, marginBottom: '8px', textTransform: 'uppercase' }}
                >
                  Check Capacity
                </Dialog.Title>
                {currentStep < 7 && (
                  <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: 0 }}>
                    Step {currentStep} of 6
                  </p>
                )}
              </div>

              <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, marginBottom: '20px' }}>

                {/* Step 1: Industry */}
                {currentStep === 1 && (
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      What do you do?
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                      Your industry context
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                          Industry *
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            backgroundColor: 'white',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        >
                          <option value="">Select industry...</option>
                          <option value="hospitality-food">Hospitality & Food Service</option>
                          <option value="retail-ecommerce">Retail & E-commerce</option>
                          <option value="professional-services">Professional Services (Law, Accounting, Consulting)</option>
                          <option value="tech-saas">Tech & SaaS</option>
                          <option value="manufacturing-production">Manufacturing & Production</option>
                          <option value="education-training">Education & Training</option>
                          <option value="healthcare-wellness">Healthcare & Wellness</option>
                          <option value="finance-fintech">Finance & FinTech</option>
                          <option value="real-estate-property">Real Estate & Property</option>
                          <option value="arts-culture-entertainment">Arts, Culture & Entertainment</option>
                          <option value="media-publishing">Media & Publishing</option>
                          <option value="marketing-advertising">Marketing & Advertising</option>
                          <option value="logistics-supply-chain">Logistics & Supply Chain</option>
                          <option value="construction-engineering">Construction & Engineering</option>
                          <option value="energy-utilities">Energy & Utilities</option>
                          <option value="agriculture-farming">Agriculture & Farming</option>
                          <option value="travel-tourism">Travel & Tourism</option>
                          <option value="nonprofit-ngo">Non-Profit & NGO</option>
                          <option value="government-public">Government & Public Sector</option>
                          <option value="sports-fitness">Sports & Fitness</option>
                          <option value="its-weird">It's weird, none of these...</option>
                        </select>
                      </div>

                      {formData.industry === 'its-weird' && (
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                            Tell us what you do
                          </label>
                          <input
                            type="text"
                            value={formData.industryDetail}
                            onChange={(e) => setFormData({ ...formData, industryDetail: e.target.value })}
                            placeholder="Describe your industry..."
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Market */}
                {currentStep === 2 && (
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      Where do you operate?
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                      Your primary market
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                          Region *
                        </label>
                        <select
                          value={formData.region}
                          onChange={(e) => {
                            setFormData({ ...formData, region: e.target.value, market: '' });
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            backgroundColor: 'white',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        >
                          <option value="">Select region...</option>
                          <option value="uk">UK</option>
                          <option value="europe">Europe</option>
                          <option value="north-america">North America</option>
                          <option value="asia-pacific">Asia-Pacific</option>
                          <option value="middle-east">Middle East</option>
                          <option value="africa">Africa</option>
                          <option value="latin-america">Latin America</option>
                          <option value="global">Global / Digital</option>
                        </select>
                      </div>

                      {formData.region && (
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                            Market *
                          </label>
                          <select
                            value={formData.market}
                            onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px',
                              boxSizing: 'border-box',
                              backgroundColor: 'white'
                            }}
                          >
                            <option value="">Select market...</option>
                            {availableMarkets.map((market) => (
                              <option key={market} value={market}>
                                {market}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Motivation */}
                {currentStep === 3 && (
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      Select your motivation
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                      What brings you here?
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="stuck-on-big-decision"
                          checked={formData.motivation === 'stuck-on-big-decision'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Stuck On A Big Decision</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="building-something-new"
                          checked={formData.motivation === 'building-something-new'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Building Something New</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="level-up-strategic-thinking"
                          checked={formData.motivation === 'level-up-strategic-thinking'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Level Up Strategic Thinking</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="cant-afford-consultants"
                          checked={formData.motivation === 'cant-afford-consultants'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Can't Afford Consultants Anymore</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="competitor-out-thought-us"
                          checked={formData.motivation === 'competitor-out-thought-us'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Competitor Just Out-Thought Us</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="scaling-faster-than-think"
                          checked={formData.motivation === 'scaling-faster-than-think'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Scaling Faster Than We Can Think</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="too-many-reactive-decisions"
                          checked={formData.motivation === 'too-many-reactive-decisions'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Too Many Reactive Decisions</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="want-unfair-advantage"
                          checked={formData.motivation === 'want-unfair-advantage'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Want An Unfair Advantage</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="motivation"
                          value="compete-with-prismatica"
                          checked={formData.motivation === 'compete-with-prismatica'}
                          onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                          style={{ marginRight: '8px', marginTop: '2px', flexShrink: 0 }}
                        />
                        <span style={{ fontSize: '14px' }}>Compete With Prismatica Labs (We Love Competition)</span>
                      </label>
                    </div>

                    {formData.motivation === 'compete-with-prismatica' && (
                      <div style={{
                        padding: '16px',
                        background: '#f8f8f8',
                        border: '2px solid #D43225',
                        borderRadius: '8px',
                        marginTop: '16px'
                      }}>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, color: '#222', fontWeight: 500 }}>
                          Challenge accepted. We'll give you everything we've got. May the best thinking win. Let's do this!
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Entity Details */}
                {currentStep === 4 && (
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      About your entity
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                      Size and structure
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                          Entity type *
                        </label>
                        <select
                          value={formData.entityType}
                          onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            backgroundColor: 'white',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        >
                          <option value="">Select type...</option>
                          <option value="startup">Startup</option>
                          <option value="scaleup">Scaleup</option>
                          <option value="sme">SME</option>
                          <option value="enterprise">Enterprise</option>
                          <option value="agency">Agency</option>
                          <option value="ngo">NGO / Non-profit</option>
                          <option value="public-sector">Public Sector</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                          Company size *
                        </label>
                        <select
                          value={formData.companySize}
                          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            backgroundColor: 'white',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        >
                          <option value="">Select size...</option>
                          <option value="1-10">1-10 people</option>
                          <option value="11-50">11-50 people</option>
                          <option value="51-200">51-200 people</option>
                          <option value="201-1000">201-1000 people</option>
                          <option value="1000+">1000+ people</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Contact Details */}
                {currentStep === 5 && (
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>
                      Your details
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                          Your name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Smith"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                          Company *
                        </label>
                        <input
                          type="text"
                          name="organization"
                          autoComplete="organization"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Acme Inc"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '8px',
                            fontSize: '15px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Challenge */}
                {currentStep === 6 && (
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                      What's the challenge?
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                      Help us understand what you're trying to solve
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                      <textarea
                        value={formData.challenge}
                        onChange={(e) => {
                          if (e.target.value.length <= 200) {
                            setFormData({ ...formData, challenge: e.target.value });
                          }
                        }}
                        placeholder="We need to diversify revenue but struggle to identify product opportunities that align with our core capabilities..."
                        rows={6}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '15px',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit',
                          resize: 'none',
                          transition: 'border-color 0.2s',
                          outline: 'none',
                          lineHeight: '1.6'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                      />
                      <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', textAlign: 'right' }}>
                        {formData.challenge.length}/200 characters
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 7: Confirmation */}
                {currentStep === 7 && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                    <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                      Request received
                    </p>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: 0 }}>
                      We'll check capacity and respond within 48 hours
                    </p>
                  </div>
                )}
              </div>

              {/* Fixed footer for buttons */}
              <div style={{
                borderTop: '1px solid #e0e0e0',
                paddingTop: '20px',
                flexShrink: 0
              }}>
                {currentStep === 1 && (
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.industry}
                    style={{
                      width: '100%',
                      padding: '8px 0',
                      background: 'none',
                      color: '#222',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      textAlign: 'right',
                      opacity: !formData.industry ? 0.5 : 1,
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (formData.industry) {
                        e.currentTarget.style.color = '#D43225';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#222';
                    }}
                  >
                    Continue →
                  </button>
                )}

                {currentStep === 2 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setCurrentStep(1)}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#222'}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      disabled={!formData.region || !formData.market}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        opacity: (!formData.region || !formData.market) ? 0.5 : 1,
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.region && formData.market) {
                          e.currentTarget.style.color = '#D43225';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#222';
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {currentStep === 3 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setCurrentStep(2)}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#222'}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(4)}
                      disabled={!formData.motivation}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        opacity: !formData.motivation ? 0.5 : 1,
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.motivation) {
                          e.currentTarget.style.color = '#D43225';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#222';
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {currentStep === 4 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setCurrentStep(3)}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#222'}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(5)}
                      disabled={!formData.entityType || !formData.companySize}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        opacity: (!formData.entityType || !formData.companySize) ? 0.5 : 1,
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.entityType && formData.companySize) {
                          e.currentTarget.style.color = '#D43225';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#222';
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {currentStep === 5 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setCurrentStep(4)}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#222'}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(6)}
                      disabled={!formData.name || !formData.email || !formData.company}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        opacity: (!formData.name || !formData.email || !formData.company) ? 0.5 : 1,
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.name && formData.email && formData.company) {
                          e.currentTarget.style.color = '#D43225';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#222';
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {currentStep === 6 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setCurrentStep(5)}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#222'}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.challenge.trim() || isSubmitting}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        opacity: (!formData.challenge.trim() || isSubmitting) ? 0.5 : 1,
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.challenge.trim() && !isSubmitting) {
                          e.currentTarget.style.color = '#D43225';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#222';
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Check capacity →'}
                    </button>
                  </div>
                )}

                {currentStep === 7 && (
                  <button
                    onClick={onClose}
                    style={{
                      width: '100%',
                      padding: '8px 0',
                      background: 'none',
                      color: '#222',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      textAlign: 'right',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#D43225'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#222'}
                  >
                    Close →
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
