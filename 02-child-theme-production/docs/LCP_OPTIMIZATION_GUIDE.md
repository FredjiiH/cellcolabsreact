# LCP Optimization Guide

## Overview

**Last Updated**: October 20, 2025
**Status**: ⚠️ IMPLEMENTATION COMPLETE - TROUBLESHOOTING PRIORITY ISSUE

This guide documents the LCP (Largest Contentful Paint) optimization system implemented to improve mobile loading times and Core Web Vitals performance.

## What is LCP Optimization?

**LCP (Largest Contentful Paint)** is a Core Web Vitals metric that measures how long it takes for the largest content element (usually a hero image) to become visible to users.

### Performance Impact

- **Without LCP optimization**: Hero images load with `loading="lazy"` and low priority, delaying LCP metric
- **With LCP optimization**: Hero images preload in `<head>` with `loading="eager"` and high priority, improving LCP score

### SEO Specialist Requirements

Based on specifications from the SEO team:

1. **Preload critical images** in the `<head>` section
2. **Use original pre-optimized images** (no code transformation)
3. **Eager loading** with high fetch priority for LCP images
4. **Lazy loading** with low priority for all other images
5. **Block-level control** to mark any image as the LCP image

---

## Implementation: Section Builder Module

### Architecture Decision

**IMPORTANT**: LCP optimization is implemented at the **block level**, NOT section level.

- ✅ **Correct**: Add checkbox to image blocks within content_blocks
- ❌ **Wrong**: Add separate section-level LCP image fields (creates duplicate images)

### Code Implementation

The Section Builder module uses a three-part system:

#### 1. Field Definition (fields.json)

Added `is_lcp_image` checkbox to image block fields at **line 622-635**:

```json
{
  "id": "is_lcp_image",
  "name": "is_lcp_image",
  "label": "This is the LCP Image (optimize for fast loading)",
  "required": false,
  "locked": false,
  "type": "boolean",
  "default": false,
  "help_text": "Enable ONLY for the first above-the-fold hero image. This image will be preloaded with high priority for better performance.",
  "visibility": {
    "controlling_field": "block_type",
    "controlling_value_regex": "image"
  }
}
```

**Location**: Inside `content_blocks` group > `image` block fields

#### 2. Preload Logic (module.html)

Added preload loop at **lines 16-26** (before any rendering):

```hubl
{# LCP Optimization - Preload critical image block if marked as LCP #}
{% for block in blocks %}
  {% if block.block_type == 'image' and block.is_lcp_image %}
    {% if block.image_desktop and block.image_desktop.src %}
      {% require_head %}
      {# Preload desktop LCP image - use original optimized image #}
      <link rel="preload" as="image" href="{{ block.image_desktop.src }}" fetchpriority="high">
      {% end_require_head %}
    {% endif %}
  {% endif %}
{% endfor %}
```

**How it works**:
- Loops through all content blocks before rendering
- Finds any image block with `is_lcp_image=true`
- Adds preload link to `<head>` using `{% require_head %}`
- Uses original image source (no transformation)
- Includes `fetchpriority="high"` attribute

#### 3. Conditional Rendering (module.html)

Updated all **4 image block rendering locations** with conditional logic:

**Single Column** (lines 856-893):
```hubl
{% if block.image_desktop and block.image_desktop.src %}
  {% if block.is_lcp_image %}
    {# LCP optimized image - use original, eager loading with high priority #}
    <img src="{{ block.image_desktop.src }}"
         alt="{{ block.image_desktop.alt }}"
         class="section-builder__image section-builder__image-desktop"
         loading="eager"
         fetchpriority="high"
         decoding="async"
         data-critical="true" />
  {% else %}
    {# Regular image - lazy loading with low priority #}
    <img src="{{ block.image_desktop.src }}"
         alt="{{ block.image_desktop.alt }}"
         class="section-builder__image section-builder__image-desktop"
         loading="lazy"
         fetchpriority="low" />
  {% endif %}
{% endif %}
```

**Other Locations**:
- Left column (lines 1015-1052)
- Center column (lines 1172-1209)
- Right column (lines 1330-1372)

**Attributes for LCP Images**:
- `loading="eager"` - Load immediately, don't wait
- `fetchpriority="high"` - Maximum browser priority
- `decoding="async"` - Non-blocking decode
- `data-critical="true"` - Custom marker for debugging
- `src="{{ block.image_desktop.src }}"` - Original pre-optimized image (no transformation)

