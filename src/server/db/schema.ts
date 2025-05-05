// import "server-only";

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
    ownerID: text("ownerID").notNull(),

    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
    url: text("url").notNull(),
    size: int("size").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),

}, (t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerID)
  ]
});

export type DB_File = typeof files_table.$inferSelect;

export const folder_table = createTable("folders_table", {
  id: bigint({mode: "number", unsigned: true}).primaryKey().autoincrement(),
  ownerID: text("ownerID").notNull(),

  name: text("name").notNull(),

  parent: bigint("parent", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at").notNull().defaultNow()

}, (t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerID)
  ]
});

export type DB_Folder = typeof folder_table.$inferSelect; 