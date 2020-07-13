import React, { useState, createRef } from "react";
import { DirectUpload } from "@rails/activestorage";
import "./direct_uploads.css";

class Uploader {
  constructor(file, url, index) {
    this.file = file;
    this.url = url;
    this.index = index;
    this.uploadObj = new DirectUpload(this.file, this.url, this);
    this.progressElement = document.getElementById(
      `direct-upload-${this.index}`
    );
    this.progressBar = document.getElementById(
      `direct-upload-progress-${this.index}`
    );
  }

  upload(file) {
    return new Promise((resolve, reject) => {
      this.uploadObj.create((error, blob) => {
        if (error) {
          this.progressElement.classList.add("direct-upload--error");
          this.progressElement.setAttribute("title", error);
          reject(error);
        } else {
          this.progressElement.classList.add("direct-upload--complete");
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("value", blob.signed_id);
          hiddenField.id = `document_${this.index}`;
          document.querySelector("form").appendChild(hiddenField);
          resolve("Success");
        }
      });
    });
  }

  directUploadDidProgress(event) {
    this.progressBar.style.width = `${(100 * event.loaded) / event.total}%`;
  }

  directUploadWillStoreFileWithXHR(request) {
    this.progressElement.classList.remove("direct-upload--pending");
    request.upload.addEventListener("progress", event =>
      this.directUploadDidProgress(event)
    );
  }
}

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

  const addProgressBar = (file, index, handler) => {
    handler.insertAdjacentHTML(
      "afterend",
      `<br/>
    <div id="direct-upload-${index}" class="direct-upload direct-upload--pending">
    <div id="direct-upload-progress-${index}" class="direct-upload__progress" 
    style="width: 0%"></div>
    <span class=direct-upload__filename">${file.name}</span>
    </div>`
    );
  };

  const handleFile = formData => {
    return new Promise((resolve, reject) => {
      const promises = [];
      for (let i = 0; i < fileInput.current.files.length; i++) {
        // console.log(
        //   `handling file ${fileInput.current.files[i]} at index ${i}`
        // );
        addProgressBar(fileInput.current.files[i], i, fileInput.current);
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
      new Uploader(file, URL, index)
        .upload(file)
        .then(message => resolve(message))
        .catch(error => reject(error));
      // console.log(returnValue);
      // classInst.uploadFunc();
    });
  };

  const changeInputs = status => {
    document.querySelectorAll("input").forEach(element => {
      element.disabled = status;
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    changeInputs("disabled");
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
      .catch(error => {
        alert(error);
        changeInputs("");
      });
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
