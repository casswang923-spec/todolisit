import { createClient } from "@libsql/client";

async function test() {
  console.log("Testing Turso connection...");

  const client = createClient({
    url: "libsql://todolist-casswang.aws-ap-northeast-1.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzYyNTY3NDksImlkIjoiMDE5ZDkxMjYtNmQwMS03ZTJkLTlmZjQtNmNlZjgwODFiOWFhIiwicmlkIjoiMjgxZGE4NjAtNTZlNC00OWI3LWE5MGQtNjRlMmYxM2UwNzBhIn0.QpBODCoZ_Yt7zsOxQbXrFTYhbKdWrha0qym_x2EjOoo8tLdCbK5QSYm68HzWKSnKMQPHlkHlEZqibRbi8MO-Aw",
  });

  try {
    // Test creating a category
    const result = await client.execute({
      sql: `INSERT INTO "Category" (id, name, color, "createdAt", "updatedAt") VALUES (?, ?, ?, datetime('now'), datetime('now'))`,
      args: ["test-id-1", "Test Category", "#ff0000"],
    });
    console.log("Insert result:", result);

    // Test reading categories
    const categories = await client.execute({
      sql: `SELECT * FROM "Category"`,
    });
    console.log("All categories:", categories.rows);

    // Clean up
    await client.execute({
      sql: `DELETE FROM "Category" WHERE id = ?`,
      args: ["test-id-1"],
    });
    console.log("Deleted test category");

    console.log("All tests passed!");
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
