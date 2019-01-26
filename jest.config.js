module.exports = {
    verbose: true,
    transform: {
        ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    },
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    setupTestFrameworkScriptFile: "./test/_setup.ts",
    moduleFileExtensions: ["ts", "tsx", "js"],
    coveragePathIgnorePatterns: ["/node_modules/", "/test/", "/src/styles/", "src/index.ts"],
    coverageThreshold: {
        global: {
            branches: 60,
            functions: 60,
            lines: 60,
            statements: 60,
        },
    },
    collectCoverageFrom: ["src/*.{js,ts,tsx}"],
};