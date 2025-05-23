**INSTRACTION**
-----------------------------------------------------------------------------
🧿 E-Auction Platform
This is a full-stack web application built with Next.js, providing a platform for online bidding and auctions. It includes both frontend and backend services, with user authentication powered by NextAuth.js and deployed on Vercel.

🌐 Live URLs
🔹 Frontend: https://e-auction-six.vercel.app
🔸 Backend: https://backend-gamma-olive.vercel.app
📦 Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS (if used)
Backend: Node.js (API routes in Next.js or separate service)
Auth: NextAuth.js
Deployment: Vercel
Env Management: .env.local
🚀 Getting Started (Frontend)
1. Clone the repository:
git clone https://github.com/your-username/e-auction-platform.git
cd e-auction-platform
2. Install dependencies:
bash
Copy
Edit
npm install
# or
yarn
3. Create .env.local and add your environment variables:
env
Copy
Edit
**for local run**-----------
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/
NEXTAUTH_SECRET= creater a JWT token

⚠️ Keep this file private. Do not share or commit .env.local.

4. Start development server:
bash
Copy
Edit
npm run dev
# or
yarn dev
Visit: http://localhost:3000
----------------------------------------------------------------------------

**FUNCTIONALITY**
----------------------------------------------------------------------------
# 🧾 Auction Site Documentation

**Tech Stack**: Next.js (Frontend) + Node.js (Express) Backend + MongoDB (Database)

---

## 🔩 BACKEND STRUCTURE (`/backend/`)

### 📁 config/db.js

* **Purpose**: MongoDB connection setup.
* **Function**:

```js
mongoose.connect(process.env.MONGO_URI);
```

Connects to MongoDB using URI from `.env`.

---

### 📁 models/

#### 🟨 Auction.js

* **Schema**: Defines each auction’s data.

```js
title, description, startingPrice, seller, bids, startAt,endsAt, image
```

* **Key Fields**:

  * `bids`: Array of objects with `bidderId`, `amount`, `time`
  * `seller`: ref to `User`

---

### 📁 routes/

#### 🟩 authRoutes.js

* **POST /register**: Register a user → hash password → save
* **POST /login**: Verify user → generate JWT → send to client

#### 🟩 auctionRoutes.js

* **GET /auctions**: Return all auctions
* **GET /auctions**:id: Return one auction
* **POST /auctions**: Create auction (Only seller)
* **POST /auctions/:id/bid**: Place a bid (Only buyer)
* **DELETE /auctions/id**: Delete own auction (Only seller)

#### 🚫 Skipped

* `bid.js`, `user.js`, `userAuction.js` – not fully functional

---

### 📁 index.js

* **Purpose**: Starts the server + connects to MongoDB
* Sets up Express app and imports routes

---

## 🎨 FRONTEND STRUCTURE (`/src/`)

### 📁 app/layout.jsx

* **Purpose**: Global layout wrapper
* **Returns**:

```jsx
<Navbar />
{children}
<Footer />
```

---

### 📁 app/page.jsx (Home Page)

#### ✅ Purpose: Displays all auctions

* **Hooks**: `useEffect`, `useState`
* **Functions**:

  1. `fetchAuctions()`

     * Calls `/api/auctions`
     * Sets auction list in state
  2. `renderAuctionCard(auction)`

     * Returns JSX card for a single auction
* **Returns**: List of all auction cards

---

### 📁 app/auction/page.jsx (Single Auction Page)

#### ✅ Purpose: Shows single auction and bidding system

* **Hooks**: `useEffect`, `useState`
* **Functions**:

  1. `fetchAuction()`

     * GET `/api/auctions/:id`
     * Sets auction data & bids
  2. `handleBidSubmit()`

     * Validates bid
     * POST to `/api/auctions/:id/bid`
     * Updates bid list
  3. `getTimeLeft()`

     * Calculates remaining time
* **Returns**:

  * Auction title, desc, seller
  * Bid list sorted (highest top)
  * Bid form (buyer only)
  * Auction winner shown after time ends

---

### 📁 app/createAuction/page.jsx

#### ✅ Purpose: Allows seller to create auction

* **Hooks**: `useState`, `useRouter`
* **Functions**:

  1. `handleSubmit(e)`

     * Prevent default
     * POSTs form data to `/api/auctions`
     * Redirects to homepage
* **Returns**: Form with title, desc, start price, start & end time, image

---

### 📁 app/profile/\[accountId]/page.jsx

#### ✅ Purpose: Display all auctions by a specific user

* **Dynamic route**: `[accountId]`
* **Functions**:

  1. `fetchUserAuctions()`

     * GET `/api/auctions?user=accountId`
  2. `handleDeleteAuction(id)`

     * DELETE `/api/auctions/:id`
     * Only available to seller
* **Returns**:

  * Auction list for this user
  * Delete option for own auctions

---

### 📁 app/api/auth/\[...nextauth].js

#### ✅ Purpose: Auth config (NextAuth)

* **Providers**: Email/password login
* **Callbacks**:

  * `session`: includes user role
  * `jwt`: embeds userId, role in token

---

### 📁 components/navbar.jsx

* **Hooks**: `useSession` or custom auth
* **Functions**:

  1. `renderNavLinks()`

     * Shows different links by role

       * Guest: login/register
       * Buyer: logout only
       * Seller: Create Auction + logout
* **Returns**: Responsive navbar with conditional links

---

### 📁 components/footer.jsx

* **Static** footer with site copyright/info

---

### 📁 public/

* `public/profile/user.svg` – default profile icon for users
* Store other images/icons here as needed

---

## 🧠 FUNCTION BY FUNCTION SUMMARY

| Function                | Used In       | Purpose           
| ----------------------- | ------------- |--------
| `fetchAuctions()`       | Home          | Get all auctions               |
| `fetchAuction()`        | Auction page  | Load single auction            |
| `handleBidSubmit()`     | Auction page  | Post a new bid                 |
| `handleSubmit()`        | CreateAuction | Post new auction               |
| `handleDeleteAuction()` | Profile       | Delete own auction             |
| `getTimeLeft()`         | Auction page  | Countdown for auction          |
| `renderNavLinks()`      | Navbar        | Conditionally render nav items |

---