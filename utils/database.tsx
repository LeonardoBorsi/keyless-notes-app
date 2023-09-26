import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CreateNoteVariables, EditNoteVariables } from "./types";
import { getCurrentDatetime } from "./utils";

//let dbConnection: Database | null = null;

export const openDBConnection = async () => {
  //if (process.env.NODE_ENV === 'development') {
    try {
      const db: Database = await open({
        filename: "./notes.sqlite",
        driver: sqlite3.Database,
      });
      return db;
    } catch (error) {
      console.error("Error connecting to db:", error);
    }
  /* } else {
    if (!dbConnection) {
      console.log("CONNECTING to :memory: DB")
      try {
        dbConnection = await open({
          filename: ":memory:",
          driver: sqlite3.Database,
        });
        await dbConnection.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, text TEXT, updatedAt DATETIME)");
      } catch (error) {
        console.error("Error connecting to db:", error);
      }
    }
    return dbConnection;
  } */
}


export const getAllNotes = async () => {
  const db = await openDBConnection();
  if (db) {
    const result = await db.all("SELECT * FROM notes ORDER BY updatedAt DESC", (err: Error | null) => { 
      if(err) {
        return err;
      }
    });
    return result;
  }
}

export const getNote = async (id: string) => {
  const db = await openDBConnection();
  if (db) {
    const result = await db.get("SELECT * FROM notes WHERE id = ?", [id], (err: Error | null) => {
      if (err) {
        return err;
      }
    });
    return result;
  }
}

export const insertNote = async ({ title, text } : CreateNoteVariables) => {
  const db = await openDBConnection();
  if (db) {
    const sql = `INSERT INTO notes (title, text, updatedAt) VALUES (?, ?, ?)`;
    const values = [
      title,
      text,
      getCurrentDatetime()
    ]

    await db.run(sql, values, (err: Error | null) => { 
      if(err) {
        return err;
      }
    });
  }
}

export const editNote = async ({ id, title, text } : EditNoteVariables) => {
  const db = await openDBConnection();
  if (db) {
    const sql = `UPDATE notes SET title = ?, text = ?, updatedAt = ? WHERE id = ?`;
    const values = [
      title,
      text,
      getCurrentDatetime(),
      id,
    ]

    await db.run(sql, values, (err: Error | null) => { 
      if(err) {
        return err;
      }
    });
  }
}

export const deleteNote = async (id: string) => {
  const db = await openDBConnection();
  if (db) {
    const sql = `DELETE FROM notes WHERE id = ?`;
    
    await db.run(sql, [id], (err: Error | null) => { 
      if(err) {
        return err;
      }
    });
  }
}