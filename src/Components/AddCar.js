import React ,{useContext} from 'react';
import { supabase } from '../auth';
import { AuthContext } from '../AuthProvider';

function AddCar() {
const  {user} = useContext(AuthContext)
  const [carInfo, setCarInfo] = React.useState({
            makeAndModel:"", 
            year:"", 
            type:"" , 
            color:"", 
            seatingCapacity:"", 
            dailyRentalFee:"", 
            location:"",
            transmissionType:"automatic",
            additionalFeatures:""
            
          })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { data, error} = await supabase
        .from('cars')
        .insert([
        { 
            make_and_model: carInfo.makeAndModel,
            owner_id:  user.id, //'f03e5f81-6334-4474-a6fe-9ecff838ecd2',
            year: carInfo.year,
            color: carInfo.color,
            seating_capacity: carInfo.seatingCapacity,
            daily_rental_fee: carInfo.dailyRentalFee,
            location:carInfo.location,
            transmission_type:carInfo.transmissionType,
            additional_features: carInfo.additionalFeatures
        },
        ])
        .select()

    } catch (error) {
        console.error(error.message)
    }
  };
  
  const handleChange = (e) => {
    setCarInfo(prev =>{
      return {
      ...prev,
      [e.target.name]: e.target.value
    }
    })
  }


//   const validInputs = async () => {
//     let { data, error } = await supabase
//     .from('profiles')
//     .select('id')
//     .eq("username", userInfo.username)
//     if (data[0]) { 
//       console.log("Username already exist")
//       return false
//       }
//     if (error) 
//     {console.log(error.message)
//       return false
//     }

//     if (userInfo.password !== userInfo.repeatedPassword) {
//       console.log("Passwords does not match")
//       return false
//     }

//     const validatePhoneNumber = (phoneNum) => {
      
//       if (phoneNum.startsWith("09") && phoneNum.startsWith("07")) return false
//       if (isNaN(parseInt(phoneNum))) return false
//       if (phoneNum.length!== 10) return false

//       return true
//     }
    
//     if (!validatePhoneNumber(userInfo.phone_number)) {
//       console.log("Invalid Phone Number")
//       return false
//     }








//     return true

    
//   }
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="makeAndModel">Make and Model</label>
          <input type="text" name="makeAndModel" id="makeAndModel" minLength="5" value={carInfo.makeAndModel} onChange={handleChange} required />

        </div>
        <div>
            <label htmlFor="year">Year</label>
            <input type="number" id="year" name="year" 
            min={new Date().getFullYear() - 30} 
            max={new Date().getFullYear()} 
            pattern="[0-9]{4}" value={carInfo.year} onChange={handleChange} required />

        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input type="text" name="type" id="type" minLength="3" value={carInfo.type} onChange={handleChange} required/>
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <input type="text" name="color" id="color" minLength="3" value={carInfo.color} onChange={handleChange} required />

        </div>
        <div>
            <label htmlFor="seatingCapacity">Seating Capacity</label>
            <input type="number" id="seatingCapacity" name="seatingCapacity" min="2" value={carInfo.seatingCapacity} onChange={handleChange} required />

        </div>
        <div>
            <label htmlFor="dailyRentalFee">Daily Rental Fee</label>
            <input type="number" id="dailyRentalFee" name="dailyRentalFee" min="1" value={carInfo.dailyRentalFee} onChange={handleChange} required />

        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input type="text" name="location" id="location" minLength="3" value={carInfo.location} onChange={handleChange} required />

        </div>
        <div>
          <label htmlFor="additionalFeatures">Additional Features</label>
          <input type="text" name="additionalFeatures" id="additionalFeatures" minLength="5" value={carInfo.additionalFeatures} onChange={handleChange} required />

        </div>
      </div>
      <label htmlFor="automatic">Automatic</label>
      <input type='radio' name="transmissionType"  id="automatic" value="automatic" checked={carInfo.transmissionType == "automatic"} onChange={handleChange} required></input>
      <input type='radio' name="transmissionType"  id="manual" value="manual" checked={carInfo.transmissionType == "manual"} onChange={handleChange} required></input>
      <label htmlFor="manual">Manual</label>
      <button >AddCar</button>
      </form>

      <button onClick={handleSubmit}>Dummy</button>
    </div>
  );
}

export default AddCar;
