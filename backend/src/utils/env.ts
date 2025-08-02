export function getRequiredEnv(variable: string): string {
  const value = process.env[variable];
  if (!value) throw new Error(`Missing env var: ${variable}`);
  return value;
}

export function getOptionalEnv(variable: string, defaultValue = ''): string {
  return process.env[variable] || defaultValue;
}