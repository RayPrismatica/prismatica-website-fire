# Handedness Detection & Adaptive UI

## Overview
Detect user handedness through scroll and touch behavior patterns, then dynamically mirror UI elements to optimize thumb reach and ergonomics on mobile devices.

## The Concept
Instead of forcing all users into the same UI layout, detect whether they're left or right-handed (or switching between hands) and flip UI elements like close buttons, floating actions, and interactive elements to their dominant side.

## Technical Approach

### Detection Signals

**Primary Indicators:**
1. **Touch origin zones**: Track where users initiate touches across the screen
   - Divide screen into left (0-30%), center (30-70%), right (70-100%)
   - Weight edge touches (outer 20%) more heavily (2x multiplier)
   - Right-handed users typically touch right side 60-80% of the time

2. **Scroll patterns**:
   - Vertical scroll with slight horizontal drift toward palm side
   - Touch start position during scroll gestures
   - Dominant hand scrolls tend to be faster and more fluid

3. **Tap patterns**:
   - Button tap locations reveal hand position
   - Repeated taps on same side indicate handedness
   - Natural thumb arc follows different patterns per hand

4. **Gesture characteristics**:
   - Swipe direction and curvature
   - Speed and pressure variations (if available)
   - Multi-touch patterns (two-handed use detection)

**Secondary Signals:**
- Time-based patterns (hand switching during fatigue)
- Device orientation changes
- Interaction frequency by screen zone

### Implementation Structure

```typescript
interface HandednessState {
  // Touch tracking
  leftTouches: number;
  rightTouches: number;
  centerTouches: number;

  // Confidence metrics
  confidence: number; // 0-1 scale
  sampleSize: number; // Number of interactions analyzed

  // Detection result
  detectedHand: 'left' | 'right' | 'ambiguous';
  lastUpdated: number; // Timestamp

  // Session data
  sessionStart: number;
  handSwitchCount: number;
}

interface TouchZone {
  x: number; // Touch X position
  y: number; // Touch Y position
  timestamp: number;
  type: 'tap' | 'scroll' | 'swipe';
  zone: 'left' | 'center' | 'right';
}
```

### Detection Algorithm

**Phase 1: Data Collection (First 10-15 interactions)**
- Track touch events without acting on them
- Build confidence score based on consistency
- Require minimum sample size before making determination

**Confidence Calculation:**
```typescript
function calculateConfidence(state: HandednessState): number {
  const total = state.leftTouches + state.rightTouches + state.centerTouches;
  const dominant = Math.max(state.leftTouches, state.rightTouches);

  // Require at least 10 touches for initial confidence
  if (total < 10) return 0;

  // Confidence = dominance ratio * sample size factor
  const dominanceRatio = dominant / total;
  const sampleFactor = Math.min(total / 20, 1); // Cap at 20 samples

  return dominanceRatio * sampleFactor;
}
```

**Threshold for UI Flip:**
- Confidence > 0.75 for automatic adaptation
- Re-evaluate every 20 touches to detect hand switching
- Hysteresis: Require 0.80 to switch back (prevent flickering)

### UI Elements to Adapt

**Primary candidates:**
- Close buttons (drawer, modals, chat)
- Floating action buttons
- Swipe-to-dismiss direction
- Pull-to-refresh origin side
- Navigation drawer slide direction

**Advanced adaptations:**
- Avatar/profile image position
- Menu icon placement
- Form submit button position
- Notification badges

**Animation strategy:**
- Spring animation (0.4s duration, gentle ease)
- Don't flip during active interaction
- Brief tooltip on first flip: "Optimized for left-handed use"

## Implementation Phases

### Phase 1: Silent Detection & Logging
**Goal:** Validate signal quality without affecting UX

- Implement detection logic
- Log patterns to analytics
- No UI changes
- Measure confidence distribution across users
- Identify false positive rates

**Success criteria:**
- 80%+ users show clear handedness signal (confidence > 0.75)
- Low variance in hand switching (< 10% of sessions)
- Consistent patterns across device types

### Phase 2: Manual Preference Setting
**Goal:** Let users choose, validate UX impact

- Add settings option: "Optimize UI for [Left/Right] hand"
- Implement UI flipping for all target elements
- Track engagement metrics (does it help?)
- Gather user feedback

**Settings UI:**
```
Hand Preference
○ Right-handed (default)
○ Left-handed
○ Auto-detect
```

### Phase 3: Auto-Detect with Notification
**Goal:** Automatic adaptation with transparency

