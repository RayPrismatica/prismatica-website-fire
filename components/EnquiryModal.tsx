'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface EnquiryModalProps {
  serviceName: string;
  serviceDurationWeeks: number;
  basePrice: string;
  onClose: () => void;
}

type DeadlineOption = 'asap' | 'end-of-month' | 'within-3-months' | 'specific';

interface FormData {
  deadlineOption: DeadlineOption;
  specificDeadline: string;
  name: string;
  email: string;
  company: string;
  challenge: string;
  isNGO: boolean;
  isBCorp: boolean;
  isStartup: boolean;
}

export default function EnquiryModal({ serviceName, serviceDurationWeeks, basePrice, onClose }: EnquiryModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    deadlineOption: 'asap',
    specificDeadline: '',
    name: '',
    email: '',
    company: '',
    challenge: '',
    isNGO: false,
    isBCorp: false,
    isStartup: false,
  });
  const [calculatedStartDate, setCalculatedStartDate] = useState<Date | null>(null);
  const [isFeasible, setIsFeasible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    calculateStartDate();
  }, [formData.deadlineOption, formData.specificDeadline]);

  const calculateStartDate = () => {
    let targetDeadline: Date;
    const today = new Date();

    switch (formData.deadlineOption) {
      case 'asap':
        // ASAP means we calculate the earliest possible completion (duration + 2 weeks to get started)
        targetDeadline = new Date(today.getTime() + (serviceDurationWeeks + 2) * 7 * 24 * 60 * 60 * 1000);
        break;
      case 'end-of-month':
        targetDeadline = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'within-3-months':
        targetDeadline = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
        break;
      case 'specific':
        if (formData.specificDeadline) {
          targetDeadline = new Date(formData.specificDeadline);
        } else {
          return;
        }
        break;
      default:
        return;
    }

    // Calculate required start date (deadline - service duration - 2 weeks to get started)
    const requiredStartDate = new Date(targetDeadline.getTime() - (serviceDurationWeeks + 2) * 7 * 24 * 60 * 60 * 1000);
    setCalculatedStartDate(requiredStartDate);

    // Check if start date is in the past
    const daysUntilStart = Math.ceil((requiredStartDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    setIsFeasible(daysUntilStart >= 0);
  };

  const getDeadlineDate = (): Date => {
    const today = new Date();
    switch (formData.deadlineOption) {
      case 'asap':
        return new Date(today.getTime() + (serviceDurationWeeks + 2) * 7 * 24 * 60 * 60 * 1000);
      case 'end-of-month':
        return new Date(today.getFullYear(), today.getMonth() + 1, 0);
      case 'within-3-months':
        return new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
      case 'specific':
        return formData.specificDeadline ? new Date(formData.specificDeadline) : today;
      default:
        return today;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName,
          deadline: getDeadlineDate(),
          calculatedStartDate,
          isFeasible,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          challenge: formData.challenge,
          basePrice,
          isNGO: formData.isNGO,
          isBCorp: formData.isBCorp,
          isStartup: formData.isStartup,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit enquiry');
      }

      setCurrentStep(4); // Show confirmation
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getTimelineMessage = () => {
    if (!calculatedStartDate) return '';

    const today = new Date();
    const daysUntilStart = Math.ceil((calculatedStartDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    if (!isFeasible) {
      const earliestDeadline = new Date(today.getTime() + (serviceDurationWeeks + 2) * 7 * 24 * 60 * 60 * 1000);
      return `⚠️ That deadline isn't realistic for this service. Earliest possible: ${formatDate(earliestDeadline)}`;
    }

    if (daysUntilStart < 7) {
      return `⚠️ That's cutting it close - we'd need your brief by ${formatDate(calculatedStartDate)} to hit that deadline`;
    }

    return `✓ Perfect - that gives us comfortable runway. You could start as late as ${formatDate(calculatedStartDate)}`;
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
                  style={{ fontFamily: '"Noto Sans", sans-serif', fontSize: '17px', fontWeight: 700, marginTop: 0, marginBottom: '8px', textTransform: 'uppercase' }}
                >
                  {serviceName.replace(/-/g, ' ')}
                </Dialog.Title>
                {currentStep < 4 && (
                  <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', marginBottom: 0 }}>
                    Step {currentStep} of 3
                  </p>
                )}
              </div>

              <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, marginBottom: '20px' }}>

                {/* Step 1: Deadline */}
                {currentStep === 1 && (
                  <div>
                    <p style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>
                      When do you need results by?
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="deadline"
                          value="asap"
                          checked={formData.deadlineOption === 'asap'}
                          onChange={(e) => setFormData({ ...formData, deadlineOption: e.target.value as DeadlineOption })}
                          style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '17px' }}>ASAP (as soon as possible)</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="deadline"
                          value="end-of-month"
                          checked={formData.deadlineOption === 'end-of-month'}
                          onChange={(e) => setFormData({ ...formData, deadlineOption: e.target.value as DeadlineOption })}
                          style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '17px' }}>End of this month</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="deadline"
                          value="within-3-months"
                          checked={formData.deadlineOption === 'within-3-months'}
                          onChange={(e) => setFormData({ ...formData, deadlineOption: e.target.value as DeadlineOption })}
                          style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '17px' }}>Within 3 months</span>
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="deadline"
                          value="specific"
                          checked={formData.deadlineOption === 'specific'}
                          onChange={(e) => setFormData({ ...formData, deadlineOption: e.target.value as DeadlineOption })}
                          style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '17px' }}>Specific deadline:</span>
                      </label>
                    </div>

                    {/* Fixed date display area */}
                    {formData.deadlineOption === 'specific' ? (
                      <input
                        type="date"
                        value={formData.specificDeadline}
                        onChange={(e) => setFormData({ ...formData, specificDeadline: e.target.value })}
                        placeholder="Select a date"
                        style={{
                          padding: '12px 16px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '17px',
                          width: '100%',
                          marginBottom: '16px',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                      />
                    ) : (
                      <div style={{
                        padding: '8px 12px',
                        background: '#f5f5f5',
                        borderRadius: '4px',
                        fontSize: '13px',
                        color: '#666',
                        marginBottom: '16px',
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {formData.deadlineOption === 'asap' && (
                          <>Target deadline: <strong style={{ marginLeft: '4px' }}>{formatDate(new Date(new Date().getTime() + (serviceDurationWeeks + 2) * 7 * 24 * 60 * 60 * 1000))}</strong></>
                        )}
                        {formData.deadlineOption === 'end-of-month' && (
                          <>Target deadline: <strong style={{ marginLeft: '4px' }}>{formatDate(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0))}</strong></>
                        )}
                        {formData.deadlineOption === 'within-3-months' && (
                          <>Target deadline: <strong style={{ marginLeft: '4px' }}>{formatDate(new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000))}</strong></>
                        )}
                      </div>
                    )}

                    {calculatedStartDate && (
                      <div style={{
                        padding: '16px',
                        background: '#f8f8f8',
                        border: `2px solid ${isFeasible ? '#D43225' : '#999'}`,
                        borderRadius: '8px',
                        minHeight: '68px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <p style={{ fontSize: '17px', lineHeight: '1.6', margin: 0, color: '#222' }}>
                          {getTimelineMessage()}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Details */}
                {currentStep === 2 && (
                  <div>
                    <p style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>
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
                            fontSize: '17px',
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
                            fontSize: '17px',
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
                          Company (optional)
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
                            fontSize: '17px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#D43225'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                          Special terms (if applicable)
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '17px' }}>
                            <input
                              type="checkbox"
                              checked={formData.isNGO}
                              onChange={(e) => setFormData({ ...formData, isNGO: e.target.checked })}
                              style={{ marginRight: '8px' }}
                            />
                            <span>We're an NGO (50% off)</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '17px' }}>
                            <input
                              type="checkbox"
                              checked={formData.isBCorp}
                              onChange={(e) => setFormData({ ...formData, isBCorp: e.target.checked })}
                              style={{ marginRight: '8px' }}
                            />
                            <span>We're a B-Corp (20% off)</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '17px' }}>
                            <input
                              type="checkbox"
                              checked={formData.isStartup}
                              onChange={(e) => setFormData({ ...formData, isStartup: e.target.checked })}
                              style={{ marginRight: '8px' }}
                            />
                            <span>We're a startup (equity deals available)</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Challenge */}
                {currentStep === 3 && (
                  <div>
                    <p style={{ fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>
                      What's the challenge?
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
                      Don't overthink it - just tell us what's keeping you up at night
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                      <textarea
                        value={formData.challenge}
                        onChange={(e) => {
                          if (e.target.value.length <= 200) {
                            setFormData({ ...formData, challenge: e.target.value });
                          }
                        }}
                        placeholder="Our team sees AI potential everywhere but can't identify clear use cases that would actually generate ROI..."
                        rows={6}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '8px',
                          fontSize: '17px',
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
                      <p style={{ fontSize: '13px', color: '#666', marginTop: '4px', textAlign: 'right' }}>
                        {formData.challenge.length}/200 characters
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                    <p style={{ fontSize: '17px', fontWeight: 600, marginBottom: '12px' }}>
                      Got it
                    </p>
                    <p style={{ fontSize: '17px', color: '#666', marginBottom: 0 }}>
                      We'll respond within 24 hours
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
                    disabled={formData.deadlineOption === 'specific' && !formData.specificDeadline}
                    style={{
                      width: '100%',
                      padding: '8px 0',
                      background: 'none',
                      color: '#222',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      textAlign: 'right',
                      opacity: (formData.deadlineOption === 'specific' && !formData.specificDeadline) ? 0.5 : 1,
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (!(formData.deadlineOption === 'specific' && !formData.specificDeadline)) {
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
                        fontSize: '13px',
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
                      disabled={!formData.name || !formData.email}
                      style={{
                        padding: '8px 0',
                        background: 'none',
                        color: '#222',
                        border: 'none',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        opacity: (!formData.name || !formData.email) ? 0.5 : 1,
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        if (formData.name && formData.email) {
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
                        fontSize: '13px',
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
                        fontSize: '13px',
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
                      {isSubmitting ? 'Sending...' : 'Send enquiry →'}
                    </button>
                  </div>
                )}

                {currentStep === 4 && (
                  <button
                    onClick={onClose}
                    style={{
                      width: '100%',
                      padding: '8px 0',
                      background: 'none',
                      color: '#222',
                      border: 'none',
                      fontSize: '13px',
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
