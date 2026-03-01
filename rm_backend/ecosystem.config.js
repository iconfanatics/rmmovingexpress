module.exports = {
  apps: [
    {
      name: "rm_backend",
      cwd: "/var/www/rm_backend",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};