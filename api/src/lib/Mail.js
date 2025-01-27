// Classe responsável pelo envio de emails
import nodemailer from "nodemailer";

// Importando as configurações de mail
import mailConfig from "../config/mail";

class Mail {
  // Primeiro precisamos de um construtor que vai criar aqui uma propriedade chamada transporter
  constructor() {
    // Fazendo uma verificação que se caso exista auth nós vamos utilizar, caso contrário não
    const { host, port, secure, auth } = mailConfig;

    // O transporter é uma propriedade que vai guardar o nodemailer.Transport que é o próprio objeto
    // que o nodemailer vai criar
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
  }

  // Vamos criar o método send em que a gente vai enviar o email
  send(message) {
    // O método sendMail basicamente o que você precisa fazer é colocar a message
    return this.transporter.sendMail({
      // Concatenando esses dois objetos dentro do sendMail
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
