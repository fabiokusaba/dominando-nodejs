// Importando o nosso model
import File from "../models/File";

class FilesController {
  async create(req, res) {
    // Precisamos gravar duas informações que é o originalName, nome original do arquivo, e o filename que no
    // caso é o nome que está gravado no banco de dados
    // Recuperando do req.file as duas informações que precisamos, no processo de desestruturação vou jogar o
    // conteúdo recebido para uma nova variável
    const { originalname: name, filename: path } = req.file;

    // No método create eu preciso passar o name e o path que são o originalName e o filename
    const file = await File.create({ name, path });

    res.json(file);
  }
}

export default new FilesController();
