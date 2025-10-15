# CRM Portal

A modern Customer Relationship Management (CRM) portal built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Overview of business metrics, recent activities, and upcoming tasks
- **Customer Management**: Comprehensive customer list with search and filtering capabilities
- **Modern UI**: Clean, professional interface with a responsive design
- **Built with Latest Tech**: Next.js 15, React 18, TypeScript, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Fix npm cache permissions (if needed):
```bash
sudo chown -R $(whoami) ~/.npm
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
crm-portal/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── customers/          # Customers page
│   │   ├── layout.tsx          # Root layout with sidebar and header
│   │   ├── page.tsx            # Home/Dashboard page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx      # Top navigation bar
│   │   │   └── Sidebar.tsx     # Side navigation menu
│   │   └── ui/                 # Reusable UI components
│   │       ├── Card.tsx        # Card components
│   │       └── StatCard.tsx    # Statistics card
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## Available Pages

- **/** - Dashboard with statistics and activity overview
- **/customers** - Customer management page with table view
- **/companies** - Coming soon
- **/deals** - Coming soon
- **/reports** - Coming soon
- **/settings** - Coming soon

## Theme & Styling

The project uses a modern color scheme with:
- **Primary Colors**: Blue tones (Sky blue family)
- **Secondary Colors**: Gray/Slate tones for backgrounds and text
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI**: Custom components

## Future Enhancements

- Add authentication and user management
- Implement backend API integration
- Add deals and pipeline management
- Create reporting and analytics dashboards
- Add email integration
- Implement real-time notifications

## Learn More

To learn more about Next.js:
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
