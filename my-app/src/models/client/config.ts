import { Client, Account, Databases, Storage } from "appwrite";

// Initialize Appwrite Client
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Project ID

// Services
const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export { client, databases, account, storage };
