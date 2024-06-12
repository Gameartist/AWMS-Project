import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Adminreg = () => {
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
  
};
export default Adminreg;