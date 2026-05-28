// src/config/firebase.config.ts
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(__dirname, "../../serviceAccountKey.json");
  
  // Read as buffer and sanitize before parsing
  let raw = fs.readFileSync(serviceAccountPath, "latin1"); // latin1 handles bad chars
  raw = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ""); // strip bad control chars
  
  const serviceAccount = JSON.parse(raw);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export default admin;