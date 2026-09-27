// Simple in-memory Client-Side TTL Cache
const cacheStore = new Map();
const DEFAULT_TTL_MS = 15000; // 15 seconds cache lifetime

export const cacheService = {
  get(key) {
    const record = cacheStore.get(key);
    if (!record) return null;

    const isExpired = Date.now() > record.expiresAt;
    if (isExpired) {
      cacheStore.delete(key);
      console.log(`[Cache EXPIRED] Key: "${key}"`);
      return null;
    }

    console.log(`[Cache HIT] Key: "${key}" (Valid for ${Math.round((record.expiresAt - Date.now()) / 1000)}s)`);
    return record.data;
  },

  set(key, data, ttlMs = DEFAULT_TTL_MS) {
    const expiresAt = Date.now() + ttlMs;
    cacheStore.set(key, { data, expiresAt });
    console.log(`[Cache SET] Key: "${key}" (TTL: ${ttlMs / 1000}s)`);
  },

  clear() {
    cacheStore.clear();
    console.log("[Cache CLEARED] All cached entries removed.");
  },

  size() {
    return cacheStore.size;
  }
};
