import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

/**
 * Encrypts a plaintext string using AES-256-GCM.
 * Format: iv(hex) + authTag(hex) + ciphertext(hex)
 */
export function encrypt(plaintext: string): string {
  const keyHex = process.env.TOKEN_ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error('TOKEN_ENCRYPTION_KEY must be a 32-byte hex string (64 characters).');
  }

  const key = Buffer.from(keyHex, 'hex');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM as any, key as any, iv as any) as crypto.CipherGCM;

  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  // iv(24 chars) + authTag(32 chars) + ciphertext
  return iv.toString('hex') + authTag + ciphertext;
}

/**
 * Decrypts a ciphertext string using AES-256-GCM.
 */
export function decrypt(ciphertext: string): string {
  const keyHex = process.env.TOKEN_ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
    throw new Error('TOKEN_ENCRYPTION_KEY must be a 32-byte hex string (64 characters).');
  }

  const key = Buffer.from(keyHex, 'hex');

  // iv is 12 bytes = 24 hex chars
  // authTag is 16 bytes = 32 hex chars
  const ivHex = ciphertext.slice(0, 24);
  const authTagHex = ciphertext.slice(24, 56);
  const encryptedHex = ciphertext.slice(56);

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM as any, key as any, iv as any) as crypto.DecipherGCM;

  decipher.setAuthTag(authTag as any);

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
