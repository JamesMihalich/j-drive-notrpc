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
)

export const files = createTable("files_table", 
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
})

export const folders = createTable("folders_table", {
  id: bigint({mode: "number", unsigned: true}).primaryKey().autoincrement(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
}, (t) => {
  return [
    index("parent_index").on(t.parent)
  ]
})