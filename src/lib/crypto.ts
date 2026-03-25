import crypto from "crypto";

export type EncryptedPayload = {
  ciphertextB64: string;
  ivB64: string;
  authTagB64: string;
};

function normalizeKeyFromEnv(): Buffer {
  const raw = process.env.ENCRYPTION_KEY;
  if (!raw) {
    throw new Error("Missing ENCRYPTION_KEY in env");
  }

  const trimmed = raw.trim();
  const b = Buffer.from(trimmed, "base64");
  if (b.length === 32) return b;

  if (/^[0-9a-fA-F]{64}$/.test(trimmed)) {
    return Buffer.from(trimmed, "hex");
  }

  return crypto.createHash("sha256").update(trimmed, "utf8").digest();
}

export class CryptoUtil {
  private static key(): Buffer {
    return normalizeKeyFromEnv();
  }

  static encryptUtf8(plaintext: string): EncryptedPayload {
    if (!plaintext) throw new Error("Nothing to encrypt");

    const key = this.key();
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const ciphertext = Buffer.concat([
      cipher.update(Buffer.from(plaintext, "utf8")),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return {
      ciphertextB64: ciphertext.toString("base64"),
      ivB64: iv.toString("base64"),
      authTagB64: authTag.toString("base64"),
    };
  }

  static decryptUtf8(payload: EncryptedPayload): string {
    const key = this.key();
    const iv = Buffer.from(payload.ivB64, "base64");
    const authTag = Buffer.from(payload.authTagB64, "base64");
    const ciphertext = Buffer.from(payload.ciphertextB64, "base64");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return plaintext.toString("utf8");
  }
}
