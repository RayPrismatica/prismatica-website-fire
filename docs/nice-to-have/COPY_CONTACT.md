# CONTACT PAGE
**URL:** `/contact`
**Status:** Unchanged from current implementation
**Objective:** Filter serious inquiries, set expectations, drive email contact
**Source:** `app/contact/page.tsx`

---

## PAGE HEADER

```
CONTACT
```

---

## SECTION 1: THE FILTER

```
Most contact pages try to convince you to reach out.

This one filters.

If you're here, you've already decided. You read the site. You get what we do. You're not shopping. You're solving.
```

---

## SECTION 2: WHAT YOU'RE ACTUALLY SIGNING UP FOR

**Heading:** WHAT YOU'RE ACTUALLY SIGNING UP FOR

```
We're about clarity, not comfort. We tend to challenge assumptions more than validate them. If you want validation, this won't work.

First conversation is diagnostic. You'll know within 30 minutes if we're asking good questions.

We optimize for honesty over politeness. Outcomes over output.
```

---

## SECTION 3: WHY THERE'S NO CALENDAR HERE

**Heading:** WHY THERE'S NO CALENDAR HERE

```
Others optimize for volume. We optimize for fit.

When you email first, you clarify the problem. We read it. If we can help, we show up already thinking through solutions. If not, we tell you before wasting your time.

Calendars are convenient. Email is intentional. We'll take intentional every time.
```

---

## EMAIL CTA

**Email Template:**
```
To: hello@prismaticalab.com
Subject: Let's talk

Body:
Hi Prismatica,

I've read your site. Here's what I'm solving:

[Describe your specific problem]

What I've already tried:

[What hasn't worked]

What I need:

[What you're looking for]

Best,
[Your name]
```

**[Button: Email Us]**

---

## SECTION 4: THE SYNAPSED STORY

**Heading:** ONE MORE THING

```
[COMPONENT: UserContentReminder - references dynamic content user saw on previous pages]

Fallback text:
"Remember how the landing page showed today's news story, and the What We Do page wondered what question immediately came to mind?"

---

Same story, different angles. But if you come back tomorrow it'll be another event.

It's a sweet little piece of code. A GitHub Action runs on schedule. Reads the same papers and magazines we read every day. Sends them to Claude with prompts that encode how we think. Claude then picks the most significant story, writes contextual takes, commits the update to our repo. Vercel detects the change. Site rebuilds. New content live. Simple. Fun.

No database. No CMS. No manual work. Just code that thinks.
```

### Red Accent Statement
```
We called it Synapsed.
```

```
Want this on your site? Take it. Full code on GitHub. There you have it. That's a tiny example of what we mean by "Thinking As A Service".

[Link: GitHub Repository - https://github.com/RayPrismatica/synapsed-with-love]
```

---

## FINAL SIGN-OFF

```
Speak soon.
```

---

## NOTES

### Dynamic Content:
- `contentReminder` field (fallback provided)
- UserContentReminder component references content user saw during session

### Email Button:
- Opens mailto: link with pre-filled template
- Reduces friction while maintaining intentionality
- Template guides proper inquiry structure

### Synapsed Box:
- White card background
- Explains dynamic content system
- GitHub link to open-source code
- Demonstrates "thinking as code" principle

### Strategic Purpose:
1. **Filter** - Only serious inquiries proceed
2. **Set Expectations** - Clear about approach (challenge > validate)
3. **Explain Process** - Email first, then conversation
4. **Demonstrate Value** - Synapsed example shows capability
5. **Drive Action** - Single clear CTA (email)

### No Changes from Current:
- Content unchanged
- Structure unchanged
- Only update: internal link references if capabilities/about URLs change
- Dynamic content continues to function as designed

### User Journey Touchpoint:
This is the end of the funnel. User has:
1. Seen homepage (proof of intelligence)
2. Explored capabilities (services/products)
3. Read about (team/methodology/thinking)
4. Arrived at contact (ready to engage)

Contact page reinforces:
- We're selective (5% we work with)
- We're direct (clarity > comfort)
- We're capable (Synapsed demo)
- We're accessible (simple email, no forms)
