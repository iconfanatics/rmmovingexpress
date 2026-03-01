module.exports = {
  apps: [
    {
      name: "rm_client",
      cwd: "/var/www/rm_client",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
