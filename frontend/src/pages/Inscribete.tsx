// src/pages/Inscribete.tsx
import React, { useState } from 'react';
import './Inscribete.css';

const horariosDisponibles = [
  { clase: 'Ballet', nivel: 'Básico', horarios: ['10:00 - 11:00', '12:00 - 13:00'] },
  { clase: 'Ballet', nivel: 'Intermedio', horarios: ['14:00 - 15:00'] },
  { clase: 'Hip-Hop', nivel: 'Básico', horarios: ['09:00 - 10:00', '15:00 - 16:00'] },
  { clase: 'Salsa', nivel: 'Avanzado', horarios: ['11:00 - 12:00'] },
];

const Inscribete: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contacto, setContacto] = useState('');
  const [clase, setClase] = useState('');
  const [nivel, setNivel] = useState('');
  const [horario, setHorario] = useState('');
  const [errors, setErrors] = useState({ nombre: false, correo: false, contacto: false, clase: false, nivel: false, horario: false });

  const niveles = ['Básico', 'Intermedio', 'Avanzado'];

  const horariosFiltrados = horariosDisponibles.find(
    (item) => item.clase === clase && item.nivel === nivel
  )?.horarios || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      nombre: !nombre,
      correo: !correo,
      contacto: !contacto,
      clase: !clase,
      nivel: !nivel,
      horario: !horario,
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      console.log({ nombre, correo, contacto, clase, nivel, horario });
    }
  };

  return (
    <section id="inscribete" className="inscribete-section">
      <h2>Inscríbete</h2>
      <p>¡Únete a nuestra comunidad de danza completando el formulario a continuación!</p>
      <form onSubmit={handleSubmit} className="inscribete-form">
        <div className="form-group">
          <label htmlFor="name">Nombre Completo:</label>
          <input type="text" id="name" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          {errors.nombre && <span className="error">Este campo es obligatorio</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          {errors.correo && <span className="error">Este campo es obligatorio</span>}
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contacto:</label>
          <input type="tel" id="contact" value={contacto} onChange={(e) => setContacto(e.target.value)} required />
          {errors.contacto && <span className="error">Este campo es obligatorio</span>}
        </div>

        <div className="form-group">
          <label htmlFor="class">Clase de Interés:</label>
          <select id="class" value={clase} onChange={(e) => setClase(e.target.value)} required>
            <option value="">Selecciona una clase</option>
            <option value="Ballet">Ballet</option>
            <option value="Hip-Hop">Hip-Hop</option>
            <option value="Salsa">Salsa</option>
            <option value="Danza Moderna">Danza Moderna</option>
          </select>
          {errors.clase && <span className="error">Este campo es obligatorio</span>}
        </div>

        <div className="form-group">
          <label htmlFor="level">Nivel:</label>
          <select id="level" value={nivel} onChange={(e) => setNivel(e.target.value)} required>
            <option value="">Selecciona un nivel</option>
            {niveles.map((nivel) => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
          {errors.nivel && <span className="error">Este campo es obligatorio</span>}
        </div>

        <div className="form-group">
          <label htmlFor="schedule">Horario:</label>
          <select id="schedule" value={horario} onChange={(e) => setHorario(e.target.value)} required>
            <option value="">Selecciona un horario</option>
            {horariosFiltrados.map((horario) => (
              <option key={horario} value={horario}>{horario}</option>
            ))}
          </select>
          {errors.horario && <span className="error">Este campo es obligatorio</span>}
        </div>

        <button type="submit" className="submit-button">Enviar</button>
      </form>
    </section>
  );
};

export default Inscribete;
