import { useState } from 'react';

type Clase = {
    horario: string;
    profesor: string;
    salon: string;
    estilo: string;
    reglas: string;
    nivel: string;
    videoUrl: string; // Cambiado a no ser opcional
};

const horariosData: { [dia: string]: Clase[] } = {
    Lunes: [
        { horario: '10:00 - 11:00', profesor: 'Profesor A', salon: 'Salón 1', estilo: 'Ballet', reglas: 'Puntualidad y respeto', nivel: 'Básico', videoUrl: 'https://www.youtube.com/embed/0GsajWIF3ws' },
        { horario: '14:00 - 15:00', profesor: 'Profesor B', salon: 'Salón 2', estilo: 'Jazz', reglas: 'Traer botella de agua', nivel: 'Intermedio', videoUrl: 'https://www.youtube.com/embed/Xrxjs3GfZn8' },
    ],
    Martes: [
        { horario: '09:00 - 10:00', profesor: 'Profesor C', salon: 'Salón 3', estilo: 'Hip-hop', reglas: 'Calzado adecuado', nivel: 'Avanzado', videoUrl: 'https://www.youtube.com/embed/6nXfJ3kE8bo' },
        { horario: '15:00 - 16:00', profesor: 'Profesor D', salon: 'Salón 4', estilo: 'Bachata', reglas: 'Puntualidad y respeto', nivel: 'Básico', videoUrl: 'https://www.youtube.com/embed/oS9E_t7y7yY' },
    ],
    Miercoles: [
        { horario: '11:00 - 12:00', profesor: 'Profesor E', salon: 'Salón 5', estilo: 'Contemporáneo', reglas: 'Ropa cómoda', nivel: 'Intermedio', videoUrl: 'https://www.youtube.com/embed/REjE0J5skLk' },
        { horario: '16:00 - 17:00', profesor: 'Profesor F', salon: 'Salón 6', estilo: 'Salsa', reglas: 'Traer botella de agua', nivel: 'Avanzado', videoUrl: 'https://www.youtube.com/embed/gdUMgTYe1oU' },
    ],
};

function Horarios() {
    const [diaSeleccionado, setDiaSeleccionado] = useState<string>('Lunes');
    const [detalleClase, setDetalleClase] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');

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
                        {horariosData[diaSeleccionado].map((horario, index) => (
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
                            <h3>Video de Estilo: {horariosData[diaSeleccionado].find(h => h.videoUrl === videoUrl)?.estilo}</h3>
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
}

export default Horarios;
