import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapaView = ({ data, loading, ActivityIndicator, setReadItem, setActiveTab }) => {
  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><ActivityIndicator /> Cargando ubicaciones...</div>;

  const markers = [];
  if (data.eventos) {
    data.eventos.forEach(ev => {
      if (ev.ubicacion?.lat) markers.push({ ...ev, type: 'evento', color: 'var(--secondary)', icon: '📅' });
    });
  }
  if (data.anuncios) {
    data.anuncios.forEach(an => {
      if (an.ubicacion?.lat) markers.push({ ...an, type: 'anuncio', color: 'var(--accent)', icon: '📢' });
    });
  }
  if (data.servicios) {
    data.servicios.forEach(sv => {
      if (sv.ubicacion?.lat) markers.push({ ...sv, type: 'servicio', color: 'var(--tertiary)', icon: '💼' });
    });
  }

  const mapCenter = [-6.764, -79.866]; // Chiclayo/Lambayeque as default center

  return (
    <div className="animate-fade" style={{ height: 'calc(100vh - 250px)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
      <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        {markers.map((marker, idx) => (
          <Marker 
            key={`${marker.type}-${marker._id}-${idx}`} 
            position={[marker.ubicacion.lat, marker.ubicacion.lng]}
            icon={L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: ${marker.color}; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><span style="margin: auto;">${marker.icon}</span></div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40]
            })}
          >
            <Popup>
              <div style={{ minWidth: '200px', padding: '5px' }}>
                <span style={{ fontSize: '0.7rem', background: marker.color, color: 'white', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{marker.type.toUpperCase()}</span>
                <h3 style={{ margin: '8px 0 4px 0', color: 'var(--primary)', fontSize: '1.1rem' }}>{marker.titulo}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)' }}>📍 {marker.lugar}</p>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{marker.descripcion || marker.contenido?.substring(0, 60) + '...'}</p>
                <button 
                  onClick={() => { setReadItem(marker); setActiveTab(marker.type === 'evento' ? 'Eventos' : (marker.type === 'anuncio' ? 'Anuncios' : 'Servicios')); }} 
                  style={{ marginTop: '10px', width: '100%', padding: '6px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  Ver detalle completo
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000, background: 'rgba(255,255,255,0.9)', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', fontSize: '0.8rem', display: 'flex', gap: '15px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--secondary)' }}></div> Eventos</div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)' }}></div> Anuncios</div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--tertiary)' }}></div> Servicios</div>
      </div>
    </div>
  );
};

export default MapaView;
