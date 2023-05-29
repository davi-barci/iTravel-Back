import { db } from '../database/database.connection.js';

export async function getHotelById(req, res) {
    const { id } = req.params;

    try {
        const hotel = await db.query(`SELECT * FROM hotels WHERE id=$1`, [id]);
        if (!hotel.rowCount) return res.sendStatus(404);
        return res.status(200).send(hotel.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function getHotels(req, res) {
    const { cityId } = req.params;
    const { maxValue, minValue } = req.query;
  
    try {
      const hotels = await db.query(`
        SELECT
          hotels.name AS hotel_name,
          hotels.address,
          hotels."dailyPrice",
          hotels.rating,
          hotels.id AS hotel_id,
          amenities.name AS amenity_name,
          amenities."iconUrl",
          "hotelsImages"."imageUrl"
        FROM hotels
        LEFT JOIN "hotelsImages" ON hotels."mainImage" = "hotelsImages".id
        LEFT JOIN "hotelsAmenities" ON hotels.id = "hotelsAmenities"."hotelId"
        LEFT JOIN amenities ON "hotelsAmenities"."amenityId" = amenities.id
        WHERE hotels."cityId" = $1 AND hotels."dailyPrice" BETWEEN $2 AND $3
      `, [cityId, minValue, maxValue]);
  
      const formattedHotels = hotels.rows.reduce((acc, row) => {
        const existingHotel = acc.find(hotel => hotel.hotel_id === row.hotel_id);
        if (existingHotel) {
          existingHotel.amenities.push({ name: row.amenity_name, iconUrl: row.iconUrl });
        } else {
          acc.push({
            hotel_id: row.hotel_id,
            hotel_name: row.hotel_name,
            rating: row.rating,
            address: row.address,
            dailyPrice: row.dailyPrice,
            amenities: [{ name: row.amenity_name, iconUrl: row.iconUrl }],
            imageUrl: row.imageUrl
          });
        }
        return acc;
      }, []);
  
      return res.status(200).send(formattedHotels);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
  

export async function getCities(_req, res){
    try {
        const cities = await db.query(`SELECT * FROM cities`);
        return res.status(200).send(cities.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}