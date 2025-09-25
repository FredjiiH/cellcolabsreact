# Custom HubSpot Theme (Reference Only)

⚠️ **DEPRECATED - This approach has been replaced by the Child Theme system.**

This directory contains the original custom HubSpot theme implementation. It is kept for reference purposes only.

## 🔶 Status: Reference Only

**Current Active System**: [03-child-theme-production](../03-child-theme-production/)

**Why Deprecated**:
- Child themes are more maintainable and inherit marketplace theme updates
- Custom themes require more maintenance overhead
- Child theme approach provides better upgrade path

## 📁 Contents

### **hubspot-theme/**
Complete custom HubSpot theme built from scratch including:
- Custom CSS architecture
- Module system
- Template structure
- Theme configuration

### **growth-theme/**
Growth theme reference files and modifications.

## 📚 Reference Documentation

The following documentation is preserved for reference:

- **[CUSTOM_THEME_APPROACH.md](./docs/CUSTOM_THEME_APPROACH.md)** - Original architecture approach
- **[HUBSPOT_INTEGRATION.md](./docs/HUBSPOT_INTEGRATION.md)** - Integration patterns
- **[CSS_ARCHITECTURE.md](./docs/CSS_ARCHITECTURE.md)** - CSS organization strategy
- **[NAVIGATION_SYSTEM.md](./docs/NAVIGATION_SYSTEM.md)** - Navigation implementation

## 🔄 Migration to Child Theme

The lessons learned from this custom theme implementation were applied to the child theme approach:

### **What Was Kept**:
- Multi-brand architecture patterns
- CSS variable system for theming
- Component integration strategies
- HubSpot module field configurations

### **What Was Improved**:
- Simpler maintenance with child theme inheritance
- Better upgrade path with marketplace theme updates
- Reduced custom code overhead
- More reliable CSS override strategies

## 🚫 Do Not Use for New Development

**For new development, use**:
- **Component Development**: [01-component-development](../01-component-development/)
- **Production Theme**: [03-child-theme-production](../03-child-theme-production/)

## 🧠 Learning Reference

This implementation can be useful for understanding:
- How to build custom HubSpot themes from scratch
- Custom CSS architecture patterns
- Module development strategies
- Multi-brand theme implementation approaches

---

**Status**: 🔶 Deprecated - Reference Only
**Replacement**: Child Theme Production System
**Last Updated**: September 25, 2025