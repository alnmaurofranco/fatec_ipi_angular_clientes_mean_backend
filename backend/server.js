// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.end("Welcome to back-end");
// });

// const PORT = process.env.PORT || 3333;

// server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const { app } = require("./app");

const PORT = process.env.PORT || 3333;
// app.set('port', PORT)

app.listen(PORT, () =>
  console.log(`✨ Server started on http://localhost:${PORT}`)
);
