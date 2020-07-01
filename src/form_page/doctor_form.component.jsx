import React, { useState } from "react";

const DoctorForm = ({ redirect }) => {
  const [doctor, setDoctor] = useState({
    name: "",
    dob: "",
    fees: "",
    revenue_share_attributes: { user_share: 0 },
  });

  const handleChange = event => {
    var identifier = event.target.name;
    var value = event.target.value;
    setDoctor({ ...doctor, [identifier]: value });
  };

  const handleAttributesChange = event => {
    var identifier = event.target.name;
    var value = event.target.value;
    var attributes = {
      ...doctor.revenue_share_attributes,
      [identifier]: value,
    };
    setDoctor({ ...doctor, revenue_share_attributes: attributes });
  };
  // const doc_name = createRef();
  const handleSubmit = event => {
    event.preventDefault();
    fetch("/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    }).then(response =>
      response.ok ? redirect() : alert("Not created change accordingly")
    );
    // var data = new FormData(event.target);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Doctor Name:</label>
      <input
        name="name"
        type="text"
        value={doctor.name}
        onChange={handleChange}
      />
      <label>Date of Birth</label>
      <input
        name="dob"
        type="date"
        value={doctor.dob}
        onChange={handleChange}
      />
      <label>Fees</label>
      <input
        name="fees"
        type="number"
        value={doctor.fees}
        onChange={handleChange}
      />
      <label>Revenue Share Details</label>
      <input
        name="user_share"
        type="number"
        value={doctor.revenue_share_attributes.user_share}
        onChange={handleAttributesChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default DoctorForm;
