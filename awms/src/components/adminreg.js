import React, {useState } from 'react';
import axios from 'axios'
import './Adminreg.css';

/*const Adminreg = () => {
    const [name, setName] = useState('');
    const [coordinates, setcoordinates] = useState([]);
    const [capacity, setcapacity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/admin/initWorkplaces', { name, coordinates, capacity})
        const data = response.data;
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Workplace name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Workplace coordinates" value={coordinates} onChange={(e) => setcoordinates(e.target.value)} />
          <input type="text" placeholder="Workplace capacity" value={capacity} onChange={(e) => setcapacity(e.target.value)}/>
          
          <button type="submit">Register</button>
        </form>
      );
  
};*/



const Adminreg = () => {
  const [name, setName] = useState('');
  const [radius, setRadius] = useState('');
  //const [coordinates, setCoordinates] = useState(['']);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [capacity, setCapacity] = useState('');

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Error getting location. Please enable geolocation permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(name, radius, latitude, longitude, capacity)
      const response = await axios.post('http://localhost:3001/admin/register', {
        name: name,
        radius: parseFloat(radius),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        capacity: capacity,
       
      });
      console.log('Geofence registered:', response.data);
      alert('Geofence successfully registered!');
    } catch (error) {
      console.error('Error registering geofence:', error);
      alert('Error registering geofence. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Workplace Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Radius (meters)"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />
      <button type="button" onClick={getCurrentLocation}>
        Use Current Location
      </button>
      <button type="submit">Register Geofence</button>
    </form>
    
  );
  
};



export default Adminreg;