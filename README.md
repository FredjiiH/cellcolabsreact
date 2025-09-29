# Cellcolabs Multi-Brand HubSpot Architecture

A comprehensive system for managing dual-brand websites (Cellcolabs & Cellcolabs Clinical) using HubSpot CMS with React-based component development.

## 🏗️ Project Structure

This project is organized into three main parts:

### **[01-component-development/](./01-component-development/)**
**React-based component development and static fragment generation**
- Local development environment with Vite + React + TypeScript
- Multi-brand theming system with JSON theme tokens
- Static fragment generation for HubSpot integration
- Component library with responsive design (Navigation, HeroBlock, Footer)
- **Status**: 🟢 Active for component development

### **[02-custom-theme-reference/](./02-custom-theme-reference/)**
**Original custom HubSpot theme approach (REFERENCE ONLY)**
- Complete custom HubSpot theme from scratch
- Custom CSS architecture and module system
- **Status**: 🔶 Deprecated - Keeping for reference only

### **[03-child-theme-production/](./03-child-theme-production/)**
**Production child theme extending Growth theme (ACTIVE)**
- Child theme extending `@hubspot/growth` marketplace theme
- Dual-brand system with automatic domain detection
- Complete navigation system with mobile menu
- **Status**: 🟢 Active - Current production approach

## 🎯 Current Active System

We're currently using **Part 3: Child Theme Production** for the live websites:

- **Production Theme**: `growth child` (extends Growth theme)
- **Domains**: `cellcolabsclinical.com` (blue) & `cellcolabs.com` (green)
- **Features**: Automatic brand switching, responsive navigation, dual-brand color system

## 🚀 Quick Start

### For Component Development:
```bash
cd 01-component-development/
npm install
npm run dev
# Open http://localhost:5173
```

### For Child Theme Deployment:
```bash
cd 03-child-theme-production/
hs upload growth-child --dest="growth child"
```

## 📚 Documentation

Each part contains its own detailed documentation:

- **[01-component-development/README.md](./01-component-development/README.md)** - React component development
- **[02-custom-theme-reference/README.md](./02-custom-theme-reference/README.md)** - Custom theme reference
- **[03-child-theme-production/README.md](./03-child-theme-production/README.md)** - Production child theme

### **Current Evaluation**
- **[03-child-theme-production/docs/THEME_MODULE_EVALUATION.md](./03-child-theme-production/docs/THEME_MODULE_EVALUATION.md)** - Theme vs Custom module decision framework

## 🎨 Brand System

**Cellcolabs Clinical** (Production)
- Primary Color: `#4F65BE` (Blue)
- Domain: `cellcolabsclinical.com`
- Typography: Inter font family

**Cellcolabs** (Green Theme)
- Primary Color: `#00A651` (Green)
- Domain: `cellcolabs.com`
- Typography: Inter font family

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS Modules, CSS Variables
- **CMS**: HubSpot with child theme approach
- **Build Tools**: HubSpot CLI, custom fragment generators
- **Deployment**: HubSpot Design Manager

## 📋 Current Status (September 2025)

✅ **Completed**
- Dual-brand child theme system
- Desktop navigation with HubSpot Menu Builder
- Brand switching with CSS variables
- Mobile menu functionality
- Component development environment

✅ **Production Ready**
- Child theme deployed to HubSpot
- Brand detection working
- Navigation system complete
- Button/link color switching functional

## 🤝 Team Workflow

### **Current Approach: Theme Modules (Under Evaluation)**
1. **Component Development** → Part 1: Build and test components in React
2. **Theme Module Creation** → Generate HubSpot theme modules via CLI
3. **Production Deployment** → Part 3: Deploy child theme with modules
4. **Content Management** → Marketing team edits content in HubSpot

### **Alternative Approach: Custom Modules (Previous)**
1. **Component Development** → Part 1: Build and test components in React
2. **Manual Integration** → Copy component code to HubSpot custom modules
3. **Production Deployment** → Part 3: Deploy child theme updates
4. **Content Management** → Marketing team edits content in HubSpot

> **Note**: We are currently exploring theme modules for better field integration but keeping both workflows documented until we make a final decision.

## 📞 Need Help?

Each directory contains detailed README files and documentation specific to that part of the system. Start with the README in the directory you're working with.

---

**Last Updated**: September 25, 2025
**Active System**: Child Theme Production (Part 3)
**Status**: ✅ Production Ready