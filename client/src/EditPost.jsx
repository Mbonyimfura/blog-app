import axios from "axios";
import { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
 const navigate=useNavigate()
    const {id}=useParams()
    const formSubmitHandler=(e)=>{
        e.preventDefault();
       axios.patch('http://localhost:3000/post/editpost/'+id,{title,description})
      
       .then((res)=>{
        if(res.data==='Success!'){
        navigate('/home') 
        }
      
       })
       .catch(err=>console.log(err))
    }
    useEffect(()=>{
        axios.get('http://localhost:3000/post/getPostById/'+id)
        .then(result=>{
            setTitle(result.data.title)
            setDescription(result.data.description)
        })
        .catch(err=>console.log(err))
            },[])
  return (
    <div className="post_container">
      <div className="post_form">
        <form onSubmit={formSubmitHandler} action="">
          <input type="text" placeholder="Enter title"value={title} onChange={e=>setTitle(e.target.value)}/>
          <textarea name="desc" 
          id="" cols="30"
           rows="10" value={description} placeholder="Enter description" onChange={e=>setDescription(e.target.value)}></textarea>
          
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};
export default EditPost;
