import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  color?: string;
  icon?: 'pin' | 'hub' | 'vendor';
}

interface MapContainerProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarker[];
  height?: string;
  onMarkerClick?: (marker: MapMarker) => void;
}

export function MapContainer({
  center,
  zoom = 13,
  markers = [],
  height = '400px',
  onMarkerClick,
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Since we can't use external map libraries in this environment,
  // we'll create a simple visual representation
  const getMarkerIcon = (icon?: 'pin' | 'hub' | 'vendor') => {
    switch (icon) {
      case 'hub':
        return '🏢';
      case 'vendor':
        return '🏪';
      default:
        return '📍';
    }
  };

  const getMarkerColor = (color?: string) => {
    return color || '#00843D';
  };

  return (
    <div
      ref={mapRef}
      className="relative rounded-lg overflow-hidden border border-gray-200 shadow-md"
      style={{ height }}
    >
      {/* Map Background - Simplified representation */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Simple geographic pattern */}
            <path
              d="M 0,20 Q 25,10 50,20 T 100,20 L 100,100 L 0,100 Z"
              fill="url(#landGradient)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00843D" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFCC00" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Grid lines for better visual */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Vertical lines */}
            {[20, 40, 60, 80].map((x) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1="0"
                x2={x}
                y2="100"
                stroke="#00843D"
                strokeWidth="0.1"
                opacity="0.2"
              />
            ))}
            {/* Horizontal lines */}
            {[20, 40, 60, 80].map((y) => (
              <line
                key={`h-${y}`}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="#00843D"
                strokeWidth="0.1"
                opacity="0.2"
              />
            ))}
          </svg>
        </div>

        {/* Markers */}
        <div className="absolute inset-0">
          {markers.map((marker, index) => {
            // Calculate position based on lat/lng relative to center
            // This is a simplified calculation for visual purposes
            const latDiff = marker.lat - center.lat;
            const lngDiff = marker.lng - center.lng;
            
            // Convert to percentage position (simplified)
            const top = 50 - (latDiff * 1000 / zoom);
            const left = 50 + (lngDiff * 1000 / zoom);

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
                style={{
                  top: `${Math.max(0, Math.min(100, top))}%`,
                  left: `${Math.max(0, Math.min(100, left))}%`,
                }}
                onClick={() => onMarkerClick?.(marker)}
              >
                <div className="relative">
                  {/* Marker pin */}
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: getMarkerColor(marker.color) }}
                  >
                    <span className="text-2xl">{getMarkerIcon(marker.icon)}</span>
                  </div>
                  
                  {/* Marker tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                      {marker.title}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                      <div className="border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button className="bg-white p-2 rounded shadow hover:bg-gray-50">
          <span className="text-lg">+</span>
        </button>
        <button className="bg-white p-2 rounded shadow hover:bg-gray-50">
          <span className="text-lg">−</span>
        </button>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs text-gray-600">
        CamMarket Map
      </div>
    </div>
  );
}
