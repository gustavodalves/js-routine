import { LinkedList } from "./linked-list";

export class Queue<T> {
    private items: LinkedList<T> = new LinkedList<T>();

    enqueue(item: T): void {
        this.items.insert(item);
    }

    dequeue(): T | undefined {
        return this.items.removeTail()?.data;
    }

    isEmpty(): boolean {
        return !this.items.head;
    }
}
