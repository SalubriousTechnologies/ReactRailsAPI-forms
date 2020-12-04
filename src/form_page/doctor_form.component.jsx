// import React, { useState, createRef } from "react";
// import { DirectUpload } from "@rails/activestorage";
// import './direct.css';


// const DoctorForm = ({ redirect }) => {

//   const [doctor, setDoctor] = useState({
//     name: "",
//     dob: "",
//     fees: "",
//   });
//   const [revenueShareAttributes, setRevenueShareAttributes] = useState({
//     user_share: 0,
//   });
 

//   const handleDoctorChange = event => {
//     var identifier = event.target.name;
//     var value = event.target.value;
//     setDoctor({ ...doctor, [identifier]: value });
//   };

//   const handleRevenueShareAttributeChange = event => {
//     var identifier = event.target.name;
//     var value = event.target.value;
//     setRevenueShareAttributes({
//       ...revenueShareAttributes,
//       [identifier]: value,
//     });
//   };

//   const addDoctorToParams = formData => {
//     for (const key in doctor) {
//       formData.append(`doctor[${key}]`, doctor[key]);
//     }
//   };

//   const addRevenueShareAttributesToParams = formData => {
//     for (const key in revenueShareAttributes) {
//       formData.append(
//         `doctor[revenue_share_attributes][${key}]`,
//         revenueShareAttributes[key]
//       );
//     }
//   };

//   const fileInput = createRef();
//   const handleFile = event => {
//     for (let i = 0; i < fileInput.current.files.length; i++) {
//       console.log(fileInput.current.files[i])
//       uploadFile(fileInput.current.files[i], i);
//     }
//   };
//   var input = document.querySelector('input[type=file]')
//   const uploads = new DirectUpload();
//   const uploadFile = (file, index) => {
//     const URL =
//       "http://localhost:4000/rails/active_storage/direct_uploads";
//     const upload = new DirectUpload(file, URL);
//     // console.log(upload)

//     upload.create((error, blob) => {
//       if (error) {
//         console.log(error);
//       } else {
//         const hiddenField = document.createElement("input");
//         hiddenField.setAttribute("type", "hidden");
//         hiddenField.setAttribute("value", blob.signed_id);
//         hiddenField.id = `document_${index}`;
//         document.querySelector("form").appendChild(hiddenField);
//       }
//     });
//   };

//   const addDocumentsToParams = formData => {
//     for (let i = 0; i < fileInput.current.files.length; i++) {
//       formData.append(
//         "doctor[documents][]",
//         document.getElementById(`document_${i}`).value
//       );
//     }
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     var formData = new FormData();

//     addDoctorToParams(formData);
//     addRevenueShareAttributesToParams(formData);
//     // able to do this because appending is independent
//     addDocumentsToParams(formData);
//     fetch("http://localhost:4000/doctors", {
//       method: "POST",
//       headers: {},
//       body: formData,
//     }).then(response =>
//       response.ok ? redirect() : alert("Not created change accordingly")
//     );
//   };

//   // uploads.triggers.addEventListener("direct-upload:initialize", event => {
//   //   const { target, detail } = event
//   //   const { id, file } = detail
//   //   target.insertAdjacentHTML("beforebegin", `
//   //     <div id="direct-upload-${id}" class="direct-upload direct-upload--pending">
//   //       <div id="direct-upload-progress-${id}" class="direct-upload__progress" style="width: 0%"></div>
//   //       <span class="direct-upload__filename"></span>
//   //     </div>
//   //   `)
//   //   target.previousElementSibling.querySelector(`.direct-upload__filename`).textContent = file.name
//   // })


//   //   uploads.triggers.addEventListener("direct-upload:start", event => {
//   //     const { id } = event.detail
//   //     const element = document.getElementById(`direct-upload-${id}`)
//   //     element.classList.remove("direct-upload--pending")
//   //   })

//   //   uploads.addEventListener("direct-upload:progress", event => {
//   //     const { id, progress } = event.detail
//   //     const progressElement = document.getElementById(`direct-upload-progress-${id}`)
//   //     progressElement.style.width = `${progress}%`
//   //   })
  
