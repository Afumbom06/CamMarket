// Map coordinates and location data for Cameroon

// Regional capital coordinates
export const regionCoordinates: Record<string, { lat: number; lng: number; city: string }> = {
  centre: { lat: 3.8480, lng: 11.5021, city: 'Yaoundé' },
  littoral: { lat: 4.0511, lng: 9.7679, city: 'Douala' },
  west: { lat: 5.4473, lng: 10.4183, city: 'Bafoussam' },
  northwest: { lat: 5.9631, lng: 10.1591, city: 'Bamenda' },
  southwest: { lat: 4.1560, lng: 9.2567, city: 'Buea' },
  south: { lat: 2.9167, lng: 10.9000, city: 'Ebolowa' },
  east: { lat: 4.4414, lng: 13.5794, city: 'Bertoua' },
  adamawa: { lat: 7.3000, lng: 13.5833, city: 'Ngaoundéré' },
  north: { lat: 9.3000, lng: 13.4000, city: 'Garoua' },
  'far-north': { lat: 10.3500, lng: 14.7167, city: 'Maroua' },
};

// Cameroon country bounds for map centering
export const cameroonBounds = {
  north: 13.0783,
  south: 1.6546,
  east: 16.1921,
  west: 8.4944,
};

// Default center (Cameroon center)
export const cameroonCenter = {
  lat: 6.5,
  lng: 12.5,
  zoom: 6.5,
};

// Pickup points for each region
export const pickupPoints = [
  // Centre Region
  {
    id: 'pk-centre-1',
    name: 'CamMarket Hub Yaoundé Centre',
    nameFr: 'Hub CamMarket Yaoundé Centre',
    region: 'centre',
    city: 'Yaoundé',
    address: 'Avenue Kennedy, Bastos',
    addressFr: 'Avenue Kennedy, Bastos',
    lat: 3.8690,
    lng: 11.5213,
    phone: '+237 677 123 001',
    hours: '8:00 - 20:00',
    type: 'hub' as 'hub' | 'vendor' | 'partner',
  },
  {
    id: 'pk-centre-2',
    name: 'CamMarket Point Mfoundi',
    nameFr: 'Point CamMarket Mfoundi',
    region: 'centre',
    city: 'Yaoundé',
    address: 'Marché Mfoundi, Centre Commercial',
    addressFr: 'Marché Mfoundi, Centre Commercial',
    lat: 3.8567,
    lng: 11.5189,
    phone: '+237 677 123 002',
    hours: '7:00 - 21:00',
    type: 'partner' as 'hub' | 'vendor' | 'partner',
  },
  
  // Littoral Region
  {
    id: 'pk-littoral-1',
    name: 'CamMarket Hub Douala Akwa',
    nameFr: 'Hub CamMarket Douala Akwa',
    region: 'littoral',
    city: 'Douala',
    address: 'Boulevard de la Liberté, Akwa',
    addressFr: 'Boulevard de la Liberté, Akwa',
    lat: 4.0511,
    lng: 9.7679,
    phone: '+237 677 123 003',
    hours: '8:00 - 20:00',
    type: 'hub' as 'hub' | 'vendor' | 'partner',
  },
  {
    id: 'pk-littoral-2',
    name: 'CamMarket Point Bonabéri',
    nameFr: 'Point CamMarket Bonabéri',
    region: 'littoral',
    city: 'Douala',
    address: 'Rond-point Bonabéri',
    addressFr: 'Rond-point Bonabéri',
    lat: 4.0719,
    lng: 9.7043,
    phone: '+237 677 123 004',
    hours: '8:00 - 19:00',
    type: 'partner' as 'hub' | 'vendor' | 'partner',
  },
  
  // West Region
  {
    id: 'pk-west-1',
    name: 'CamMarket Hub Bafoussam',
    nameFr: 'Hub CamMarket Bafoussam',
    region: 'west',
    city: 'Bafoussam',
    address: 'Place Tamdja, Centre Ville',
    addressFr: 'Place Tamdja, Centre Ville',
    lat: 5.4773,
    lng: 10.4183,
    phone: '+237 677 123 005',
    hours: '8:00 - 19:00',
    type: 'hub' as 'hub' | 'vendor' | 'partner',
  },
  
  // Northwest Region
  {
    id: 'pk-northwest-1',
    name: 'CamMarket Hub Bamenda',
    nameFr: 'Hub CamMarket Bamenda',
    region: 'northwest',
    city: 'Bamenda',
    address: 'Commercial Avenue, City Center',
    addressFr: 'Commercial Avenue, Centre Ville',
    lat: 5.9531,
    lng: 10.1591,
    phone: '+237 677 123 006',
    hours: '8:00 - 19:00',
    type: 'hub' as 'hub' | 'vendor' | 'partner',
  },
  
  // Southwest Region
  {
    id: 'pk-southwest-1',
    name: 'CamMarket Hub Buea',
    nameFr: 'Hub CamMarket Buea',
    region: 'southwest',
    city: 'Buea',
    address: 'Molyko, Main Street',
    addressFr: 'Molyko, Rue Principale',
    lat: 4.1560,
    lng: 9.2367,
    phone: '+237 677 123 007',
    hours: '8:00 - 19:00',
    type: 'hub' as 'hub' | 'vendor' | 'partner',
  },
  
  // South Region
  {
    id: 'pk-south-1',
    name: 'CamMarket Point Ebolowa',
    nameFr: 'Point CamMarket Ebolowa',
    region: 'south',
    city: 'Ebolowa',
    address: 'Centre Ville, près du Marché',
    addressFr: 'Centre Ville, près du Marché',
    lat: 2.9067,
    lng: 11.1500,
    phone: '+237 677 123 008',
    hours: '8:00 - 18:00',
    type: 'partner' as 'hub' | 'vendor' | 'partner',
  },
  
  // East Region
  {
    id: 'pk-east-1',
    name: 'CamMarket Point Bertoua',
    nameFr: 'Point CamMarket Bertoua',
    region: 'east',
    city: 'Bertoua',
    address: 'Centre Commercial, Route Nationale',
    addressFr: 'Centre Commercial, Route Nationale',
    lat: 4.5714,
    lng: 13.6794,
    phone: '+237 677 123 009',
    hours: '8:00 - 18:00',
    type: 'partner' as 'hub' | 'vendor' | 'partner',
  },
  
  // Adamawa Region
  {
    id: 'pk-adamawa-1',
    name: 'CamMarket Point Ngaoundéré',
    nameFr: 'Point CamMarket Ngaoundéré',
    region: 'adamawa',
    city: 'Ngaoundéré',
    address: 'Avenue de la Gare',
    addressFr: 'Avenue de la Gare',
    lat: 7.3200,
    lng: 13.5833,
    phone: '+237 677 123 010',
    hours: '8:00 - 18:00',
    type: 'partner' as 'hub' | 'vendor' | 'partner',
  },
  
  // North Region
  {
    id: 'pk-north-1',
    name: 'CamMarket Point Garoua',
    nameFr: 'Point CamMarket Garoua',
    region: 'north',
    city: 'Garoua',
    address: 'Grand Marché, Centre',
    addressFr: 'Grand Marché, Centre',
    lat: 9.3000,
    lng: 13.4000,
    phone: '+237 677 123 011',
    hours: '8:00 - 18:00',
    type: 'partner' as 'hub' | 'vendor' | 'partner',
  },
  
  // Far North Region
  {
    id: 'pk-far-north-1',
    name: 'CamMarket Point Maroua',
    nameFr: 'Point CamMarket Maroua',
    region: 'far-north',
    city: 'Maroua',
    address: 'Marché Central',
    addressFr: 'Marché Central',
    lat: 10.5900,
    lng: 14.3167,
    phone: '+237 677 123 012',
    hours: '8:00 - 18:00',
    type: 'partner' as 'hub' | 'vendor' | 'partner',
  },
];

