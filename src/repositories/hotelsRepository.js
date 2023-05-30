import { db } from '../database/database.connection.js';

export async function getHotelByIdRepository(id){
    return db.query(`
    SELECT
      hotels.name AS hotel_name,
      hotels.address,
      hotels."dailyPrice",
      hotels.rating,
      hotels."reviewsNumber",
      hotels.description,
      hotels.id AS hotel_id,
      amenities.name AS amenity_name,
      amenities."iconUrl"
    FROM hotels
    LEFT JOIN "hotelsAmenities" ON hotels.id = "hotelsAmenities"."hotelId"
    LEFT JOIN amenities ON "hotelsAmenities"."amenityId" = amenities.id
    WHERE hotels.id = $1;
  `, [id]);
}

export async function getImagesRepository(id){
    return db.query(`
        SELECT "hotelId", "imageUrl"
        FROM "hotelsImages"
        WHERE "hotelId" = $1;
      `, [id]);
}

export async function getHotelsRepository(cityId, minValue, maxValue){
    return db.query(`SELECT
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
    WHERE hotels."cityId" = $1 AND hotels."dailyPrice" BETWEEN $2 AND $3;
  `, [cityId, minValue, maxValue]);
}

export async function getCitiesRepository(){
    return db.query(`SELECT * FROM cities;`);
}