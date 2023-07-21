import axios from "axios";
import { useState ,useContext} from "react";
import { userContext } from "./App"; 
const CreatePost = () => {
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [file,setFile]=useState(null);
    const user = useContext(userContext);

    const formSubmitHandler=(e)=>{
        e.preventDefault();
        const formData=new FormData()
        formData.append('title',title);
        formData.append('description',description);
        formData.append('file',file)
        formData.append('email',user.email)
       axios.post('http://localhost:3000/post/create',formData)
      
       .then((res)=>{
        if(res.data==='Success!'){
          window.location='/home'
        }
      
       })
       .catch(err=>console.log(err))
    }
    console.log(user); 
  return (
    <div className="post_container">
      <div className="post_form">
        <form onSubmit={formSubmitHandler} action="">
          <input type="text" placeholder="Enter title" onChange={e=>setTitle(e.target.value)}/>
          <textarea name="desc" 
          id="" cols="30"
           rows="10" placeholder="Enter description" onChange={e=>setDescription(e.target.value)}></textarea>
          <input type="file" name="" id="" placeholder="Select file" onChange={e=>setFile(e.target.files[0])}/>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
};
export default CreatePost;
