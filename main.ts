// "Committed Strategy" — entry for Laugh Track: The Crypto Trading Joke.
// Trading life, told honestly, in under 200 characters.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My portfolio is down 90%, but technically that's just a very committed long-term strategy.";

function tradingDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function liquidate(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const position of readdirSync(dir)) {
    rmSync(join(dir, position), { recursive: true, force: true });
  }
}

function hodl(): void {
  const dir = tradingDir();
  liquidate(dir);
  if (JOKE.length < 1 || JOKE.length > 200) throw new Error("joke outside 1-200 chars");
  writeFileSync(join(dir, "entry.txt"), JOKE + "\n", "utf8");
  console.log(`position held (${JOKE.length} chars)`);
}

hodl();
