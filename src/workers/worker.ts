import { Queue } from "../data-structure/queue";
import WaitGroup from "../wait-group";

export interface Handler<T> {
  handle(input: T): Promise<void>;
}

export class WorkerPool<T> {
  private taskQueue = new Queue<() => Promise<void>>();
  private activeWorkers: number = 0;
  private wg = new WaitGroup()

  constructor(
    private workerCount: number,
    private handler: Handler<T>
  ) {}

  enqueue(task: T): void {
    this.taskQueue.enqueue(() => this.handler.handle(task));
    this.runTask();
    this.wg.add()
  }

  async wait() {
    await this.wg.wait()
  }

  private async runTask(): Promise<void> {
    if (this.activeWorkers >= this.workerCount || this.taskQueue.isEmpty()) {
      return;
    }

    this.activeWorkers++;
    const task = this.taskQueue.dequeue();
    if (task) {
      try {
        await task();
      } finally {
        this.activeWorkers--;
        this.wg.done()
        this.runTask();
      }
    } else {
      this.activeWorkers--;
    }
  }
}
