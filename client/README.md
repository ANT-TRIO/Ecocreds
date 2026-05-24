# EcoCreds — AI-Powered Sustainable Shopping Platform

EcoCreds is a sustainability-first e-commerce platform designed to help consumers make environmentally conscious shopping decisions through real-time carbon footprint visibility, AI-powered eco recommendations, and reward-based engagement.

The platform combines artificial intelligence, verified emissions datasets, and sustainability-focused incentives to make environmental impact visible at the point of purchase.

---

## Overview

Online shopping platforms today allow users to compare products using:

- Price
- Ratings
- Reviews
- Delivery time

However, one major factor is usually missing:

**Environmental Impact**

Consumers often want to choose sustainable products but lack clear information about the carbon footprint behind what they buy.

EcoCreds solves this by introducing **product-level carbon intelligence directly into the shopping experience**.

---

## Problem Statement

Retail supply chains contribute significantly to global carbon emissions, especially Scope 3 emissions.

Current e-commerce platforms rarely provide transparency around:

- Product carbon footprint
- Material sustainability
- Packaging emissions
- Greener alternatives

Because of this, consumers unknowingly make unsustainable purchase decisions.

EcoCreds addresses this gap by helping users discover, compare, and choose lower-impact alternatives while shopping online.

---

## Key Features

### EcoScore — Sustainability Score

Every product is assigned an **EcoScore from 0 to 100** based on estimated carbon footprint.

Products are categorized into:

- Excellent
- Good
- Fair
- Poor

This helps users instantly understand how sustainable a product is before purchasing.

---

### AI-Powered Product Analysis

EcoCreds uses **Google Gemini NLP** to analyze product descriptions and identify likely materials.

Example:

Input:

> Organic cotton tote bag with bamboo handles

AI detects:

- Organic Cotton
- Bamboo

These materials are then mapped to verified emission factors.

---

### DEFRA-Based Carbon Calculation Engine

Carbon estimation is powered using **DEFRA GHG Conversion Factors 2025**, a government-verified sustainability dataset.

Carbon calculations consider:

- Material emissions
- Packaging emissions
- Manufacturing emissions

### Formula

C = Cmat + Cpkg + Cmfg

Where:

- Cmat = Material Carbon Emissions
- Cpkg = Packaging Carbon Emissions
- Cmfg = Manufacturing Carbon Emissions

---

### Smart Eco Alternatives

EcoCreds recommends lower-carbon alternatives from the same category.

Users can compare:

- Current product
- Suggested eco-friendly replacement
- Estimated CO₂ savings
- EcoScore improvement

This makes sustainable choices easier without requiring extra effort from the user.

---

### EcoCred Rewards System

Users are rewarded for eco-friendly shopping behavior.

Rewards are earned through:

- Choosing sustainable products
- Selecting greener alternatives
- Saving CO₂ through swaps
- Buying or selling secondhand products

Reward points can later be redeemed for discounts and offers.

---

### Secondhand Marketplace

EcoCreds includes an integrated secondhand marketplace that supports circular economy practices.

Users can:

- Upload used items
- Resell products
- Buy secondhand goods
- Extend product lifecycle
- Reduce waste generation

---

### Eco Product Price Tracker

Track eco-friendly product prices and notify users when prices drop.

This improves accessibility by making sustainable choices more affordable.

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### AI Integration

- Google Gemini API

### Dataset

- DEFRA GHG Conversion Factors 2025

---

## How It Works

### Workflow

User browses a product

↓

Product description is fetched

↓

Gemini NLP extracts material composition

↓

Materials are mapped to DEFRA emission factors

↓

Carbon footprint is calculated

↓

EcoScore is generated

↓

Greener alternatives are recommended

↓

User earns EcoCred reward points

---

## Expected Impact

EcoCreds aims to:

- Increase sustainability awareness during shopping
- Reduce carbon-intensive purchase decisions
- Encourage eco-friendly buying habits
- Improve visibility of sustainable products
- Support circular economy through resale
- Reduce Scope 3 retail emissions
- Build measurable ESG engagement through consumer behavior

---

## Future Scope

Potential future enhancements include:

- Barcode / QR code scanning for in-store products
- Browser extension for Amazon / Flipkart
- Dedicated mobile application
- Advanced lifecycle carbon estimation
- Community sustainability leaderboards
- Personalized AI sustainability assistant
- Carbon offset integration at checkout
- Blockchain-based sustainability verification

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd eco-creds
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Local Development

Application runs locally at:

```bash
http://localhost:5173
```

---

## Team

Developed as Final Year Project

Department of Computer Science & Engineering  
Institute of Engineering & Technology, Lucknow

### Team Members

- Anurag Rawat
- Mohd Taha Khan
- Nitin Tripathi

---

## Project Vision

EcoCreds aims to bridge the gap between sustainability and e-commerce by empowering consumers with transparent environmental data, intelligent recommendations, and actionable incentives.

Our goal is to make sustainability not just visible—but practical, rewarding, and part of everyday shopping behavior.

---

## License

This project is developed for academic, research, and educational purposes.