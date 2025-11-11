# Dynamic Pricing & Yield Management System

## Core Concept

Implement airline-style yield management for consulting services. Optimize resource utilization and minimize consultant downtime by adjusting pricing based on real-time demand and availability.

**The Principle:** Empty calendar slots are lost revenue that can never be recovered. Price should reflect demand to incentivize customers to book low-demand periods while capturing premium for urgent work.

---

## Business Logic

### Capacity Tracking
- Track each consultant's capacity (e.g., 3 simultaneous projects maximum)
- Map which consultants deliver which services
- Track project durations and timeline commitments
- Update availability in real-time as bookings confirmed

### Pricing Algorithm
```
Final Price = Base Price × Demand Multiplier

Demand Multiplier determined by:
- % of consultant capacity booked for that period
- Time proximity (closer = higher demand = premium)
- Historical booking patterns
- Seasonal trends (if any)

Example multipliers:
- 100% capacity booked: 1.5x (50% premium)
- 75-99% booked: 1.3x (30% premium)
- 50-74% booked: 1.0x (standard price)
- 25-49% booked: 0.8x (20% discount)
- 0-24% booked: 0.7x (30% discount)
```

### Resource Optimization
- Know who's available when
- When new project booked, system updates:
  - Consultant availability
  - Pricing for affected periods
  - Availability windows for all services that consultant delivers

---

## Customer Experience

### UI Flow Option A: Proactive Best Price Display (RECOMMENDED)

**1. Service Page - Inline Best Price CTA**
Each service shows immediately below pricing:
```
From £5,000

Best price for this service is for the week of 10 March slot (i)
```

- Info icon (i) is clickable
- Draws attention to savings opportunity
- Proactive value proposition
- Creates curiosity about pricing model

**2. Click Info Icon → Modal Opens**
Modal shows:
- **Explainer section at top:** "Our pricing reflects real-time consultant availability. Book ahead and save, or book urgently at a premium."
- **12-month calendar view** showing all available slots with prices
- **"Sweet spot" highlighted:** Current best-priced slot with green badge
- **Current price vs base price comparison** for each slot
- Visual indicators:
  - Green badge: Best prices (25-30% off)
  - Yellow: Standard prices
  - Orange: Premium (15-30% markup)
  - Grey: Unavailable

**3. Price Display Examples**
```
February
Week 3 (starts 17 Feb): £8,000 ⚠️ High demand
Week 4 (starts 24 Feb): £7,000 Standard

March
Week 1 (starts 3 Mar): £5,600 ✓ Best price - 30% off
Week 2 (starts 10 Mar): £5,600 ✓ Best price - 30% off
Week 3 (starts 17 Mar): £6,400 ✓ 20% off
Week 4 (starts 24 Mar): £7,000 Standard

April
Week 1 (starts 1 Apr): £6,400 ✓ 20% off
...showing up to 12 months ahead
```

**4. Customer Selection**
- Click on preferred week
- Modal updates: "Start week of [DATE] for £[PRICE]"
- CTA: "Book this slot" or "Talk to us about this date"
- Links to brief/contact form with date and price pre-selected

