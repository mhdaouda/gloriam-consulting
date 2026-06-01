import { haversineDistanceKm } from '@/app/_lib/haversine';

/** Repères géographiques (centre approximatif) pour l’affichage sur la carte — Europe */
export const OPERATIONAL_LOCATIONS = [
  { id: 'france', lat: 46.2276, lng: 2.2137 },
  { id: 'belgium', lat: 50.5039, lng: 4.4699 },
  { id: 'switzerland', lat: 46.8182, lng: 8.2275 },
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
