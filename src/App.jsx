import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import api from './config/api';
import Consejo from './components/Consejo';
import MiembrosEditModal from './components/MiembrosEditModal';
import AnunciosEditModal from './components/AnunciosEditModal';
import EventosEditModal from './components/EventosEditModal';
import ActasEditModal from './components/ActasEditModal';
import CantosEditModal from './components/CantosEditModal';
import FormacionEditModal from './components/FormacionEditModal';
import DocumentosEditModal from './components/DocumentosEditModal';
import ServiciosEditModal from './components/ServiciosEditModal';
import EspirituEditModal from './components/EspirituEditModal';
import ActasNewModal from './components/ActasNewModal';
import DocumentosNewModal from './components/DocumentosNewModal';
import PeticionesNewModal from './components/PeticionesNewModal';
import GaleriaNewModal from './components/GaleriaNewModal';
import EspirituNewModal from './components/EspirituNewModal';
import AnunciosNewModal from './components/AnunciosNewModal';
import CantosNewModal from './components/CantosNewModal';
import FormacionNewModal from './components/FormacionNewModal';
import ServiciosNewModal from './components/ServiciosNewModal';
import EventosNewModal from './components/EventosNewModal';
import AnunciosList from './components/lists/AnunciosList';
import ActasList from './components/lists/ActasList';
import EventosList from './components/lists/EventosList';
import FormacionList from './components/lists/FormacionList';
import CantosList from './components/lists/CantosList';
import ServiciosList from './components/lists/ServiciosList';
import PeticionesList from './components/lists/PeticionesList';
import GaleriaList from './components/lists/GaleriaList';
import EspirituList from './components/lists/EspirituList';
import DocumentosList from './components/lists/DocumentosList';
import AsistenciaView from './components/views/AsistenciaView';
import DashboardView from './components/views/DashboardView';
import PerfilView from './components/views/PerfilView';
import MapaView from './components/views/MapaView';
import ComunicacionView from './components/views/ComunicacionView';
import LandingView from './components/views/LandingView';
import ParroquiaView from './components/views/ParroquiaView';
import WebConfigView from './components/views/WebConfigView';
import ParroquiaConfigView from './components/views/ParroquiaConfigView';
import MisMensajesView from './components/views/MisMensajesView';
import MensajesAdminView from './components/views/MensajesAdminView';
import TiendaView from './components/views/TiendaView';
import ItemReadModal from './components/ItemReadModal';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ActivityIndicator = () => <div className="spinner"></div>;

// Selector interactivo de mapa mejorado (Drag & Click)
const MapPicker = ({ lat, lng, onChange }) => {
  const defaultPosition = [-6.764, -79.866]; 
  const position = [lat || defaultPosition[0], lng || defaultPosition[1]];
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          onChange(Number(newPos.lat.toFixed(6)), Number(newPos.lng.toFixed(6)));
        }
      },
    }),
    [onChange]
  );

  const LocationListener = () => {
    useMapEvents({
      click(e) {
        onChange(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
      },
    });
    return null;
  };

  return (
    <div style={{ height: '230px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginTop: '0.5rem', position: 'relative' }}>
      <MapContainer center={position} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationListener />
        {lat && lng && (
          <Marker 
            position={[lat, lng]} 
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
          />
        )}
      </MapContainer>
      <div style={{ position: 'absolute', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '6px 12px', bottom: '10px', left: '10px', fontSize: '11px', borderRadius: '6px', zIndex: 1000, pointerEvents: 'none', fontWeight: 'bold' }}>📍 Arrastra el pin o haz clic en cualquier lugar</div>
    </div>
  );
};

// Componente para imágenes seguras
const SafeImage = ({ src, style, fallbackIcon }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--surface), rgba(0,0,0,0.05))', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: '3rem', opacity: 0.5 }}>{fallbackIcon || '🖼️'}</span>
      </div>
    );
  }
  return <img src={src} style={{ ...style, objectFit: 'cover', display: 'block' }} onError={() => setError(true)} alt="Anuncio" />;
};;

import './App.css';

const getSafeDateForInput = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  } catch (e) {
    return '';
  }
};


