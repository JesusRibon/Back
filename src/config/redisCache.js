const cache = new Map();

export const setCache = (key, value, ttl = 60) => {
  cache.set(key, { value, expireAt: Date.now() + ttl * 1000 });
};

export const getCache = (key) => {
  const data = cache.get(key);
  if (!data) return null;

  if (Date.now() > data.expireAt) {
    cache.delete(key);
    return null;
  }
  return data.value;
};
