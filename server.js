import express from "express";
import cors from "cors";
import 'dotenv/config';
import "./connection.js";
import postsRouter from "./router/posts.js";
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rotte principali
app.get("/", (req, res) => {
    res.send("Benvenuto nell'API del blog!");
});

app.use("/movies", postsRouter);
app.use(errorsHandler);
app.use(notFound);

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
