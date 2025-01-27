// Configurações de envio de email utilizando o mailtrap.io
export default {
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "2<PASSWORD>",
    pass: "<PASSWORD>"
  },
  default: {
    from: "Sistema <naoresponda@email.com>",
  }
};
