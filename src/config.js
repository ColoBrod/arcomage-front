const env = process.env.NODE_ENV;

const config = {
  production: {
    frontendUrl: "http://79.143.31.142:3001",
    backendUrl: "http://79.143.31.142:3010",
  },
  development: {
    frontendUrl: "http://127.0.0.1:3001",
    backendUrl: "http://127.0.0.1:3010",
  },
};

if (!config[env]) throw new Error("Не настроены переменные окружения");

export default config[env];