/// src/pages/Home.tsx
import React from 'react';
import './Home.css';
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';
// Asegúrate de tener estas imágenes en la ruta correcta

const Home: React.FC = () => {
  const photos = [
    { id: 1, src: banner1, alt: 'Foto 1' },
    { id: 2, src: banner2, alt: 'Foto 2' },
    { id: 3, src: banner3, alt: 'Foto 3' },
    // Agrega más fotos según sea necesario
  ];

  return (
    <section id="home" className="home-section">
      <h2>Bienvenidos a la Academia de Danza FAMI</h2>
      <p>Descubre tu pasión por la danza con nosotros.</p>
      <div className="gallery">
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            <img src={photo.src} alt={photo.alt} className="photo" />
            <div className="photo-number">{photo.id}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;