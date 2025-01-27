import "dotenv/config";

// Precisamos criar um arquivo que fique localizado junto ao app/server porque uma coisa é subir o express
// como fizemos no arquivo app e outra coisa é executar a fila, a fila não executa junto com o nodejs porque
// se não eu não separo as duas coisas por isso devem rodar em processos distintos
import Queue from "./lib/Queue";

Queue.processQueue();
