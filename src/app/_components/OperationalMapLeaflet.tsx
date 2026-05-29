'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaCrosshairs } from 'react-icons/fa';
import {
  OPERATIONAL_LOCATIONS,
  rankOperationalByDistance,
} from '@/app/_lib/operationalLocations';
import { useTranslations } from '@/app/_hooks/useTranslations';

function FitAgencyBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  const once = useRef(false);
  useEffect(() => {
    if (once.current || positions.length === 0) return;
    once.current = true;
    const bounds = L.latLngBounds(
      positions.map(([lat, lng]) => L.latLng(lat, lng))
    );
    map.fitBounds(bounds, { padding: [52, 52], maxZoom: 4 });
  }, [map, positions]);
  return null;
}

function FlyToUserAndNearest({
  userLat,
  userLng,
  peerLat,
  peerLng,
}: {
  userLat: number;
  userLng: number;
  peerLat: number;
  peerLng: number;
}) {
  const map = useMap();
  useEffect(() => {
    const b = L.latLngBounds([
      [userLat, userLng],
      [peerLat, peerLng],
    ]);
    map.fitBounds(b, { padding: [80, 80], maxZoom: 8 });
  }, [map, userLat, userLng, peerLat, peerLng]);
  return null;
}

function formatDistanceApprox(
  template: string,
  km: number
): string {
  return template.replace('{{km}}', String(Math.round(km)));
}

export default function OperationalMapLeaflet() {
  const t = useTranslations('about');
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const markerIcon = useMemo(
    () =>
      L.divIcon({
        className: 'operational-marker',
        html: '<span class="operational-marker-dot"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -10],
      }),
    []
  );

  const nearestHighlightIcon = useMemo(
    () =>
      L.divIcon({
        className: 'operational-marker',
        html: '<span class="operational-marker-dot operational-marker-dot--nearest"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -14],
      }),
    []
  );

  const userIcon = useMemo(
    () =>
      L.divIcon({
        className: 'user-location-marker',
        html: '<span class="user-location-marker-dot"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -12],
      }),
    []
  );

  const positions: [number, number][] = useMemo(
    () => OPERATIONAL_LOCATIONS.map((p) => [p.lat, p.lng]),
    []
  );

  const ranked = useMemo(
    () => (userPos ? rankOperationalByDistance(userPos[0], userPos[1]) : null),
    [userPos]
  );
  const nearest = ranked?.[0];
  const others = ranked?.slice(1) ?? [];

  const distanceTpl = t('coverage.distanceApprox');

  const locate = useCallback(() => {
    setGeoError(null);
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoError(t('coverage.geoNoBrowser'));
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setGeoLoading(false);
      },
      (err) => {
        setGeoLoading(false);
        if (err.code === 1) setGeoError(t('coverage.geoDenied'));
        else setGeoError(t('coverage.geoError'));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }, [t]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-xl text-sm text-slate-600">
          {t('coverage.locateMeHint')}
        </p>
        <button
          type="button"
          onClick={locate}
          disabled={geoLoading}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
        >
          <FaCrosshairs className="h-4 w-4" aria-hidden />
          {geoLoading ? t('coverage.locating') : t('coverage.locateMe')}
        </button>
      </div>

      <p className="text-xs text-slate-500">{t('coverage.privacyNote')}</p>

      {geoError && (
        <p className="text-sm text-red-600" role="alert">
          {geoError}
        </p>
      )}

      {nearest && userPos && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-950">
          <p>
            <span className="font-semibold">{t('coverage.nearestIntro')} </span>
            <span>{t(`coverage.countries.${nearest.id}`)}</span>
          </p>
          <p className="mt-1 text-emerald-900/90">
            {formatDistanceApprox(distanceTpl, nearest.distanceKm)}
          </p>
          {others.length > 0 && (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-medium text-emerald-800 hover:underline">
                {t('coverage.rankingTitle')}
              </summary>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-emerald-900/85">
                {others.map((o) => (
                  <li key={o.id}>
                    {t(`coverage.countries.${o.id}`)} —{' '}
                    {Math.round(o.distanceKm)} km
                  </li>
                ))}
              </ol>
            </details>
          )}
        </div>
      )}

      <div className="relative z-0 h-[min(52vh,520px)] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-lg ring-1 ring-slate-900/5">
        <MapContainer
          center={[20, 5]}
          zoom={3}
          className="h-full w-full [&_.leaflet-control-attribution]:text-[10px]"
          scrollWheelZoom
          aria-label={t('coverage.mapAria')}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!userPos && <FitAgencyBounds positions={positions} />}
          {userPos && nearest && (
            <FlyToUserAndNearest
              userLat={userPos[0]}
              userLng={userPos[1]}
              peerLat={nearest.lat}
              peerLng={nearest.lng}
            />
          )}
          {OPERATIONAL_LOCATIONS.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={
                nearest?.id === loc.id ? nearestHighlightIcon : markerIcon
              }
            >
              <Popup>
                <div className="min-w-[140px] text-sm">
                  <p className="font-semibold text-slate-900">
                    {t(`coverage.countries.${loc.id}`)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {t('coverage.popupHint')}
                  </p>
                  {userPos && ranked && (
                    <p className="mt-2 border-t border-slate-100 pt-2 text-xs text-slate-500">
                      {formatDistanceApprox(
                        distanceTpl,
                        ranked.find((r) => r.id === loc.id)!.distanceKm
                      )}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
          {userPos && (
            <Marker position={userPos} icon={userIcon}>
              <Popup>
                <div className="text-sm font-medium text-slate-900">
                  {t('coverage.youAreHere')}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
