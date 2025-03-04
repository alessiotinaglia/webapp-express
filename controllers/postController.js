import connection from "../connection.js";

// fa una copia e filtra 
function index(req, res) {
    const sql = "SELECT * FROM movies"
    connection.query(sql, ((error, results) => {
        if (error) { return res.status(500).json({ error: "errore nella chiamata" }) }
        let data = results;
        const response = {
            totalCount: results.length,
            data,
        }
        res.json(response);
    }))
};

// funzione che trova per l'id - una sola
function show(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID non valido" });
    }
    // film
    const sqlMovie = "SELECT * FROM movies WHERE `id` = ?";
    connection.query(sqlMovie, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Errore nella chiamata al database" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Film non trovato" });
        }
        const movie = results[0];

        // Recensioni
        const sqlReviews = "SELECT * FROM `reviews` WHERE `movie_id` = ?";
        connection.query(sqlReviews, [id], (reviewError, reviewResults) => {
            if (reviewError) {
                return res.status(500).json({ error: "Errore nella chiamata al database per le recensioni" });
            }
            movie.reviews = reviewResults;
            res.json({ success: true, data: movie });
        });
    });
}

// Create - Store - crea uno nuovo
function store(req, res) {

};
// salvataggio reviews del form
function storeReviews(req, res) {
    const { id } = req.params;
    const { text, name, vote } = req.body;
    const sql =
        "INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)";

    connection.query(sql, [text, name, vote, id], (err, results) => {
        if (err) {
            console.error("Errore SQL:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        console.log("Recensione aggiunta:", results);
        res.status(201).json({ message: "Review added", id: results.insertId });
    });

};

// Update totale - Update - Modifica 
function update(req, res) {

}

// Update parziale - Modify - modifica solo parziale
function modify(req, res) {

};

// Delete (cancellazione) - Destroy - elimina
function destroy(req, res) {
    const { id } = req.params;

    const checkSql = 'SELECT * FROM movies WHERE id = ?';
    connection.query(checkSql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore durante la verifica del post' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Post non trovato' });
        }

        const deleteSql = 'DELETE FROM posts WHERE id = ?';
        connection.query(deleteSql, [id], (deleteErr) => {
            if (deleteErr) {
                return res.status(500).json({ error: "Errore durante l'eliminazione" });
            }

            res.sendStatus(204);
        });
    });
}


export { index, show, store, storeReviews, update, modify, destroy };