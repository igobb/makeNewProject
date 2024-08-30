const packageJson = (nameOfFile) => {
  const packageJsonObject = {
    name: nameOfFile.toLowerCase(),
    version: "1.0.0",
    description: "",
    main: "index.js",
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
      lint: "eslint .",
      "lint:fix": "eslint --fix .",
    },
    keywords: [],
    author: "",
    license: "ISC",
    type: "module",
    dependencies: {
      l8: "file:",
    },
    devDependencies: {
      "@types/node-fetch": "^2.6.11",
      eslint: "^8.57.0",
      "eslint-config-airbnb-base": "^15.0.0",
      "eslint-config-prettier": "^9.1.0",
      "eslint-plugin-import": "^2.29.1",
      "eslint-plugin-prettier": "^5.2.1",
      prettier: "^3.3.3",
    },
  };

  return packageJsonObject;
};

export default packageJson;
