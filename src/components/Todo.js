import React, { useState, useEffect }  from 'react';
import './style.css';

const getLocalStorageData = () =>{
  const lists = localStorage.getItem('todolist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState('');
  const [item, setItem] = useState(getLocalStorageData());
  const [isEditItem, setIsEditItem] = useState('');
  const [toggleButton, setToggleButton] = useState(false);

// add items
  const addItem = () =>{
   if(!inputdata){
    alert('Please Add Item')
   }
   else if(inputdata && toggleButton){
    setItem(
      item.map((curElem) =>{
        if(curElem.id === isEditItem){
          return{...curElem, name: inputdata};
        }
        return curElem;
      })
    )
    setInputData([]);
    setIsEditItem(null);
    setToggleButton(false);
   }
   else{
    const newInputData = {
      id: new Date().getTime().toString(),
      name: inputdata
    }
    setItem([...item, newInputData]);
    setInputData("");
   }
  };

  // edit item 
    const editItem = (index) =>{
     const editedItem = item.find((curElem) =>{
      return curElem.id === index;
     });
      setInputData(editedItem.name);
      setIsEditItem(index);
      setToggleButton(true);
    };

  // delete items
   const deleteItem = (index) =>{
      const updatedItem = item.filter((curElem) =>{
        return curElem.id !== index;
      })
      setItem(updatedItem);
   };

   //  remove all item 
   const removeAll = () =>{
     setItem([]);
    };
    
    //  add to local storage 
    useEffect(() => {
      localStorage.setItem('todolist', JSON.stringify(item))
    }, [item]);


  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
              <img src="./images/todo.png" alt="todo" />
              <figcaption>Add Your List📃</figcaption>
            </figure>
            <div className="addItems">
              <input type="text" placeholder='Add Items📝'
              className='form-control'
              value={inputdata} onChange={(event)=> setInputData(event.target.value)}/>
              {toggleButton ? 
              (<i className="far fa-edit add-btn" onClick={addItem}></i>)
              :
              (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
              }
            </div>
            
            {/* show items */}
            <div className="showItems">
              {item.map((curElem) =>{
                return(
                  <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                  <i className="far fa-edit add-btn" onClick={()=> editItem(curElem.id)}></i>
                  <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i>
                  </div>
                </div>
                )
              })
              };
              
            </div>

            {/* remove items */}
            <div className="showItems">
              <button className='btn effect04' data-sm-link-text='REMOVE ALL' onClick={removeAll}>
                <span>CHECK LIST</span></button>
              </div>
        </div>
    </div>
    </>
  )
}

export default Todo;