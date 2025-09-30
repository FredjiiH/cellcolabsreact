# Dual Brand System Test Plan

**Date**: September 25, 2025
**Status**: Ready for Testing

## 🎯 Test Objectives

1. **Spacing System**: Verify HubSpot UI controls map to our spacing variables
2. **Typography**: Confirm font weights and sizes apply correctly
3. **Brand Colors**: Test Cellcolabs Clinical colors from JSON
4. **Custom Module**: Ensure your "content section" module uses system
5. **Integration**: Verify custom + drag-and-drop work together

## 🧪 Test Setup Instructions

### **Step 1: Create Test Page**
1. Go to HubSpot → Website → Website Pages
2. Create new page: "Brand System Test"
3. Select "Growth Child" theme
4. Use page template with drag-and-drop areas

### **Step 2: HubSpot Theme Settings**
First verify these settings:
1. Go to Design Tools → Themes → Growth Child → Settings
2. **Font Family**: Set to Inter (both heading and body)
3. **Maximum Content Width**: Custom → 1400px
4. Publish settings

## 📋 Test Cases

### **Test Case 1: Drag-and-Drop Spacing**

**Setup:**
1. Add 3 "Rich Text" modules to page
2. Set different section padding:
   - Module 1: Small padding
   - Module 2: Medium padding
   - Module 3: Large padding

**Expected Results:**
```css
/* Should see in browser DevTools */
Module 1: padding: 2rem 0;    /* 32px - --space-32 */
Module 2: padding: 3rem 0;    /* 48px - --space-48 */
Module 3: padding: 4rem 0;    /* 64px - --space-64 */
```

**How to Verify:**
- Right-click modules → Inspect
- Check computed styles show our spacing variables
- Visually verify consistent spacing

---

### **Test Case 2: Typography System**

**Setup:**
1. Add Rich Text module
2. Add this HTML content:
```html
<h1>Heading 1 Test</h1>
<h2>Heading 2 Test</h2>
<h3>Heading 3 Test</h3>
<p>Body text paragraph with <a href="#">link example</a></p>
<p class="text-large">Large body text</p>
<p class="text-small">Small body text</p>
```

**Expected Results:**
- **Font Family**: All text uses Inter (set in UI)
- **Font Weights**:
  - H1/H2: 700 (bold)
  - H3: 650 (semibold)
  - Body: 450 (regular)
- **Responsive Sizing**:
  - Mobile: H1=36px, H2=32px, Body=16px
  - Desktop: H1=56px, H2=48px, Body=16px

**How to Verify:**
- Check DevTools computed styles
- Test on mobile/desktop breakpoints
- Verify font weights match JSON (450/500/650/700)

---

### **Test Case 3: Brand Colors**

**Setup:**
1. Add Rich Text module
2. Add this HTML with CSS classes:
```html
<div style="background: var(--color-primary); color: var(--color-text-inverse); padding: 1rem;">
  Primary Color Background (#4F65BE)
</div>
<div style="background: var(--color-accent); color: var(--color-text-primary); padding: 1rem;">
  Accent Color Background (#F9D400)
</div>
<p style="color: var(--color-text-secondary);">
  Secondary text color (#525252)
</p>
```

**Expected Colors:**
- Primary: `#4F65BE` (blue, not black!)
- Accent: `#F9D400` (yellow)
- Text Secondary: `#525252` (not #666666)

---

### **Test Case 4: Custom Module Integration**

**Setup:**
1. Add your existing "Content Section" module
2. Place it between two drag-and-drop modules
3. Set all three to "Medium" spacing

**Expected Results:**
- All three modules should have identical padding (48px)
- Custom module should inherit brand colors automatically
- No visual spacing gaps between modules

**How to Check:**
```javascript
// Run in browser console
document.querySelectorAll('.dnd-section, .dnd-module').forEach(el => {
  const padding = getComputedStyle(el).paddingTop;
  console.log(`${el.className}: ${padding}`);
});
```

---

### **Test Case 5: Container Width**

**Setup:**
1. Add any full-width section
2. Check in desktop view (>1440px)

**Expected Results:**
- Max-width: 1440px
- Padding: 152px on each side
- Centered on screen

## 🔧 Temporary Brand Switching Test

Since domain switching isn't ready, let's add a temporary test:

**Add to any page template:**
```html
<!-- Temporary brand switcher for testing -->
<div style="position: fixed; top: 10px; right: 10px; z-index: 9999; background: white; padding: 10px; border: 1px solid #ccc;">
  <button onclick="document.body.setAttribute('data-brand', 'cellcolabsclinical')">Clinical</button>
  <button onclick="document.body.setAttribute('data-brand', 'cellcolabs')">Cellcolabs</button>
</div>
```

**Expected Results:**
- Clinical button: Blue primary color (#4F65BE)
- Cellcolabs button: Green primary color (#00A651)

## ✅ Success Criteria

**Pass if all these work:**
- ✅ HubSpot spacing controls use our spacing values
- ✅ Typography uses correct font weights (450/500/650/700)
- ✅ Brand colors match JSON exactly
- ✅ Custom module spacing aligns with drag-and-drop
- ✅ 1440px container with 152px margins
- ✅ Font family set in UI (Inter) applies everywhere

## 🐛 Common Issues to Check

1. **Spacing not applied**: Check CSS specificity, may need `!important`
2. **Font weights wrong**: Verify UI settings saved properly
3. **Colors not updating**: Check browser cache, hard refresh
4. **Custom module different**: Verify it uses same CSS classes

## 📊 Test Results Template

```
Test Case 1 - Spacing: ✅ Pass / ❌ Fail
Test Case 2 - Typography: ✅ Pass / ❌ Fail
Test Case 3 - Colors: ✅ Pass / ❌ Fail
Test Case 4 - Custom Module: ✅ Pass / ❌ Fail
Test Case 5 - Container: ✅ Pass / ❌ Fail

Issues Found:
- [List any issues]

Next Steps:
- [What to fix]
```

---

**Ready to test! Let me know which test case you'd like to start with.**