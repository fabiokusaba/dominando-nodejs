import Bee from 'bee-queue';

// Importando Jobs
import DummyJob from "../app/jobs/DummyJob";
import WelcomeEmailJob from "../app/jobs/WelcomeEmailJob";

// Importando as configurações do redis
import redisConfig from "../config/redis";

const jobs = [DummyJob, WelcomeEmailJob];

class Queue {
  constructor() {
    // Propriedade que vai representar todas as filas que vão existir
    this.queues = {};

    this.init();
  }

  // Para cada job que a gente tiver a gente vai ter que rodar um método e instanciar esses jobs e rodar
  // o método init para que popule as queues, ou seja, preencher as queues com os jobs que estão prontos
  // para serem executados
  // Inicializa a fila com todos os jobs possíveis para serem executados
  init() {
    // Percorrendo todos os jobs
    // Aqui como ele vai percorrer todos os jobs e vou ter na prática um objeto job então posso abrir uma
    // desestruturação e chamar o key
    jobs.forEach(({ key, handle }) => {
      // Cada fila vai ter um nome, ou seja, vai existir o DummyJob, WelcomeJob, QualquerCoisaJob
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  // Método que adiciona o que eu quero ou melhor o método que cria um job
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  // Agora a gente precisa de um método que ele seja executado no momento em que a gente startar a fila, esse
  // método vai ser responsável por processar todas as filas
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on("failed", this.handleFailure).process(handle);
    });
  };

  handleFailure(job, err) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Queue: ${job.queue.name}, FAILED `, err);
    }
  };
}

export default new Queue();
