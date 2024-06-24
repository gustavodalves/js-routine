# js-routine-concurrency

`js-routine-concurrency` is a JavaScript library that provides utilities for handling concurrent tasks efficiently. This package includes a `WorkerPool` class that allows you to manage and run tasks with a specified number of concurrent workers.

## Installation

You can install `js-routine-concurrency` via npm:

```sh
npm install js-routine-concurrency
```

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
class MyHandler implements Handler<string> {
  async handle(task: string) {
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
```

This `README.md` file provides a comprehensive overview of how to use the `js-routine-concurrency` package, including installation, usage, and a detailed explanation of how the `WorkerPool` class works.

## License

MIT License

All rights reserved to Gustavo Duarte Alves