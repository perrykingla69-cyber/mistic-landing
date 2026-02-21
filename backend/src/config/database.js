export const databaseConfig = {
  provider: 'postgresql',
  url: process.env.DATABASE_URL || 'postgres://localhost:5432/sonora_mystic'
};
