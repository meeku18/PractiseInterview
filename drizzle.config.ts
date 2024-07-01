import { defineConfig } from 'drizzle-kit'
export default defineConfig({
 schema: "./utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:WasAXUrT47Jl@ep-aged-dew-a55aurla.us-east-2.aws.neon.tech/neondb?sslmode=require',
  },
  verbose: true,
  strict: true,
})