module.exports = {
    connection: 'smtp',
    smtp: {
      driver: 'smtp',
      pool: true,
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: 'testwebmizan123456789@gmail.com',
        pass: 'mizan123456789%$#@',
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  };
  