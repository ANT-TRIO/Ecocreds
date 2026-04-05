# 🌿 EcoCreds — AI-Powered Sustainable E-Commerce Platform

> **Shop Smart. Save the Planet.**
> An intelligent green-commerce platform that scores the environmental impact of consumer products using the **UK Government DEFRA GHG Conversion Factors dataset**, recommends eco-friendlier alternatives, and rewards users for sustainable purchasing behaviour.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Carbon Footprint Calculation — Core Methodology](#-carbon-footprint-calculation--core-methodology)
  - [DEFRA Dataset Integration](#1-defra-dataset-integration)
  - [NLP Processing Layer (Gemini)](#2-nlp-processing-layer-gemini)
  - [Eco Score Formula](#3-eco-score-formula)
- [Eco Alternative Recommendation Engine](#-eco-alternative-recommendation-engine)
- [Database Design (MongoDB)](#-database-design-mongodb)
- [API Reference](#-api-reference)
- [Frontend Architecture](#-frontend-architecture)
- [EcoCred Points & Rewards System](#-ecocred-points--rewards-system)
- [Secondhand Marketplace](#-secondhand-marketplace)
- [Payment Integration (Razorpay)](#-payment-integration-razorpay)
- [Authentication & Security](#-authentication--security)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [Future Scope](#-future-scope)

---

## 🌍 Project Overview

EcoCreds is a full-stack web application that addresses the growing need for environmental transparency in consumer shopping. The platform enables users to:

1. **Search & browse** a curated product catalogue spanning Food & Beverage, Personal Care, Household, Clothing, Electronics, Stationery, and Fitness categories.
2. **Analyse the carbon footprint** of any product using a hybrid engine built on the **DEFRA (Department for Environment, Food & Rural Affairs) GHG Conversion Factors 2025 dataset** combined with an NLP parsing layer.
3. **Discover greener alternatives** — the system automatically finds candidate products from the database and ranks them by environmental impact.
4. **Earn EcoCred points** for choosing sustainable options, which can be redeemed for rewards.
5. **Buy & sell secondhand goods** to promote circular economy practices.
6. **Pay securely** via Razorpay integration.

### Problem Statement

Consumers lack easy access to verified, comparable environmental data at the point of purchase. Existing sustainability labels are inconsistent and hard to interpret. EcoCreds solves this by:
- Providing a **standardised 0–100 EcoScore** for every product.
- Making the carbon footprint **visible, comparable, and actionable**.
- **Incentivising** greener choices through a gamified rewards system.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **AI EcoScore Engine** | Calculates a product's carbon footprint using DEFRA emission factors + NLP text classification |
| **Greener Alternatives** | AI-powered recommendation of eco-friendly substitutes from the product database |
| **EcoCred Rewards** | Gamified loyalty points system — earn credits for CO₂ saved |
| **Secondhand Marketplace** | Peer-to-peer listing and buying of pre-owned goods |
| **Razorpay Payments** | Secure payment gateway integration (INR) |
| **JWT Authentication** | Secure signup/login with token-based session management |
| **Responsive UI** | Modern, nature-themed React frontend with animations, gauges, and badges |
| **Product Search** | Relevance-scored search with category filtering and pagination |
| **User Dashboard** | Personal CO₂ savings tracker, order history, and EcoCred balance |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT (React + Vite)                       │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ ┌───────────────┐ │
│  │  Home   │ │ Products │ │Dashboard │ │ Cart │ │  Secondhand   │ │
│  └────┬────┘ └────┬─────┘ └────┬─────┘ └──┬───┘ └───────┬───────┘ │
│       │           │            │           │             │         │
│       └───────────┴────────────┴───────────┴─────────────┘         │
│                               │ Axios (Bearer Token)               │
└───────────────────────────────┼─────────────────────────────────────┘
                                │  HTTP REST
┌───────────────────────────────┼─────────────────────────────────────┐
│                         SERVER (Express.js)                         │
│                               │                                     │
│  ┌────────────────────────────┴────────────────────────────────┐    │
│  │                    API Routes Layer                          │    │
│  │  /api/auth  /api/products  /api/eco  /api/cart  /api/payments│    │
│  │              /api/secondhand                                 │    │
│  └──────┬──────────┬───────────┬──────────┬──────────┬─────────┘    │
│         │          │           │          │          │               │
│    ┌────┴────┐ ┌───┴───┐ ┌────┴─────┐  ┌┴────┐  ┌──┴───┐          │
│    │  Auth   │ │Product│ │  Eco     │  │Cart │  │Razor │          │
│    │Middleware│ │ JSON  │ │ Services │  │/Order│  │ pay  │          │
│    └────┬────┘ └───┬───┘ └────┬─────┘  └┬────┘  └──┬───┘          │
│         │          │          │         │          │               │
│    ┌────┴──────────┴──────────┴─────────┴──────────┘               │
│    │                                                               │
│    │  ┌─────────────────────┐    ┌──────────────────────────┐      │
│    │  │  DEFRA Excel Service│    │   NLP Parsing Service    │      │
│    │  │ (defraExcelService) │    │  (geminiService.js)      │      │
│    │  │                     │    │                          │      │
│    │  │  Parses .xlsx file  │◄───│  Uses DEFRA reference    │      │
│    │  │  Extracts emission  │    │  data in prompt context  │      │
│    │  │  factors directly   │    │  for structured parsing  │      │
│    │  └─────────┬───────────┘    └────────────┬─────────────┘      │
│    │            │                              │                   │
│    │    ┌───────┴────────┐            ┌────────┴───────┐           │
│    │    │ ghg-conversion │            │  Gemini API    │           │
│    │    │ factors-2025   │            │  (NLP engine)  │           │
│    │    │ condensed.xlsx │            └────────────────┘           │
│    │    └────────────────┘                                         │
│    │                                                               │
│    └──────────────────────┬──────────────────────────────────────   │
│                           │                                        │
│                    ┌──────┴───────┐                                 │
│                    │  MongoDB     │                                 │
│                    │  Atlas       │                                 │
│                    │ (Users,      │                                 │
│                    │  Orders,     │                                 │
│                    │  Secondhand) │                                 │
│                    └──────────────┘                                 │
└────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI library |
| **Vite 7** | Lightning-fast dev server & bundler |
| **React Router v7** | Client-side routing & protected routes |
| **Axios** | HTTP client with Bearer token interceptor |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **CSS-in-JS (inline)** | Custom component styling with CSS variables |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js v5** | REST API framework |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Mongoose v8** | ODM for MongoDB schema modelling |
| **xlsx (SheetJS)** | Programmatic parsing of the DEFRA Excel dataset |
| **@google/generative-ai** | Gemini API SDK for NLP text classification |
| **Razorpay SDK** | Payment order creation & verification |
| **bcryptjs** | Password hashing (10-round salt) |
| **jsonwebtoken** | JWT-based stateless authentication |
| **dotenv** | Environment variable management |
| **nodemon** | Hot-reload dev server |

---

## 🔬 Carbon Footprint Calculation — Core Methodology

The carbon calculation engine is the intellectual core of EcoCreds. It follows a **two-stage hybrid approach** that combines structured government data with intelligent text parsing.

### 1. DEFRA Dataset Integration

**Source:** UK Department for Environment, Food & Rural Affairs — *GHG Conversion Factors 2025 (Condensed Set)*

The file `ghg-conversion-factors-2025-condensed-set.xlsx` (1.8 MB) is the **primary source of truth** for all emission factor values used in the platform. It contains official, peer-reviewed conversion factors published annually by the UK Government.

**How it works (`defraExcelService.js`):**

```
┌──────────────────────────────────────────────────────┐
│           DEFRA Excel Processing Pipeline            │
│                                                      │
│  1. Load .xlsx file using SheetJS (xlsx library)     │
│  2. Cache the parsed workbook in memory              │
│  3. For a given material keyword:                    │
│     a. Iterate through relevant Excel sheets         │
│        (e.g., "Material use", "Freight")             │
│     b. Scan rows for keyword match                   │
│     c. Extract the first valid numeric value          │
│        (emission factor in kg CO₂e)                  │
│  4. Apply the standard DEFRA formula:                │
│                                                      │
│     Total Carbon (kg CO₂e) = Mass (kg) × EF          │
│                                                      │
│     Where EF = Emission Factor from Excel            │
│  5. Return structured result with provenance         │
└──────────────────────────────────────────────────────┘
```

**The Standard DEFRA Formula:**
```
Total Carbon Emissions (kg CO₂e) = Activity Data (Mass in kg) × Emission Factor (from DEFRA dataset)
```

**Key implementation details:**
- The Excel workbook is parsed once and cached in memory for performance.
- Sheet scanning is optimised to prioritise sheets containing "Material" or "Freight" in their names.
- A fallback baseline emission factor (2.5 kg CO₂e/kg) is used when the material keyword is too vague for an exact dataset match.
- Every calculation returns full provenance: formula used, emission factor source, and dataset version.

### 2. NLP Processing Layer (Gemini)

**The Challenge:** Real-world e-commerce product descriptions are inherently unstructured. A product titled *"Eco-Friendly Recycled Cotton Blend Running Shoes with Foam Soles"* contains multiple materials at unknown weight fractions, mixed with marketing language. Traditional keyword-based lookups against the DEFRA spreadsheet fail on such inputs.

**The Solution:** We use Google's Gemini API as an **NLP classification and parsing layer** — not as the source of carbon data, but as an intelligent text processor.

**How the hybrid pipeline works:**

```
┌────────────────────────────────────────────────────────────────────┐
│                  HYBRID CALCULATION PIPELINE                       │
│                                                                    │
│  INPUT: Raw product data (name, material, packaging, brand, etc.) │
│                                                                    │
│  STEP 1: Feed product data INTO Gemini prompt                     │
│  STEP 2: Embed DEFRA-sourced Carbon Reference Table in prompt     │
│          (material intensities, packaging factors, eco formula)    │
│  STEP 3: Gemini identifies materials and weight fractions          │
│          from unstructured text                                    │
│  STEP 4: Gemini applies the DEFRA reference multipliers           │
│          to compute material_carbon + packaging_carbon             │
│  STEP 5: Manufacturing overhead (10–30%) added                    │
│  STEP 6: Total footprint calculated, EcoScore derived             │
│  STEP 7: Eco badges assigned based on material properties         │
│                                                                    │
│  OUTPUT: { ecoScore, carbonFootprint, breakdown, badges }         │
└────────────────────────────────────────────────────────────────────┘
```

**Critical design decision:** The Gemini prompt explicitly embeds a **Carbon Intensity Reference Table** derived from the DEFRA dataset. This table includes:
- **16 material categories** with emission ranges (e.g., Virgin Plastic: 3.5–6.0 kg CO₂e/kg)
- **6 packaging categories** with emission ranges
- **The exact eco score formula** (Score = 100 − normalised_footprint × 100)

This means Gemini acts strictly as a **structured text classifier**, not as a carbon data source. It reads the material descriptions, identifies the components, and applies the provided reference values mathematically.

### 3. Eco Score Formula

```
EcoScore = 100 − (Normalised Total Carbon Footprint × 100)

Where:
  Total Carbon = Material Carbon + Packaging Carbon + Manufacturing Overhead

  Material Carbon   = Σ (material_weight_kg × material_emission_factor)
  Packaging Carbon  = packaging_emission_factor (per unit)
  Manufacturing     = 10–30% of Material Carbon
  
  Final score is clamped to [0, 100]
```

| Score Range | Rating | Colour |
|---|---|---|
| 75–100 | Excellent | Dark Green `#2d5a3d` |
| 50–74 | Good | Green `#5a9e3a` |
| 25–49 | Fair | Amber `#e08c20` |
| 0–24 | Poor | Red `#c94444` |

**Eco Badges** are assigned based on material analysis:
`Recycled Materials` · `Biodegradable` · `Low Carbon` · `Plastic-Free` · `Sustainably Sourced` · `Minimal Packaging` · `Long Lifespan`

---

## 🔄 Eco Alternative Recommendation Engine

When a user views a product and wants a greener option, the system executes a **multi-step recommendation pipeline**:

```
┌───────────────────────────────────────────────────────────────┐
│              ALTERNATIVE RECOMMENDATION FLOW                  │
│                                                               │
│  1. CANDIDATE SEARCH                                         │
│     - Query the product JSON database                        │
│     - Match by name, category, or description keywords       │
│     - Exclude the original product                           │
│                                                               │
│  2. AI RANKING                                               │
│     - Pass original product + all candidates to Gemini       │
│     - Include DEFRA carbon reference data in context         │
│     - AI ranks by:                                           │
│       ① Lower carbon footprint (materials + packaging)       │
│       ② Recycled / biodegradable / natural materials         │
│       ③ Minimal or plastic-free packaging                    │
│                                                               │
│  3. FUZZY MATCHING                                           │
│     - AI returns the chosen product name                     │
│     - Server fuzzy-matches the name back to a DB record      │
│     - (exact match → substring match → contains match)       │
│                                                               │
│  4. ECO SCORING                                              │
│     - Run getEcoScore() on the chosen alternative            │
│     - Return the alternative product + its full eco analysis │
│                                                               │
│  5. CO₂ SAVINGS                                             │
│     - Frontend calculates: original_footprint - alt_footprint│
│     - Displayed as "Saves X.XX kg CO₂ vs original"          │
└───────────────────────────────────────────────────────────────┘
```

---

## 🗄 Database Design (MongoDB)

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String,          // bcrypt hashed
  gender: String,
  dob: Date,
  nationality: String,
  ecoCreds: Number,          // reward points (default: 0)
  totalCO2Saved: Number,     // lifetime CO₂ savings (default: 0)
  orders: [ObjectId → Order],
  timestamps: true
}
```

### Order Schema
```javascript
{
  user: ObjectId → User,
  items: [{
    productId: String,
    name: String,
    price: Number,
    carbonFootprint: Number,
    originalProductId: String,
    usedAlternative: Boolean,
    co2Savings: Number,
    qty: Number
  }],
  totalPrice: Number,
  totalCO2: Number,
  totalCO2Saved: Number,
  ecoCredsEarned: Number,
  paymentStatus: 'created' | 'paid' | 'failed',
  razorpayOrderId: String,
  timestamps: true
}
```

### SecondhandProduct Schema
```javascript
{
  user: ObjectId → User,
  name: String,
  description: String,
  image: String,             // URL to image
  expiryDate: Date,
  status: 'available' | 'sold' | 'expired',
  buyer: ObjectId → User,
  soldAt: Date,
  timestamps: true
}
```

### Product Catalogue (JSON)
The primary product catalogue is stored as a static JSON file (`products_with_images.json`) containing **42 products** across 7 categories with attributes: `_id`, `name`, `description`, `category`, `price`, `material`, `packaging`, `brand`, `image_url`.

---

## 📡 API Reference

### Authentication (`/api/auth`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ✗ | Register new user (name, email, password, gender, dob, nationality) |
| `POST` | `/login` | ✗ | Login with email/password, returns JWT token |
| `GET` | `/me` | ✓ | Get current user profile, orders, totalCO₂Saved, ecoCreds |

### Products (`/api/products`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | ✗ | Search products. Query params: `q`, `category`, `page`, `limit` |
| `GET` | `/:id` | ✗ | Get single product by ID |

**Search features:**
- Full-text search across `name`, `description`, `category`
- Relevance scoring: exact match (100) → prefix match (60) → substring (40) → category (30) → description (5)
- Category filtering (exact match)
- Pagination with configurable page size (max 100)

### Eco Analysis (`/api/eco`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/score` | ✗ | Calculate eco score for a product. Body: product object |
| `POST` | `/alternative` | ✗ | Find best eco-friendly alternative. Body: `{ product, searchQuery }` |

### Cart & Orders (`/api/cart`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/create-order` | ✓ | Save cart as a new order (status: created) |
| `GET` | `/my` | ✓ | Get current user's order history |

### Payments (`/api/payments`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/create-order` | ✓ | Create Razorpay payment order (amount in INR → converted to paise) |
| `POST` | `/verify` | ✓ | Verify payment, mark order as paid, update user's ecoCreds & CO₂ savings |

### Secondhand Marketplace (`/api/secondhand`)
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/products` | ✓ | List all available secondhand products (excludes own) |
| `GET` | `/my-products` | ✓ | List user's own secondhand listings |
| `POST` | `/add-product` | ✓ | Create new secondhand listing |
| `POST` | `/buy/:productId` | ✓ | Purchase a secondhand product (seller earns +10 EcoCreds) |
| `DELETE` | `/delete/:productId` | ✓ | Delete own secondhand listing |

---

## 🖥 Frontend Architecture

### Pages

| Page | Route | Protected | Description |
|---|---|---|---|
| **Home** | `/` | ✗ | Landing page with hero section, feature cards, and step-by-step guide |
| **Signup** | `/signup` | ✗ | User registration form |
| **Login** | `/login` | ✗ | User login form |
| **Products** | `/products` | ✓ | Product catalogue with search, categories, and eco analysis |
| **Dashboard** | `/dashboard` | ✓ | User profile, CO₂ savings stats, order history |
| **Cart** | `/cart` | ✓ | Shopping cart with order creation and Razorpay checkout |
| **Rewards** | `/rewards` | ✓ | EcoCred points balance and reward redemption |
| **Secondhand** | `/secondhand` | ✓ | Browse secondhand marketplace listings |
| **Add Secondhand** | `/add-secondhand` | ✓ | Create a new secondhand product listing |

### Key Components

| Component | Description |
|---|---|
| `Navbar` | Sticky navigation with user context, EcoCreds display, and route links |
| `ProductsList` | Main product grid with search bar, category filters, pagination, and card layout |
| `ProductModal` | Detailed product view with image, info, EcoScore gauge, badges, AI analysis, and add-to-cart |
| `ProtectedRoute` | HOC wrapper that redirects unauthenticated users to `/login` |

### UI Design System

The frontend uses a **nature-inspired design system** with the following CSS custom properties:

```css
--forest:   #1a3a2a    /* Primary dark green */
--moss:     #2d5a3d    /* Secondary green */
--lime:     #b5e048    /* Accent / CTA colour */
--cream:    #f5f0e8    /* Background */
--cream-dk: #ede8de    /* Border / divider */
--stone:    #8a8a7a    /* Muted text */
```

**Typography:** `Fraunces` (serif, display) + `DM Sans` (sans-serif, body) from Google Fonts.

### EcoScore Gauge Component
A custom SVG semi-circle gauge (`MiniGauge`) renders the 0–100 score with animated stroke-dasharray transitions and colour-coded scoring (Poor → Excellent).

---

## 🏆 EcoCred Points & Rewards System

### How Points are Earned

| Action | Points |
|---|---|
| Purchase a product with **lower CO₂ footprint** (choosing the eco alternative) | CO₂ saved × multiplier |
| Sell a secondhand product | **+10 EcoCreds** |
| Complete a green purchase (payment verified) | `ecoCredsEarned` from order |

### How Points are Tracked

1. **At Cart:** The frontend calculates CO₂ savings per item (original footprint − alternative footprint).
2. **At Order Creation:** `totalCO2Saved` and `ecoCredsEarned` are stored on the Order document.
3. **At Payment Verification:** The server atomically increments the User's `ecoCreds` and `totalCO2Saved` fields using `$inc`.

---

## ♻️ Secondhand Marketplace

A peer-to-peer feature allowing users to extend product lifecycles:

- **List products** with name, description, image URL, and expiry date.
- **Browse** available items from other users (own listings are excluded).
- **Buy** — marks the product as `sold`, records the buyer, and awards the **seller +10 EcoCreds**.
- **Delete** — only the original poster can remove their listing.

---

## 💳 Payment Integration (Razorpay)

1. **Order Creation:** `POST /api/payments/create-order` creates a Razorpay order with amount in paise (INR × 100).
2. **Client-Side Checkout:** Frontend opens the Razorpay payment popup.
3. **Verification:** `POST /api/payments/verify` receives `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature` and marks the DB order as `paid`.
4. **Points Update:** On successful verification, the user's `ecoCreds` and `totalCO2Saved` are atomically incremented.

---

## 🔐 Authentication & Security

| Feature | Implementation |
|---|---|
| **Password Hashing** | `bcryptjs` with 10-round salt |
| **JWT Tokens** | 7-day expiry, signed with `JWT_SECRET` |
| **Token Middleware** | `verifyToken.js` extracts Bearer token, verifies JWT, loads User (sans password) |
| **Protected Routes** | Frontend `ProtectedRoute` component checks `localStorage` token; backend middleware enforces on sensitive endpoints |
| **API Client** | Axios interceptor automatically attaches `Authorization: Bearer <token>` header |

---

## 📁 Project Structure

```
EcoCreds/
├── client/                              # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Global navigation bar
│   │   │   ├── ProductsList.jsx         # Product grid + search + filters
│   │   │   ├── ProductModal.jsx         # Product detail modal + EcoScore
│   │   │   └── ProtectedRoute.jsx       # Auth guard wrapper
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Landing page
│   │   │   ├── Login.jsx                # Login form
│   │   │   ├── Signup.jsx               # Registration form
│   │   │   ├── ProductsPage.jsx         # Products catalogue page
│   │   │   ├── Dashboard.jsx            # User dashboard & stats
│   │   │   ├── Cart.jsx                 # Shopping cart + Razorpay checkout
│   │   │   ├── Rewards.jsx              # EcoCred points & rewards
│   │   │   ├── SecondhandGoods.jsx       # Secondhand marketplace
│   │   │   └── AddSecondhandProduct.jsx  # Add secondhand listing
│   │   ├── utils/
│   │   │   ├── api.js                   # Axios instance + auth interceptor
│   │   │   └── auth.js                  # Token helpers (get/set/remove)
│   │   ├── App.jsx                      # Root component + routing
│   │   ├── main.jsx                     # React DOM entry point
│   │   └── App.css / index.css          # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                              # Backend (Express.js)
│   ├── models/
│   │   ├── User.js                      # User schema (ecoCreds, CO2 tracking)
│   │   ├── Product.js                   # Product schema
│   │   ├── Order.js                     # Order schema (items, CO2, payments)
│   │   └── SecondhandProduct.js         # Secondhand listing schema
│   ├── routes/
│   │   ├── auth.js                      # Signup, Login, Profile
│   │   ├── products.js                  # Product search, details
│   │   ├── eco.js                       # EcoScore + Alternative endpoints
│   │   ├── cart.js                      # Order creation + history
│   │   ├── payments.js                  # Razorpay integration
│   │   └── secondhand.js               # Secondhand marketplace CRUD
│   ├── services/
│   │   ├── defraExcelService.js         # DEFRA .xlsx parser & formula engine
│   │   └── geminiService.js             # NLP parsing layer (Gemini API)
│   ├── middleware/
│   │   └── verifyToken.js               # JWT authentication middleware
│   ├── src/data/
│   │   └── products_with_images.json    # Product catalogue (42 items)
│   ├── ghg-conversion-factors-2025-condensed-set.xlsx  # DEFRA dataset
│   ├── server.js                        # Express app entry point
│   ├── package.json
│   └── .env                             # Environment variables (gitignored)
│
└── README.md                            # This file
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (or local MongoDB)
- Razorpay test account
- Google AI Studio API key (Gemini)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/EcoCreds.git
cd EcoCreds
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

**Server (`server/.env`):**
```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ecocreds
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
GEMINI_API_KEY=your_gemini_api_key
```

**Client (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev          # Starts nodemon on port 5000
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev          # Starts Vite on port 5173
```

### 6. Open in Browser
Navigate to `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | ✓ | MongoDB connection string |
| `JWT_SECRET` | ✓ | Secret key for JWT signing |
| `RAZORPAY_KEY_ID` | ✓ | Razorpay API key (test mode) |
| `RAZORPAY_KEY_SECRET` | ✓ | Razorpay secret key |
| `GEMINI_API_KEY` | ✓ | Google Gemini API key for NLP processing |
| `VITE_API_URL` | ✗ | Client-side API base URL (defaults to `http://localhost:5000/api`) |

---

## 🚀 Future Scope

| Enhancement | Description |
|---|---|
| **Barcode / QR Scanner** | Scan products in-store to instantly get their EcoScore |
| **Supply Chain Tracking** | Integrate logistics data for Scope 3 transport emissions |
| **Community Leaderboard** | Gamified ranking of top eco-shoppers |
| **Expanded DEFRA Mapping** | Full programmatic mapping of all 100+ DEFRA material categories |
| **Browser Extension** | Show EcoScore overlay on Amazon, Flipkart, etc. |
| **Mobile App** | React Native port for iOS and Android |
| **Carbon Offset API** | Let users purchase verified carbon offsets with EcoCreds |
| **Seller Dashboard** | Allow brands to list products and see their environmental metrics |
| **ML Model Training** | Train a custom classification model on the DEFRA dataset to reduce API dependency |

---

## 📄 License

This project was built as a college final-year project.

---

<p align="center">
  <b>🌿 EcoCreds — Making every purchase a step toward a sustainable future.</b>
</p>
