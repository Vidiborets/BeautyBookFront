/** @type {import('jest').Config} */
module.exports = {
  // Используем ts-jest как базу
  preset: "ts-jest",

  // Для React-компонентов нужен jsdom, а не node
  testEnvironment: "jsdom",

  // Где искать тесты
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx)",
  ],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Алиасы под твою src-архитектуру
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@stores/(.*)$": "<rootDir>/src/stores/$1",
    "^@testing/(.*)$": "<rootDir>/src/testing/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",

    // моки для стилей и файлов
    "\\.(css|less|scss|sass)$": "<rootDir>/src/testing/styleMock.ts",
    "\\.(gif|jpg|jpeg|png|svg)$": "<rootDir>/src/testing/fileMock.ts",
  },

  // общий сетап для RTL и jest-dom
  setupFilesAfterEnv: ["<rootDir>/src/testing/jest.setup.ts"],

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};
