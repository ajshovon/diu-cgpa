const raw = process.env.APIS || "http://127.0.0.1:8787";
const cleaned = raw.replace(/['"]+/g, ""); // Remove quotes if present
const APIS: string[] = cleaned
  .split(" ")
  .map((api) => api.trim())
  .filter(Boolean);

export function getApi(): string {
  return APIS[Math.floor(Math.random() * APIS.length)];
}
