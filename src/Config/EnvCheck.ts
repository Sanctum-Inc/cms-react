export function validateEnv() {
  const requiredVars = [
    "VITE_API_URL",
    "VITE_ROUTER_BASENAME",
    // add more here if needed
  ];

  const missingVars = requiredVars.filter((name) => !import.meta.env[name]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }
}
