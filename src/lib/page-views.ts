import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const INITIAL_VIEW_COUNT = 587432;
const databaseDirectory = join(process.cwd(), "data");
const databasePath = join(databaseDirectory, "views.sqlite");

let database: DatabaseSync | undefined;

function getDatabase() {
  if (!database) {
    mkdirSync(databaseDirectory, { recursive: true });
    database = new DatabaseSync(databasePath);
    database.exec("PRAGMA busy_timeout = 5000;");
    database.exec(`
      CREATE TABLE IF NOT EXISTS site_counter (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        value INTEGER NOT NULL
      );
      INSERT INTO site_counter (id, value)
      VALUES (1, ${INITIAL_VIEW_COUNT})
      ON CONFLICT(id) DO NOTHING;
    `);
  }

  return database;
}

function readPageViews() {
  const result = getDatabase()
    .prepare("SELECT value FROM site_counter WHERE id = 1")
    .get() as { value: number } | undefined;

  if (!result) {
    throw new Error("تعذر قراءة عداد المشاهدات");
  }

  return result.value;
}

export function incrementPageViews() {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return readPageViews();
  }

  const result = getDatabase()
    .prepare("UPDATE site_counter SET value = value + 1 WHERE id = 1 RETURNING value")
    .get() as { value: number } | undefined;

  if (!result) {
    throw new Error("تعذر تحديث عداد المشاهدات");
  }

  return result.value;
}
