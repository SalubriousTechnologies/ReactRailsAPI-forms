import React, { useState, createRef } from "react";

const DoctorForm = ({ redirect }) => {
  // const [doctor, setDoctor] = useState({
  //   name: "",
  //   dob: "",
  //   fees: "",
  //   revenue_share_attributes: { user_share: 0 },
  // });
  // const [fileSelection, setFileSelection] = useState(null);

  // const handleChange = event => {
  //   var identifier = event.target.name;
  //   var value = event.target.value;
  //   setDoctor({ ...doctor, [identifier]: value });
  // };

  // const handleAttributesChange = event => {
  //   var identifier = event.target.name;
  //   var value = event.target.value;
  //   var attributes = {
  //     ...doctor.revenue_share_attributes,
  //     [identifier]: value,
  //   };
  //   setDoctor({ ...doctor, revenue_share_attributes: attributes });
  // };

  // const fileInput = createRef();
  // const handleFileSelect = () => {
  //   setFileSelection(fileInput.current.files);
  // };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch("/doctors", {
      method: "POST",
      headers: {},
      body: formData,
    }).then(response =>
      response.ok ? redirect() : alert("Not created change accordingly")
    );
    // var data = new FormData(event.target);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Doctor Name:</label>
      <input
        name="doctor[name]"
        type="text"
        // value={doctor.name}
        // onChange={handleChange}
      />
      <label>Date of Birth</label>
      <input
        name="doctor[dob]"
        type="date"
        // value={doctor.dob}
        // onChange={handleChange}
      />
      <label>Fees</label>
      <input
        name="doctor[fees]"
        type="number"
        // value={doctor.fees}
        // onChange={handleChange}
      />
      <br />
      <label>Revenue Share Details</label>
      <input
        name="doctor[revenue_share_attributes][user_share]"
        type="number"
        // value={doctor.revenue_share_attributes.user_share}
        // onChange={handleAttributesChange}
      />
      <br />
      <label>Images & Documents</label>
      <input
        type="file"
        name="doctor[document]"
        // multiple
        // ref={fileInput}
        // onChange={handleFileSelect}
      />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default DoctorForm;