//   //   uploads.triggers.addEventListener("direct-upload:error", event => {
//   //   event.preventDefault()
//   //   const { id, error } = event.detail
//   //   const element = document.getElementById(`direct-upload-${id}`)
//   //   element.classList.add("direct-upload--error")
//   //   element.setAttribute("title", error)
//   // })
  
  
//   // uploads.triggers.addEventListener("direct-upload:end", event => {
//   //   const { id } = event.detail
//   //   const element = document.getElementById(`direct-upload-${id}`)
//   //   element.classList.add("direct-upload--complete")
//   // })
  
//   return (
//     // To make this cleaner the form input and label fields can be moved to
//     // their own component and the state can be stored in a Redux Store to
//     // simplify the process of form submission
//     <form onSubmit={handleSubmit}>
//       <label>Doctor Name:</label>
//       <input
//         name="name"
//         type="text"
//         value={doctor.name}
//         onChange={handleDoctorChange}
//       />
//       <label>Date of Birth</label>
//       <input
//         name="dob"
//         type="date"
//         value={doctor.dob}
//         onChange={handleDoctorChange}
//       />
//       <label>Fees</label>
//       <input
//         name="fees"
//         type="number"
//         value={doctor.fees}
//         onChange={handleDoctorChange}
//       />
//       <br />
//       <label>Revenue Share Details</label>
//       <input
//         name="user_share"
//         type="number"
//         value={revenueShareAttributes.user_share}
//         onChange={handleRevenueShareAttributeChange}
//       />
//       <br />
//       <label>Images & Documents</label>
//       <input
//         type="file"
//         multiple={true}
//         // direct_upload={true}
//         ref={fileInput}
//         onChange={handleFile}
//       />
//       <br />
//       <input type="submit" value="Submit" />
//     </form>
//   );
// };

// export default DoctorForm;


// import React, { useState, createRef } from "react";
// import { DirectUpload } from "@rails/activestorage";

// const DoctorForm = ({ redirect }) => {
//   const [doctor, setDoctor] = useState({
//     name: "",
//     dob: "",
//     fees: "",
//   });
//   const [revenueShareAttributes, setRevenueShareAttributes] = useState({
//     user_share: 0,
//   });

//   const handleDoctorChange = event => {
//     var identifier = event.target.name;
//     var value = event.target.value;
//     setDoctor({ ...doctor, [identifier]: value });
//   };

//   const handleRevenueShareAttributeChange = event => {
//     var identifier = event.target.name;
//     var value = event.target.value;
//     setRevenueShareAttributes({
//       ...revenueShareAttributes,
//       [identifier]: value,
//     });
//   };

//   const addDoctorToParams = formData => {
//     for (const key in doctor) {
//       formData.append(`doctor[${key}]`, doctor[key]);
//     }
//   };

//   const addRevenueShareAttributesToParams = formData => {
//     for (const key in revenueShareAttributes) {
//       formData.append(
//         `doctor[revenue_share_attributes][${key}]`,
//         revenueShareAttributes[key]
//       );
//     }
//   };

//   const fileInput = createRef();
//   const handleFile = event => {
//     for (let i = 0; i < fileInput.current.files.length; i++) {
//       uploadFile(fileInput.current.files[i], i);
//     }
//   };

//   const uploadFile = (file, index) => {
//     const URL =
//       "http://form-rails-api.herokuapp.com/rails/active_storage/direct_uploads";
//     const upload = new DirectUpload(file, URL);

//     upload.create((error, blob) => {
//       if (error) {
//         console.log(error);
//       } else {
//         const hiddenField = document.createElement("input");
//         hiddenField.setAttribute("type", "hidden");
//         hiddenField.setAttribute("value", blob.signed_id);
//         hiddenField.id = `document_${index}`;
//         document.querySelector("form").appendChild(hiddenField);
//       }
//     });
//   };
//   const addDocumentsToParams = formData => {
//     for (let i = 0; i < fileInput.current.files.length; i++) {
//       console.log( document.getElementById(`document_${i}`).value)
//       formData.append(
//         "doctor[documents][]",
//         document.getElementById(`document_${i}`).value
//       );
//     }
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     var formData = new FormData();

