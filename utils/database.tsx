import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { CreateNoteVariables, EditNoteVariables } from "./types";
import { getCurrentDatetime } from "./utils";

export const openDBConnection = async () => {
  try {
    const db: Database = await open({
      filename: ":memory:",
      driver: sqlite3.Database,
    });
    return db;
  } catch (error) {
    console.error("Error connecting to db:", error);
  }
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
  const sql = `DELETE FROM notes WHERE id = ?`;

  if (db) {
    await db.run(sql, [id], (err: Error | null) => { 
      if(err) {
        return err;
      }
    });
  }
}