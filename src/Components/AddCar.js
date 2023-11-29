import React ,{useContext} from 'react';
import { supabase } from '../auth';
import { AuthContext } from '../AuthProvider';
import { v4 as urlGenerator } from 'uuid';

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
            additionalFeatures:"",

            //photos
            photo1 :"",
            photo2 :"",
            photo3 :""

            
          })
  const uploadCarImage = async (imagePath, image)=> {
      const { error: uploadError } = await supabase.storage
      .from("car_images")
      .upload(imagePath, image);
      if (uploadError) console.log("Error Occured while uploading the file")
    }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    

    //generate random urls for the images
    let url_1;
    let url_2;
    let url_3;

    // upload images 
    try {

      if (carInfo.photo1) {
        url_1  = urlGenerator()
        await uploadCarImage(url_1, carInfo.photo1)}

      if (carInfo.photo2) {
          url_2  = urlGenerator()
          await uploadCarImage(url_2, carInfo.photo2)}
      if (carInfo.photo3) {
          url_3  = urlGenerator()
          await uploadCarImage(url_3, carInfo.photo3)}


    }
    
    catch (err) {
      console.error(err.message)
      return
    }

    try {
        const { data, error} = await supabase
        .from('cars')
        .insert([
        { 
            make_and_model: carInfo.makeAndModel,
            owner_id:  user.id, 
            year: carInfo.year,
            color: carInfo.color,
            seating_capacity: carInfo.seatingCapacity,
            daily_rental_fee: carInfo.dailyRentalFee,
            location:carInfo.location,
            transmission_type:carInfo.transmissionType,
            additional_features: carInfo.additionalFeatures,
            photo_url_1: url_1, 
            photo_url_2: url_2,
            photo_url_3: url_3

        },
        ])
        .select('id')
        console.log(data[0].id)
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
  const handleImgChange = (e) => {
    setCarInfo(prev =>{
      return {
      ...prev,
      [e.target.name]: e.target.files[0]
    }
    })
  }



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

      <div >
        <div>
        <label htmlFor='photo1'>photo1 </label>
        <input type='file' accept='image/*' onChange={handleImgChange} id='photo1' name="photo1" required/>
        </div>
        <div>
        <label htmlFor='photo1'>photo2 </label>
        <input type='file' accept='image/*' onChange={handleImgChange} name="photo2" /> 
        </div>
        <div>
        <label htmlFor='photo1'>photo3 </label>
        <input type='file' accept='image/*' onChange={handleImgChange}  name="photo3"/>
        </div>
      </div>


      <button >AddCar</button>
      </form>

    </div>
  );
}

export default AddCar;
