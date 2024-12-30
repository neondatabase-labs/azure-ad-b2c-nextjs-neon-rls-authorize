<img width="250px" src="https://neon.tech/brand/neon-logo-dark-color.svg" />

# Azure AD B2C + Neon Authorize Example (SQL from the Frontend and Backend)

A quick start Next.js template demonstrating secure user authentication and authorization using Neon Authorize with Azure AD B2C integration. This guide primarily uses SQL from the backend to enforce row-level security policies.

## Features

- Next.js application with TypeScript
- User authentication powered by Azure AD B2C
- Row-level security using Neon Authorize
- Database migrations with Drizzle ORM
- Ready-to-deploy configuration for Vercel, Netlify, and Render

## Prerequisites

- [Neon](https://neon.tech) account with a new project
- [Azure AD B2C](https://azure.microsoft.com/en-us/products/active-directory-b2c) tenant and application registration
- Node.js 18+ installed locally

## One-Click Deploy

Deploy directly to your preferred hosting platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/neondatabase-labs/azure-ad-b2c-nextjs-neon-authorize&env=DATABASE_URL,DATABASE_AUTHENTICATED_URL,NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID&project-name=azure-ad-b2c-neon-authorize&repository-name=azure-ad-b2c-nextjs-neon-authorize)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/neondatabase-labs/azure-ad-b2c-nextjs-neon-authorize)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/neondatabase-labs/azure-ad-b2c-nextjs-neon-authorize)

> **Important**: After deployment, ensure your application's URL is added as a **Redirect URI** in your Azure AD B2C application registration (Platform type: **Single-page application (SPA)**).

![Azure AD B2C Redirect URI](/images/azure-ad-b2c-redirect-uri.png)

## Local Development Setup

### 1. Configure Azure AD B2C

1. Navigate to your Azure portal and access your B2C tenant.
2. Open the **App registrations** blade.
3. Select your application or create a new one.
4. Under **Authentication**, add `http://localhost:3000` to the **Redirect URIs**. Ensure the platform is set to **Single-page application (SPA)**.

![Azure AD B2C Localhost Redirect URI](/images/azure-ad-b2c-localhost-redirect-uri.png)

5. Copy the **Application (client) ID** and **Directory (tenant) ID** for later use.

![Azure AD B2C App Registration](/images/azure-ad-b2c-app-registration.png)

### 2. Set Up Neon Authorize

1. Open your Neon Console and click "Authorize".
2. Add a new authentication provider.
3. Set the JWKS URL to: `https://{YOUR_DIRECTORY_TENANT_ID}/.well-known/jwks.json`
   > Replace `{YOUR_DIRECTORY_TENANT_ID}` with your Azure AD B2C **Directory (tenant) ID** which you copied earlier.

![Neon Authorize Add Auth Provider](/images/neon-authorize-add-auth-provider-azure-ad-b2c.png)

### 3. Local Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/neondatabase-labs/azure-ad-b2c-nextjs-neon-authorize
   cd azure-ad-b2c-nextjs-neon-authorize
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with the following variables based on `.env.template`:

   ```env
   # Database connections
   DATABASE_URL=              # neondb_owner role connection
   DATABASE_AUTHENTICATED_URL= # authenticated role connection

   # Azure AD B2C configuration
   NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID=<YOUR_AZURE_AD_B2C_APPLICATION_CLIENT_ID>
   ```

   > Replace `<YOUR_AZURE_AD_B2C_APPLICATION_CLIENT_ID>` with the **Application (client) ID** of your Azure AD B2C application registration.

4. Set up the database:

   ```bash
   npm run drizzle:generate  # Generate migrations
   npm run drizzle:migrate  # Apply migrations
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` to see the application running.

![Azure AD B2C Next.js Example](/images/azure-ad-b2c-nextjs-example.png)

## Learn More

- [Neon Authorize Tutorial](https://neon.tech/docs/guides/neon-authorize-tutorial)
- [Simplify RLS with Drizzle](https://neon.tech/docs/guides/neon-authorize-drizzle)
- [Neon Authorize + Azure AD B2C Integration](https://neon.tech/docs/guides/neon-authorize-azure-ad)

## Authors

- [David Gomes](https://github.com/davidgomes)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
