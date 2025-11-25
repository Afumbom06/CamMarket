# CamMarket Map & Location Module Documentation

## Overview
The Map & Location Module provides comprehensive geolocation features for delivery, pickup points, and vendor locations across all 10 regions of Cameroon.

## Features Implemented

### 1. **Pickup Points Map** 🗺️
- **12 Strategic Locations**: Pickup points across all 10 regions
- **Interactive Map View**: Visual representation with markers
- **List View**: Detailed pickup point cards with information
- **Types of Points**:
  - 🏢 Main Hubs (Yaoundé, Douala)
  - 📍 Partner Points (smaller cities)
  - 🏪 Vendor Stores
- **Features**:
  - Distance calculation from user location
  - Opening hours display
  - Phone contact information
  - Regional filtering
  - Click-to-select functionality

### 2. **Vendor Geolocation** 📍
- **Vendor Location Display**: Show exact vendor coordinates
- **Distance Calculation**: Calculate distance from user to vendor
- **Delivery Cost Estimation**: Real-time cost based on distance
- **Map Integration**: Visual vendor location with markers
- **Features**:
  - Vendor store address
  - Contact information
  - "Open in Maps" button (Google Maps integration)
  - Distance display (in km)
  - Estimated delivery cost

### 3. **Delivery Cost Estimator** 💰
- **Zone-Based Pricing**:
  - **Zone A** (0-5km): 500-1,000 FCFA - Same day delivery
  - **Zone B** (5-20km): 1,000-1,500 FCFA - 1-2 days
  - **Zone C** (20-100km): 2,500-3,500 FCFA - 2-4 days
  - **Zone D** (100km+): 5,000-7,000 FCFA - 4-7 days
- **Interactive Calculator**: Select origin and destination regions
- **Visual Distance Display**: Map showing both locations
- **Delivery Time Estimates**: Based on distance zones

### 4. **Additional Features** ✨
- **Regional Coordinates**: Accurate lat/lng for all 10 regions
- **Distance Calculation**: Haversine formula for accurate distances
- **Responsive Design**: Works on mobile and desktop
- **Bilingual Support**: English and French throughout
- **Color-Coded Zones**: Visual feedback for delivery zones

## File Structure

```
/lib/
  └── map-data.ts                    # Map coordinates and utilities

/components/Map/
  ├── MapContainer.tsx               # Base map component
  ├── PickupPointsMap.tsx           # Pickup points with map/list view
  ├── VendorLocationMap.tsx         # Vendor location display
  ├── DeliveryZoneMap.tsx           # Delivery zone calculator
  └── index.tsx                      # Exports

/components/
  ├── LocationsPage.tsx              # Dedicated locations page
  └── ProductDetails/
      └── ProductLocation.tsx        # Enhanced with map dialog

/components/Checkout/
  └── DeliveryInformation.tsx        # Integrated pickup point selection
```

## Data Structure

### Region Coordinates
```typescript
{
  centre: { lat: 3.8480, lng: 11.5021, city: 'Yaoundé' },
  littoral: { lat: 4.0511, lng: 9.7679, city: 'Douala' },
  // ... 8 more regions
}
```

### Pickup Points
```typescript
{
  id: 'pk-centre-1',
  name: 'CamMarket Hub Yaoundé Centre',
  region: 'centre',
  city: 'Yaoundé',
  address: 'Avenue Kennedy, Bastos',
  lat: 3.8690,
  lng: 11.5213,
  phone: '+237 677 123 001',
  hours: '8:00 - 20:00',
  type: 'hub' | 'vendor' | 'partner'
}
```

## Usage

### 1. Viewing Pickup Points

#### From Checkout (Pickup Option)
```typescript
// Automatically shown when pickup delivery method is selected
<DeliveryInformation
  deliveryMethod="pickup"
  userRegion="centre"
  onSelectPickupPoint={(point) => console.log(point)}
/>
```

#### From Dedicated Locations Page
```typescript
// Access via navigation or direct route
<LocationsPage
  language="en"
  userRegion="centre"
  onBack={() => navigate('home')}
/>
```

### 2. Viewing Vendor Location

```typescript
<VendorLocationMap
  language="en"
  vendor={{
    storeName: "Kamga Electronics",
    region: "littoral",
    city: "Douala",
    phone: "+237 677 123 456"
  }}
  userRegion="centre"
  showDeliveryCost={true}
/>
```

### 3. Calculating Delivery Cost

```typescript
<DeliveryZoneMap
  language="en"
  fromRegion="littoral"
  toRegion="centre"
/>
```

### 4. On Product Detail Page
- Click "View Map" button in Location section
- Shows vendor location with delivery cost
- Integrated seamlessly with product information

## Integration Points

### Checkout Flow
1. **Cart Page** → User selects delivery method
2. **Checkout Page** → If "Pickup" selected:
   - PickupPointsMap component displays
   - User selects preferred pickup point
   - Selection saved for order
3. **Order Confirmation** → Pickup instructions displayed

### Product Details
1. **Product Page** → Location section shows:
   - Region and city
   - "View Map" button
2. **Click Map Button** → Modal opens:
   - Vendor location on map
   - Distance from user
   - Estimated delivery cost

### Dedicated Locations Page
1. **Access from Navigation** → "Locations" link
2. **Three Tabs**:
   - Pickup Points: Find collection locations
   - Vendors: View vendor stores
   - Delivery Zones: Calculate costs

