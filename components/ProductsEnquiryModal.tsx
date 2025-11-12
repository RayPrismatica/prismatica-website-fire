'use client';

import { useState } from 'react';

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
    <div
      className="modal active"
      style={{
        display: 'flex',
        position: 'fixed',
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: '#fafafa',
          padding: '48px',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          height: '750px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideUp 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="modal-close"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            fontSize: '32px',
            fontWeight: 300,
            color: '#666',
            cursor: 'pointer',
            lineHeight: 1,
            transition: 'color 0.2s'
          }}
          onClick={onClose}
        >&times;</span>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontFamily: '"Passion One", sans-serif', fontSize: '32px', marginTop: 0, marginBottom: '8px' }}>
            Check Capacity
          </h3>
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
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">SELECT YOUR INDUSTRY</option>
                    <option value="legal">Legal</option>
                    <option value="finance">Finance</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="consulting">Consulting</option>
                    <option value="marketing">Marketing & Advertising</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="education">Education</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail & E-commerce</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="entertainment">Entertainment & Media</option>
                    <option value="sports">Sports & Athletics</option>
                    <option value="gaming">Gaming & Esports</option>
                    <option value="creative">Creative & Design</option>
                    <option value="food-beverage">Food & Beverage</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="nonprofit">Non-profit & NGO</option>
                    <option value="government">Government & Public Sector</option>
                    <option value="agriculture">Agriculture & Farming</option>
                    <option value="construction">Construction & Engineering</option>
                    <option value="logistics">Transportation & Logistics</option>
                    <option value="energy">Energy & Utilities</option>
                    <option value="aerospace">Aerospace & Defense</option>
                    <option value="arts">Arts & Culture</option>
                    <option value="music">Music & Audio</option>
                    <option value="publishing">Publishing & Journalism</option>
                    <option value="automotive">Automotive</option>
                    <option value="telecommunications">Telecommunications</option>
                    <option value="insurance">Insurance</option>
                    <option value="pharmaceuticals">Pharmaceuticals & Biotech</option>
                    <option value="weird-none">It's Weird, None Of These</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                    What specifically do you do?
                  </label>
                  <textarea
                    value={formData.industryDetail}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        setFormData({ ...formData, industryDetail: e.target.value });
                      }
                    }}
                    placeholder="E.g. We're a boutique law firm specializing in IP litigation for tech startups..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', textAlign: 'right' }}>
                    {formData.industryDetail.length}/200 characters
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Region and Market */}
          {currentStep === 2 && (
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                Your market
              </p>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                Where you operate
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                    Primary region *
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value, market: '' })}
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
                    <option value="">SELECT YOUR REGION</option>
                    <option value="uk">United Kingdom</option>
                    <option value="europe">Europe (Excl. UK)</option>
                    <option value="north-america">North America</option>
                    <option value="asia-pacific">Asia Pacific</option>
                    <option value="middle-east">Middle East</option>
                    <option value="africa">Africa</option>
                    <option value="latin-america">Latin America</option>
                    <option value="global">Global</option>
                  </select>
                </div>

                {formData.region && availableMarkets.length > 0 && (
                  <div style={{
                    animation: 'slideIn 0.3s ease',
                  }}>
                    <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                      Specific market *
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
                      <option value="">SELECT YOUR MARKET</option>
                      {availableMarkets.map(market => (
                        <option key={market} value={market}>{market}</option>
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
                Why do you need tools?
              </p>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                What's driving this
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px', display: 'block' }}>
                  Primary motivation *
                </label>
                <select
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
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
                  <option value="">SELECT YOUR MOTIVATION</option>
                  <option value="stuck-decision">Stuck On A Big Decision</option>
                  <option value="building-new">Building Something New</option>
                  <option value="level-up">Level Up Strategic Thinking</option>
                  <option value="no-consultants">Can't Afford Consultants Anymore</option>
                  <option value="outmaneuvered">Competitor Just Out-Thought Us</option>
                  <option value="scaling">Scaling Faster Than We Can Think</option>
                  <option value="reactive">Too Many Reactive Decisions</option>
                  <option value="unfair-advantage">Want An Unfair Advantage</option>
                  <option value="compete-with-prismatica">Compete With Prismatica Labs (We Love Competition)</option>
                </select>
                {formData.motivation === 'compete-with-prismatica' && (
                  <p style={{
                    fontSize: '13px',
                    color: '#D43225',
                    marginTop: '12px',
                    fontWeight: 600,
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    Challenge accepted. We'll give you everything we've got. May the best thinking win. Let's do this!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Entity Type and Size */}
          {currentStep === 4 && (
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>
                Organisation details
              </p>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                Type and scale
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
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">SELECT ENTITY TYPE</option>
                    <option value="startup">Startup</option>
                    <option value="scaleup">Scaleup</option>
                    <option value="established">Established Company</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="ngo">NGO / Non-profit</option>
                    <option value="b-corp">B-Corp / Social Enterprise</option>
                    <option value="freelance">Freelance / Solo</option>
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
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">SELECT COMPANY SIZE</option>
                    <option value="solo">Solo / Freelancer</option>
                    <option value="2-10">2-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="51-200">51-200 Employees</option>
                    <option value="201-1000">201-1,000 Employees</option>
                    <option value="1000+">1,000+ Employees</option>
                  </select>
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '6px', fontStyle: 'italic' }}>
                    Enterprise deals available for some industries/markets
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Personal Details */}
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
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
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
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
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
                      padding: '10px 12px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
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
                What problem are you trying to solve?
              </p>

              <div style={{ marginBottom: '20px' }}>
                <textarea
                  value={formData.challenge}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      setFormData({ ...formData, challenge: e.target.value });
                    }
                  }}
                  placeholder="We need better strategic thinking tools that don't require consultants for every decision..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', textAlign: 'right' }}>
                  {formData.challenge.length}/300 characters
                </p>
              </div>
            </div>
          )}

          {/* Step 7: Confirmation */}
          {currentStep === 7 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
                Checking capacity
              </p>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: 0, lineHeight: '1.6' }}>
                We'll review your industry, market, and current saturation. Within 24 hours you'll receive: capacity status, pricing breakdown for your use case, and immediate next steps if there's a fit.
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
                padding: '12px',
                background: '#222',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: !formData.industry ? 0.5 : 1
              }}
            >
              Continue →
            </button>
          )}

          {currentStep === 2 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCurrentStep(1)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!formData.region || !formData.market}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: (!formData.region || !formData.market) ? 0.5 : 1
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCurrentStep(2)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                disabled={!formData.motivation}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: !formData.motivation ? 0.5 : 1
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCurrentStep(3)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                disabled={!formData.entityType || !formData.companySize}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: (!formData.entityType || !formData.companySize) ? 0.5 : 1
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCurrentStep(4)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(6)}
                disabled={!formData.name || !formData.email || !formData.company}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: (!formData.name || !formData.email || !formData.company) ? 0.5 : 1
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {currentStep === 6 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCurrentStep(5)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#fff',
                  color: '#222',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.challenge.trim() || isSubmitting}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#222',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  opacity: (!formData.challenge.trim() || isSubmitting) ? 0.5 : 1
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
                padding: '12px',
                background: '#222',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
