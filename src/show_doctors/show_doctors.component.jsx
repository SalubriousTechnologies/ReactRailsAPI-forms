import React, { useEffect, useState } from "react";

const ListDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetch("http://form-rails-api.herokuapp.com/doctors", {
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(data => setDoctors(data));
    return () => {
      setDoctors([]);
    };
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: "300px" }}>Doctor Name</th>
          <th style={{ width: "100px" }}>Doctor Fees</th>
          <th style={{ width: "150px" }}>Doctor Date of Birth</th>
          <th style={{ width: "200px" }}>Doctor Created at</th>
          <th style={{ width: "150px" }}>Revenue Share(%)</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map(doctor => (
          <tr key={doctor.id}>
            <td>{doctor.name}</td>
            <td>{doctor.fees}</td>
            <td>{doctor.dob}</td>
            <td>{doctor.created_at}</td>
            <td>{doctor.revenue_share.user_share}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListDoctor;
