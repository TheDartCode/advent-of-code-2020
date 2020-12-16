import { performance } from "perf_hooks";

export class PerformanceMonitor {
  start = performance.now();
  constructor(tag: string) {}

  public tick(): number {
    const now = performance.now();
    const diff = now - this.start;
    this.start = now;
    return diff;
  }
}
