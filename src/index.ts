import { DateRange } from "./date";
import { WorkerPool } from "./workers/worker";
import UpdateHandler, { UpdateHandlerInput } from "./workers/update";

const WORKERS = 3

const workerPool = new WorkerPool<UpdateHandlerInput>(WORKERS, new UpdateHandler());

const initialDate = '2024-01-01'
const endDate = '2024-01-12'

const dates = new DateRange().getDatesInRange(initialDate, endDate)

for(const date of dates) {
  workerPool.enqueue({
    date
  })
}
