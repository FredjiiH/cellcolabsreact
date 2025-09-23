# Navigation Testing Guide

## Quick Local Testing ✅ READY NOW

### **Option 1: Local Test Page (Immediate)**
1. **Open test page**: http://localhost:8082/test-navigation.html
2. **Test responsive breakpoints**:
   - Desktop (1024px+): Horizontal menu visible
   - Tablet (768-1023px): Hamburger menu with divider
   - Mobile (<768px): Hamburger menu with divider
3. **Test mobile menu functionality**:
   - Click hamburger icon to open/close
   - Press Escape to close
   - Click outside menu to close
4. **Test interactions**:
   - Hover effects on menu items
   - Active state styling
   - Logo styling matches Figma

### **Expected Results**:
- ✅ Logo: "Cellcolabs Clinical" with correct font weights
- ✅ Desktop: 6 menu items (Science, Knowledge hub, Treatments, About, Partners, Contact)
- ✅ Mobile: 3x3 dot hamburger icon
- ✅ Responsive: Layout changes at correct breakpoints
- ✅ Divider: Shows on tablet/mobile only

## HubSpot Integration Testing

### **Option 2: HubSpot Design Manager**

#### **Step 1: Upload Theme to HubSpot**
```bash
# Using HubSpot CLI
npm install -g @hubspot/cli
hs init  # Configure HubSpot connection
hs upload hubspot-theme hubspot-theme
```

#### **Step 2: Test in Design Manager**
1. **Navigate to**: Marketing > Files and Templates > Design Tools
2. **Upload navigation module**:
   - Upload `hubspot-theme/modules/navigation/` folder
   - Verify module appears in module library
3. **Create test page**:
   - Create new page using base template
   - Add navigation module to header area
4. **Configure theme settings**:
   - Go to Design Manager > Theme Settings
   - Test navigation settings panel

#### **Step 3: Menu Builder Integration**
1. **Create menus**: Content > Menus
2. **Add menu items**:
   - Science → /science
   - Knowledge hub → /knowledge-hub
   - Treatments → /treatments
   - About → /about
   - Partners → /partners
   - Contact → /contact
3. **Assign to theme**: Theme Settings > Navigation Settings

### **Option 3: Local HubSpot Development**

#### **HubSpot Local Development Server**
```bash
# Install HubSpot CLI and start local development
hs create website-theme cellcolabs-theme
cd cellcolabs-theme
hs upload . .
hs watch . . --mode=publish
```

## Testing Checklist

### **✅ Visual Design Compliance**
- [ ] Logo matches Figma: "Cellcolabs Clinical" styling
- [ ] Desktop padding: 152px horizontal, 16px vertical
- [ ] Menu items: 14px Inter Medium, correct spacing
- [ ] Mobile hamburger: 3x3 dot grid pattern
- [ ] Divider line on tablet/mobile only

### **✅ Responsive Behavior**
- [ ] Desktop (1024px+): Horizontal menu visible, hamburger hidden
- [ ] Tablet (768-1023px): Hamburger visible, menu hidden, divider shown
- [ ] Mobile (<768px): Hamburger visible, menu hidden, divider shown
- [ ] Smooth transitions between breakpoints

### **✅ Mobile Menu Functionality**
- [ ] Hamburger toggle opens/closes menu
- [ ] Menu slides down smoothly
- [ ] Body scroll disabled when menu open
- [ ] Escape key closes menu
- [ ] Click outside closes menu
- [ ] Icon changes to X when open

### **✅ HubSpot Integration**
- [ ] Menu Builder integration works
- [ ] Theme settings appear in Design Manager
- [ ] Logo settings (text/image) functional
- [ ] Brand switching works
- [ ] No-code menu editing possible

### **✅ Accessibility**
- [ ] Keyboard navigation works
- [ ] ARIA labels present and correct
- [ ] Screen reader compatibility
- [ ] Focus management in mobile menu
- [ ] Color contrast meets standards

### **✅ Performance**
- [ ] CSS loads efficiently
- [ ] JavaScript minimal and fast
- [ ] No console errors
- [ ] Mobile interactions smooth
- [ ] Font loading optimized

## Browser Testing Matrix

### **Desktop Browsers**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### **Mobile Browsers**
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Samsung Internet
- [ ] Firefox Mobile

## Common Issues & Solutions

### **Issue: Menu items not showing**
- **Solution**: Check menu assignment in theme settings
- **Check**: Content > Menus has items configured

### **Issue: Styles not applying**
- **Solution**: Verify CSS variables are loaded
- **Check**: Brand detection script in base template

### **Issue: Mobile menu not working**
- **Solution**: Check JavaScript is loading
- **Check**: Console for errors

### **Issue: Responsive breakpoints wrong**
- **Solution**: Verify CSS media queries
- **Check**: Container padding values

### **Issue: Fonts not loading**
- **Solution**: Check Google Fonts URLs in theme settings
- **Check**: Network tab for font loading

## Performance Testing

### **Lighthouse Scores Target**
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

### **Core Web Vitals**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

## Next Steps After Testing

1. **If local test passes**: Proceed to HubSpot upload
2. **If issues found**: Debug using browser dev tools
3. **If HubSpot test passes**: Create production menus
4. **Document any customizations**: Update theme documentation

## Support Resources

- **HubSpot CLI Docs**: https://developers.hubspot.com/docs/cms/developer-reference/local-development
- **Theme Development**: https://developers.hubspot.com/docs/cms/building-blocks/themes
- **Menu Builder**: https://knowledge.hubspot.com/website-pages/how-to-manage-your-navigation-menu