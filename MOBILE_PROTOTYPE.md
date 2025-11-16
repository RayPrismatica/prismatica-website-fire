# Mobile Ive Prototype

## How to Test

1. **Access the site on your phone**: http://localhost:3000 (or use the network URL)
2. **Look for the floating toggle button** in the bottom-right corner:
   - 👁️ = Prototype disabled (standard site)
   - ✨ = Prototype enabled (new features active)
3. **Tap the button** to toggle between modes
4. **Scroll through pages** to see the differences

## What's Different (Phase 1)

### When Prototype is ENABLED (✨):

#### Typography Improvements
- Headers are fluid-sized (adapts better to screen width)
- Body text has increased line-height (1.75 vs 1.6) for easier reading
- ALL CAPS headings have tighter letter-spacing
- Red underlines are thinner (2px instead of 4px)

#### Animations
- **Bento boxes scale in** as you scroll (subtle 0.95 → 1.0)
- **Red accent bars draw on** from top to bottom
- **Dynamic content** has a subtle pulsing red dot indicator
- All animations use smooth easing curves

#### Feel
- Site feels more "crafted" and less static
- Scrolling reveals content deliberately
- Visual feedback that content is "alive"

## Current Branch

You're on `mobile-ive-prototype` branch.

- ✅ **Main branch is untouched** - all production code safe
- ✅ **Toggle works** - can switch features on/off instantly
- ✅ **Persists** - Choice saved to localStorage

## Phase 2: Bottom-Sheet Athena ✅

**Now live when prototype enabled!**

- ✅ **Contextual prompts** - Different question on each page
- ✅ **Swipe gestures** - Pull up to expand, swipe down to collapse
- ✅ **Peek mode** - Always visible at bottom with relevant prompt
- ✅ **Full expand** - Swipe up for complete interface
- ✅ **Connects to Athena** - Tapping opens main chat

**Try it:**
1. Enable prototype (✨)
2. Look at bottom of screen - see the prompt peek
3. Swipe up to expand full sheet
4. Different prompts on different pages (/, /products, /who-we-are, etc.)

## Next Steps (Not Yet Built)

- [ ] Horizontal swipe navigation (left/right between context layers)
- [ ] Visual site map
- [ ] Brief mode toggle
- [ ] Long-press for context
- [ ] View transitions between pages

## How It Works Technically

1. **Feature flag context** (`MobilePrototypeContext`) wraps the app
2. **Toggle button** adds/removes `mobile-prototype` class on `<body>`
3. **CSS in globals.css** only applies when that class is present
4. **IntersectionObserver** watches for bento boxes entering viewport
5. **Zero impact** when disabled - standard site works exactly as before

## Merging Strategy

When ready to ship:
1. Test thoroughly on real devices
2. Get user feedback
3. Merge to main
4. Either:
   - Remove toggle (make features permanent)
   - Keep toggle as A/B test
   - Gate behind user preference

## Notes

- Prototype only shows toggle on mobile viewports (< 768px)
- Toggle button z-index is 9999 (floats above everything)
- All animations use `cubic-bezier(0.4, 0, 0.2, 1)` for that "Ive feel"
- Total additional CSS: ~100 lines (all scoped to `.mobile-prototype`)
