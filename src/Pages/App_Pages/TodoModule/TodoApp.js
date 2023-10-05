import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './todoApp.css';
const TodoApp = () => {

    const [todoList, setTodoList] = useState([]);
    const [todoItem, setTodoItem] = useState('');
    const [editNode, setEditNode] = useState(null);
    const [updateTodo, setUpdatedTodo] = useState('');
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    
    const addToDoItem = () => {

        const max = (list) => list.reduce((acc, val) => { 
            return acc > val.id ? acc : val.id
        },0);
        const len = todoList.length;
        const maxVal= len > 1 ? max(todoList) : len === 1 ? 1 : 0; 
        setTodoList([...todoList, { "id": maxVal+1 , "msg": todoItem, "isActive": true }])
        setTodoItem('')
        console.log('todoList',todoList);
    }

    const removeToDoItem = (id) => {
        const updatedTodo = todoList.filter(todo => todo.id !== id);
        setTodoList(updatedTodo);

    }

    const changeToDoStatus = (id) => {
        const updatedTodoList = todoList.map(todo =>  {
            if(todo.id === id){
                // return todo.status ? {...todo,"status": false} : {...todo,"status": true}
                return { ...todo, isActive : !todo.isActive };
            }
            return todo
         })
        setTodoList(updatedTodoList);
    }

    const updateToDoItem = (id) => {
        const updatedTodoList = todoList.map(todo =>  {
            if(todo.id === id){
                return { ...todo, msg : updateTodo};
            }
            return todo
         })
        setTodoList(updatedTodoList);
        setEditNode(null);
        setUpdatedTodo('');
    }

    return (
  
        <div className="App">
            <div className="container">
                <div className="w-50 mt-5 mx-auto" id="notification-container">

                </div>
                <h1 className="text-center text-primary"> Todo   </h1>
                <div className="input-group mb-4 w-50 mx-auto mt-3">
                    <input type="text" id="todoInputBox" className="form-control text-center text-primary border-primary" value={todoItem} 
                        onChange={(e) => setTodoItem(e.target.value)} 
                        placeholder=" Enter the todo item..." aria-describedby="button-addon2" 
                        />
                    <button type="button" className="btn btn-outline-primary" onClick={addToDoItem} id="clear_control_button">Add ToDo</button>
                </div>

                <div id="todoContainer" className="todoContainer position-relative w-100 m-auto" style={{ height: "200px" }}>
                    {/* <h1 className="text-danger">hai</h1> */}
              
                    <List sx={{ width: '50%', bgcolor: 'background.paper', m:'auto', p: 0, backgroundColor: 'pink', }}>
                    { todoList.length && todoList.map((todo,index) => {
                            const labelId = `checkbox-list-label-${todo.id}`;
                            return (
                                    <ListItem
                                        key={todo.id}
                                        secondaryAction={
                                            <>
                                            <IconButton edge="end" aria-label="edit" sx={{ mr: 1}}>
                                            {/* sx={{ display: { xs: 'none', sm: 'block' },   m: 'auto', }} */}
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="remove" sx={{ mr: 1}}>
                                                <DeleteIcon />
                                            </IconButton>
                                            </>
                                        
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggle(todo.id)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(todo.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={`Line item ${todo.id + 1}`} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                        })
                    }
                    </List>

                    {todoList.length ? (
                        <ul class="list-group w-50 mx-auto" id="todoResult">
                        {todoList.map((todo,index) => {
                            return (
                                <React.Fragment key={todo.id}>

                                    <li className={`list-group-item list-group-item-action  w-100 ${todo.isActive ? 'list-group-item-primary' 
                                                         : 'list-group-item-warning'} position-relative`}>
                                            
                                            {editNode === todo.id ? (<>

                                                <div class="input-group input-group-sm w-75 ms-4 p-0 m-0">
                                                    <input type="text" class="form-control text-center text-primary border-primary" 
                                                        aria-describedby="button-addon2" value={updateTodo.length? updateTodo : todo.msg} 
                                                        // onChange={(e) => setUpdatedTodo(e.target.value)} 
                                                        onChange={(e)=>setUpdatedTodo(e.target.value)}/> 
                                                </div> 

                                                <i class="bi bi-check2-square  position-absolute translate-middle top-0 end-0 mt-4 me-5 
                                                    text-secondary icon-action"
                                                    onClick={()=> updateToDoItem(todo.id)}>
                                                </i>

                                             </>) : (<>
                                                
                                                <div class="input-group input-group w-100 position-relative p-1">
                                                    <input className="form-check-input me-3 border border-primary" type="checkbox" 
                                                        checked={!todo.isActive} id={todo.id} 
                                                        onChange={()=>changeToDoStatus(todo.id)} />
                                                    
                                                    {!todo.isActive ? (<>
                                                        <label className="form-check-label mx-3" htmlFor={todo.id}>
                                                            <del key={todo.id}>{todo.msg}</del>
                                                        </label>
                                                        <figcaption className="blockquote-footer position-absolute top-100 end-0 
                                                            translate-middle me-4 pb-2"> Done </figcaption>
                                                    </>) : (<>
                                                        <label className="form-check-label ms-3" htmlFor={todo.id}>{todo.msg}</label>
                                                        <i className="bi bi-pencil-square position-absolute top-1 end-0 me-5 text-secondary 
                                                            icon-action" onClick={()=>setEditNode(todo.id)}>
                                                        </i>
                                                        </>)
                                                    }
                                                </div> 

                                             </>)
                                            }
                                            <i className="bi bi-trash-fill position-absolute translate-middle top-0 end-0 me-3 mt-4 text-secondary icon-action" onClick={()=>removeToDoItem(todo.id)}></i>
                                    </li>

                                </React.Fragment>
                                )
                            })
                        } 
                        </ul>) : (<>
                            <span className=' mx-auto mt-5 w-100' >
                                <img alt="Empty Todo Img" className='rounded mx-auto d-block w-25'
                                    src='https://cdni.iconscout.com/illustration/premium/thumb/empty-state-2130362-1800926.png' />
                                <h3 className='text-center text-secondary '>No More ToDos</h3>
                            </span>
                        </>)
                    }
                </div >
            </div >
        </div >
    )
}

export default TodoApp