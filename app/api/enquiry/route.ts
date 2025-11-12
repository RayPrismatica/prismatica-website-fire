import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const {
      serviceName,
      deadline,
      calculatedStartDate,
      isFeasible,
      name,
      email,
      company,
      challenge,
      basePrice,
      isNGO,
      isBCorp,
      isStartup,
    } = await request.json();

    // Format dates for email
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Build special terms section
    const specialTerms = [];
    if (isNGO) specialTerms.push('NGO (50% discount)');
    if (isBCorp) specialTerms.push('B-Corp (20% discount)');
    if (isStartup) specialTerms.push('Startup (equity deals available)');
    const specialTermsText = specialTerms.length > 0 ? specialTerms.join(', ') : 'None';

    // Build email content
    const emailSubject = `New Enquiry: ${serviceName} - ${name}`;
    const emailBody = `
NEW SERVICE ENQUIRY
===================

Service: ${serviceName}
Base Price: ${basePrice}

CLIENT DETAILS
--------------
Name: ${name}
Email: ${email}
Company: ${company || '(not provided)'}
Special Terms: ${specialTermsText}

TIMELINE
--------
Needs results by: ${formatDate(deadline)}
Would need to start by: ${formatDate(calculatedStartDate)}
Timeline feasible: ${isFeasible ? 'YES ✓' : 'NO ⚠️ (too tight)'}

THEIR CHALLENGE
---------------
${challenge}

---
Submitted at: ${new Date().toLocaleString('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short'
})}

Reply to: ${email}
    `.trim();

    // Log to console for debugging
    console.log('\n' + '='.repeat(60));
    console.log(emailSubject);
    console.log('='.repeat(60));
    console.log(emailBody);
    console.log('='.repeat(60) + '\n');

    // Send email via Resend
    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️  RESEND_API_KEY not set - email not sent');
      return NextResponse.json({
        success: true,
        message: 'Enquiry received (email disabled - no API key)'
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.RESEND_TO_EMAIL || 'hello@prismaticalabs.com';

    console.log('DEBUG: Sending email FROM:', fromEmail, 'TO:', toEmail);

    const data = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: emailSubject,
      text: emailBody,
    });

    console.log('✓ Email sent successfully:', data);

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully'
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
