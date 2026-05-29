import { haversineDistanceKm } from '@/app/_lib/haversine';

/** Repères géographiques (centre approximatif) pour l’affichage sur la carte */
export const OPERATIONAL_LOCATIONS = [
  { id: 'france', lat: 46.2276, lng: 2.2137 },
  { id: 'belgium', lat: 50.5039, lng: 4.4699 },
  { id: 'switzerland', lat: 46.8182, lng: 8.2275 },
  { id: 'benin', lat: 9.3077, lng: 2.3158 },
  { id: 'togo', lat: 8.6195, lng: 0.8248 },
  { id: 'gabon', lat: -0.8037, lng: 11.6094 },
  { id: 'nigeria', lat: 9.082, lng: 8.6753 },
  { id: 'canada', lat: 56.1304, lng: -106.3468 },
] as const;

export type OperationalCountryId = (typeof OPERATIONAL_LOCATIONS)[number]['id'];

export type OperationalLocationWithDistance = (typeof OPERATIONAL_LOCATIONS)[number] & {
  distanceKm: number;
};

/** Repères triés du plus proche au plus éloigné par rapport à l’utilisateur */
export function rankOperationalByDistance(
  userLat: number,
  userLng: number
): OperationalLocationWithDistance[] {
  return OPERATIONAL_LOCATIONS.map((loc) => ({
    ...loc,
    distanceKm: haversineDistanceKm(userLat, userLng, loc.lat, loc.lng),
  })).sort((a, b) => a.distanceKm - b.distanceKm);
}
