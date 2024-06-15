// /frontend/src/components/StudentRegistration.js
import React, { useEffect, useState } from 'react';
import axios from 'axios'

const StudentRegistration = () => {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  

  const [workPlaces, setWorkPlaces] = useState([])
  const [selectedPlaces, setSelectedPlaces] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/students/assign', { name: name, studentId: studentId, workOptions: selectedPlaces })
    const data = response.data;
    if(data.message){
      alert(`Assigned Workplace: ${data.place}`)
    }
    console.log(data);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/students/getallworkplaces')
    .then((res) => {
      setWorkPlaces(res.data.data)
    })
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Student ID" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
     
      <select onChange={(e) => {if(e.target.value !== 'none'){setSelectedPlaces([...selectedPlaces, e.target.value])}}}>
        <option value={'none'}></option>
        {workPlaces.map((place) => {
          if(place.capacity !== 0 && !selectedPlaces.includes(place.name)){
            return(
              <option value={place.name}>{place.name}</option>
            )
          }
        })}
      </select>
      <div>
        {selectedPlaces.map((item) => {
          return(
            <div>{item}</div>
          )
        })}
      </div>
  
      {/* Add inputs for work options */}
      <button type="submit">Register</button>
    </form>
  );
};

export default StudentRegistration;
