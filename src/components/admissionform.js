import React, {useState} from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';

const AdmissionForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        age: "",
    });
    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({ ...user, [name]: value});
    };

    const postData = async (e)=>{
        e.preventDefault();

        const {fullname, email, age} = user;


        if(fullname && email && age) {
            if(age >=18 && age <=65) {
            const res = await fetch("https://yogaclasses-admissionform-default-rtdb.firebaseio.com/admissionformdata.json", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                fullname,
                email,
                age,
                dvalue,
            })
            });

            if(res) {
                // setUser({
                //     fullname: "",
                //     email: "",
                //     age: "",
                // });
                alert("Form Submitted! \nClick Ok to Proceed")
                navigate('/payment')
            }
            } 
            else {
                alert("Age must be in range 18-65")
            }
        } 
        else {
            alert("Fill all the data!")
        }

        

    };

    const getInitialState = () => {
        const value = "6-7 AM";
        return value;
      };


    const [dvalue, setValue] = useState(getInitialState);

    const handleChange = (e) => {
    setValue(e.target.value);
    };


    return(
      
        <form className="form" method="POST">
            <div className="form-body">
                <div className="fullname">
                    <label className="form__label">Full Name: </label>
                    <input 
                        className="form__input" 
                        type="text"
                        name='fullname'
                        id="fullName"
                        placeholder="Enter your full name." 
                        value={user.fullname} 
                        onChange={getUserData}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="email">
                    <label className="form__label">Email Address: </label>
                    <input
                        type="email" 
                        id="email" 
                        name='email'
                        className="form__input" 
                        placeholder="Enter your email address"
                        value={user.email} 
                        onChange={getUserData}
                    />
                </div>
                <div className="age">
                    <label className="form__label">Age: </label>
                    <input 
                        className="form__input" type="number"  
                        id="age"
                        name='age'
                        placeholder="Enter your age"
                        value={user.age} 
                        onChange={getUserData}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="batches">
                    <label className="form__label">Batch: </label>
                    <select value={dvalue} onChange={handleChange}>
                        <option value="6-7 AM">6-7 AM</option>
                        <option value="7-8 AM">7-8 AM</option>
                        <option value="8-9 AM">8-9 AM</option>
                        <option value="5-6 PM">5-6 PM</option>
                    </select>
                </div>
            
            </div>
          <div className="footer">
            <button 
            type="submit"
            onClick={postData}
            className="btn"
            >Save & Proceed To Payment</button>
          </div>
        </form>
        

              
    )       
}
export default AdmissionForm;