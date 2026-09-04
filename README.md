# Agri Lanka — Harvest Surplus & Fair-Price Marketplace

> A practical, responsive digital platform connecting Sri Lankan smallholder farmers directly with wholesale buyers to eliminate post-harvest crop waste and middleman price exploitation.

---

## 1. Project Links & Live Deployment
* **Live Deployed Application (Vercel):** [https://agri-lanka.vercel.app](https://agri-lanka.vercel.app)
* **GitHub Repository:** [https://github.com/Chamidu2k04/AgriLanka](https://github.com/Chamidu2k04/AgriLanka)
* **2-Minute Demonstration Video:** [OneDrive / Video Demonstration Link](https://1drv.ms/v/s!your-link-here)


---

## 2. Selected Sri Lankan Problem
In Sri Lanka's critical agricultural regions (such as Dambulla, Nuwara Eliya, Jaffna, Badulla, and Welimada), smallholder farmers face severe post-harvest losses reaching 30%–40% during harvest seasons. Due to the lack of transparent, real-time market linkage, farmers are forced into selling produce to intermediaries at exploitative rates or dumping tons of unsold fresh produce when regional dedicated economic centres flood. Concurrently, urban retail consumers face skyrocketing food inflation. Agri Lanka addresses this information asymmetry by providing an open, digital trade board connecting agricultural producers directly with bulk commercial buyers and retailers.

---

## 3. Proposed Solution
Agri Lanka is a lightweight, mobile-first web application designed for fast, low-bandwidth access across rural Sri Lanka. 
* **For Farmers:** Allows quick listing of harvest batches with minimum friction, transparent pricing, and instant contact access.
* **For Wholesale Buyers & Retailers:** Provides instant discovery across Sri Lankan districts, category-based filtering, and automatic calculation of batch purchasing costs.
* **For the Local Community:** Fosters fair trade, reduces avoidable food waste, and surfaces key emergency resources, including the Sri Lanka Department of Agriculture helpline (1920).

---

## 4. Key Functional Features
1. **User Authentication & Role Management:** Secure registration and login for both Farmers and Buyers, featuring 10-digit Sri Lankan phone number validation and JWT session handling.
2. **Harvest Listing Creation:** A comprehensive form allowing farmers to post harvest lots with crop names, categories, quantities, unit prices, and districts.
3. **Robust Input Validation:** Client and server-side validation rejecting invalid phone numbers, empty values, or negative prices/quantities with clear, friendly inline error prompts.
4. **Live Search & Dynamic Category Filtering:** Real-time search by crop name and category pill filtering (Vegetables, Fruits, Grains, Spices).
5. **Automated Batch Value Calculation:** Dynamically calculates `Total Batch Value = Quantity (kg) × Unit Price (LKR)` directly on each listing card.
6. **Listing Lifecycle Management:** Farmers can toggle listings between `Available` and `Sold`, disabling expired listings while preventing duplicate status updates.
7. **Responsive & Accessible UI:** Mobile-first layout designed for field operation on handheld smartphones and desktop devices alike.
8. **In-App Problem Context & Emergency Helplines:** Integrated problem summary card and quick-dial support for the Sri Lanka Agricultural Advisory Service (1920).

---

## 5. Technology Stack
* **Frontend:** React.js (Vite), Tailwind CSS, Lucide React Icons
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
* **Deployment & CI/CD:** Vercel (Frontend Client), Render (Backend Web Service)

---

## 6. Data Models

### `backend/models/User.js`
| Field | Type | Validation / Rules |
| :--- | :--- | :--- |
| `fullName` | String | Required, trimmed |
| `phone` | String | Required, unique, regex: `/^[0-9]{10}$/` |
| `password` | String | Required, hashed using `bcryptjs` (min length: 6) |
| `role` | String | Enum: `['Farmer', 'Buyer']`, default: `'Farmer'` |
| `district` | String | Required |

### `backend/models/Listing.js`
| Field | Type | Validation / Rules |
| :--- | :--- | :--- |
| `cropName` | String | Required, trimmed |
| `category` | String | Enum: `['Vegetables', 'Fruits', 'Grains', 'Spices']`, required |
| `quantityKg` | Number | Required, min: 1 |
| `unitPriceLkr`| Number | Required, min: 1 |
| `farmerId` | ObjectId | Reference to `User` model, required |
| `farmerName` | String | Denormalized for display performance |
| `farmerPhone`| String | Denormalized for direct contact |
| `district` | String | Required |
| `status` | String | Enum: `['Available', 'Sold']`, default: `'Available'` |
| `harvestDate`| Date | Default: `Date.now` |

---

## 7. AI Tools Used & Mandatory Declaration

### Declaration
AI tools (Claude 3.5 Sonnet, ChatGPT) were utilized throughout this 4-hour hackathon for boilerplate structuring, schema refinement, and responsive CSS styling. Every line of code generated was reviewed, modified, and verified for correct business logic and security by team members.

### AI Prompt Log
| Tool Used | Exact Prompt / Task Description | Purpose | Team Modification & Verification |
| :--- | :--- | :--- | :--- |
| **Claude 3.5** | *"Write a Mongoose schema for an agricultural listing with cropName, category, quantityKg, unitPriceLkr, district, and status."* | Initial data model generation | Added Sri Lankan district constraints, phone regex validation (`/^[0-9]{10}$/`), and total price calculation helpers. |
| **ChatGPT** | *"Generate a responsive Tailwind CSS registration form for Farmer and Buyer roles with inline error states."* | UI layout and form design | Removed extraneous form dependencies, wired standard React controlled state hooks, and aligned styling with theme palette. |
| **Claude 3.5** | *"Create an Express.js query filter handler for Mongoose supporting case-insensitive text search and category matches."* | Backend search implementation | Reviewed and integrated sanitization to prevent NoSQL query injection; added default sorting by creation date (`createdAt: -1`). |
| **ChatGPT** | *"Generate a realistic JSON seed dataset of 6 Sri Lankan farm harvest listings with realistic wholesale prices."* | Sample test data | Verified pricing accuracy against contemporary Sri Lankan market rates (e.g., Nuwara Eliya Leeks, Dambulla Tomatoes). |

---

## 8. Team Members & Contributions
 
| Member Name | Student ID | Vertical Slice Role | Exact Features & Modules Implemented |
| :--- | :--- | :--- | :--- |
| **Yasas Wijeratne** | IT24101966 | **Member A (Auth & Role Management Slice)** | • Backend: `models/User.js`, `controllers/authController.js` (`/register`, `/login`, `/me`), `middleware/authMiddleware.js`<br>• Frontend: `pages/AuthPage.jsx` (Sign In / Register tabs, 10-digit SL phone validation, inline error alerts, 1-click test fill)<br>• Stored JWT in `localStorage`, managed auth state persistence via `AuthContext.jsx` |
| **Tharani Thiwanka** | IT24102807 | **Member B (Browse & Filter Slice)** | • Backend: `getListings` in `controllers/listingController.js` supporting dynamic query filters (`?category=&district=&search=`)<br>• Frontend: `pages/BrowseListingsPage.jsx` (Debounced instant search, category pill filters, district dropdown, aggregate stats strip)<br>• Mapped listings to `<ListingCard />` with reactive state updates |
| **Sithara Ravishani** | IT24102610 | **Member C (Card, Actions & Calc Slice)** | • Backend: `updateListingStatus` (PATCH) and `deleteListing` (DELETE) with ownership validation (`req.user._id === listing.farmerId`)<br>• Frontend: `components/ListingCard.jsx`<br>• Implemented real-time batch cost calculation: `quantityKg * unitPriceLkr`<br>• Added owner-controlled "Mark as Sold" toggle, delete action, direct phone & WhatsApp contact integration |
| **Chamidu Lakshan** | Group Leader | **Member D (Post Form, Infra & Ship Slice)** | • Backend: `createListing` (POST) linking authenticated farmer ID; created realistic `seedData.js` across 5 provinces<br>• Frontend: `pages/PostListingPage.jsx` (Form with client validation and live batch cost preview), `pages/LandingPage.jsx`, `components/Navbar.jsx`, `components/ProblemBanner.jsx`<br>• Infrastructure: Repository setup, Vercel Serverless monorepo deployment configuration, and submission preparation |


---

## 9. Alignment with Minimum Functional Requirements

| # | Rubric Minimum Requirement | Implementation in Agri Lanka |
| :-: | :--- | :--- |
| **1** | Landing page / Main UI | Clean hero section welcoming users with live market summary stats. |
| **2** | In-app Sri Lankan problem context | Dedicated problem overview banner detailing harvest loss in Dambulla & Jaffna. |
| **3** | At least two functional features | (1) Direct harvest listing & buyer discovery board; (2) Batch cost calculator & status update. |
| **4** | User input form | Post Harvest Listing Form + User Registration / Login Form. |
| **5** | Meaningful input validation | Client & server checks on numeric ranges, phone format, and empty strings with red error messages. |
| **6** | Display, search, filter, calculate, or update | Real-time text search, category filters, auto-calculated batch totals, and status updates. |
| **7** | Responsive desktop & mobile interface | Fully responsive Tailwind layout tested across mobile screens and desktop monitors. |
| **8** | Basic navigation between screens | Dynamic top navigation bar linking Home/Browse, Post Harvest, and Auth pages. |
| **9** | Relevant sample data | Realistic seed data representing harvests across Nuwara Eliya, Dambulla, Matale, and Jaffna. |
| **10** | Demonstrated local value | Direct phone/WhatsApp access to farmers, fair price transparency, and Agriculture helpline (1920). |

---

## 10. Installation & Local Development Setup

### Prerequisites
* Node.js (v18.0.0 or higher installed)
* MongoDB connection URI (Local or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/your-team/agri-lanka.git
cd agri-lanka
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables (a default .env is provided, or copy from .env.example)
cp .env.example .env

# Start the development server (runs with nodemon on port 5000)
npm run dev

# (Optional) Seed the database with sample Sri Lankan harvests
npm run seed
```

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development server (runs on port 5173)
npm run dev
```

---

## 11. Team Parallel Development Guide

To avoid merge conflicts during the 4-hour build session, each team member works strictly inside their assigned files:

| Member | Assigned Backend Files | Assigned Frontend Files | Primary Goal |
| :--- | :--- | :--- | :--- |
| **Member A** | `models/User.js`<br>`controllers/authController.js`<br>`middleware/authMiddleware.js` | `pages/AuthPage.jsx`<br>`context/AuthContext.jsx` | User Registration, Login, JWT tokens, 10-digit SL phone validation |
| **Member B** | `controllers/listingController.js` (`getListings`) | `pages/BrowseListingsPage.jsx` | Search input, Category pills, District filter, render `<ListingCard />` |
| **Member C** | `controllers/listingController.js` (`updateListingStatus`, `deleteListing`) | `components/ListingCard.jsx` | Dynamic total value calculation, Sold toggle, Delete button, Call/WhatsApp |
| **Member D** | `controllers/listingController.js` (`createListing`)<br>`seedData.js` | `pages/PostListingPage.jsx`<br>`components/Navbar.jsx`<br>`components/ProblemBanner.jsx` | Harvest posting form, input validation, navigation status, crisis context |
