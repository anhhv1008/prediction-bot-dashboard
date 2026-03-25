module.exports = {
  apps: [
    {
      name: "prediction-dashboard",
      script: "npm",
      args: "start",
      cwd: "./",
      autorestart: true,
      watch: false,
    },
  ],
};
