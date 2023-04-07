// import React, { useState } from 'react'
// import { storage } from '../firebase/firebase'
// import { ref, uploadBytes } from 'firebase/storage'
// import axios from "axios";


// const FileUpload = () => {

//     const [spieces, setSpieces] = useState(null)
//     const [imageUpload, setImageUpload] = useState(null)
//     const [imageURL, setImageURL] = useState("")
//     const [apiResponse, setApiResponse] = useState("")

//     const predict = () => {
//         axios({
//             method: 'post',
//             headers: { 'Content-Type': 'application/json'},
//             url: 'http://192.168.1.31:8080/predict',
//             data: {
//                 "file_name": imageURL
//             },
//           }).then(function (response) {
//             setApiResponse(response.data.result)
//             console.log(apiResponse)
//           });
//     }

//     const uploadImage = () => {
//         if(imageUpload == null) return ;
//         console.log(imageUpload)
//         const imageRef = ref(storage, imageUpload.name)
//         const imgurl = "https://firebasestorage.googleapis.com/v0/b/perceptive-day-367207.appspot.com/o/"+imageUpload.name.toString()+"?alt=media&token=c0c78a1b-ddf9-4299-bb5a-9b43eb9320b9"
//         setImageURL(imgurl)
//         uploadBytes(imageRef, imageUpload)
//         .then(() => {
//                 console.log(imageURL)
//                 alert("Image Uploaded")
//             }
//         )
//     }

//     return (
//         <div>
//             <input 
//             type="file"
//             onChange= {(event) => {setImageUpload(event.target.files[0])}}
//             />
//             <button onClick= {uploadImage}>Upload Image</button>
//             <button onClick= {predict}>Predict</button>
            
//         </div>
//     )
// }

// export default FileUpload


import React, { useState } from 'react'
import { storage } from '../firebase/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import axios from "axios";

import Python from "./Python/Python"
import Viper from "./Viper/Viper"
import ModelSelector from "./ModelSelector"

import './FileUploader.css'

const FileUpload = () => {

    // const url = "https://firebasestorage.googleapis.com/v0/b/perceptive-day-367207.appspot.com/o/21545345.jpg?alt=media&token=c0c78a1b-ddf9-4299-bb5a-9b43eb9320b9"
    // const file_url = {
    //     "file_name":"https://cdn11.bigcommerce.com/s-g64jf8ws/images/stencil/500x659/products/392/2438/IMG_4127__36448.1567625707.jpg?c=2"
    // };

    const [imageUpload, setImageUpload] = useState(null)
    const [imageURL, setImageURL] = useState("")
    const [apiResponse, setApiResponse] = useState("")
    const [isPython, setIsPython] = useState("")
    const [isViper, setIsViper] = useState("")
    const [confidence, setConfidence] = useState("")
    const [tumorName, setTumorName] = useState(null)
    const [radioValue, setRadioValue] = useState('1');

    const predict = () => {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"},
            url: 'https://brain-tumor-model-1-46efhgatka-el.a.run.app/predict',
            data: {
                "file_name": imageURL,
                "model" : parseInt(radioValue)
            },
          }).then(function (response) {
            setApiResponse(response.data.result)
            setConfidence(response.data.result.probability)
            response_array = response.data.result.name.split(" ");
            if(response_array.length>2){
               results  = response_array[1] + " " + "Stroke"     
            }
            else{
               results  = response_array[1] + " " + "Brain"             
            }
            
            setTumorName(response_array)
            // if(response.data.name === "brain_hemorrhagic"){
            //     setIsPython(true)
            //     setIsViper(false)
            //     setConfidence()
            // }
            // else{
            //     setIsViper(true)
            //     setIsPython(false)
            //     setConfidence(99)
            // }
          });
    }

    const uploadImage = () => {
        console.log('file uploaded')
        if(imageUpload == null) return ;
        const imageRef = ref(storage, imageUpload.name)
        const imgurl = "https://firebasestorage.googleapis.com/v0/b/perceptive-day-367207.appspot.com/o/"+imageUpload.name+"?alt=media&token=c0c78a1b-ddf9-4299-bb5a-9b43eb9320b9"
        uploadBytes(imageRef, imageUpload)
        .then(() => {
                setImageURL(imgurl)
            }
        )
    }

    return (
        <div className='landing-page'>
            <h1>Brain Tumor Identification</h1>
            <ModelSelector setRadioValue={setRadioValue} radioValue={radioValue}></ModelSelector>
            <div className="upload-container">
                <span className="lead"><b>Upload Your Image</b></span>
                <div className="upload-options">
                    <input 
                    className = "upload-btn-input"
                    type="file"
                    onChange= {(event) => {setImageUpload(event.target.files[0])}}
                    >
                    </input>
                    <button className="upload-btn" onClick= {uploadImage}>Upload Image</button>
                    <button className="upload-btn" onClick= {predict}>Predict</button>
                </div>
                {imageURL? <img className="image-container" src={imageURL}></img>: null}
            </div>
            {confidence? <h2>Identified as a {tumorName} with {confidence} % of Confidence</h2> : null}
            {isPython? <h2>Identified as a Indian Rock Python with {confidence} % of Confidence</h2> : null}
            {isPython? <Python></Python> : null}
            {isViper? <h2>Identified as a Russell's Viper with {confidence} % of Confidence</h2> : null}
            {isViper? <Viper></Viper> : null}
        </div>
    )
}

export default FileUpload
