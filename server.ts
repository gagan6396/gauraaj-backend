import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app";
import { connectRedis } from "./src/config/redisClient";
import admin from "firebase-admin";

dotenv.config();

const PORT = process.env.PORT || 4001;
const DbURL = process.env.DATABASE_URL;

// ── Firebase Admin Init ────────────────────────────────
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("⚠️  Firebase Admin env vars missing — OTP login will not work");
  } else {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
    console.log("🔥 Firebase Admin initialized successfully!");
  }
}

const startServer = async () => {
  try {
    // Validate DB URL
    if (!DbURL) {
      throw new Error(
        "DATABASE_URL is not defined in the environment variables."
      );
    }

    // Connect to the database
    await mongoose.connect(DbURL);
    console.log("🚀 Connected to MongoDB successfully!");

    await connectRedis();

    // Start the server
    app
      .listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
      })
      .on("error", (err) => {
        console.error("❌ Error starting the server:", err.message);
        process.exit(1);
      });
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

startServer();