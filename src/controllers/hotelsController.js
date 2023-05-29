import { db } from '../database/database.connection.js';

export async function getHotels(req, res) {
    const { id } = req.params;

    try {
        const hotel = await db.query(`SELECT * FROM hotels WHERE id=$1`, [id]);
        if (!hotel.rowCount) return res.sendStatus(404);
        return res.status(200).send(hotel.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};