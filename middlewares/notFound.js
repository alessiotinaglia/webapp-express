export default function notFound(req, res) {
    res.status(404).json({ error: "Risorsa non trovata" });
}
