# Final Testing Instructions - Dual Brand System

**Date**: September 25, 2025
**Status**: ✅ Ready for Testing

## 🎯 What's Been Implemented

### **✅ Fully Code-Based Solution**
- Inter font imported directly in CSS
- Typography overrides Growth theme with `!important`
- All spacing, colors, and fonts controlled by code
- Brand-specific variables for both Cellcolabs brands

### **✅ Brand Switcher for Editors**
- Appears in top-right corner of preview mode
- Switches between Clinical (Blue) and Cellcolabs (Green)
- Hidden on live sites, only visible in editor
- Real-time brand switching

### **✅ HubSpot Integration**
- Spacing system maps to UI controls (Small/Medium/Large)
- Works with all drag-and-drop modules
- Custom modules get full design system
- Domain detection for automatic brand switching

## 🧪 Testing Protocol

### **Step 1: Basic Typography Test**
1. Create a new page with Growth Child theme
2. Add Rich Text module
3. Add this content:
```html
<h1>Heading 1 - Should be Inter Bold (700)</h1>
<h2>Heading 2 - Should be Inter Bold (700)</h2>
<h3>Heading 3 - Should be Inter Semibold (650)</h3>
<p>Body text - Should be Inter Regular (450)</p>
<a href="#">Link text - Should be brand color</a>
```

**✅ Expected Results:**
- All text uses Inter font (not Times New Roman or Montserrat)
- Font weights: H1/H2=700, H3=650, Body=450
- Colors: Clinical blue (#4F65BE) or Cellcolabs green (#00A651)

### **Step 2: Brand Switcher Test**
1. Look for brand switcher in top-right corner
2. Switch from "Clinical (Blue)" to "Cellcolabs (Green)"
3. Observe color changes:

**Clinical Colors:**
- Primary: Blue `#4F65BE`
- Accent: Yellow `#F9D400`
- Links: Blue `#4F65BE`

**Cellcolabs Colors:**
- Primary: Green `#00A651`
- Accent: Yellow `#F9D400`
- Links: Green `#00A651`

### **Step 3: Spacing System Test**
1. Add 3 Rich Text modules
2. Set section padding:
   - Module 1: Small
   - Module 2: Medium
   - Module 3: Large
3. Check DevTools for consistent spacing:
   - Small: `32px` (2rem)
   - Medium: `48px` (3rem)
   - Large: `64px` (4rem)

### **Step 4: Custom Module Integration**
1. Add your existing "Content Section" custom module
2. Place between two drag-and-drop modules
3. Set all to "Medium" spacing
4. Verify alignment and consistency

### **Step 5: Container Width Test**
1. View page on desktop (>1440px width)
2. Check content is centered
3. Max-width should be 1440px
4. Should have 152px margins on wide screens

## 🎨 Brand Color Reference

### **Cellcolabs Clinical (Default)**
```css
--color-primary: #4F65BE;     /* Blue */
--color-accent: #F9D400;      /* Yellow */
--color-text-link: #4F65BE;   /* Blue links */
--color-bg-section: #F5F5F5;  /* Light gray */
```

### **Cellcolabs (Green Theme)**
```css
--color-primary: #00A651;     /* Green */
--color-accent: #F9D400;      /* Yellow */
--color-text-link: #00A651;   /* Green links */
--color-bg-section: #F0F8F0;  /* Light green */
```

## 🐛 Troubleshooting

### **If Fonts Don't Apply:**
```css
/* Check in DevTools - should see */
body { font-family: Inter, sans-serif !important; }
h1 { font-family: Inter, sans-serif !important; }
```

### **If Colors Don't Switch:**
- Check brand switcher is working (console.log message)
- Verify `data-brand` attribute updates on elements
- Check CSS specificity

### **If Spacing Doesn't Work:**
- Verify CSS classes: `.dnd-section[data-section-padding="medium"]`
- Check for competing CSS overrides

## ✅ Success Checklist

**Typography:**
- [ ] All text uses Inter font
- [ ] Font weights: 450/650/700 (not 400/600/700)
- [ ] Responsive sizing works (mobile/desktop)

**Brand System:**
- [ ] Brand switcher appears in editor
- [ ] Colors change when switching brands
- [ ] Links use brand colors

**Spacing:**
- [ ] Small/Medium/Large give consistent spacing
- [ ] Custom modules align with drag-and-drop
- [ ] Container width is 1440px

**Integration:**
- [ ] HubSpot UI controls work
- [ ] Preview matches published page
- [ ] Brand switcher hidden on live site

## 🚀 Go Live Checklist

**Before Production:**
1. [ ] Test both brand themes thoroughly
2. [ ] Verify domain detection works
3. [ ] Remove/hide brand switcher if needed
4. [ ] Test on mobile and desktop
5. [ ] Check form styling matches brands

**Domain Setup (When Ready):**
1. Point `cellcolabs.com` to HubSpot
2. Point `cellcolabsclinical.com` to HubSpot
3. Test automatic brand switching
4. Verify header logos change correctly

---

**The system is ready for testing! Start with Step 1 and let me know what you discover.**