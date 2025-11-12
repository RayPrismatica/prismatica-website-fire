# Email Setup for Enquiry Form

## Overview
The enquiry form on the consulting page is configured to send emails via **Resend** when customers submit enquiries. Currently, emails are disabled until you add your Resend API key.

## What Happens When Someone Submits an Enquiry

**Client's Experience:**
1. Fills out the 3-step enquiry form
2. Sees confirmation: "Got it - We'll respond within 24 hours"
3. Does NOT receive any automatic email

**Your Experience:**
1. Receive email notification at: `ray@prismaticalab.com`
2. Email comes from: `onboarding@resend.dev` (Resend's test address)
3. Email contains:
   - Client's name and email address
   - Company name (if provided)
   - Service they're enquiring about
   - Their challenge/message
   - Timeline and pricing details
   - Special terms (NGO/B-Corp/Startup discounts)
4. You can reply directly to the client's email from this notification

## Setup Instructions

### Step 1: Get Resend API Key
1. Go to https://resend.com/signup
2. Sign up for free account (no credit card required)
3. Free tier includes 100 emails/day - plenty for enquiries
4. Once logged in, go to https://resend.com/api-keys
5. Click "Create API Key"
6. Name it something like "Prismatica Enquiries"
7. Copy the API key (starts with `re_`)

### Step 2: Add API Key to Environment
1. Open the file: `.env.local` in your project root
2. Find the line: `RESEND_API_KEY=your_resend_api_key_here`
3. Replace `your_resend_api_key_here` with your actual API key
4. Save the file

### Step 3: Restart Development Server
If your dev server is running, restart it so it picks up the new environment variable:
```bash
# Stop the server (Ctrl+C)
# Then restart it
npm run dev
```

### Step 4: Test It
1. Go to your consulting page
2. Click an "Enquire" button
3. Fill out the form
4. Submit it
5. Check `ray@prismaticalab.com` for the notification email

## Current Configuration

**Email Settings** (in `.env.local`):
- `RESEND_API_KEY`: Your API key (needs to be added)
- `RESEND_FROM_EMAIL`: `onboarding@resend.dev` (Resend's test email - works fine)
- `RESEND_TO_EMAIL`: `ray@prismaticalab.com` (where enquiries are sent)

## Optional: Use Your Own Domain

If you want emails to come from `enquiries@prismaticalab.com` instead of `onboarding@resend.dev`:

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter `prismaticalab.com`
4. Follow their DNS verification instructions
5. Once verified, update `.env.local`:
   ```
   RESEND_FROM_EMAIL=enquiries@prismaticalab.com
   ```

**Note:** This is optional - the test email works perfectly fine for now.

## Troubleshooting

### Emails Not Being Sent?
Check the terminal/console logs when submitting the form:
- If you see: `⚠️ RESEND_API_KEY not set` - Add your API key
- If you see: `✓ Email sent successfully` - It worked!
- If you see an error - Check your API key is correct

### Still Not Working?
1. Make sure you restarted the dev server after adding the API key
2. Check your API key doesn't have extra spaces
3. Verify the API key is active in your Resend dashboard

## Code Location

The email functionality is implemented in:
- **API Route**: `app/api/enquiry/route.ts`
- **Modal Component**: `components/EnquiryModal.tsx`
- **Page**: `app/consulting/page.tsx`

## Email Template

The email sent to you includes:
```
NEW SERVICE ENQUIRY
===================

Service: [Service Name]
Base Price: [Price]

CLIENT DETAILS
--------------
Name: [Client Name]
Email: [Client Email]
Company: [Company Name or "(not provided)"]
Special Terms: [NGO/B-Corp/Startup discounts]

TIMELINE
--------
Needs results by: [Date]
Would need to start by: [Date]
Timeline feasible: [YES ✓ or NO ⚠️]

THEIR CHALLENGE
---------------
[Client's message]

---
Submitted at: [Date and Time]
Reply to: [Client Email]
```
