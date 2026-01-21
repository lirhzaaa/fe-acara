# Acara Frontend Web Application

Frontend application for **Acara – Integrated Event Ticketing Platform**. This web app provides the user interface for browsing events, purchasing tickets, and managing user accounts for both members and admins.

## 🔗 Links

- **Live Website:** https://acaranya-kita.vercel.app/
- **Backend API:** https://be-acara-sigma.vercel.app/
- **API Documentation (Swagger):** https://be-acara-sigma.vercel.app/api-docs

---

## 📌 Overview

The Acara frontend is built as a modern web application that consumes a separate backend API. It focuses on delivering a clean, responsive, and user-friendly experience for event discovery and ticket purchasing.

The application supports both **member** and **admin** roles with protected routes and role-based access.

---

## ✨ Main Features

### Public
- Browse events by category
- View event details
- Support for online and offline events

### Member
- User registration with email activation
- Login & authentication
- Purchase event tickets
- Secure payment via Midtrans Snap
- View transaction history
- Update profile information

### Admin
- Dashboard access
- Manage events, categories, and banners
- View transaction data

---

## 🛠 Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- HeroUI
- Yup (Form Validation)
- JWT-based Authentication

---

## 🎨 UI & UX

- Responsive layout
- Reusable component structure
- Form validation with clear error handling
- Optimized user flow for ticket purchase

---

## 📌 Notes

- This frontend is fully separated from the backend service.
- API communication is handled through protected endpoints.
- Authentication state is managed securely for both admin and member roles.

---

## 👤 Author

Developed by **Lirhza**