// Login Component (Premium Aesthetics)
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { username, password });
      if (data.usuario.rol === 'admin' || data.usuario.rol === 'consejo') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
        onLogin(data.usuario);
      } else {
        setError('Acceso denegado: Solo miembros de la Directiva.');
      }
    } catch (err) {
      setError('Credenciales inválidas o cuenta no aprobada.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card animate-fade">
        <div className="login-header">
          <div className="logo-placeholder">CAT</div>
          <h2>Catequesis Admin</h2>
          <p>Panel de Administración</p>
        </div>
        
        {error && <div className="error-message animate-fade">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Usuario (o Email)</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="ej: admin@catequesis.com"/>
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">Ingresar al Panel</button>
        </form>
      </div>
    </div>
  );
};

// Dashboard Component Shell
const modules = [
  { id: 'Dashboard', label: 'Inicio (Panel)', icon: '🏠' },
  { id: 'Miembros', label: 'Miembros', icon: '👤' },
  { id: 'Consejo', label: 'La Directiva', icon: '🛡️' },
  { id: 'Espiritu', label: 'Espíritu', icon: '🔥' },
  { id: 'Asistencia', label: 'Asistencia (QR)', icon: '✅' },
  { id: 'Anuncios', label: 'Anuncios', icon: '📢' },
  { id: 'Eventos', label: 'Calendario (Eventos)', icon: '📅' },
  { id: 'Servicios', label: 'Servicios', icon: '💼' },
  { id: 'Peticiones', label: 'Peticiones', icon: '🙏' },
  { id: 'Formacion', label: 'Formación', icon: '📖' },
  { id: 'Actas', label: 'Actas', icon: '📝' },
  { id: 'Documentos', label: 'Documentos', icon: '📄' },
  { id: 'Galeria', label: 'Galería', icon: '🖼️' },
  { id: 'Mapa', label: 'Mapa', icon: '🗺️' },
  { id: 'Mensajes', label: 'Mensajes (Control)', icon: '🕵️' },
  { id: 'Chat', label: 'Mis Mensajes', icon: '💬' },
  { id: 'Cantos', label: 'Cancionero', icon: '🎵' },
  { id: 'Comunicacion', label: 'Comunicación', icon: '📢' },
  { id: 'WebConfig', label: 'Web Institucional', icon: '🌐' },
  {id: 'ParroquiaConfig', label: 'Configuración Parroquia', icon: '☦️'},
  { id: 'Tienda', label: 'Finanzas', icon: '💰' },
  { id: 'Perfil', label: 'Mi Perfil', icon: '👤' },
];

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el tab activo de la URL
  const activeTab = useMemo(() => {
    const segments = location.pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment === 'dashboard' || !lastSegment) return 'Dashboard';
    
    const foundModule = modules.find(m => m.id.toLowerCase() === lastSegment.toLowerCase());
    return foundModule ? foundModule.id : 'Dashboard';
  }, [location.pathname]);

  const setActiveTab = (tabId) => {
    setData([]);
    setSelectedAsistenciaDate(null);
    setSearchTerm('');
    if (tabId === 'Dashboard') navigate('/dashboard');
    else navigate(`/dashboard/${tabId.toLowerCase()}`);
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ titulo: '', contenido: '', fecha: '', lugar: '', artista: '', anonimo: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [MiembrosFilter, setMiembrosFilter] = useState('pendientes'); // Default to view pending
  const [anunciosFilter, setAnunciosFilter] = useState('todos');
  const [actasFilter, setActasFilter] = useState('todas');
  const [cantosFilter, setCantosFilter] = useState('todos');
  const [selectedAsistenciaDate, setSelectedAsistenciaDate] = useState(null);
  const [expandedArchivos, setExpandedArchivos] = useState({}); 
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportDates, setExportDates] = useState({ start: '', end: '' });
  const [espirituTab, setEspirituTab] = useState('oracion');
  const [readItem, setReadItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const formatSafeDate = (dateStr, fmt = 'dd MMM yyyy') => {
    if (!dateStr) return 'Sin fecha';
    try {
      let parsed;
      if (typeof dateStr === 'string') {
        parsed = dateStr.includes('T') ? parseISO(dateStr) : new Date(dateStr);
      } else if (dateStr instanceof Date) {
        parsed = dateStr;
      } else {
        parsed = new Date(dateStr);
      }
      if (isNaN(parsed.getTime())) return 'Fecha inválida';
      return format(parsed, fmt, { locale: es });
    } catch (err) {
      return 'Error de fecha';
    }
  };

  // Mover auxiliares aquí
  const getTipoIcon = (tipo) => {
    switch (tipo) {
        case 'urgente': return '🚨';
        case 'evento': return '📅';
        case 'formacion': return '📖';
        case 'apostolado': return '🙏';
        default: return '📢';
    }
  };

  const getActaColor = (tipo) => {
    switch (tipo) {
      case 'consejo': return '#0288D1';
      case 'fraternidad': return '#388E3C';
      case 'formacion': return '#F57C00';
      case 'extraordinaria': return '#D32F2F';
      default: return '#757575';
    }
  };

  const toggleArchivo = (key) => {
    setExpandedArchivos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = useMemo(() => {
    let rawData = [];
    if (activeTab === 'Dashboard' || activeTab === 'Asistencia') {
      rawData = data.asistencias || (Array.isArray(data) ? data : []);
    } else {
      rawData = Array.isArray(data) ? data : [];
    }
    
    // Filtros por Categoría aplicados SIEMPRE sobre rawData
    let filtered = rawData;
    
    if (activeTab === 'Miembros') {
      filtered = filtered.filter(item => {
        if (MiembrosFilter === 'activos') return item.activo;
        if (MiembrosFilter === 'pendientes') return !item.activo;
        return true;
      });
    } else if (activeTab === 'Anuncios') {
      if (anunciosFilter !== 'todos') {
        filtered = filtered.filter(item => (item.tipo || 'urgente') === anunciosFilter);
      }
    } else if (activeTab === 'Actas') {
      if (actasFilter !== 'todas') {
        filtered = filtered.filter(item => (item.tipoReunion || 'consejo') === actasFilter);
      }
    } else if (activeTab === 'Cantos') {
      if (cantosFilter !== 'todos') {
        filtered = filtered.filter(item => item.categoria === cantosFilter);
      }
    }

    if (!searchTerm) {
      if (activeTab === 'Asistencia') return filtered; 
      return filtered;
    }

    // Búsqueda por Texto Libre sobre los datos ya filtrados por categoría
    return filtered.filter(item => {
      if (!item) return false;
      if (activeTab === 'Mapa') return true; 
      
      // Búsqueda por Texto Libre
      const normalize = (str) => typeof str === 'string' ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : '';
      const term = normalize(searchTerm).trim();
      
      try {
        // Extrae todos los valores de texto del objeto recursivamente a un solo string
        const extractValues = (obj) => {
          if (!obj) return '';
          if (typeof obj !== 'object') return String(obj);
          return Object.values(obj).map(v => extractValues(v)).join(' ');
        };
        
        const megaStr = normalize(extractValues(item));
        return megaStr.includes(term);
      } catch (e) {
        const fallback = normalize(`${item.titulo||''} ${item.nombre||''} ${item.apellido||''} ${item.contenido||''} ${item.descripcion||''}`);
        if (activeTab === 'Mensajes') {
          return fallback.includes(term) ||
                 normalize(item.usuario1?.nombre || '').includes(term) ||
                 normalize(item.usuario2?.nombre || '').includes(term);
        }
        return fallback.includes(term);
      }
    });
  }, [data, activeTab, searchTerm, MiembrosFilter, anunciosFilter, actasFilter, cantosFilter]);

  const fetchData = async () => {
    if (activeTab === 'Tienda') return; // Tienda se auto-gestiona
    setLoading(true);
    try {
      let endpoint = '';
      if (activeTab === 'Miembros') endpoint = '/Miembros?todos=true';
      else if (activeTab === 'Anuncios') endpoint = '/anuncios';
      else if (activeTab === 'Eventos') endpoint = '/eventos';
      else if (activeTab === 'Servicios') endpoint = '/servicios';
      else if (activeTab === 'Peticiones') endpoint = '/peticiones';
      else if (activeTab === 'Formacion') endpoint = '/formacion';
      else if (activeTab === 'Actas') endpoint = '/actas';
      else if (activeTab === 'Documentos') endpoint = '/documentos';
      else if (activeTab === 'Galeria') endpoint = '/galeria';
      else if (activeTab === 'Cantos') endpoint = '/cantos';
      else if (activeTab === 'Asistencia') {
        const [asisRes, herRes] = await Promise.all([
          api.get('/asistencia'),
          api.get('/Miembros?todos=true')
        ]);
        const fullData = {
          asistencias: asisRes.data.asistencias || [],
          Miembros: herRes.data.Miembros || []
        };
        setData(fullData);
        window.MiembrosData = fullData.Miembros;
        setLoading(false);
        return;
      }
      else if (activeTab === 'Consejo') endpoint = '/Miembros?todos=true';
      else if (activeTab === 'Espiritu') endpoint = '/espiritualidad';
      else if (activeTab === 'Mensajes') endpoint = '/mensajes/admin/todas';
      else if (activeTab === 'Perfil') endpoint = '/auth/perfil';
      else if (activeTab === 'Chat') endpoint = '/mensajes/conversaciones';
      // Tienda se maneja internamente en su componente para evitar bloqueos globales
      else if (activeTab === 'Dashboard') {
        const [MiembrosRes, anunciosRes, eventosRes, asisRes] = await Promise.all([
          api.get('/Miembros?todos=true'),
          api.get('/anuncios'),
          api.get('/eventos'),
          api.get('/asistencia')
        ]);
        const fullData = {
          Miembros: MiembrosRes.data.Miembros || [],
          anuncios: anunciosRes.data.anuncios || [],
          eventos: eventosRes.data.eventos || [],
          asistencias: asisRes.data.asistencias || []
        };
        setData(fullData);
        window.MiembrosData = fullData.Miembros;
        setLoading(false);
        return;
      }
      else if (activeTab === 'Mapa') {
        const [eventosRes, anunciosRes, serviciosRes] = await Promise.all([
          api.get('/eventos'),
          api.get('/anuncios'),
          api.get('/servicios')
        ]);
        setData({
          eventos: eventosRes.data.eventos || [],
          anuncios: anunciosRes.data.anuncios || [],
          servicios: serviciosRes.data.servicios || []
        });
        setLoading(false);
        return;
      }

      if (endpoint) {
        const response = await api.get(endpoint);
        // Map the responses correctly based on typical properties
        const resData = response.data;
        setData(resData.usuario || resData.conversaciones || resData.items || resData.galeria || resData.asistencias || resData.Miembros || resData.anuncios || resData.eventos || resData.servicios || resData.peticiones || resData.temas || resData.actas || resData.documentos || resData.fotos || resData.cantos || (Array.isArray(resData) ? resData : []));
        if (resData.Miembros) window.MiembrosData = resData.Miembros;
      } else {
        setData([]); // Modulo sin endpoint programado aún
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [profileData, setProfileData] = useState({});

  const handleUpdatePerfil = async (e) => {
    e.preventDefault();
    try {
      // 1. Update basic info
      await api.put('/auth/perfil', profileData);
      
      // 2. Update photo if provided
      if (profileData.nuevaFotoFile) {
        const formData = new FormData();
        formData.append('foto', profileData.nuevaFotoFile);
        await api.post('/auth/foto', formData);
      }
      
      alert('Perfil actualizado con éxito ✅');
      setIsProfileEditing(false);
      fetchData();
    } catch (err) {
      alert('Error al actualizar perfil: ' + (err.response?.data?.message || err.message));
    }
  };

  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [showSearchChat, setShowSearchChat] = useState(false);
  const [showBulkAsistencia, setShowBulkAsistencia] = useState(false);
  const [bulkList, setBulkList] = useState([]);
  const [bulkGuests, setBulkGuests] = useState([]);
  const [bulkGuestName, setBulkGuestName] = useState("");
  const [bulkConfig, setBulkConfig] = useState({ fecha: new Date().toISOString().split('T')[0], tipoReunion: 'semanal' });

  const handleSaveBulkAsistencia = async () => {
    try {
      const payload = {
        fecha: bulkConfig.fecha,
        tipoReunion: bulkConfig.tipoReunion,
        asistencias: [
          ...bulkList.map(item => ({
            usuarioId: item._id,
            estado: item.estado || 'falta'
          })),
          ...bulkGuests.map(name => ({
            nombreInvitado: name,
            estado: 'presente'
          }))
        ]
      };
      await api.post('/asistencia/lote', payload);
      alert('Asistencia registrada correctamente ✅');
      setShowBulkAsistencia(false);
      setBulkGuests([]);
      fetchData();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const openChatPersonal = async (user2) => {
    setActiveChat(user2);
    setChatLoading(true);
    try {
      const response = await api.get(`/mensajes/chat/${user2._id}`);
      if (response.data.success) {
        setChatMessages(response.data.mensajes);
      }
    } catch (error) {
       console.error("Error al cargar chat personal", error);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendChat = async (e) => {
    if (e) e.preventDefault();
    if (!nuevoMensaje.trim() || !activeChat) return;

    try {
      const resp = await api.post('/mensajes/enviar', { destinatarioId: activeChat._id, contenido: nuevoMensaje });
      if (resp.data.success) {
        setChatMessages([...chatMessages, resp.data.mensaje]);
        setNuevoMensaje("");
      }
    } catch (error) {
       alert("Error al enviar mensaje");
    }
  };

  const openChatAdmin = async (conv) => {
    setReadItem({ ...conv, type: 'chat' });
    setChatLoading(true);
    try {
      const response = await api.get(`/mensajes/admin/chat/${conv.usuario1._id}/${conv.usuario2._id}`);
      if (response.data.success) {
        setChatMessages(response.data.mensajes);
      }
    } catch (error) {
       console.error("Error al cargar chat", error);
    } finally {
      setChatLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'Miembros') {
        alert('Los Miembros deben registrarse ellos mismos desde su propia App Móvil.');
        setIsModalOpen(false);
        return;
      }
      if (activeTab === 'Asistencia') {
        alert('Las asistencias deben ser tomadas por QR oficial desde la App.');
        setIsModalOpen(false);
        return;
      }

      let endpoint = '';
      let payload = {};

      // Dynamic payload building based on the module
      if (activeTab === 'Anuncios') {
        const formData = new FormData();
        formData.append('titulo', newItem.titulo || '');
        formData.append('contenido', newItem.contenido || '');
        formData.append('tipo', newItem.tipo || 'urgente');
        formData.append('prioridad', newItem.prioridad || 'normal');
        formData.append('destinatarios', newItem.destinatarios || 'todos');
        if (newItem.destacado) formData.append('destacado', 'true');
        if (newItem.imagenFile) formData.append('imagen', newItem.imagenFile);
        if (newItem.lat) formData.append('lat', newItem.lat);
        if (newItem.lng) formData.append('lng', newItem.lng);

        await api.post('/anuncios', formData);
        setIsModalOpen(false);
        setNewItem({ titulo: '', contenido: '', fecha: '', lugar: '', artista: '' });
        fetchData();
        return; // Early return ya que usamos FormData
      } else if (activeTab === 'Eventos') {
        const formData = new FormData();
        formData.append('titulo', newItem.titulo || '');
        formData.append('descripcion', newItem.contenido || '');
        formData.append('fecha', newItem.fecha ? new Date(newItem.fecha + 'T12:00:00').toISOString() : new Date().toISOString());
        formData.append('hora', newItem.hora || '18:00');
        formData.append('lugar', newItem.lugar || 'Sede Catequesis');
        formData.append('tipo', newItem.tipo || 'reunion');
        formData.append('lat', newItem.lat || -6.745);
        formData.append('lng', newItem.lng || -79.824);
        if (newItem.imagenFile) formData.append('imagen', newItem.imagenFile);

        await api.post('/eventos', formData);
        setIsModalOpen(false);
        setNewItem({ titulo: '', contenido: '', fecha: '', hora: '', lugar: '', tipo: 'reunion', lat: '', lng: '', imagenFile: null, previewImagen: '' });
        fetchData();
        return;
      } else if (activeTab === 'Servicios') {
        const formData = new FormData();
        formData.append('titulo', newItem.titulo || '');
        formData.append('descripcion', newItem.contenido || '');
        formData.append('fecha', newItem.fecha ? new Date(newItem.fecha).toISOString() : new Date().toISOString());
        formData.append('lugar', newItem.lugar || 'Sede Catequesis');
        formData.append('cupoMaximo', newItem.cupoMaximo || 0);
        if (newItem.lat) formData.append('lat', newItem.lat);
        if (newItem.lng) formData.append('lng', newItem.lng);
        if (newItem.imagenFile) formData.append('imagen', newItem.imagenFile);

        await api.post('/servicios', formData);
        setIsModalOpen(false);
        setNewItem({ titulo: '', contenido: '', fecha: '', lugar: '', cupoMaximo: 0, lat: '', lng: '', imagenFile: null, previewImagen: '' });
        fetchData();
        return;
      } else if (activeTab === 'Peticiones') {
        endpoint = '/peticiones';
        payload = { contenido: newItem.contenido, anonimo: newItem.anonimo || false };
      } else if (activeTab === 'Formacion') {
        const formData = new FormData();
        formData.append('titulo', newItem.titulo || '');
        formData.append('descripcion', newItem.descripcion || '');
        formData.append('contenido', newItem.contenido || '');
        const etiqArray = (newItem.etiquetas || '').split(',').map(e => e.trim()).filter(e => e);
        etiqArray.forEach(e => formData.append('etiquetas', e));
        if (newItem.archivoFile) formData.append('archivo', newItem.archivoFile);

        await api.post('/formacion', formData);
        setIsModalOpen(false);
        setNewItem({ titulo: '', descripcion: '', contenido: '', etiquetas: '', archivoFile: null });
        fetchData();
        return;
      } else if (activeTab === 'Actas') {
        endpoint = '/actas';
        const parsedAcuerdos = (newItem.acuerdoTexto || '').split('\n').map(line => line.trim()).filter(line => line.length > 0).map(desc => ({ descripcion: desc }));
        payload = { 
          titulo: newItem.titulo, 
          contenido: newItem.contenido, 
          tipoReunion: newItem.tipoReunion || 'consejo',
          fecha: newItem.fecha ? new Date(newItem.fecha).toISOString() : new Date().toISOString(),
          acuerdos: parsedAcuerdos
        };
      } else if (activeTab === 'Documentos') {
        endpoint = '/documentos';
        payload = { titulo: newItem.titulo, descripcion: newItem.contenido };
      } else if (activeTab === 'Cantos') {
        const formData = new FormData();
        formData.append('titulo', newItem.titulo || '');
        formData.append('letra', newItem.letra || newItem.contenido || '');
        formData.append('autor', newItem.artista || '');
        formData.append('categoria', newItem.categoria || 'otro');
        if (newItem.archivoFile) formData.append('archivo', newItem.archivoFile);

        await api.post('/cantos', formData);
        setIsModalOpen(false);
        setNewItem({ titulo: '', contenido: '', fecha: '', lugar: '', artista: '', letra: '', categoria: 'otro', archivoFile: null });
        fetchData();
        return;
      } else if (activeTab === 'Documentos') {
        const formData = new FormData();
        formData.append('titulo', newItem.titulo || '');
        formData.append('descripcion', newItem.descripcion || '');
        formData.append('tipo', newItem.tipo || 'otro');
        formData.append('contenido', newItem.contenido || '');
        if (newItem.archivoFile) formData.append('archivo', newItem.archivoFile);

        await api.post('/documentos', formData);
        setIsModalOpen(false);
        setNewItem({ titulo: '', descripcion: '', contenido: '', tipo: 'otro', archivoFile: null });
        fetchData();
        return;
      } else if (activeTab === 'Espiritu') {
        await api.post('/espiritualidad', {
          titulo: newItem.titulo,
          contenido: newItem.contenido,
          tipo: newItem.tipo || 'oracion'
        });
        setIsModalOpen(false);
        setNewItem({ titulo: '', contenido: '', tipo: 'oracion' });
        fetchData();
        return;
      } else if (activeTab === 'Tienda') {
        endpoint = '/tienda';
        payload = { 
          ...newItem, 
          monto: parseFloat(newItem.monto),
          tipo: newItem.tipo || 'ingreso',
          fecha: newItem.fecha || new Date().toISOString().split('T')[0]
        };
      } else if (activeTab === 'Galeria') {
        const formData = new FormData();
        formData.append('titulo', newItem.titulo || '');
        formData.append('descripcion', newItem.descripcion || '');
        formData.append('fecha', newItem.fecha || new Date().toISOString());
        if (newItem.archivoFile) formData.append('archivo', newItem.archivoFile);

        await api.post('/galeria', formData);
        setIsModalOpen(false);
        setNewItem({ titulo: '', descripcion: '', fecha: '', archivoFile: null });
        fetchData();
        return;
      }

      if (endpoint) {
        await api.post(endpoint, payload);
        setIsModalOpen(false);
        setNewItem({ titulo: '', contenido: '', fecha: '', lugar: '', artista: '' });
        fetchData(); // Recargar datos
      } else {
        alert('Módulo en construcción.');
      }
    } catch (error) {
      alert(`Error al crear el registro: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleApprove = async (id, e) => {
    e.stopPropagation();
    try {
      await api.put(`/Miembros/${id}`, { activo: true });
      fetchData();
    } catch (error) {
      alert(`Error al aprobar: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id, moduloRuta) => {
    if (window.confirm('¿Estás totalmente seguro de que deseas eliminar esto?')) {
      try {
        await api.delete(`/${moduloRuta}/${id}`);
        fetchData();
      } catch (err) {
        alert(`Error al intentar eliminar: ${err.message}`);
      }
    }
  };

  const handleOrar = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await api.put(`/peticiones/${id}/orar`);
      fetchData();
    } catch (error) {
      console.error('Error al registrar oración:', error);
    }
  };

  const handleParticipar = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      const { data } = await api.put(`/servicios/${id}/participar`);
      alert(data.message);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error al procesar inscripción');
    }
  };

  const handleExportAsistencia = async (e) => {
    e.preventDefault();
    
    try {
      let sourceData = data.asistencias || (Array.isArray(data) ? data : []);
      let asistenciasToExport = sourceData;
      
      if (exportDates.start && exportDates.end) {
        const startT = new Date(`${exportDates.start}T00:00:00`).getTime();
        const endT = new Date(`${exportDates.end}T23:59:59`).getTime();
        
        asistenciasToExport = sourceData.filter(item => {
           if (!item.fecha) return false;
           const itemT = new Date(item.fecha).getTime();
           return itemT >= startT && itemT <= endT;
        });
      } else if (exportDates.start || exportDates.end) {
        alert("Por favor selecciona ambas fechas (Desde y Hasta) o déjalas vacías para un reporte completo.");
        return;
      }

      if (asistenciasToExport.length === 0) {
        alert("No hay ningún registro de asistencia en este rango de fechas.");
        return;
      }

      const header = "Fecha;Miembro;Tipo Reunión;Estado;Método;Observaciones\n";
      const rows = asistenciasToExport.map(a => {
        const fechaFull = a.fecha ? new Date(a.fecha) : new Date();
        const fechaStr = fechaFull.toLocaleDateString('es-ES');
        
        // Búsqueda robusta del nombre del miembro
        let nombreMiembro = 'Usuario Desconocido';
        if (a.usuario) {
          nombreMiembro = `${a.usuario.nombre} ${a.usuario.apellido}`;
        } else if (a.miembroId) {
          const encontrado = (data.Miembros || []).find(m => m._id === a.miembroId);
          if (encontrado) nombreMiembro = `${encontrado.nombre} ${encontrado.apellido}`;
        } else if (a.nombreInvitado) {
          nombreMiembro = `Invitado: ${a.nombreInvitado}`;
        }

        const tipo = a.tipoReunion || 'semanal';
        const estado = a.estado ? (a.estado.charAt(0).toUpperCase() + a.estado.slice(1)) : (a.presente ? 'Presente' : 'Falta');
        const metodo = a.metodoRegistro || 'qr';
        const obs = a.observaciones ? a.observaciones.replace(/;/g, '') : '';
        return `${fechaStr};"${nombreMiembro}";"${tipo}";"${estado}";"${metodo}";"${obs}"`;
      }).join("\n");

      const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
      const content = "sep=;\n" + header + rows;
      const blob = new Blob([BOM, content], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const fileNameStr = (exportDates.start && exportDates.end) 
        ? `Reporte_Asistencia_${exportDates.start}_al_${exportDates.end}.csv`
        : `Reporte_Asistencia_Completo.csv`;

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileNameStr);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      
      setIsExportModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Error al generar el reporte local.');
    }
  };

  const openEditModal = (item) => {
    // Si es asistencia, no editar por ahora
    if (activeTab === 'Asistencia') return;
    
    const extendedItem = { ...item };
    if (activeTab === 'Actas' && item.acuerdos && item.acuerdos.length > 0) {
       extendedItem.acuerdoTexto = item.acuerdos.map(a => a.descripcion).join('\n');
    }
    
    setSelectedItem(extendedItem);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'Miembros') {
        await api.put(`/Miembros/${selectedItem._id}`, {
          nombre: selectedItem.nombre,
          apellido: selectedItem.apellido,
          username: selectedItem.username,
          telefono: selectedItem.telefono,
          contactoEmergencia: selectedItem.contactoEmergencia,
          nombreContactoEmergencia: selectedItem.nombreContactoEmergencia,
          rol: selectedItem.rol,
          cargo: selectedItem.cargo,
          activo: selectedItem.activo,
          email: selectedItem.email,
          password: selectedItem.password
        });
        setIsEditModalOpen(false);
        fetchData();
      } else if (activeTab === 'Anuncios') {
        const formData = new FormData();
        formData.append('titulo', selectedItem.titulo);
        formData.append('contenido', selectedItem.contenido);
        formData.append('tipo', selectedItem.tipo || 'urgente');
        formData.append('prioridad', selectedItem.prioridad || 'normal');
        formData.append('destinatarios', selectedItem.destinatarios || 'todos');
        formData.append('destacado', selectedItem.destacado ? 'true' : 'false');
        if (selectedItem.nuevaImagenFile) {
          formData.append('imagen', selectedItem.nuevaImagenFile);
        }
        if (selectedItem.ubicacion?.lat) formData.append('lat', selectedItem.ubicacion.lat);
        if (selectedItem.ubicacion?.lng) formData.append('lng', selectedItem.ubicacion.lng);

        await api.put(`/anuncios/${selectedItem._id}`, formData);
        setIsEditModalOpen(false);
      } else if (activeTab === 'Formacion') {
        const formData = new FormData();
        formData.append('titulo', selectedItem.titulo || '');
        formData.append('descripcion', selectedItem.descripcion || '');
        formData.append('contenido', selectedItem.contenido || '');
        
        const etiqList = typeof selectedItem.etiquetas === 'string' 
          ? selectedItem.etiquetas.split(',').map(e => e.trim()).filter(e => e)
          : (Array.isArray(selectedItem.etiquetas) ? selectedItem.etiquetas : []);
        etiqList.forEach(e => formData.append('etiquetas', e));

        if (selectedItem.nuevaImagenFile) formData.append('archivo', selectedItem.nuevaImagenFile);

        await api.put(`/formacion/${selectedItem._id}`, formData);
        setIsEditModalOpen(false);
        fetchData();
        return;
      } else if (activeTab === 'Eventos') {
        const formData = new FormData();
        formData.append('titulo', selectedItem.titulo || '');
        formData.append('descripcion', selectedItem.descripcion || selectedItem.contenido || '');
        if (selectedItem.fecha) formData.append('fecha', new Date(selectedItem.fecha).toISOString());
        formData.append('hora', selectedItem.hora || '');
        formData.append('lugar', selectedItem.lugar || '');
        formData.append('tipo', selectedItem.tipo || 'reunion');
        if (selectedItem.ubicacion?.lat) formData.append('lat', selectedItem.ubicacion.lat);
        if (selectedItem.ubicacion?.lng) formData.append('lng', selectedItem.ubicacion.lng);
        if (selectedItem.nuevaImagenFile) formData.append('imagen', selectedItem.nuevaImagenFile);

        await api.put(`/eventos/${selectedItem._id}`, formData);
        setIsEditModalOpen(false);
        fetchData();
        return;
      } else if (activeTab === 'Cantos') {
        const formData = new FormData();
        formData.append('titulo', selectedItem.titulo || '');
        formData.append('letra', selectedItem.letra || selectedItem.contenido || '');
        formData.append('autor', selectedItem.autor || selectedItem.artista || '');
        formData.append('categoria', selectedItem.categoria || 'otro');
        if (selectedItem.nuevaImagenFile) formData.append('archivo', selectedItem.nuevaImagenFile); // Utilizamos la clave archivo backend

        await api.put(`/cantos/${selectedItem._id}`, formData);
        setIsEditModalOpen(false);
        fetchData();
      } else if (activeTab === 'Actas') {
        const parsedAcuerdosEdit = (selectedItem.acuerdoTexto || '').split('\n').map(line => line.trim()).filter(line => line.length > 0).map(desc => ({ descripcion: desc }));
        await api.put(`/actas/${selectedItem._id}`, {
          titulo: selectedItem.titulo,
          contenido: selectedItem.contenido,
          tipoReunion: selectedItem.tipoReunion,
          fecha: selectedItem.fecha ? new Date(selectedItem.fecha).toISOString() : new Date().toISOString(),
          acuerdos: parsedAcuerdosEdit
        });
        setIsEditModalOpen(false);
        fetchData();
      } else if (activeTab === 'Peticiones') {
        await api.put(`/peticiones/${selectedItem._id}`, {
          contenido: selectedItem.contenido,
          anonimo: selectedItem.anonimo
        });
        setIsEditModalOpen(false);
        fetchData();
      } else if (activeTab === 'Servicios') {
        const formData = new FormData();
        formData.append('titulo', selectedItem.titulo || '');
        formData.append('descripcion', selectedItem.descripcion || '');
        if (selectedItem.fecha) formData.append('fecha', new Date(selectedItem.fecha).toISOString());
        formData.append('lugar', selectedItem.lugar || '');
        formData.append('cupoMaximo', selectedItem.cupoMaximo || 0);
        if (selectedItem.ubicacion?.lat) formData.append('lat', selectedItem.ubicacion.lat);
        if (selectedItem.ubicacion?.lng) formData.append('lng', selectedItem.ubicacion.lng);
        if (selectedItem.nuevaImagenFile) formData.append('imagen', selectedItem.nuevaImagenFile);

        await api.put(`/servicios/${selectedItem._id}`, formData);
        setIsEditModalOpen(false);
        fetchData();
        return;
      } else if (activeTab === 'Documentos') {
        const formData = new FormData();
        formData.append('titulo', selectedItem.titulo || '');
        formData.append('descripcion', selectedItem.descripcion || '');
        formData.append('tipo', selectedItem.tipo || 'otro');
        formData.append('contenido', selectedItem.contenido || '');
        if (selectedItem.nuevaImagenFile) formData.append('archivo', selectedItem.nuevaImagenFile);

        await api.put(`/documentos/${selectedItem._id}`, formData);
        setIsEditModalOpen(false);
        fetchData();
        return;
      } else if (activeTab === 'Espiritu') {
        await api.put(`/espiritualidad/${selectedItem._id}`, {
          titulo: selectedItem.titulo,
          contenido: selectedItem.contenido,
          tipo: selectedItem.tipo || 'oracion'
        });
        setIsEditModalOpen(false);
        fetchData();
        return;
      } else {
        alert('Esta edición por ahora es exclusiva para Miembros, Anuncios y Actas. ¡Se ampliará pronto!');
      }
    } catch (err) {
      alert(`Error al actualizar: ${err.response?.data?.message || err.message}`);
    }
  };



  const groupedAsistencias = activeTab === 'Asistencia' ? filteredData.reduce((acc, item) => {
    if (!item || !item.fecha) return acc;
    const rawDate = new Date(item.fecha);
    if (isNaN(rawDate.getTime())) return acc;
    
    const year = rawDate.getFullYear().toString();
    const month = rawDate.toLocaleDateString('es-ES', { month: 'long' });
    const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
    const dateStr = rawDate.toLocaleDateString('es-ES');
    
    if (!acc[year]) acc[year] = {};
    if (!acc[year][monthCapitalized]) acc[year][monthCapitalized] = {};
    if (!acc[year][monthCapitalized][dateStr]) acc[year][monthCapitalized][dateStr] = [];
    
    acc[year][monthCapitalized][dateStr].push(item);
    return acc;
  }, {}) : null;

  const getSafeDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  };
















  const currentView = () => {
    if (loading) return <p>Cargando datos desde la nube...</p>;
    
    switch (activeTab) {
      case 'Asistencia': return <AsistenciaView groupedAsistencias={groupedAsistencias} expandedArchivos={expandedArchivos} toggleArchivo={toggleArchivo} selectedAsistenciaDate={selectedAsistenciaDate} setSelectedAsistenciaDate={setSelectedAsistenciaDate} />;
      case 'Anuncios': return <AnunciosList filteredData={filteredData} setReadItem={setReadItem} getTipoIcon={getTipoIcon} SafeImage={SafeImage} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Eventos': return <EventosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Servicios': return <ServiciosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} handleParticipar={handleParticipar} />;
      case 'Peticiones': return <PeticionesList filteredData={filteredData} handleOrar={handleOrar} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Formacion': return <FormacionList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Cantos': return <CantosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Actas': return <ActasList filteredData={filteredData} getActaColor={getActaColor} formatSafeDate={formatSafeDate} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Documentos': return <DocumentosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Galeria': return <GaleriaList filteredData={filteredData} setReadItem={setReadItem} SafeImage={SafeImage} formatSafeDate={formatSafeDate} handleDelete={handleDelete} />;
      case 'Mapa': return <MapaView data={data} loading={loading} ActivityIndicator={ActivityIndicator} setReadItem={setReadItem} setActiveTab={setActiveTab} />;
      case 'Dashboard': return <DashboardView loading={loading} data={data} user={user} formatSafeDate={formatSafeDate} setActiveTab={setActiveTab} handleApprove={handleApprove} ActivityIndicator={ActivityIndicator} />;
      case 'Chat':
        return renderMisMensajes();
      case 'Perfil': return <PerfilView data={data} loading={loading} ActivityIndicator={ActivityIndicator} SafeImage={SafeImage} isProfileEditing={isProfileEditing} setIsProfileEditing={setIsProfileEditing} profileData={profileData} setProfileData={setProfileData} handleUpdatePerfil={handleUpdatePerfil} getSafeDateForInput={getSafeDateForInput} formatSafeDate={formatSafeDate} />;
      case 'WebConfig': return <WebConfigView loading={loading} setLoading={setLoading} />;
      case 'ParroquiaConfig': return <ParroquiaConfigView loading={loading} setLoading={setLoading} />;
      case 'Tienda': return <TiendaView formatSafeDate={formatSafeDate} />;
      case 'Comunicacion': return <ComunicacionView loading={loading} setLoading={setLoading} Miembros={data.Miembros || []} />;
      case 'Mensajes': return <MensajesAdminView loading={loading} ActivityIndicator={ActivityIndicator} data={data} openChatAdmin={openChatAdmin} formatSafeDate={formatSafeDate} />;
      case 'Espiritu': return <EspirituList filteredData={filteredData} espirituTab={espirituTab} setEspirituTab={setEspirituTab} openEditModal={openEditModal} handleDelete={handleDelete} />;
      case 'Consejo':
        return <Consejo miembrosData={filteredData} />;
      default:
        if (filteredData.length > 0) {
          return (
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {filteredData.map((item, index) => (
                <div 
                  key={item._id || index} 
                  className="glass-card animate-fade" 
                  style={{ padding: '1.5rem', position: 'relative', cursor: 'pointer' }}
                  onClick={() => openEditModal(item)}
                >
                  <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>
                    {item.titulo || item.nombreCompleto || item.nombre || 'Registro sin título'}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {item.contenido || item.descripcion || item.email || item.username || ''}
                  </p>
                  
                  {activeTab === 'Miembros' && (
                    <div style={{ marginTop: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: item.activo ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)', color: item.activo ? '#4CAF50' : '#F44336' }}>
                        {item.activo ? 'Activo (Aprobado)' : 'Pendiente de Aprobación'}
                      </span>
                      {!item.activo && (
                        <button 
                          onClick={(e) => handleApprove(item._id, e)}
                          style={{ display: 'block', marginTop: '10px', background: '#4CAF50', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
                          Aprobar Acceso
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        }
        return (
          <div className="glass-card animate-fade">
            <p style={{ color: "var(--text-muted)" }}>
              {data.length === 0 ? `No hay datos para el módulo de ${activeTab}.` : 'No se encontraron resultados para tu búsqueda.'}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      {isSidebarOpen && (
        <div 
          className="modal-overlay" 
          style={{ zIndex: 1000 }} 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">Catequesis Pomalca Admin</div>
        <nav className="nav-menu">
          {modules.map((mod) => (
             <a
              key={mod.id}
              href="#"
              onClick={(e) => { 
                e.preventDefault(); 
                setActiveTab(mod.id); 
                setIsSidebarOpen(false); 
              }}
              className={`nav-link ${activeTab === mod.id ? 'active' : ''}`}
            >
              <span style={{ marginRight: '8px' }}>{mod.icon}</span>
              {mod.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p className="user-name">{user.nombre} {user.apellido}</p>
          <button className="btn btn-logout" onClick={onLogout}>Cerrar Sesión</button>
        </div>
      </aside>
      <main className="dashboard-content">
        <div className="mobile-header">
          <div className="sidebar-brand" style={{ padding: 0, border: 'none', fontSize: '1.2rem' }}>Catequesis Pomalca Admin</div>
          <button className="hamburger" onClick={() => setIsSidebarOpen(true)}>☰</button>
        </div>
        <header className="content-header flex-responsive" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ marginBottom: '0.4rem' }}>Gestión de {activeTab}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {(() => {
                  const today = new Date();
                  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                  return today.toLocaleDateString('es-ES', options).replace(/^./, str => str.toUpperCase());
                })()}
              </p>
            </div>
          <div className="flex-responsive" style={{ gap: '1rem', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '400px' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
                <input 
                  type="text" 
                  placeholder={`Buscar en ${activeTab}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', paddingLeft: '35px', paddingRight: '1rem', paddingTop: '0.6rem', paddingBottom: '0.6rem', borderRadius: '12px', border: '1px solid rgba(139, 90, 43, 0.2)', backgroundColor: 'var(--surface)' }}
                />
              </div>

            <div className="flex-responsive" style={{ gap: '0.8rem' }}>
              {activeTab === 'Asistencia' ? (
                <>
                  <button 
                    className="btn zoom-hover" 
                    style={{ background: '#1D6F42', color: 'white', border: 'none', fontWeight: 'bold' }} 
                    onClick={() => setIsExportModalOpen(true)}
                  >
                    📊 <span className="desktop-only">Descargar Excel</span>
                  </button>
                  <button 
                    onClick={() => {
                      const hActivos = (Array.isArray(data.Miembros) ? data.Miembros : []).filter(h => h.activo);
                      setBulkList(hActivos.map(h => ({ ...h, presente: false })));
                      setShowBulkAsistencia(true);
                    }}
                    className="btn btn-primary zoom-hover" 
                    style={{ background: 'var(--primary)', boxShadow: '0 4px 15px rgba(139, 90, 43, 0.4)', fontWeight: 'bold', whiteSpace: 'nowrap' }}
                  >
                    📝 Tomar Asistencia
                  </button>
                </>
              ) : activeTab === 'Actas' ? (
                <button className="btn btn-primary zoom-hover" onClick={() => setIsModalOpen(true)} style={{ background: '#795548', whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(139, 90, 43, 0.4)' }}>
                  📝 Redactar Acta
                </button>
              ) : activeTab !== 'Miembros' && (
                <button className="btn btn-primary zoom-hover" onClick={() => setIsModalOpen(true)} style={{ whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(139, 90, 43, 0.4)' }}>
                  + Nuevo
                </button>
              )}
            </div>
          </div>
        </header>

        {activeTab === 'Miembros' && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button 
              className={`btn ${MiembrosFilter === 'pendientes' ? 'btn-primary' : ''}`} 
              onClick={() => setMiembrosFilter('pendientes')}
              style={{ background: MiembrosFilter !== 'pendientes' ? 'var(--surface)' : '', color: MiembrosFilter !== 'pendientes' ? 'var(--text-main)' : '', border: '1px solid var(--border)', flex: 1 }}
            >
              Nuevas Solicitudes (Pendientes)
            </button>
            <button 
              className={`btn ${MiembrosFilter === 'activos' ? 'btn-primary' : ''}`} 
              onClick={() => setMiembrosFilter('activos')}
              style={{ background: MiembrosFilter !== 'activos' ? 'var(--surface)' : '', color: MiembrosFilter !== 'activos' ? 'var(--text-main)' : '', border: '1px solid var(--border)', flex: 1 }}
            >
              Miembros Activos
            </button>
            <button 
              className={`btn ${MiembrosFilter === 'todos' ? 'btn-primary' : ''}`} 
              onClick={() => setMiembrosFilter('todos')}
              style={{ background: MiembrosFilter !== 'todos' ? 'var(--surface)' : '', color: MiembrosFilter !== 'todos' ? 'var(--text-main)' : '', border: '1px solid var(--border)', flex: 1 }}
            >
              Ver Todos
            </button>
          </div>
        )}
        
        {activeTab === 'Anuncios' && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {[{ id: 'todos', label: 'Todos', icon: '📋' }, { id: 'urgente', label: 'Urgentes', icon: '🚨' }, { id: 'evento', label: 'Eventos', icon: '📅' }, { id: 'formacion', label: 'Formación', icon: '📖' }, { id: 'apostolado', label: 'Apostolado', icon: '🙏' }].map(filtro => (
              <button
                key={filtro.id}
                className={`btn ${anunciosFilter === filtro.id ? 'btn-primary' : ''}`}
                onClick={() => setAnunciosFilter(filtro.id)}
                style={{ background: anunciosFilter !== filtro.id ? 'var(--surface)' : '', color: anunciosFilter !== filtro.id ? 'var(--text-main)' : '', border: '1px solid var(--border)', whiteSpace: 'nowrap' }}
              >
                {filtro.icon} {filtro.label}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'Actas' && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {[{ id: 'todas', label: 'Todas las Actas', bg: 'var(--surface)' }, { id: 'consejo', label: 'Consejo', bg: '#0288D115', border: '#0288D1' }, { id: 'fraternidad', label: 'Fraternidad', bg: '#388E3C15', border: '#388E3C' }, { id: 'formacion', label: 'Formación', bg: '#F57C0015', border: '#F57C00' }, { id: 'extraordinaria', label: 'Extraordinarias', bg: '#D32F2F15', border: '#D32F2F' }].map(filtro => (
              <button
                key={filtro.id}
                className={`btn ${actasFilter === filtro.id ? 'btn-primary' : ''}`}
                onClick={() => setActasFilter(filtro.id)}
                style={{ 
                  background: actasFilter === filtro.id ? filtro.border || 'var(--primary)' : filtro.bg || 'var(--surface)', 
                  color: actasFilter === filtro.id ? 'white' : 'var(--text-main)', 
                  border: `1px solid ${filtro.border || 'var(--border)'}`, 
                  whiteSpace: 'nowrap',
                  fontWeight: actasFilter === filtro.id ? 'bold' : 'normal'
                }}
              >
                {filtro.label}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'Cantos' && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {[{ id: 'todos', label: 'Todos', icon: '🎵' }, { id: 'franciscano', label: 'Franciscanos', icon: '🕊️' }, { id: 'mariano', label: 'Marianos', icon: '🌹' }, { id: 'entrada', label: 'Entrada', icon: '🚶' }, { id: 'animacion', label: 'Animación', icon: '🎸' }, { id: 'adoracion', label: 'Adoración', icon: '🙏' }].map(filtro => (
              <button
                key={filtro.id}
                className={`btn ${cantosFilter === filtro.id ? 'btn-primary' : ''}`}
                onClick={() => setCantosFilter(filtro.id)}
                style={{ background: cantosFilter !== filtro.id ? 'var(--surface)' : '', color: cantosFilter !== filtro.id ? 'var(--text-main)' : '', border: '1px solid var(--border)', whiteSpace: 'nowrap' }}
              >
                {filtro.icon} {filtro.label}
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-4">
          {currentView()}
        </div>

        {/* Modal Window */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content animate-fade" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
              <h2>Añadir a {activeTab}</h2>
              <form onSubmit={handleCreate}>
                
                {activeTab === 'Actas' ? (
                  <ActasNewModal newItem={newItem} setNewItem={setNewItem} />
                ) : activeTab === 'Documentos' ? (
                  <DocumentosNewModal newItem={newItem} setNewItem={setNewItem} />
                ) : activeTab === 'Peticiones' ? (
                  <PeticionesNewModal newItem={newItem} setNewItem={setNewItem} />
                ) : activeTab === 'Galeria' ? (
                  <GaleriaNewModal newItem={newItem} setNewItem={setNewItem} />
                ) : activeTab === 'Espiritu' ? (
                  <EspirituNewModal newItem={newItem} setNewItem={setNewItem} />
                ) : activeTab === 'Anuncios' ? (
                  <AnunciosNewModal newItem={newItem} setNewItem={setNewItem} MapPicker={MapPicker} />
                ) : activeTab === 'Cantos' ? (
                  <CantosNewModal newItem={newItem} setNewItem={setNewItem} />
                ) : activeTab === 'Formacion' ? (
                  <FormacionNewModal newItem={newItem} setNewItem={setNewItem} />
                ) : activeTab === 'Servicios' ? (
                  <ServiciosNewModal newItem={newItem} setNewItem={setNewItem} MapPicker={MapPicker} />
                ) : activeTab === 'Eventos' ? (
                  <EventosNewModal newItem={newItem} setNewItem={setNewItem} MapPicker={MapPicker} />
                ) : activeTab === 'Tienda' ? (
                  <div className="input-group">
                    <label>Tipo de Movimiento</label>
                    <select value={newItem.tipo || 'ingreso'} onChange={e => setNewItem({...newItem, tipo: e.target.value})} required>
                        <option value="ingreso">Ingreso (+)</option>
                        <option value="egreso">Egreso (-)</option>
                    </select>
                    <label style={{ marginTop: '1rem' }}>Monto (S/)</label>
                    <input type="number" step="0.01" value={newItem.monto || ''} onChange={e => setNewItem({...newItem, monto: e.target.value})} required placeholder="0.00" />
                    <label style={{ marginTop: '1rem' }}>Descripción</label>
                    <input type="text" value={newItem.descripcion || ''} onChange={e => setNewItem({...newItem, descripcion: e.target.value})} required placeholder="Ej: Venta de manuales" />
                    <label style={{ marginTop: '1rem' }}>Categoría</label>
                    <select value={newItem.categoria || 'General'} onChange={e => setNewItem({...newItem, categoria: e.target.value})}>
                        <option value="General">General</option>
                        <option value="Materiales">Materiales</option>
                        <option value="Eventos">Eventos</option>
                        <option value="Donaciones">Donaciones</option>
                        <option value="Limpieza">Limpieza/Local</option>
                    </select>
                    <label style={{ marginTop: '1rem' }}>Fecha</label>
                    <input type="date" value={newItem.fecha || new Date().toISOString().split('T')[0]} onChange={e => setNewItem({...newItem, fecha: e.target.value})} required />
                  </div>
                ) : (
                  <div className="input-group">
                    <label>Título Principal</label>
                    <input 
                      type="text" 
                      value={newItem.titulo || ''} 
                      onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
                      required 
                      placeholder="Escribe el título aquí"
                    />
                    <label style={{ marginTop: '1rem' }}>Contenido / Descripción</label>
                    <textarea 
                      value={newItem.contenido || ''} 
                      onChange={e => setNewItem({...newItem, contenido: e.target.value})} 
                      required 
                      placeholder="Escribe los detalles aquí..."
                      style={{ minHeight: '100px' }}
                    />
                  </div>
                )}

                <div className="modal-actions">
                  <button type="button" className="btn btn-logout" style={{ width: 'auto'}} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Guardar {activeTab}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      {/* Edit Modal Window */}
        {isEditModalOpen && selectedItem && (
          <div className="modal-overlay">
            <div className="modal-content animate-fade" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
              <h2>Editar {activeTab === 'Miembros' ? 'Miembro' : 'Registro'}</h2>
              <form onSubmit={handleUpdate}>
                
                {activeTab === 'Miembros' ? (
                  <MiembrosEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                ) : activeTab === 'Anuncios' ? (
                  <AnunciosEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} MapPicker={MapPicker} />
                ) : activeTab === 'Eventos' ? (
                  <EventosEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} MapPicker={MapPicker} getSafeDateForInput={getSafeDateForInput} />
                ) : activeTab === 'Actas' ? (
                  <ActasEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} getSafeDateForInput={getSafeDateForInput} />
                ) : activeTab === 'Cantos' ? (
                  <CantosEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                ) : activeTab === 'Formacion' ? (
                  <FormacionEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                ) : activeTab === 'Documentos' ? (
                  <DocumentosEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                ) : activeTab === 'Servicios' ? (
                  <ServiciosEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} MapPicker={MapPicker} />
                ) : activeTab === 'Espiritu' ? (
                  <EspirituEditModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                ) : (
                  <div className="glass-card animate-fade">
                    <p style={{ color: 'var(--text-muted)' }}>La edición de este módulo estará disponible en la próxima actualización.</p>
                  </div>
                )}

                <div className="modal-actions" style={{ marginTop: '2rem' }}>
                  <button type="button" className="btn btn-logout" style={{ width: 'auto'}} onClick={() => setIsEditModalOpen(false)}>Cerrar</button>
                  {['Miembros', 'Anuncios', 'Eventos', 'Actas', 'Cantos', 'Formacion', 'Peticiones', 'Servicios', 'Documentos', 'Espiritu'].includes(activeTab) && (
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Read Item Modal */}
        <ItemReadModal 
          readItem={readItem}
          setReadItem={setReadItem}
          activeTab={activeTab}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          chatLoading={chatLoading}
          formatSafeDate={formatSafeDate}
          getTipoIcon={getTipoIcon}
          SafeImage={SafeImage}
          ActivityIndicator={ActivityIndicator}
        />

        {/* Modal de Asistencia Masiva */}
        {showBulkAsistencia && (
          <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
            <div className="glass-card animate-fade" style={{ maxWidth: '700px', width: '90%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', padding: '2.5rem' }}>
               <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Registro de Asistencia Manual</h2>
               <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <div className="input-group" style={{ flex: 1 }}>
                     <label>Fecha de la Reunión</label>
                     <input type="date" value={bulkConfig.fecha} onChange={e => setBulkConfig({...bulkConfig, fecha: e.target.value})} />
                  </div>
                  <div className="input-group" style={{ flex: 1 }}>
                     <label>Tipo de Encuentro</label>
                     <select value={bulkConfig.tipoReunion} onChange={e => setBulkConfig({...bulkConfig, tipoReunion: e.target.value})}>
                        <option value="semanal">Reunión Semanal</option>
                        <option value="retiro">Retiro</option>
                        <option value="festivo">Festividad</option>
                        <option value="formacion">Taller/Formación</option>
                     </select>
                  </div>
               </div>
                <div style={{ marginBottom: '1.5rem', background: '#FFF7ED', padding: '1rem', borderRadius: '12px', border: '1px solid #FFEDD5' }}>
                   <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#9A3412', display: 'block', marginBottom: '8px' }}>Invitados (Personas sin cuenta Catequesis Pomalca):</label>
                   <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text" 
                        placeholder="Nombre completo del invitado..." 
                        value={bulkGuestName} 
                        onChange={e => setBulkGuestName(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && (setBulkGuests([...bulkGuests, bulkGuestName]), setBulkGuestName(''))}
                        style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #FB923C' }} 
                      />
                      <button 
                        onClick={() => { if(bulkGuestName.trim()){ setBulkGuests([...bulkGuests, bulkGuestName.trim()]); setBulkGuestName(''); } }}
                        style={{ padding: '0 15px', background: '#FB923C', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Añadir
                      </button>
                   </div>
                   {bulkGuests.length > 0 && (
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                        {bulkGuests.map((g, gi) => (
                          <span key={gi} style={{ background: 'white', padding: '3px 10px', borderRadius: '15px', fontSize: '0.75rem', border: '1px solid #FFEDD5', display: 'flex', alignItems: 'center', gap: '5px' }}>
                             {g} <span onClick={() => setBulkGuests(bulkGuests.filter((_, i) => i !== gi))} style={{ cursor: 'pointer', color: '#F44336', fontWeight: 'bold' }}>×</span>
                          </span>
                        ))}
                     </div>
                   )}
                </div>

               <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span>REGISTRA EL ESTADO DE LOS Miembros:</span>
                  <span style={{ fontWeight: 'bold' }}>{bulkList.filter(h => h.estado && h.estado !== 'falta').length} marcados + {bulkGuests.length} invitados</span>
               </p>
               <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', padding: '1rem', background: '#F9FAFB', borderRadius: '15px', border: '1px solid var(--border)' }}>
                  {bulkList.map((h, i) => (
                    <div key={h._id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', background: 'white', borderRadius: '12px', border: h.estado && h.estado !== 'falta' ? '1px solid var(--primary)' : '1px solid #E5E7EB', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                       <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{h.nombre} {h.apellido}</span>
                        <select 
                        value={h.estado || 'falta'} 
                        onChange={(e) => {
                          const nl = [...bulkList];
                          nl[i].estado = e.target.value;
                          setBulkList(nl);
                        }}
                        style={{ 
                          padding: '6px', 
                          borderRadius: '8px', 
                          border: '1px solid #D1D5DB', 
                          fontSize: '0.85rem',
                          background: h.estado === 'presente' ? '#ECFDF5' : 
                                    (h.estado === 'falta' ? '#FEF2F2' : 
                                    (h.estado === 'permiso' ? '#FFFBEB' : 
                                    '#EEF2FF')),
                          color: h.estado === 'presente' ? '#065F46' : 
                                 (h.estado === 'falta' ? '#991B1B' : 
                                 (h.estado === 'permiso' ? '#92400E' : 
                                 '#3730A3')),
                          fontWeight: 'bold'
                        }}
                       >
                          <option value="presente">✅ Presente</option>
                          <option value="falta">❌ Falta</option>
                          <option value="permiso">📝 Permiso</option>
                          <option value="tardanza">⏰ Tardanza</option>
                        </select>
                    </div>
                  ))}
               </div>

               <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setShowBulkAsistencia(false)} className="btn" style={{ background: 'var(--border)' }}>Cancelar</button>
                  <button onClick={handleSaveBulkAsistencia} className="btn btn-primary" style={{ padding: '0.8rem 2.5rem' }}>💾 Guardar Lista Final</button>
               </div>
            </div>
          </div>
        )}

        {/* Export Modal Window */}
        {isExportModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content animate-fade">
              <h2>Configuración de Reporte (Excel)</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Selecciona las fechas. Si dejas los campos vacíos, Descargarás <b>todo el historial completo</b> de la base de datos.
              </p>
              <form onSubmit={handleExportAsistencia}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="input-group">
                    <label>Desde (Fecha Inicial)</label>
                    <input type="date" value={exportDates.start} onChange={e => setExportDates({...exportDates, start: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label>Hasta (Fecha Final)</label>
                    <input type="date" value={exportDates.end} onChange={e => setExportDates({...exportDates, end: e.target.value})} />
                  </div>
                </div>
                
                <div className="modal-actions" style={{ marginTop: '2rem' }}>
                  <button type="button" className="btn btn-logout" style={{ width: 'auto'}} onClick={() => setIsExportModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="btn" style={{ background: '#1D6F42', color: 'white', border: 'none' }}>Generar y Descargar 📊</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#ffebee', color: '#c62828', fontFamily: 'monospace', minHeight: '100vh', textAlign: 'left' }}>
          <h1>¡Cuidado! Error crítico detectado en la pantalla.</h1>
          <p>Toma una captura de esto y envíaselo al asistente:</p>
          <hr />
          <h3>Mensaje: {this.state.error?.toString()}</h3>
          <pre style={{ overflowX: 'auto', background: 'rgba(0,0,0,0.1)', padding: '1rem' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '10px', cursor: 'pointer' }}>Recargar Página</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch(e) {
      console.error("Error al cargar sesión:", e);
      localStorage.removeItem('user');
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <HashRouter>
      <ErrorBoundary>
        <Routes>
          {/* Cara Pública */}
          <Route path="/" element={<LandingView />} />
          <Route path="/familia-Parroquia" element={<ParroquiaView />} />
          <Route path="/familia-ofs" element={<ParroquiaView />} />
          
          {/* Panel de Administración (Privado) */}
          <Route path="/admin" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard/*" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/admin" />} />
          
          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
