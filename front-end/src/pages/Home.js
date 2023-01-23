import axios from "axios";
import { useState, useEffect } from "react";

function Home(){

 const [files, setFiles] = useState([])
 
 useEffect(
  () => {
    axios.get('http://localhost:4000/post')
    .then((response) => {
      let fiid  = response.data.Posts;
      setFiles(fiid)
    })
  }, []
 )
   

    return (

      
        <div id="Post">
          <div id="Container">
          <h1>Home page</h1>  
          </div>
            
        </div>
        
    )
}

export default Home