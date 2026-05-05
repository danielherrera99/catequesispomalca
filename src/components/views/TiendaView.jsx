import React, { useState, useEffect } from 'react';
import api from '../../config/api';

const TiendaView = ({ loading, setLoading, formatSafeDate }) => {
    const [data, setData] = useState({ transacciones: [], resumen: { ingresos: 0, egresos: 0, balance: 0 } });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTrans, setNewTrans] = useState({ tipo: 'ingreso', monto: '', descripcion: '', categoria: 'General', fecha: new Date().toISOString().split('T')[0] });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/tienda');
            if (res.data.success) {
                setData(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...newTrans,
                monto: parseFloat(newTrans.monto)
            };
            const res = await api.post('/tienda', payload);
            if (res.data.success) {
                setIsModalOpen(false);
                setNewTrans({ tipo: 'ingreso', monto: '', descripcion: '', categoria: 'General', fecha: new Date().toISOString().split('T')[0] });
                await fetchData();
            }
        } catch (err) {
            console.error(err);
            alert('Error al registrar transacción: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta transacción?')) {
            try {
                await api.delete(`/tienda/${id}`);
                fetchData();
            } catch (err) {
                alert('Error al eliminar');
            }
        }
    };

    const handleExport = () => {
        const header = "Fecha;Tipo;Monto;Descripción;Categoría;Usuario\n";
        const rows = data.transacciones.map(t => {
            const fecha = new Date(t.fecha).toLocaleDateString();
            return `${fecha};${t.tipo.toUpperCase()};${t.monto};"${t.descripcion}";"${t.categoria}";"${t.usuario?.nombre} ${t.usuario?.apellido}"`;
        }).join("\n");

        const blob = new Blob(["sep=;\n\uFEFF" + header + rows], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Reporte_Tienda_${new Date().toLocaleDateString()}.csv`;
        link.click();
    };

    return (
        <div className="animate-fade">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="section-title" style={{ textAlign: 'left', margin: 0 }}>Gestión de Tienda</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Control de ingresos y egresos de la catequesis.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-ghost" onClick={handleExport}>📊 Exportar Reporte</button>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>➕ Nueva Transacción</button>
                </div>
            </div>

            {/* Resumen Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '5px solid #22c55e' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Ingresos</p>
                    <h3 style={{ margin: '0.5rem 0', color: '#16a34a', fontSize: '1.8rem' }}>S/ {data.resumen.ingresos.toFixed(2)}</h3>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '5px solid #ef4444' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Egresos</p>
                    <h3 style={{ margin: '0.5rem 0', color: '#dc2626', fontSize: '1.8rem' }}>S/ {data.resumen.egresos.toFixed(2)}</h3>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', borderLeft: '5px solid var(--primary)' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Saldo Balance</p>
                    <h3 style={{ margin: '0.5rem 0', color: 'var(--primary)', fontSize: '1.8rem' }}>S/ {data.resumen.balance.toFixed(2)}</h3>
                </div>
            </div>

            {/* Tabla de Transacciones */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Descripción</th>
                            <th>Categoría</th>
                            <th>Monto</th>
                            <th>Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.transacciones.map(t => (
                            <tr key={t._id}>
                                <td>{formatSafeDate(t.fecha)}</td>
                                <td>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '12px', 
                                        fontSize: '0.8rem', 
                                        fontWeight: 'bold',
                                        background: t.tipo === 'ingreso' ? '#dcfce7' : '#fee2e2',
                                        color: t.tipo === 'ingreso' ? '#166534' : '#991b1b'
                                    }}>
                                        {t.tipo.toUpperCase()}
                                    </span>
                                </td>
                                <td>{t.descripcion}</td>
                                <td>{t.categoria}</td>
                                <td style={{ fontWeight: 'bold', color: t.tipo === 'ingreso' ? '#16a34a' : '#dc2626' }}>
                                    {t.tipo === 'ingreso' ? '+' : '-'} S/ {t.monto.toFixed(2)}
                                </td>
                                <td style={{ fontSize: '0.9rem' }}>{t.usuario?.nombre}</td>
                                <td>
                                    <button className="btn-icon" onClick={() => handleDelete(t._id)} title="Eliminar">🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.transacciones.length === 0 && !loading && (
                    <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No hay transacciones registradas.</p>
                )}
            </div>

            {/* Modal Nueva Transacción */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content animate-pop" style={{ maxWidth: '500px' }}>
                        <h3>Registrar Movimiento</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="input-group">
                                <label>Tipo de Movimiento</label>
                                <select value={newTrans.tipo} onChange={e => setNewTrans({...newTrans, tipo: e.target.value})} required>
                                    <option value="ingreso">Ingreso (+)</option>
                                    <option value="egreso">Egreso (-)</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Monto (S/)</label>
                                <input type="number" step="0.01" value={newTrans.monto} onChange={e => setNewTrans({...newTrans, monto: e.target.value})} required placeholder="0.00" />
                            </div>
                            <div className="input-group">
                                <label>Descripción</label>
                                <input type="text" value={newTrans.descripcion} onChange={e => setNewTrans({...newTrans, descripcion: e.target.value})} required placeholder="Ej: Venta de manuales" />
                            </div>
                            <div className="input-group">
                                <label>Categoría</label>
                                <select value={newTrans.categoria} onChange={e => setNewTrans({...newTrans, categoria: e.target.value})}>
                                    <option value="General">General</option>
                                    <option value="Materiales">Materiales</option>
                                    <option value="Eventos">Eventos</option>
                                    <option value="Donaciones">Donaciones</option>
                                    <option value="Limpieza">Limpieza/Local</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Fecha</label>
                                <input type="date" value={newTrans.fecha} onChange={e => setNewTrans({...newTrans, fecha: e.target.value})} required />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-ghost w-full" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-primary w-full">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TiendaView;