- Enable auto-detection by default
- Show one-time notification: "We noticed you're left-handed. UI adjusted for easier reach."
- Include "Undo" action in notification
- Easy override in settings
- LocalStorage persistence per device

**Notification format:**
- Non-intrusive banner (bottom of screen)
- Auto-dismiss after 5 seconds
- Tap to open settings
- Never show again after user interaction

### Phase 4: Silent Auto-Adaptation
**Goal:** Seamless personalization at scale

- Remove notification for confident detections
- Silent flip on high confidence (> 0.85)
- Subtle visual cue on first flip (element pulses once)
- Background re-evaluation for hand switching
- A/B test readiness for engagement metrics

## User Experience Considerations

### Transparency
- Clear setting to override auto-detection
- Brief explanation of why UI changed
- Easy revert mechanism
- Privacy-conscious messaging

### Potential Issues

**User confusion:**
- "Why did my UI just flip?"
- Solution: Clear first-time messaging, settings accessibility

**False positives:**
- Detecting hand switching vs. noise
- Solution: Higher confidence threshold, hysteresis

**Creepiness factor:**
- Users uncomfortable with "smart" behavior
- Solution: Opt-in after Phase 2 validation, clear privacy messaging

**Performance:**
- Touch event tracking overhead
- Solution: Throttle calculations, analyze on idle

### Accessibility Benefits

**Huge win for:**
- Users with limited mobility in one hand
- Temporary injuries (broken arm, etc.)
- Arthritis or repetitive strain injuries
- Users holding phone in non-dominant hand (coffee, baby, etc.)

**Accessibility statement:**
This feature can significantly improve usability for users with motor disabilities or temporary limitations, making it both a UX enhancement and an accessibility feature.

## Technical Implementation Notes

### Storage Strategy
```typescript
// LocalStorage key
const HANDEDNESS_KEY = 'prismatica_handedness_state';

// Persist on detection
localStorage.setItem(HANDEDNESS_KEY, JSON.stringify({
  hand: 'left',
  confidence: 0.85,
  lastUpdated: Date.now(),
  userOverride: false // Did user manually set preference?
}));
```

### Context Provider
```typescript
interface HandednessContextValue {
  detectedHand: 'left' | 'right' | 'ambiguous';
  confidence: number;
  isFlipped: boolean; // Are UI elements currently flipped?
  setManualPreference: (hand: 'left' | 'right' | 'auto') => void;
}

// Usage in components
const { isFlipped } = useHandedness();

<button style={{
  position: 'fixed',
  [isFlipped ? 'left' : 'right']: '20px'
}}>
  Close
</button>
```

### Analytics Events
- `handedness_detected`: { hand, confidence, sampleSize }
- `handedness_ui_flipped`: { hand, auto }
- `handedness_user_override`: { from, to }
- `handedness_switched`: { previousHand, newHand, sessionDuration }

## Success Metrics

**Phase 1 (Detection validation):**
- Confidence distribution
- Detection speed (how many touches needed?)
- False positive rate

**Phase 2 (Manual preference):**
- Adoption rate of manual setting
- Engagement lift for users who set preference
- User feedback sentiment

**Phase 3+ (Auto-adaptation):**
- Auto-detection accuracy vs. manual overrides
- Engagement metrics (time on site, interactions per session)
- Reduction in mis-taps or UI friction
- User satisfaction (NPS impact)

## Open Questions

1. **Minimum sample size**: How many touches before we're confident?
2. **Re-evaluation frequency**: How often to check for hand switching?
3. **Device differences**: Do tablets need different thresholds?
4. **Two-handed detection**: Should we detect and disable flipping for two-handed use?
5. **Privacy messaging**: How explicit should we be about tracking touch patterns?

## Why This is "Nice to Have"

**Pros:**
- Novel, delightful UX personalization
- Genuine accessibility benefit
- Differentiator from competitors
- Data-driven optimization opportunity

**Cons:**
- Complex implementation
- Risk of user confusion
- Need extensive testing
- Could feel "too smart" or invasive

**Priority:** Low
Ship core features first. Validate with manual preference setting. Graduate to auto-detection only if data shows clear user benefit and minimal confusion.

## Related Ideas

1. **Dark mode timing**: Auto-switch based on time of day + manual override
2. **Font size adaptation**: Detect reading patterns (zooming, squinting indicators)
3. **Reading speed**: Adjust content density based on scroll speed
4. **Attention tracking**: Highlight important content based on dwell time

## References

- iOS handedness API (Haptic feedback patterns vary by hand)
- Android touch exploration APIs
- Research papers on touch behavior patterns
- Accessibility guidelines for motor disabilities