**Attributes for Regular Images**:
- `loading="lazy"` - Load when scrolled into view
- `fetchpriority="low"` - Lower browser priority
- `src="{{ block.image_desktop.src }}"` - Original image source

---

## How to Use: Section Builder Module

### Step-by-Step Usage

1. **Add Section Builder module** to your page
2. **Add an image content block** (single column or multi-column layout)
3. **Upload your pre-optimized hero image** (recommended: 1400px width, WebP format)
4. **Enable the LCP checkbox**: Check "This is the LCP Image (optimize for fast loading)"
5. **Publish the page**

### Important Rules

✅ **DO**:
- Enable LCP checkbox ONLY for the first above-the-fold hero image
- Use pre-optimized images (WebP format, already compressed before upload)
- Use 1400px width to match container max-width
- Test with browser DevTools Network tab

❌ **DON'T**:
- Enable LCP for multiple images (only one LCP image per page)
- Enable LCP for images below the fold
- Upload unoptimized images expecting code to optimize them
- Use different widths that will cause alignment issues

### Image Optimization Guidelines

**Before Upload**:
1. Resize to 1400px width (matches `--content-max-width`)
2. Convert to WebP format
3. Compress with quality ~85% using tools like Squoosh or ImageOptim
4. Test file size (aim for <200KB for hero images)

**Why Pre-Optimize?**
- Applying `resize_image_url()` in code causes blurriness on already-optimized images
- Direct use of original source maintains quality
- Faster processing (no server-side transformation)

---

## How to Implement: New Modules

### When to Add LCP Optimization

Add LCP optimization to any module that:
- Appears at the top of pages (above the fold)
- Contains large hero images
- Is commonly used as the first section on pages

### Implementation Steps

#### Step 1: Add LCP Checkbox to fields.json

Add to your module's image field group:

```json
{
  "id": "is_lcp_image",
  "name": "is_lcp_image",
  "label": "This is the LCP Image (optimize for fast loading)",
  "required": false,
  "locked": false,
  "type": "boolean",
  "default": false,
  "help_text": "Enable ONLY for the first above-the-fold hero image. This image will be preloaded with high priority for better performance."
}
```

**Placement**: Add next to your image field (e.g., `hero_image`, `banner_image`, etc.)

#### Step 2: Add Preload Logic to module.html

Add at the **very top** of your module.html (before any rendering):

```hubl
{# LCP Optimization - Preload critical image if marked as LCP #}
{% if module.is_lcp_image %}
  {% if module.hero_image and module.hero_image.src %}
    {% require_head %}
    {# Preload LCP image - use original optimized image #}
    <link rel="preload" as="image" href="{{ module.hero_image.src }}" fetchpriority="high">
    {% end_require_head %}
  {% endif %}
{% endif %}
```

**Adjust for your field names**:
- Replace `module.hero_image` with your actual image field name
- If you have desktop/mobile variants, preload desktop version

#### Step 3: Add Conditional Rendering

Update your image rendering with conditional logic:

```hubl
{% if module.hero_image and module.hero_image.src %}
  {% if module.is_lcp_image %}
    {# LCP optimized image - use original, eager loading with high priority #}
    <img src="{{ module.hero_image.src }}"
         alt="{{ module.hero_image.alt }}"
         class="hero-image"
         loading="eager"
         fetchpriority="high"
         decoding="async"
         data-critical="true" />
  {% else %}
    {# Regular image - lazy loading with low priority #}
    <img src="{{ module.hero_image.src }}"
         alt="{{ module.hero_image.alt }}"
         class="hero-image"
         loading="lazy"
         fetchpriority="low" />
  {% endif %}
{% endif %}
```

### Example: Hero Banner Module

**Scenario**: You're creating a new "Hero Banner" module that will be used at the top of pages.

**fields.json**:
```json
{
  "name": "hero_banner",
  "label": "Hero Banner",
  "fields": [
    {
      "id": "background_image",
      "name": "background_image",
      "label": "Background Image",
      "type": "image"
    },
    {
      "id": "is_lcp_image",
      "name": "is_lcp_image",
      "label": "This is the LCP Image (optimize for fast loading)",
      "type": "boolean",
      "default": false,
      "help_text": "Enable ONLY for the first above-the-fold hero image."
    }
  ]
}
```

