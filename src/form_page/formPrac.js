import React,{useState} from 'react'

const FormPrac = ()=>{
  const [name,setName]=useState()
  const [number,setNumber] = useState()


  const submit =(e)=>{
    e.preventDefault()
    var formData = new FormData();
    formData.append("doctor[name]",name);
    formData.append("doctor[number]",number);
    console.log(name)
    console.log(number)

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

      fetch(`http://localhost:4000/doctors`, {
        method: "POST",
        headers: {
          // Authorization: token,
        },
        body: formData,
      }).then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
           alert(data.message)
          } else {
            alert(data.error)
          }
        });
      });
 }
  return(
    <div>
      <form onSubmit={submit}>
        <label>Name : </label>
        <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)}/>
        <label>Number :</label>
        <input type="text" name="number" id="number" onChange={(e)=>setNumber(e.target.value)}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default FormPrac;