//     addDoctorToParams(formData);
//     addRevenueShareAttributesToParams(formData);
//     // able to do this because appending is independent
//     addDocumentsToParams(formData);
//     console.log(formData.get("doctor[documents][]"))
//     // fetch("http://form-rails-api.herokuapp.com/doctors", {
//     //   method: "POST",
//     //   headers: {},
//     //   body: formData,
//     // }).then(response =>
//     //   response.ok ? redirect() : alert("Not created change accordingly")
//     // );
//   };

//   return (
//     // To make this cleaner the form input and label fields can be moved to
//     // their own component and the state can be stored in a Redux Store to
//     // simplify the process of form submission
//     <form onSubmit={handleSubmit}>
//       <label>Doctor Name:</label>
//       <input
//         name="name"
//         type="text"
//         value={doctor.name}
//         onChange={handleDoctorChange}
//       />
//       <label>Date of Birth</label>
//       <input
//         name="dob"
//         type="date"
//         value={doctor.dob}
//         onChange={handleDoctorChange}
//       />
//       <label>Fees</label>
//       <input
//         name="fees"
//         type="number"
//         value={doctor.fees}
//         onChange={handleDoctorChange}
//       />
//       <br />
//       <label>Revenue Share Details</label>
//       <input
//         name="user_share"
//         type="number"
//         value={revenueShareAttributes.user_share}
//         onChange={handleRevenueShareAttributeChange}
//       />
//       <br />
//       <label>Images & Documents</label>
//       <input
//         type="file"
//         multiple={true}
//         ref={fileInput}
//         onChange={handleFile}
//       />
//       <br />
//       <input type="submit" value="Submit" />
//     </form>
//   );
// };

// export default DoctorForm;

import React, { useState, createRef } from "react";
import { DirectUpload } from "@rails/activestorage";
import "./direct.css";

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
  // const [doctor, setDoctor] = useState({
  //   name: "",
  //   dob: "",
  //   fees: "",
  // });
  // const [revenueShareAttributes, setRevenueShareAttributes] = useState({
  //   user_share: 0,
  // });

  // const handleDoctorChange = event => {
  //   var identifier = event.target.name;
  //   var value = event.target.value;
  //   setDoctor({ ...doctor, [identifier]: value });
  // };

  // const handleRevenueShareAttributeChange = event => {
  //   var identifier = event.target.name;
  //   var value = event.target.value;
  //   setRevenueShareAttributes({
  //     ...revenueShareAttributes,
  //     [identifier]: value,
  //   });
  // };

  // const addDoctorToParams = formData => {
  //   for (const key in doctor) {
  //     formData.append(`doctor[${key}]`, doctor[key]);
  //   }
  // };

  // const addRevenueShareAttributesToParams = formData => {
  //   for (const key in revenueShareAttributes) {
  //     formData.append(
  //       `doctor[revenue_share_attributes][${key}]`,
  //       revenueShareAttributes[key]
  //     );
  //   }
  // };

  const fileInput = createRef();
 console.log(fileInput)
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
        console.log(fileInput.current)
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

  const blockInputs = status => {
    document.querySelectorAll("input").forEach(element => {
      element.disabled = status;
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
    blockInputs("disabled");
    var formData = new FormData();

    // addDoctorToParams(formData);
    // addRevenueShareAttributesToParams(formData);
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
        blockInputs("");
      });
  };

  return (
    // To make this cleaner the form input and label fields can be moved to
    // their own component and the state can be stored in a Redux Store to
    // simplify the process of form submission
    <form onSubmit={handleSubmit}>
      {/* <label>Doctor Name:</label>
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
      <br /> */}
      <label>Images & Documents</label>
      <input type="file" multiple={true} ref={fileInput} />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default DoctorForm;