**module.html**:
```hubl
{# LCP Preload #}
{% if module.is_lcp_image and module.background_image.src %}
  {% require_head %}
  <link rel="preload" as="image" href="{{ module.background_image.src }}" fetchpriority="high">
  {% end_require_head %}
{% endif %}

<section class="hero-banner">
  {% if module.background_image.src %}
    {% if module.is_lcp_image %}
      <img src="{{ module.background_image.src }}"
           alt="{{ module.background_image.alt }}"
           loading="eager"
           fetchpriority="high"
           data-critical="true" />
    {% else %}
      <img src="{{ module.background_image.src }}"
           alt="{{ module.background_image.alt }}"
           loading="lazy"
           fetchpriority="low" />
    {% endif %}
  {% endif %}
</section>
```

---

## Current Status: Troubleshooting

### Issue: Priority Still Showing "Low" in Network Tab

**Current Behavior**:
- LCP checkbox is enabled in HubSpot
- HTML shows correct attributes: `loading="eager"`, `fetchpriority="high"`, `data-critical="true"`
- Preload link exists in `<head>` with `fetchpriority="high"`
- Network tab shows "early-hints" (preload is working)
- **BUT**: Priority column shows "Low" instead of "High"

**Network Tab Output** (October 20, 2025):
```
Image%20AF%20radius_compressed.webp    early-hints    Other    0 B    2 ms    Low
```

**Expected**:
```
Image%20AF%20radius_compressed.webp    early-hints    Other    0 B    2 ms    High
```

### What We've Tried

1. ✅ **Added `fetchpriority="high"` to `<img>` tag** - Still Low
2. ✅ **Added `fetchpriority="high"` to preload link** - Still Low
3. ✅ **Verified preload exists in `<head>`** - Confirmed present
4. ✅ **Cleared cache and disabled cache** - No change
5. ✅ **Verified HTML attributes are correct** - All correct

### Current Code State

**Preload link** (module.html line 22):
```hubl
<link rel="preload" as="image" href="{{ block.image_desktop.src }}" fetchpriority="high">
```

**Image rendering** (module.html lines 856-893):
```hubl
<img src="{{ block.image_desktop.src }}"
     alt="{{ block.image_desktop.alt }}"
     class="section-builder__image section-builder__image-desktop"
     loading="eager"
     fetchpriority="high"
     decoding="async"
     data-critical="true" />
```

### Possible Causes

1. **Browser Override**: Chrome may ignore `fetchpriority` in certain contexts
2. **HubSpot CDN**: CDN may be interfering with priority hints
3. **Early Hints + fetchpriority**: Possible conflict between HTTP 103 early hints and fetchpriority attribute
4. **Cache Issues**: Despite clearing, some cache layer may persist
5. **URL Encoding**: The `%20` encoding in filename may affect priority calculation
6. **Multiple Images**: Other high-priority images (logo showing "High") may be deprioritizing others

### Next Steps for Troubleshooting

1. **Test in different browsers**: Try Firefox, Safari, Edge to see if Chrome-specific
2. **Test without preload**: Temporarily remove preload link, keep only `fetchpriority="high"` on img tag
3. **Test with simpler filename**: Upload image with no spaces/special characters
4. **Check Lighthouse**: Run Lighthouse audit to see if LCP score improved despite "Low" priority
5. **Compare with logo**: The Cellcolabs Clinical logo shows "High" priority - analyze differences
6. **Check request timing**: "2 ms" suggests image may be cached, which could affect priority display
7. **Test on production domain**: Preview URL may behave differently than production
8. **Add `importance="high"`**: Try deprecated attribute for broader browser support

### Verification Commands

**Check HTML output**:
```javascript
// Open browser console on the page
document.querySelector('.section-builder__image-desktop').outerHTML
```

**Check preload in head**:
```javascript
document.querySelector('link[rel="preload"][as="image"]').outerHTML
```

**Check computed priority**:
```javascript
// This may not work as priority is browser-internal
performance.getEntriesByType('resource').find(r => r.name.includes('Image%20AF'))
```

---

## Performance Testing

### How to Verify LCP Optimization

#### Method 1: Browser DevTools Network Tab

1. Open **DevTools** (F12)
2. Go to **Network** tab
3. Check **"Disable cache"** checkbox
4. Hard refresh (Ctrl+Shift+R)
5. Find your LCP image in the list
6. Check columns:
   - **Type**: Should show "early-hints" (confirms preload)
   - **Priority**: Should show "High" (currently showing "Low" - under investigation)
   - **Time**: Should load very early

#### Method 2: Google Lighthouse

1. Open **DevTools** (F12)
2. Go to **Lighthouse** tab
3. Select **Performance** only
4. Select **Mobile** device
5. Click **Generate report**
6. Check **LCP score** in results
7. Look for "Preload LCP image" suggestion (should be green/passing)

