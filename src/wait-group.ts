export default class WaitGroup {
    private count: number = 0
    private resolvePromise: (() => void) | null = null
    private promise: Promise<void> | null = null

    add(amount: number = 1) {
        if (this.count === 0) {
            this.promise = new Promise<void>((resolve) => {
                this.resolvePromise = resolve
            })
        }
        this.count += amount
    }

    done() {
        if (this.count > 0) {
            this.count -= 1
            if (this.count === 0 && this.resolvePromise) {
                this.resolvePromise()
                this.resolvePromise = null
                this.promise = null
            }
        }
    }

    wait(): Promise<void> {
        return this.promise || Promise.resolve()
    }
}
