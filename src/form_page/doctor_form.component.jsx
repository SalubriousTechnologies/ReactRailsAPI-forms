import React, { useState, createRef } from "react";
import { DirectUpload } from "@rails/activestorage";

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

  const handleFile = formData => {
    return new Promise((resolve, reject) => {
      const promises = [];
      for (let i = 0; i < fileInput.current.files.length; i++) {
        // console.log(
        //   `handling file ${fileInput.current.files[i]} at index ${i}`
        // );
        promises.push(uploadFile(fileInput.current.files[i], i));
      }
      Promise.all(promises)
        .then(() => {
          for (let i = 0; i < fileInput.current.files.length; i++) {
            // console.log(`adding hidden field for document_${i}`);
            formData.append(
              "doctor[documents][]",
              document.getElementById(`document_${i}`).value
            );
          }
        })
        .then(() => resolve("looped through all files!"))
        .catch(error => reject(error));
    });
  };

  const uploadFile = (file, index) => {
    return new Promise((resolve, reject) => {
      const URL =
        "http://form-rails-api.herokuapp.com/rails/active_storage/direct_uploads";
      const upload = new DirectUpload(file, URL);
      upload.create((error, blob) => {
        if (error) {
          reject(error);
        } else {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("value", blob.signed_id);
          hiddenField.id = `document_${index}`;
          document.querySelector("form").appendChild(hiddenField);
          resolve("Success");
        }
      });
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    var formData = new FormData();

    addDoctorToParams(formData);
    addRevenueShareAttributesToParams(formData);
    handleFile(formData)
      .then(message => {
        // console.log(message);
        // console.log("This worked and submitted!");
        fetch("http://form-rails-api.herokuapp.com/doctors", {
          method: "POST",
          headers: {},
          body: formData,
        }).then(response =>
          response.ok ? redirect() : alert("Not created change accordingly")
        );
      })
      .catch(error => alert(error));
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
      <input type="file" multiple={true} ref={fileInput} />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default DoctorForm;