**Good LCP Score**:
- **0-2.5s**: Good (green)
- **2.5-4.0s**: Needs improvement (orange)
- **4.0s+**: Poor (red)

#### Method 3: PageSpeed Insights

1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your page URL
3. Click **Analyze**
4. Check **Mobile** performance
5. Review LCP metric and suggestions

### Expected Results After LCP Optimization

**Before Optimization**:
- LCP image loads with lazy loading
- LCP metric: 4.0s+ (poor)
- "Preload LCP image" suggestion in Lighthouse

**After Optimization**:
- LCP image preloads in `<head>`
- LCP image loads with eager + high priority
- LCP metric: <2.5s (good)
- "Preload LCP image" passes in Lighthouse

---

## Technical Details

### HubSpot Image Fields

When you upload an image to HubSpot, the image field object contains:

```javascript
{
  src: "https://144549987.hs-sites-eu1.com/hubfs/filename.webp",
  alt: "Alt text",
  width: 1400,
  height: 800
}
```

**Using in HubL**:
- `{{ module.image.src }}` - Full image URL
- `{{ module.image.alt }}` - Alt text
- `{{ module.image.width }}` - Original width
- `{{ module.image.height }}` - Original height

### Why We Don't Transform LCP Images

**Before (caused blurriness)**:
```hubl
{% set desktop_url = resize_image_url(block.image_desktop.src, 1400, quality=85) %}
<img src="{{ desktop_url }}" ... />
```

**After (uses original)**:
```hubl
<img src="{{ block.image_desktop.src }}" ... />
```

**Reason**: Images uploaded to HubSpot are already pre-optimized before upload. Applying `resize_image_url()` with WebP conversion causes double-optimization and quality loss.

### Browser Priority Levels

Browsers assign internal priority to resources:

- **Highest**: Preload with fetchpriority="high"
- **High**: Critical CSS, fonts, synchronous scripts
- **Medium**: Images in viewport, async scripts
- **Low**: Lazy-loaded images, offscreen resources
- **Lowest**: Prefetch resources

**Our LCP Images Should Be**: Highest (but currently showing Low - under investigation)

### fetchpriority Browser Support

| Browser | Support | Version |
|---------|---------|---------|
| Chrome  | ✅ Yes  | 101+    |
| Edge    | ✅ Yes  | 101+    |
| Safari  | ✅ Yes  | 17.2+   |
| Firefox | ⚠️ Partial | Behind flag |

**Fallback**: If browser doesn't support `fetchpriority`, the `loading="eager"` still prevents lazy loading.

---

## Best Practices

### ✅ DO

1. **Enable LCP checkbox for only ONE image per page** - The first hero/banner image
2. **Upload pre-optimized images** - 1400px width, WebP format, ~85% quality
3. **Test on mobile devices** - LCP is primarily a mobile metric
4. **Run Lighthouse audits** - Before and after optimization
5. **Use descriptive alt text** - Accessibility and SEO
6. **Match container width** - 1400px matches `--content-max-width`

### ❌ DON'T

1. **Don't enable LCP for multiple images** - Only one LCP element should exist
2. **Don't enable for below-fold images** - Wastes preload bandwidth
3. **Don't rely on code transformation** - Upload optimized images
4. **Don't use different widths** - Stick to 1400px for alignment
5. **Don't skip testing** - Always verify in Network tab and Lighthouse
6. **Don't ignore mobile** - Desktop performance is less critical for LCP

---

## Files Modified

### Section Builder Module

**File**: `growth-child/modules/section-builder.module/fields.json`
- **Lines 622-635**: Added `is_lcp_image` checkbox to image block fields
- **Lines 121-158**: Removed section-level LCP fields (wrong approach)

**File**: `growth-child/modules/section-builder.module/module.html`
- **Lines 16-26**: Added block-level preload loop
- **Lines 856-893**: Updated single column image rendering with conditional logic
- **Lines 1015-1052**: Updated left column image rendering
- **Lines 1172-1209**: Updated center column image rendering
- **Lines 1330-1372**: Updated right column image rendering
- **Lines 570-600**: Removed section-level LCP CSS (wrong approach)

### Upload Command

```bash
cd "C:\Users\FredrikHelander\cellcolabsreact\02-child-theme-production"
hs upload growth-child/modules/section-builder.module "growth child/modules/section-builder.module"
```

---

## Future Improvements

### Potential Enhancements

