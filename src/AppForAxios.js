import { useSelector, useDispatch } from 'react-redux';
import { Apiservice } from './config.axios';
import {useState} from 'react';


function App() {


  const dispatch = useDispatch()

  const [userDetails,setUserDetails] = useState({ 
  userId : 11,
  id : 101,
  title : "Molestiae ut ut quas totam\nnostrum rerum est autem sunt",
  body : "nostrum rerum est autem sunt rem eveniet architecto",
  
  });

  const getDetails = async() => {

    const response = await Apiservice.get('/posts');

    console.log(response);

  }

  
  const postDetails = async() => {

    const response = await Apiservice.post('/posts',  userDetails  );

    console.log(response);

  }


  return (
    <div className="App">

        <h1 className='text-center text-danger p-5'>Sample React App</h1>
        <div className = 'text-center'> 

        <button onClick={getDetails} className='btn-primary'>Get Details</button>

        <button onClick={postDetails} className='btn-primary'>Post Details</button>

      </div>

    </div>
  );
}

export default App;
