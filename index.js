const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening at ${PORT}`));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
