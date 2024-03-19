# Reddit Clone App

## How to Run the Project

1. Clone the project and install the dependencies with `pnpm install`.
2. Create a database in [Neon](https://neon.tech/docs/get-started-with-neon/signing-up) or in another PostgreSQL provider, obtain the connection string and add it as `DATABASE_URL` within the `.env` file.
3. Create a [Clerk](https://clerk.com/docs/quickstarts/setup-clerk) account and project.
4. Configure only the Google provider and enable username within `User & Authentication > Email, Phone, Username` in the Clerk dashboard.
5. Populate the following [environment variables with your Clerk credentials](https://clerk.com/docs/quickstarts/nextjs#set-your-environment-variables):
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
6. Create a webhook endpoint in Clerk with the `user.created` and `user.updated` events (see [Clerk's documentation](https://clerk.com/docs/integrations/webhooks/sync-data) for more information), if you are running the project locally, you can use [ngrok](https://ngrok.com/) or [untun](https://github.com/unjs/untun) to expose your local server to the internet.
7. Populate the `CLERK_WEBHOOK_SIGNING_SECRET` environment variable with the [webhook signing secret](https://clerk.com/docs/integrations/webhooks/sync-data#add-your-signing-secret-to-your-env-local-file).
8. Run the following command with your package manager to push the database schema:

```sh
pnpm run db:push
```

8. Run the project with `pnpm run dev`.
