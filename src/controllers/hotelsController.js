import { getCitiesRepository, getHotelByIdRepository, getHotelsRepository, getImagesRepository } from "../repositories/hotelsRepository.js";

export async function getHotelById(req, res) {
    const { id } = req.params;
  
    try {
      const hotels = await getHotelByIdRepository(id);
  
      const formattedHotels = hotels.rows.reduce((acc, row) => {
        const existingHotel = acc.find(hotel => hotel.hotel_id === row.hotel_id);
        if (existingHotel) {
          existingHotel.amenities.push({ name: row.amenity_name, iconUrl: row.iconUrl });
        } else {
          acc.push({
            hotel_id: row.hotel_id,
            hotel_name: row.hotel_name,
            rating: row.rating,
            reviewsNumber: row.reviewsNumber,
            address: row.address,
            dailyPrice: row.dailyPrice,
            description: row.description,
            amenities: [{ name: row.amenity_name, iconUrl: row.iconUrl }]
          });
        }
        return acc;
      }, []);
  
      const imagesQuery = await getImagesRepository(id);
  
      const hotelImages = imagesQuery.rows.reduce((acc, row) => {
        if (!acc[row.hotelId]) {
          acc[row.hotelId] = [];
        }
        acc[row.hotelId].push(row.imageUrl);
        return acc;
      }, {});
  
      formattedHotels.forEach(hotel => {
        hotel.images = hotelImages[hotel.hotel_id] || [];
      });
  
      return res.status(200).send(formattedHotels);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
    

export async function getHotels(req, res) {
    const { cityId } = req.params;
    const { maxValue, minValue } = req.query;
  
    try {
      const hotels = await getHotelsRepository(cityId, maxValue, minValue);
  
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
        const cities = await getCitiesRepository();
        return res.status(200).send(cities.rows);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}