## Utility Functions

### Calculate Distance
```typescript
import { calculateDistance } from './lib/map-data';

const distance = calculateDistance(
  lat1, lng1,  // User location
  lat2, lng2   // Vendor location
);
// Returns: distance in kilometers
```

### Estimate Delivery Cost
```typescript
import { estimateDeliveryCostByDistance } from './lib/map-data';

const cost = estimateDeliveryCostByDistance(50); // 50km
// Returns: 3500 FCFA
```

### Find Nearest Pickup Points
```typescript
import { findNearestPickupPoints } from './lib/map-data';

const nearest = findNearestPickupPoints(userLat, userLng, 5);
// Returns: Array of 5 nearest pickup points with distances
```

## Delivery Zones Explained

| Zone | Distance | Cost Range | Delivery Time | Description |
|------|----------|------------|---------------|-------------|
| A | 0-5 km | 500-1,000 FCFA | Same day | Very close, local delivery |
| B | 5-20 km | 1,000-1,500 FCFA | 1-2 days | Same city/region |
| C | 20-100 km | 2,500-3,500 FCFA | 2-4 days | Adjacent regions |
| D | 100+ km | 5,000-7,000 FCFA | 4-7 days | Far regions |

## Pickup Point Types

### 🏢 Main Hubs
- Located in major cities (Yaoundé, Douala)
- Longer operating hours (8:00-20:00)
- Full-service facilities
- Secure storage

### 📍 Partner Points
- Strategic locations in regional capitals
- Standard hours (8:00-19:00)
- Convenient for customers
- Local partnerships

### 🏪 Vendor Stores
- Direct pickup from seller
- Flexible arrangements
- May offer immediate pickup
- Personal service

## Regional Coverage

All 10 regions of Cameroon are covered:

1. **Centre** (Yaoundé) - 2 pickup points
2. **Littoral** (Douala) - 2 pickup points
3. **West** (Bafoussam) - 1 pickup point
4. **Northwest** (Bamenda) - 1 pickup point
5. **Southwest** (Buea) - 1 pickup point
6. **South** (Ebolowa) - 1 pickup point
7. **East** (Bertoua) - 1 pickup point
8. **Adamawa** (Ngaoundéré) - 1 pickup point
9. **North** (Garoua) - 1 pickup point
10. **Far North** (Maroua) - 1 pickup point

## Mobile Optimization

### Responsive Features
- Touch-friendly map interactions
- Swipeable tabs for pickup points
- Collapsible map view on mobile
- Bottom sheet for point details
- Call button for instant contact

### Performance
- Lazy-loaded map components
- Cached coordinates data
- Optimized marker rendering
- Efficient distance calculations

## API Integration (Future)

The module is designed to work with these API endpoints:

```typescript
// Get pickup points
GET /api/pickup-points?region={regionId}

// Get vendor location
GET /api/vendors/{vendorId}/location

// Calculate delivery cost
POST /api/delivery/calculate
{
  "fromRegion": "littoral",
  "toRegion": "centre",
  "weight": 2.5
}

// Get nearest pickup points
POST /api/pickup-points/nearest
{
  "lat": 3.8480,
  "lng": 11.5021,
  "limit": 5
}
```

## User Benefits

### For Buyers 🛍️
- **Save on Delivery**: Choose pickup to avoid delivery fees
- **Convenience**: Find nearest pickup location
- **Transparency**: See exact delivery costs before ordering
- **Flexibility**: Multiple pickup options per region

### For Sellers 🏪
- **Show Location**: Display store location to build trust
- **Attract Local Customers**: Highlight proximity to buyers
- **Multiple Pickup Options**: Offer various collection points
- **Competitive Advantage**: Show delivery reach

## Future Enhancements

### Planned Features
- [ ] Real-time location tracking
- [ ] Live delivery updates
- [ ] Driver location on map
- [ ] Street view integration
- [ ] Traffic-based delivery estimates
- [ ] Favorite pickup points
- [ ] Recent locations history
- [ ] Turn-by-turn directions
- [ ] Share location with seller
- [ ] Geofencing for pickup notifications

### Technical Improvements
- [ ] Integration with real mapping API (Google Maps/Mapbox)
- [ ] GPS-based auto-location detection
- [ ] Offline map caching
- [ ] Route optimization for multiple pickups
- [ ] Real-time delivery zone pricing
- [ ] Dynamic pickup point hours

## Browser Support

The module works on all modern browsers:
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Optimized

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast markers
- Touch-friendly controls
- Clear labeling throughout

## Testing

### Manual Testing Checklist
- [ ] Select pickup point in checkout
- [ ] View vendor location from product page
- [ ] Calculate delivery cost between regions
- [ ] Filter pickup points by region
- [ ] Switch between map and list view
- [ ] Open location in external maps
- [ ] Test on mobile devices
- [ ] Verify distance calculations
- [ ] Check bilingual support

## Support

For map and location issues:
1. Verify region data is loaded
2. Check console for coordinate errors
3. Ensure user region is set
4. Validate pickup point selection
5. Test distance calculations

## Resources

- [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)
- [Cameroon Geography](https://en.wikipedia.org/wiki/Regions_of_Cameroon)
- [Google Maps API](https://developers.google.com/maps)

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Maintained By**: CamMarket Development Team
