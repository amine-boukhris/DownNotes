import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,         // use describe/it/expect globally
    environment: 'node',   // since you're testing Express
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/tests/**/*.test.ts'],
  },
});
