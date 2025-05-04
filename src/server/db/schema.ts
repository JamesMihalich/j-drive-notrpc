import "server-only";

import { 
  bigint,
  int, 
  text, 
  timestamp, 
  singlestoreTable, 
  index, 
  singlestoreTableCreator} from "drizzle-orm/singlestore-core"

export const createTable = singlestoreTableCreator (
  (name) => `drive_tutorial_${name}`
);

export const files_table = createTable("files_table", 
  {
    id: bigint({mode: "number", unsigned: true})
      .primaryKey().autoincrement(),

    name: text("name").notNull(),
    type: text("type").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
    url: text("url").notNull(),
    size: int("size").notNull(),
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ]
});

export type DB_File = typeof files_table.$inferSelect;

export const folder_table = createTable("folders_table", {
  id: bigint({mode: "number", unsigned: true}).primaryKey().autoincrement(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ]
});

export type DB_Folder = typeof folder_table.$inferSelect; 