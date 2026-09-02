# Utsav Decor - Bespoke Indian Event Decoration & Management Platform

**Utsav Decor** is a full-stack event decoration and management web platform tailored specifically for Indian ("desi") celebrations—including Royal Weddings, Ganesh Chaturthi Utsav, Milestone Birthdays, Griha Pravesh (Housewarming), Godh Bharai & Baby Shower, and Royal Engagements / Roka.

The platform embraces a warm, festive Indian design aesthetic (marigold orange, royal maroon, gold & brass accents, and ivory backgrounds with subtle mandala motifs) and implements a bespoke consultation enquiry model (zero prices shown).

---

## 🌟 Key Features

### Customer-Facing Experience
1. **Festive Home Page**: Regal hero section, event category showcase tiles, "The Utsav Artistry" value propositions, signature atelier theme gallery, client testimonials, and consult CTA.
2. **Category Browse Page (`/category/:slug`)**: High-res photo cards for each celebration type with quick inclusions summary and "Select Base Theme" actions.
3. **Theme Detail & Customizer Hub (`/theme/:id`)**:
   - Interactive multi-photo gallery with thumbnail selector and fullscreen Lightbox.
   - Narrative decor breakdown with complete list of inclusions (mandap dimensions, floral varieties, brass lighting).
   - **Interactive Add-on Picker**: Filterable by category (*Floral, Lighting, Seating & Swings, Entry & FX, Signage, Sound*) with quantity steppers and immediate cart synchronization.
   - Sticky bottom action bar showing current selections with "Proceed to Booking Request" trigger.
4. **Request / Checkout Page (`/request`)**:
   - Itemized summary card of selected theme + chosen add-ons (strictly no prices).
   - Comprehensive Indian event enquiry form with field validations: Full Name, 10-digit Phone, Email, Event Date, Time Slot (*Morning Pooja, Afternoon, Evening Reception, Full Day*), Venue Location, Venue Type, and Guest Count.
5. **Booking Confirmation (`/request-confirmed/:id`)**:
   - Unique reference identifier (e.g. `UTSAV-2026-1783`).
   - 3-step consultation timeline.
   - Pre-filled **"Chat on WhatsApp"** direct button.

### Admin Management Portal (`/admin`)
1. **JWT Session Authentication (`/admin/login`)**: Secure login with password hashing (`bcryptjs`) and JWT token session.
2. **Interactive Dashboard Overview (`/admin/dashboard`)**:
   - Live KPI cards: Total Requests, New (Pending Action), In Consultation, Confirmed Bookings.
   - Inquiries by Event Category distribution chart.
   - Recent 5 inquiries quick table.
3. **Customer Inquiries Manager (`/admin/requests`)**:
   - Filter tabs: *All, New, Contacted, Confirmed, Closed*.
   - Live search by customer name, phone, email, reference ID, or location.
   - Request Detail Dossier (`/admin/requests/:id`): Full contact details with one-click WhatsApp/Phone call links, theme & add-on list with quantities, status updater dropdown, and internal timestamped admin notes log.
4. **Catalog Management (`/admin/catalog`)**: Full CRUD for:
   - **Event Categories**: Add/Edit/Delete categories, custom slug, cover image, and active status.
   - **Decoration Themes**: Add/Edit/Delete themes with multiple image URLs, inclusions list, short preview, and "Signature Highlight" toggle.
   - **Add-on Decor Items**: Add/Edit/Delete add-on decor items with category type, unit type, and image.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 (Vite), React Router v6, Lucide Icons, Custom CSS Design System (no generic Bootstrap/Tailwind templates).
- **Backend**: Node.js, Express.js REST API, CORS, Morgan, JWT authentication, `bcryptjs`.
- **Database & ORM**: SQLite with Prisma ORM (relational schema, instant zero-setup local dev).
- **Seeded Data**: 6 Categories, 19 realistic Indian decoration themes with curated Unsplash photography, 16 add-on decor items, sample customer inquiries, and default admin credentials.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Quick Start (All-in-One)

1. **Clone or open the workspace**:
   ```bash
   cd "d:/project/EVENT MAN"
   ```

2. **Install all dependencies** (root, server, and client):
   ```bash
   npm run install:all
   ```

3. **Initialize the SQLite Database & Seed Data**:
   ```bash
   cd server
   npx prisma db push
   node prisma/seed.js
   cd ..
   ```

4. **Start the full-stack application**:
   ```bash
   npm run dev
   ```
   - **Customer Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Admin Portal**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
   - **Backend API**: [http://localhost:5000/api](http://localhost:5000/api)

---

## 🔑 Default Admin Credentials

- **Email**: `admin@utsavdecor.com`
- **Password**: `admin123`
- **Portal URL**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 📁 Project Structure

```
EVENT MAN/
├── package.json              # Root orchestration scripts
├── README.md                 # Complete documentation
├── server/
│   ├── prisma/
│   │   ├── schema.prisma     # Prisma SQLite relational schema
│   │   ├── seed.js           # Realistic Indian event seed data
│   │   └── dev.db            # SQLite database file
│   ├── src/
│   │   ├── config/           # Database singleton
│   │   ├── controllers/      # Auth, Categories, Themes, Addons, Requests, Stats
│   │   ├── middleware/       # JWT admin auth middleware
│   │   ├── routes/           # REST endpoints
│   │   └── index.js          # Express app entry
│   ├── test_api.js           # Automated integration test suite
│   ├── package.json
│   └── .env
└── client/
    ├── index.html            # Google Fonts (Cinzel, Marcellus, Plus Jakarta Sans)
    ├── vite.config.js        # Vite config with /api proxy
    ├── package.json
    └── src/
        ├── components/
        │   ├── common/       # Navbar, Footer, Motif SVGs, Modal, Lightbox
        │   ├── customer/     # CategoryCard, ThemeCard, AddonPicker, RequestSummaryDrawer
        │   └── admin/        # AdminLayout, Sidebar, Header, StatsCard, StatusBadge, CRUD Modals
        ├── context/          # AuthContext, CustomizationContext, ToastContext
        ├── pages/
        │   ├── customer/     # HomePage, CategoryPage, ThemeDetailPage, RequestPage, ConfirmationPage, AboutContactPage
        │   └── admin/        # AdminLoginPage, AdminDashboardPage, AdminRequestsPage, AdminRequestDetailPage, AdminCatalogPage
        ├── services/         # api.js, authService.js, catalogService.js, requestService.js
        ├── styles/           # theme.css, index.css, components.css, admin.css
        ├── App.jsx           # Master route configuration
        └── main.jsx
```

---

## 🔒 Environment Variables (`server/.env`)

```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="utsav_decor_super_secret_jwt_key_2026_festive"
JWT_EXPIRES_IN="7d"
CLIENT_URL="http://localhost:5173"
```
