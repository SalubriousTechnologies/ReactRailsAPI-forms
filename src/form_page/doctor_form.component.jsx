import React, { useState, createRef } from "react";

const DoctorForm = ({ redirect }) => {
  const [doctor, setDoctor] = useState({
    name: "",
    dob: "",
    fees: "",
  });
  const [revenueShareAttributes, setRevenueShareAttributes] = useState({
    user_share: 0,
  });

  const handleDoctorChange = event => {
    var identifier = event.target.name;
    var value = event.target.value;
    setDoctor({ ...doctor, [identifier]: value });
  };

  const handleRevenueShareAttributeChange = event => {
    var identifier = event.target.name;
    var value = event.target.value;
    setRevenueShareAttributes({
      ...revenueShareAttributes,
      [identifier]: value,
    });
  };

  const addDoctorToParams = formData => {
    for (const key in doctor) {
      formData.append(`doctor[${key}]`, doctor[key]);
    }
  };

  const addRevenueShareAttributesToParams = formData => {
    for (const key in revenueShareAttributes) {
      formData.append(
        `doctor[revenue_share_attributes][${key}]`,
        revenueShareAttributes[key]
      );
    }
  };

  const fileInput = createRef();
  const addDocumentsToParams = formData => {
    for (let i = 0; i < fileInput.current.files.length; i++) {
      formData.append("doctor[documents][]", fileInput.current.files[i]);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    var formData = new FormData();

    addDoctorToParams(formData);
    addRevenueShareAttributesToParams(formData);
    // able to do this because appending is independent
    addDocumentsToParams(formData);
    fetch("/doctors", {
      method: "POST",
      headers: {},
      body: formData,
    }).then(response =>
      response.ok ? redirect() : alert("Not created change accordingly")
    );
  };

  return (
    // To make this cleaner the form input and label fields can be moved to
    // their own component and the state can be stored in a Redux Store to
    // simplify the process of form submission
    <form onSubmit={handleSubmit}>
      <label>Doctor Name:</label>
      <input
        name="name"
        type="text"
        value={doctor.name}
        onChange={handleDoctorChange}
      />
      <label>Date of Birth</label>
      <input
        name="dob"
        type="date"
        value={doctor.dob}
        onChange={handleDoctorChange}
      />
      <label>Fees</label>
      <input
        name="fees"
        type="number"
        value={doctor.fees}
        onChange={handleDoctorChange}
      />
      <br />
      <label>Revenue Share Details</label>
      <input
        name="user_share"
        type="number"
        value={revenueShareAttributes.user_share}
        onChange={handleRevenueShareAttributeChange}
      />
      <br />
      <label>Images & Documents</label>
      <input id="file-uploads" type="file" multiple={true} ref={fileInput} />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default DoctorForm;
