const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./notes.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      text TEXT,
      updatedAt DATETIME
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created notes table");

      db.run(`DELETE FROM notes`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from notes");

        const values1 = [
          "Prova 1",
          "Testo 1",
          "2023-09-22 10:41:00",
        ];
        const values2 = [
          "Prova 2",
          "Testo 2",
          "2023-09-22 10:42:00",
        ];

        const insertSql = `INSERT INTO notes(title, text, updatedAt) VALUES(?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Rows inserted, ID ${id}`);
        });

        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});