import Sequelize, { Model } from "sequelize";

// Importando a biblioteca bcrypt para criptografia de senhas
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      // Dentro do sequelize podemos criar campos virtuais que só serve para eu capturar a informação aqui
      // e ele não vai persistir enquanto o objeto existir a informação existe mas ele não vai persistir no
      // banco de dados mas é o suficiente para definirmos o password do nosso usuário
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    }, {
      sequelize,
      name: {
        singular: "user",
        plural: "users",
      },
    });
    // Método estático para criptografia de senhas
    // Hook em inglês significa gancho, então todas as vezes que eu quiser executar alguma coisa, no nosso caso
    // a criação de um usuário, antes de salvar eu quero gerar esse password_hash que está aqui passe por um
    // processo de criptografia e para isso vamos utilizar o bcryptjs
    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }

  // Método de associação
  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: "file_id",
    });
  }

  // Criando o método para verificação da senha
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
