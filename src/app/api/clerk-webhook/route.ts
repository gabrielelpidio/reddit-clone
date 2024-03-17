import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { env } from "~/env";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = (await req.json()) as unknown;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the event type
  const eventType = evt.type;

  if (!eventType) {
    return new Response("Error occured -- event type", {
      status: 400,
    });
  }

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      first_name,
      last_name,
      username,
      image_url,
      email_addresses,
      primary_email_address_id,
    } = evt.data;

    // Get the primary email address
    const primaryEmail = email_addresses.find(
      (email) => email.id === primary_email_address_id,
    );

    if (typeof primaryEmail === "undefined") {
      return new Response("Error occured -- primary email", {
        status: 400,
      });
    }

    // Get the user
    const user = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    // If the user is not found, create a new user
    if (typeof user === "undefined") {
      await db.insert(schema.users).values({
        id: id,
        username,
        firstName: first_name,
        lastName: last_name,
        email: primaryEmail.email_address,
        profilePicture: image_url,
      });
    } else {
      // Update the user
      await db
        .update(schema.users)
        .set({
          id: id,
          username,
          firstName: first_name,
          lastName: last_name,
          email: primaryEmail.email_address,
          profilePicture: image_url,
        })
        .where(eq(schema.users.id, id));
    }
  }

  return new Response("", { status: 200 });
}
