import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const {
      industry,
      industryDetail,
      region,
      market,
      motivation,
      entityType,
      companySize,
      name,
      email,
      company,
      challenge,
    } = await request.json();

    // Build email content
    const emailSubject = `Products Enquiry: ${industry} - ${name}`;
    const emailBody = `
NEW PRODUCTS CAPACITY CHECK
===========================

WHAT THEY DO
------------
Industry: ${industry}
Details: ${industryDetail || '(not provided)'}

THEIR MARKET
------------
Region: ${region}
Specific Market: ${market}

WHY THEY NEED TOOLS
-------------------
Motivation: ${motivation}

ORGANISATION
------------
Entity Type: ${entityType}
Company Size: ${companySize}

CONTACT DETAILS
---------------
Name: ${name}
Email: ${email}
Company: ${company || '(not provided)'}

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

    // Using verified domain with alias forwarding to Gmail
    const fromEmail = 'hello@prismaticalab.com';
    const toEmail = 'hello@prismaticalab.com';

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