// Vendor locations (example vendors)
export const vendorLocations = [
  {
    vendorId: 1,
    name: 'Kamga Electronics',
    region: 'littoral',
    city: 'Douala',
    lat: 4.0611,
    lng: 9.7479,
    address: 'Akwa Commercial District',
  },
  {
    vendorId: 2,
    name: 'Douala Fashion Store',
    region: 'littoral',
    city: 'Douala',
    lat: 4.0411,
    lng: 9.7579,
    address: 'Bonanjo Shopping Center',
  },
  {
    vendorId: 3,
    name: 'Yaoundé Tech Hub',
    region: 'centre',
    city: 'Yaoundé',
    lat: 3.8580,
    lng: 11.5121,
    address: 'Centre Administratif',
  },
];

// Calculate distance between two points (Haversine formula)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Find nearest pickup points
export function findNearestPickupPoints(
  userLat: number,
  userLng: number,
  limit: number = 5
) {
  const pointsWithDistance = pickupPoints.map((point) => ({
    ...point,
    distance: calculateDistance(userLat, userLng, point.lat, point.lng),
  }));

  return pointsWithDistance.sort((a, b) => a.distance - b.distance).slice(0, limit);
}

// Estimate delivery cost based on distance
export function estimateDeliveryCostByDistance(distanceKm: number): number {
  if (distanceKm < 5) return 500; // Very close
  if (distanceKm < 10) return 1000; // Close
  if (distanceKm < 20) return 1500; // Same city
  if (distanceKm < 50) return 2500; // Nearby city
  if (distanceKm < 100) return 3500; // Adjacent region
  if (distanceKm < 200) return 5000; // Far region
  return 7000; // Very far region
}
