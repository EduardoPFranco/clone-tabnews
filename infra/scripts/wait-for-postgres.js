const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev --host localhost pg_isready", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\nPostgres está pronto e aceitando conexões!\n");
  }
}

console.log("\nAguardando Postgres aceitar conexões.");
checkPostgres();
