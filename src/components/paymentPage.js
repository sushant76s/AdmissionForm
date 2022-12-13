import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
const PaymentPage = () => {
    const navigate = useNavigate();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const pay_id = uuid();
    const [user, setUser] = useState({
        amount: "",
        name: "",
    });
    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({ ...user, [name]: value});
    };

    const postData = async (e)=>{
        e.preventDefault();

        const {amount, name} = user;


        if(amount && name) {
            const res = await fetch("https://yogaclasses-admissionform-default-rtdb.firebaseio.com/paymentdetails.json", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                amount,
                date,
                name,
                pay_id,
            })
            });

            if(res) {
                setUser({
                    amount: "",
                    name: "",
                });
                alert("Payment Successful! \nClick Ok to Proceed")
                navigate('/')
            }
        } 
        else {
            alert("Fill all the data!")
        }

        

    };
    return(
        <div className="container">
            <div className="main-content">
                <p className="text">Yoga Classes Payment Gateway</p>
            </div>
        
            <div className="centre-content">
                <h1 className="price">500<span>/- Rs INR</span></h1>
                <p className="course">
                Pay Your One Month Fees!
                </p>
            </div>
            <div className="amount">
                <label>Regestration Fees </label>
                <input
                    type="number"
                    name="amount"
                    value={user.amount} 
                    onChange={getUserData}
                    autoComplete="off"
                    required
                    className="amount-field"
                    placeholder="Amount"/>
            </div>
            <br/>
            <div className="last-content">
                <button type="button" className="pay-now-btn">
                Apply Coupons
                </button>
                <button type="button" className="pay-now-btn">
                Pay with Netbanking
                </button>
        
                <button type="button" className="pay-now-btn">
                Netbanking options
                </button>
            </div>
  
            <div className="card-details">
                <p>Pay using Credit or Debit card</p>
        
                <div className="card-number">
                <label> Card Number </label>
                <input
                    type="text"
                    name="amount"
                    autoComplete="off"
                    required
                    className="card-number-field"
                    placeholder="###-###-###"/>
                </div>
                <br />
                <div className="date-number">
                <label> Expiry Date </label>
                <input 
                    type="text" 
                    className="date-number-field" 
                    placeholder="DD-MM-YY"
                    name="date"
                    autoComplete="off"
                    required
                 />
                </div>
        
                <div className="cvv-number">
                <label> CVV number </label>
                <input 
                    type="text" 
                    className="cvv-number-field" 
                    placeholder="xxx" 
                    name="cvvnum"
                    autoComplete="off"
                    required
                />
                </div>
                <div className="nameholder-number">
                <label> Card Holder name </label>
                <input
                    type="text"
                    className="card-name-field"
                    placeholder="Enter your Name"
                    name="name"
                    value={user.name} 
                    onChange={getUserData}
                    autoComplete="off"
                    required
                />
            </div>
            <br/>
            <button 
                type="submit" 
                onClick={postData}
                className="submit-now-btn">
            Make Payment
            </button>
      </div>
    </div>
    )
}
export default PaymentPage;