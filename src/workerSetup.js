export default class WorkerSetup {
  constructor(worker) {
    const code = worker.toString();
    const blod = new Blob([`(${code})()`]);
    return new Worker(URL.createObjectURL(blod));
  }
}
