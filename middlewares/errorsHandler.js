export default function errorsHandler(err, req, res, next) {
    console.error("Errore:", err);
    res.status(500).json({ error: "Errore interno del server" });
}
