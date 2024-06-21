
// import React, { useState } from 'react'
// import axios from 'axios';

// function App() {
//   const [image, setImage] = useState(null);
//   const [url, setUrl] = useState('');

//   const saveImage = async () => {
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "mystore");
//     data.append("cloud_name", "dvh2r5vcl");

//     try {
    

  
//       const res = await fetch('https://api.cloudinary.com/v1_1/dvh2r5vcl/image/upload',{
//         method : "POST",
//         body : data
//       })

//       const cloudData = await res.json();
//       setUrl(cloudData.url);
//       console.log(cloudData.url);
//       const response = await axios.post('http://localhost:5000/upload', { url: cloudData.url });
//       console.log(response)
//     } catch (error) {
      
//     }
//   }

//   console.log(url)
//   return (
//     <div className='flex justify-center items-center h-screen '>
//       <div className=" bg-[#2C3A47] p-10 rounded-xl">
//         <div className="input flex justify-center mb-5">
//           <label
//             for="file-upload"
//             class="custom-file-upload">
//             {image
//               ? <img
//                 className=" w-72 lg:w-96  rounded-xl"
//                 src={image ? URL.createObjectURL(image) : ""}
//                 alt="img"
//               />
//               : <img
//                 src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
//                 className="h-20 w-20"
//               />}
//           </label>
//           <input
//             id="file-upload"
//             className=' text-white'
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])} />
//         </div>
//         <div className="">
//           <button
    
//             onClick={saveImage}
//           >
//             Send
//           </button>
//           {/* <Toaster/> */}
//           <img src={url}></img>
//         </div>
//       </div>
//     </div>


//   )
// }

import React from 'react';
import ReactDOM from 'react-dom';
import StepCounter from './StepCounter';

const App = () => (
  <div>
    <StepCounter />
  </div>
);

export default App;