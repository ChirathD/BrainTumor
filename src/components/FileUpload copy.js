import React, { useState } from 'react'
import { storage } from '../firebase/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import axios from "axios";

import "./Test.css"

const FileUpload = () => {

    const url = "https://firebasestorage.googleapis.com/v0/b/perceptive-day-367207.appspot.com/o/21545345.jpg?alt=media&token=c0c78a1b-ddf9-4299-bb5a-9b43eb9320b9"
    const file_url = {
        "file_name":"https://cdn11.bigcommerce.com/s-g64jf8ws/images/stencil/500x659/products/392/2438/IMG_4127__36448.1567625707.jpg?c=2"
    };

    const [imageUpload, setImageUpload] = useState(null)
    const [imageURL, setImageURL] = useState("")
    const [apiResponse, setApiResponse] = useState("")

    const predict = () => {
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            url: 'http://192.168.1.31:8080/predict',
            data: {
                "file_name": imageURL
            },
          }).then(function (response) {
            setApiResponse(response.data.result)

          });
    }

    const uploadImage = () => {
        if(imageUpload == null) return ;
        const imageRef = ref(storage, imageUpload.name)
        const imgurl = "https://firebasestorage.googleapis.com/v0/b/perceptive-day-367207.appspot.com/o/"+imageUpload.name+"?alt=media&token=c0c78a1b-ddf9-4299-bb5a-9b43eb9320b9"
        uploadBytes(imageRef, imageUpload)
        .then(() => {
                alert("Image Uploaded")
                setImageURL(imgurl)
                console.log(imageURL)
                alert("Image Uploaded")
            }
        )
    }

    return (
        <div>
            <h2>Snake Species Identification</h2>
            <p class="lead"><b>Upload Your Image</b></p>
            <form id="file-upload-form" class="uploader">
        <input id="file-upload" type="file"
            type="file"
            onChange= {(event) => {setImageUpload(event.target.files[0])}} 
            accept="image/*" />
            
            <label for="file-upload" id="file-drag">
                <img id="file-image" src="#" alt="Preview" class="hidden"/>
                <div id="start">
                    <i class="fa fa-download" aria-hidden="true"></i>
                    <div>Select a file or drag here</div>
                    <span id="file-upload-btn" class="btn btn-primary">Select a file</span>
                </div>
            </label>
        </form>

            {/* <input 
            type="file"
            onChange= {(event) => {setImageUpload(event.target.files[0])}}
            >

            </input> */}
            {/* <button onClick= {uploadImage}>Upload Image</button>
            <button onClick= {predict}>Predict</button> */}
        </div>
    )
}

export default FileUpload
