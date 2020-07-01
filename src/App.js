import React, { useState } from "react";
import "./App.css";
import DoctorForm from "./form_page/doctor_form.component";
import ListDoctor from "./show_doctors/show_doctors.component.jsx";

function App() {
  const [showForm, setShowForm] = useState(false);

  const redirectAfterCreate = () => setShowForm(false);

  return (
    <div className="App">
      <button onClick={() => setShowForm(false)}>Show Doctor</button>
      <button onClick={() => setShowForm(true)}>Add Doctor</button>
      <div>
        {showForm ? (
          <DoctorForm redirect={redirectAfterCreate} />
        ) : (
          <ListDoctor />
        )}
      </div>
    </div>
  );
}

export default App;
