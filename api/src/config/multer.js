// O multer é uma biblioteca do node responsável pela parte de upload de arquivos
import multer from "multer";

// Para fazer a estratégia de manipulação/geração de nome de arquivo para caracteres hexadecimais aleatórios
// a gente vai utilizar o crypto
import crypto from "crypto";

// Para lidar com a situação de resolução do path/caminho da pasta onde vamos guardar nossos arquivos vamos
// precisar importar o extname e o resolve do path
import { extname, resolve } from "path";

export default {
  // O multer suporta diversos storages: files, aws s3, digital ocean, google, ms
  // No nosso caso vamos gravar o arquivo dentro do disco, ou seja, ele vai ficar aqui dentro da aplicação
  storage: multer.diskStorage({
    // O destination vai ser o diretório que vou guardar os arquivos
    destination: resolve(__dirname, "..", "..", "tmp", "uploads"),
    // O filename é a estratégia de nome de arquivo que vou adotar
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);
        // Transformando a string (nome do arquivo) em um hexadecimal e vamos concatenar esse hexadecimal gerado
        // com a parte da extensão do arquivo e para isso vamos utilizar o extname
        return callback(null, res.toString("hex") + extname(file.originalname));
      });
    },
  }),
}