1. **Mobile-specific preload**: Add mobile image preload with media query
   ```html
   <link rel="preload" as="image" href="{{ mobile_src }}" media="(max-width: 767px)" fetchpriority="high">
   <link rel="preload" as="image" href="{{ desktop_src }}" media="(min-width: 768px)" fetchpriority="high">
   ```

2. **Automatic LCP detection**: JavaScript to detect largest element and auto-apply optimization

3. **AVIF format support**: Next-gen format with better compression than WebP

4. **Responsive preload with imagesrcset**: More granular control over preloaded sizes

5. **Performance monitoring**: Track LCP scores over time with analytics

### Known Limitations

1. **One LCP image per page**: Multiple images with `is_lcp_image=true` will preload all (inefficient)
2. **Manual checkbox**: Editors must remember to enable checkbox
3. **No validation**: Nothing prevents enabling LCP for wrong images
4. **Priority still Low**: Current browser priority issue under investigation

---

## Troubleshooting Common Issues

### Issue: Image is Blurry

**Cause**: Image was already optimized before upload, code transformation causes double-optimization.

**Solution**:
- Don't use `resize_image_url()` for LCP images
- Use original source: `{{ block.image.src }}`
- Optimize images before upload to HubSpot

### Issue: Checkbox Not Visible

**Cause**: Checkbox visibility is controlled by `block_type`.

**Solution**:
- Ensure you've selected "Image" as the block type first
- Checkbox only appears for image blocks
- Check fields.json `visibility.controlling_field` is correct

### Issue: Multiple Images Have High Priority

**Cause**: Multiple images have `is_lcp_image=true` checked.

**Solution**:
- Disable checkbox for all but the first hero image
- Only ONE image per page should be marked as LCP

### Issue: Preload Not Appearing in Head

**Cause**: `{% require_head %}` syntax issue or conditional not matching.

**Solution**:
- Verify `{% require_head %}` and `{% end_require_head %}` tags are correct
- Check that `block.is_lcp_image` is true
- Verify image field has a valid `src`
- Check browser page source for preload link

### Issue: Priority Shows "Low" (CURRENT ISSUE)

**Status**: Under investigation

**Temporary Workarounds**:
- Verify LCP score improved in Lighthouse (priority may not reflect actual behavior)
- Ensure preload link exists in `<head>` (check page source)
- Confirm "early-hints" appears in Network tab (preload is working)

**Next Steps**:
- Test in different browsers
- Compare with other high-priority resources (logos, etc.)
- Try removing preload, keeping only fetchpriority on img tag
- Test with simpler filename (no spaces)

---

## Questions & Answers

### Q: Can I enable LCP for multiple images?

**A**: No. Only enable for ONE image - the first above-the-fold hero/banner image. Multiple LCP images waste bandwidth and don't improve performance.

### Q: Should I enable LCP for background images in CSS?

**A**: No, this implementation only works for `<img>` tags. For CSS background images, you would need to add the preload link manually with the background image URL.

### Q: What if my hero image is below the fold on mobile?

**A**: Don't enable LCP optimization. LCP is measured for visible content only. Use lazy loading for below-fold images.

### Q: Does this work for video?

**A**: No, this guide covers image optimization only. Video LCP optimization requires different techniques (poster images, preload video, etc.).

### Q: Why is the priority still "Low" in Network tab?

**A**: Currently under investigation. Despite correct implementation, Chrome is showing "Low" priority. However, the "early-hints" indicator confirms preload is working. Testing in Lighthouse should show improved LCP score.

### Q: Should I use 1200px or 1400px for image width?

**A**: Use 1400px to match the container `--content-max-width`. This ensures proper alignment with other sections. The CSS and responsive padding will handle the actual display width.

### Q: Can I use this with the old `resize_image_url()` approach?

**A**: No. Using `resize_image_url()` on already-optimized images causes blurriness. Upload pre-optimized images and use the original source directly.

---

## References

- [Web.dev - Optimize Largest Contentful Paint](https://web.dev/optimize-lcp/)
- [MDN - fetchpriority](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority)
- [MDN - Preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- [Chrome - Priority Hints](https://www.chromium.org/developers/design-documents/network-stack/priority-and-preconnect/)
- [HubSpot - Image Fields](https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields#image)

---

**Document Status**: ✅ Complete - Ready for troubleshooting continuation
**Priority Issue**: ⚠️ Network tab showing "Low" priority despite correct implementation
**Next Session**: Continue troubleshooting priority display and test across browsers
