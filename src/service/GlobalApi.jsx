import axios from "axios";

// Base URL for Geoapify API
const BASE_URL = 'https://api.geoapify.com/v1/geocode/search';
const GOOGLE_PLACE_BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

// Configuration for Google Place API requests
const googleConfig = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
};

// Function to get place details using Google Places API
export const GetPlaceDetails = (data) => axios.post(GOOGLE_PLACE_BASE_URL, data, googleConfig);

// API key for Geoapify
const GEOAPIFY_API_KEY = '730ef94a1509487cb08619603ab6caf4';  // Ensure this key is correctly set

// Function to get place photos using Google Place API
export const PHOTO_REF_URL = (photoRef) => 
    `https://places.googleapis.com/v1/${photoRef}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

// Function to get geocode information using Geoapify
export const GetGeoapifyGeocode = (address) => {
    const url = `${BASE_URL}?format=json&apiKey=${GEOAPIFY_API_KEY}&text=${address}`;
    
    return axios.get(url)
        .then(response => {
            console.log("Geoapify Geocode Response: ", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Geoapify API Error: ", error);
            throw error;
        });
};
