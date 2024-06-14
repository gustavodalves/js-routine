import { Queue } from "../queue";

export interface Handler<T> {
  handle(input: T): Promise<void>;
}
  
export class WorkerPool<T> {
    private taskQueue = new Queue<() => Promise<void>>();
    private activeWorkers: number = 0;
  
    constructor(
      private workerCount: number,
      private handler: Handler<T>
    ) {}
  
    enqueue(task: T): void {
      this.taskQueue.enqueue(() => this.handler.handle(task));
      this.runTask();
    }
  
    private async runTask(): Promise<void> {
      if (this.taskQueue.isEmpty() || this.activeWorkers >= this.workerCount) {
        return;
      }

      this.activeWorkers++;
      const task = this.taskQueue.dequeue()!;
      await task();
      this.activeWorkers--;
      this.runTask();
    }
}