**Why This Works:**
- Leads with value (you can save money!)
- Creates urgency (these slots won't stay cheap)
- Transparent (info icon explains the system)
- Customer feels smart (found the deal)
- Filters price-sensitive vs urgency-driven customers

---

### UI Flow Option B: Button-Triggered Calendar

**1. Service Page**
Each service has a button: "Check availability & pricing"

**2. Calendar Modal Opens**
Shows:
- Next 12-16 weeks in grid format
- Week numbers (Week 1, Week 2, Week 3, etc.)
- Price for each week slot
- Visual indicators:
  - Green: Good availability, discounted
  - Yellow: Standard availability, base price
  - Orange: Limited availability, premium
  - Red: No availability / fully booked

**3. Price Display Examples**
```
Week 1 (starts 17 Feb): £8,000 ⚠️ High demand
Week 2 (starts 24 Feb): £7,000 Standard
Week 3 (starts 3 Mar): £5,600 ✓ 30% off
Week 4 (starts 10 Mar): £5,600 ✓ 30% off
Week 5 (starts 17 Mar): £6,400 ✓ 20% off
```

**4. Customer Selection**
- Click on preferred week
- Modal shows: "Start week of [DATE] for £[PRICE]"
- CTA: "Book this slot" or "Contact us about this date"
- Links to brief/contact form with date pre-selected

**Note:** Option A is more proactive and likely to drive engagement. Option B is more passive.

### Psychological Framing
NOT "discount" (feels desperate)
BUT "transparent market dynamics" (feels fair)

**Messaging:**
- "Our pricing reflects real-time availability"
- "Flexible on timing? Save up to 30%"
- "Book ahead and optimize your budget"
- "Need it urgently? Premium slots available"

---

## Technical Implementation

### Backend Requirements

**Database Schema:**
```
consultants:
- id
- name
- max_simultaneous_projects
- services[] (which services they can deliver)

projects:
- id
- consultant_id
- service_id
- start_date
- end_date
- duration_weeks
- status (confirmed, tentative, completed)

services:
- id
- name
- base_price
- min_duration_weeks
- max_duration_weeks
- required_consultant_skills[]

pricing_calendar:
- service_id
- week_start_date
- available_capacity (calculated)
- demand_multiplier (calculated)
- current_price (base_price × multiplier)
- last_updated (timestamp)
```

**API Endpoints:**
```
GET /api/availability/{service_id}
Returns: Array of next 16 weeks with prices and availability

POST /api/book-slot
Body: { service_id, preferred_week_start, customer_info }
Returns: Confirmation or waitlist

GET /api/consultant-capacity
Returns: Real-time capacity view (admin only)
```

**Calculation Engine:**
- Runs every hour (or on booking event)
- Recalculates demand multipliers for all services
- Updates pricing_calendar table
- Triggers price update on frontend cache

### Frontend Requirements

**Calendar Modal Component:**
- Responsive grid (4 weeks per row on desktop, 2 on tablet, 1 on mobile)
- Color-coded availability indicators
- Price comparison (show savings vs base price)
- Smooth animations for modal open/close
- Loading states while fetching data

**Integration Points:**
- Button next to each service pricing
- Modal shares design system with Carmen chat
- Pre-fills contact form with selected date/service
- Can be embedded on service pages or standalone

**State Management:**
- Cache pricing data (refresh every 10 mins)
- Optimistic UI updates
- Handle timezone conversions properly
- Track which slots user views (analytics)

---

## Benefits

### For Business
- Optimize consultant utilization (minimize downtime)
- Capture premium for urgent work
- Fill low-demand periods with discounts
- Revenue smoothing across calendar
- Data-driven resource planning

### For Customers
- Transparency (understand the pricing)
- Choice (pay premium for urgency OR save with flexibility)
- Clear availability visibility
- Better planning (can see weeks ahead)
- Fair market dynamics (not arbitrary pricing)

---

## Implementation Phases

**Phase 1: Backend Foundation**
- Build database schema
- Implement capacity tracking
- Create pricing calculation engine
- Build API endpoints

**Phase 2: Admin Interface**
- Dashboard to view consultant capacity
- Manual override controls for pricing
- Project timeline visualization
- Booking management

**Phase 3: Customer-Facing UI**
- Build calendar modal component
- Integrate with service pages
- Connect to booking/contact flow
- Add analytics tracking

**Phase 4: Optimization**
- A/B test messaging and UI variations
- Refine demand multiplier algorithm
- Add predictive capacity planning
- Automate notifications for high-demand periods

---

## Open Questions

1. **Minimum booking window:** Should we set minimum advance notice (e.g., can't book slot starting in less than 3 days)?

2. **Price lock period:** Once customer sees price, how long is it valid? (24 hours? Until slot fills?)

3. **Waitlist handling:** What happens when customer wants fully-booked slot?

4. **Cancellation policy:** How do cancellations affect pricing for that slot?

5. **Multi-service bookings:** Discount for booking multiple services at once?

6. **Seasonal patterns:** Do we expect seasonal demand? (e.g., Q4 always busy, August always slow?)

7. **Competitor monitoring:** Should pricing also reflect market rates (not just our capacity)?

---

## Future Enhancements

- Predictive ML model for demand forecasting
- Integration with consultant personal calendars (Google/Outlook)
- Customer portal showing their booked slots
- Referral discounts (book a friend into low-demand slot, both save)
- Annual contracts with guaranteed pricing
- Enterprise customer reserved capacity blocks

---

## Notes

This system transforms consulting from "call us for a quote" to "self-service transparency" - customers can see availability and make informed decisions about timing vs budget tradeoffs.

Key success metric: **Consultant utilization rate** (% of available time booked) should increase while maintaining or improving margins.
