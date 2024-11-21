import { useState, useEffect } from 'react';
import axios from 'axios';

type Clase = {
    horario: string;
    profesor: string;
    salon: string;
    estilo: string;
    reglas: string;
    nivel: string;
    videoUrl: string;
};

const Horarios = () => {
    const [diaSeleccionado, setDiaSeleccionado] = useState<string>('Lunes');
    const [horariosData, setHorariosData] = useState<{ [dia: string]: Clase[] }>({});
    const [detalleClase, setDetalleClase] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');

    // Obtener los horarios desde el backend
    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/horarios');
                const horarios = response.data;

                // Organizar los horarios por días
                const horariosPorDia: { [dia: string]: Clase[] } = {};
                horarios.forEach((clase: Clase) => {
                    const dia = new Date(clase.horario).toLocaleString('es-ES', { weekday: 'long' });
                    if (!horariosPorDia[dia]) {
                        horariosPorDia[dia] = [];
                    }
                    horariosPorDia[dia].push(clase);
                });

                setHorariosData(horariosPorDia);
            } catch (error) {
                console.error('Error al obtener los horarios', error);
            }
        };

        fetchHorarios();
    }, []);

    const handleDiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDiaSeleccionado(e.target.value);
        setDetalleClase('');
        setVideoUrl(''); // Limpiar video al cambiar de día
    };

    const handleHorarioClick = (horario: Clase) => {
        setDetalleClase(
            `Horario: ${horario.horario}\nProfesor: ${horario.profesor}\nSalón: ${horario.salon}\nEstilo: ${horario.estilo}\nNivel: ${horario.nivel}\nReglas: ${horario.reglas}`
        );
        setVideoUrl(horario.videoUrl);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Horarios de Clases</h2>
            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Columna de selección de días y horarios */}
                <div>
                    <label htmlFor="diaSelect">Selecciona un día:</label>
                    <select id="diaSelect" value={diaSeleccionado} onChange={handleDiaChange} style={{ margin: '10px 0', padding: '5px' }}>
                        {Object.keys(horariosData).map((dia) => (
                            <option key={dia} value={dia}>
                                {dia}
                            </option>
                        ))}
                    </select>
                    <div style={{ marginTop: '10px' }}>
                        {horariosData[diaSeleccionado]?.map((horario, index) => (
                            <button
                                key={index}
                                onClick={() => handleHorarioClick(horario)}
                                style={{
                                    display: 'block',
                                    width: '250px',
                                    marginBottom: '10px',
                                    padding: '15px',
                                    backgroundColor: '#4A90E2',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                }}
                            >
                                <strong>{horario.horario}</strong> - {horario.estilo} ({horario.nivel})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Columna de video y detalles de la clase */}
                <div style={{ flex: '1' }}>
                    {videoUrl && (
                        <div style={{ marginBottom: '15px' }}>
                            <h3>Video de Estilo: {horariosData[diaSeleccionado]?.find(h => h.videoUrl === videoUrl)?.estilo}</h3>
                            <iframe
                                width="100%"
                                height="200"
                                src={videoUrl}
                                title="Video de clase"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ borderRadius: '8px' }}
                            ></iframe>
                        </div>
                    )}
                    <div>
                        <h3>Detalles de la Clase</h3>
                        <textarea
                            value={detalleClase}
                            readOnly
                            style={{
                                width: '100%',
                                height: '150px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                resize: 'none',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Horarios;
