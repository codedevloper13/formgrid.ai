# FormGrid.ai - AI-Powered Form Builder Platform

<div align="center">
  <img src="public/logo.png" alt="FormGrid.ai Logo" width="200"/>
  <p><em>Transform your ideas into professional forms in seconds with AI</em></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
</div>

## Why FormGrid.ai?

FormGrid.ai revolutionizes form creation by combining artificial intelligence with an intuitive user interface. Whether you're collecting customer feedback, creating surveys, or building contact forms, FormGrid.ai streamlines the entire process.

### Key Features

 **AI-Powered Form Generation**
- Transform natural language descriptions into complete form structures
- Smart field type detection and validation rules
- Intelligent form layout suggestions
- Context-aware field grouping

 **Professional Form Builder**
- Drag-and-drop interface for manual form creation
- 20+ pre-built form templates
- Custom styling and branding options
- Mobile-responsive designs

 **Enterprise-Grade Security**
- SOC2 compliant infrastructure
- End-to-end encryption
- GDPR and CCPA compliant
- Regular security audits

 **Advanced Analytics**
- Real-time form submission tracking
- Response analytics dashboard
- Custom report generation
- Data export capabilities

 **Seamless Integration**
- REST API for custom integrations
- Webhook support
- Export to popular CRM platforms
- Integration with 1000+ apps via Zapier

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 13+
- NPM or Yarn package manager

### Quick Start

1. **Clone & Install**
```bash
git clone https://github.com/formgrid/formgrid.ai.git
cd formgrid.ai
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env.local
```
Update the following variables in `.env.local`:
```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/formgrid"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID="G-XXXXXXXXXX"
```

3. **Setup Database**
```bash
npx prisma migrate dev
npx prisma generate
```

4. **Start Development Server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start building forms!

## Usage Examples

### AI Form Generation
```typescript
// Example: Generate a contact form
const form = await FormGrid.generate({
  description: "Create a contact form with name, email, and message fields",
  template: "contact",
  validation: true
});
```

### Manual Form Creation
```typescript
// Example: Create a custom form
const form = await FormGrid.createForm({
  title: "Customer Feedback",
  fields: [
    { type: "rating", label: "How satisfied are you?" },
    { type: "text", label: "What could we improve?" }
  ]
});
```

## Documentation

Comprehensive documentation is available at [docs.formgrid.ai](https://docs.formgrid.ai):

- [Quick Start Guide](https://docs.formgrid.ai/quickstart)
- [API Reference](https://docs.formgrid.ai/api)
- [Form Templates](https://docs.formgrid.ai/templates)
- [Integration Guides](https://docs.formgrid.ai/integrations)
- [Security & Compliance](https://docs.formgrid.ai/security)

## Technology Stack

### Frontend
- **Framework**: Next.js 15  with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS, Shadcn UI
- **State Management**: Zustand
- **Forms**: React Hook Form, Zod

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Clerk
- **API**: tRPC
- **Caching**: Redis

### Infrastructure
- **Hosting**: Vercel
- **Database Hosting**: Neon
- **CDN**: Vercel Edge Network
- **Media Storage**: Cloudinary
- **Monitoring**: Sentry

## Enterprise Support

FormGrid.ai offers enterprise-grade support and custom solutions:

- Dedicated support team
- Custom feature development
- SLA guarantees
- On-premise deployment options
- Custom integration development

Contact our [sales team](mailto:enterprise@formgrid.ai) for more information.

## Roadmap

- [ ] AI form optimization suggestions
- [ ] Advanced form analytics
- [ ] Custom workflow automation
- [ ] Enhanced enterprise features
- [ ] Mobile app development

## Community & Support

- [Community Forum](https://community.formgrid.ai)
- [Discord Server](https://discord.gg/formgrid)
- [Twitter](https://twitter.com/formgridai)
- [Email Support](mailto:support@formgrid.ai)

## License

FormGrid.ai is available under two licenses:

- **Community Edition**: MIT License
- **Enterprise Edition**: [Commercial License](https://formgrid.ai/license)

---

<div align="center">
  <p>Built with ❤️ by the FormGrid Team(Codedevloper13)</p>
  <p>
    <a href="https://formgrid.ai">Website</a> •
    <a href="https://docs.formgrid.ai">Documentation</a> •
    <a href="https://github.com/formgrid/formgrid.ai">GitHub</a> •
    <a href="https://twitter.com/formgridai">Twitter</a> •
    <a href="https://linkedin.com/company/formgrid">LinkedIn</a>
  </p>
</div>
