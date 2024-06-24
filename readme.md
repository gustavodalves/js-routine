# js-routine-concurrency

`js-routine-concurrency` is a JavaScript library that provides utilities for handling concurrent tasks efficiently. This package includes a `WorkerPool` class that allows you to manage and run tasks with a specified number of concurrent workers.

(FIFO) order.

- **WaitGroup**: The `WaitGroup` class is used to wait for a collection of tasks to complete. It has methods to add tasks, mark tasks as done, and wait for all tasks to complete.

- **Handler Interface**: The `Handler` interface defines a `handle` method that takes an input of type `T` and returns a `Promise<void>`. This method is implemented by the user to define the task logic.

- **WorkerPool Class**:
  - `workerCount`: The number of workers that can run concurrently.
  - `handler`: An instance of `Handler<T>` that processes each task.
  - `enqueue(task: T)`: Adds a new task to the queue and starts task execution if there are available workers.
  - `wait()`: Waits for all tasks to be completed.
  - `runTask()`: Internal method to run a task from the queue, manage worker count, and handle task completion.

### Example Usage

```javascript
// Define a handler for the tasks
class MyHandler {
  async handle(task) {
    // Implement your task processing logic here
    console.log(`Processing task: ${task}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
  }
}

// Create a WorkerPool with 3 concurrent workers and the handler
const handler = new MyHandler();
const workerPool = new WorkerPool(3, handler);

// Enqueue tasks
for (let i = 0; i < 10; i++) {
  workerPool.enqueue(`Task ${i}`);
}

// Wait for all tasks to complete
workerPool.wait().then(() => {
  console.log('All tasks completed');
});

### Explanation

1. **Queue**: The `taskQueue` is a queue where tasks are stored before being processed. Each task is a function returning a `Promise<void>`.

2. **WaitGroup**: The `WaitGroup` ensures that the `wait()` method only resolves when all tasks have been processed.

3. **Enqueueing Tasks**: The `enqueue` method adds a task to the queue and triggers task execution. It also increments the wait group counter.

4. **Running Tasks**: The `runTask` method handles the logic of executing tasks. It checks if there are available workers and dequeues a task if possible. It also decrements the wait group counter when a task is done.

5. **Concurrency Control**: The `WorkerPool` controls the number of concurrent tasks through the `workerCount` variable, ensuring no more than the specified number of workers are active at any time.

This `README.md` file provides a comprehensive overview of how to use the `js-routine-concurrency` package, including installation, usage, and a detailed explanation of how the `WorkerPool` class works.

## License

MIT License

All rights reserved to Gustavo Duarte Alves