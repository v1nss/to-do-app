import React, {useState, useEffect} from 'react';
import './App.css';
// import videoFile from './assets/hny.mp4';

import { FiTrash } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";

function App () {
  const [allTodos, setAllTodos] = useState ([]);
  const [newTodoTitle, setNewTodoTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [completedTodos, setCompletedTodos] = useState ([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState (false);
  const [isEditingToDo, setIsEditingTodo] = useState (false);
  const [newEditedTodoTitle, setNewEditedTodoTitle] = useState ('');
  const [newEditedDescription, setNewEditedDescription] = useState ('');
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);

  const handleAddNewToDo = () => {
    let newToDoObj = {
      title: newTodoTitle,
      description: newDescription,
    };
    if (newTodoTitle.trim() !== '') {
      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push (newToDoObj);
      setAllTodos (updatedTodoArr);
      localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
      setNewDescription ('');
      setNewTodoTitle ('');
    } else {
      alert('Title cannot be empty. Please enter a title.');
    }
  };

  useEffect (() => {
    let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedToDos = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if (savedTodos) {
      setAllTodos (savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos (savedCompletedToDos);
    }
  }, []);

  const handleToDoEdit = (index) => {
    let editedToDoObj = {
      title: newEditedTodoTitle,
      description: newEditedDescription,
    };
    if (newEditedTodoTitle.trim() !== ''){
      let editedToDos = [...allTodos];
      editedToDos[index] = editedToDoObj;
      setAllTodos(editedToDos);
      localStorage.setItem ('todolist', JSON.stringify (editedToDos));
      setNewEditedTodoTitle('');
      setNewEditedDescription('');
    } else {
      alert('Title cannot be empty. Please enter a title.');
    }
  };

  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice (index,1);
    localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
    setAllTodos (reducedTodos);
  };

  const handleCompletedTodoDelete = index => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice (index,1);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (reducedCompletedTodos)
    );
    setCompletedTodos (reducedCompletedTodos);
  };

  const handleComplete = index => {
    const date = new Date ();
    var dd = date.getDate ();
    var mm = date.getMonth () + 1;
    var yyyy = date.getFullYear ();
    var hh = date.getHours ();
    var minutes = date.getMinutes ();
    var ss = date.getSeconds ();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };

    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log (updatedCompletedList);
    setCompletedTodos (updatedCompletedList);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedList)
    );

    handleToDoDelete (index);
  };

  return (
    
    <div className="App">
      
      {/* <h1>HAPPY NEW YEARRR</h1>
      <video autoPlay loop id="myVideo" width="100%" height="auto">
        <source src={videoFile} type="video/mp4" />
      </video> */}
      <div className="todo-wrapper">
      <h1>My Todos</h1>
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
            </button>
          </div>
        </div>
  
        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompletedScreen && 'active'}`}
            onClick={() => setIsCompletedScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen && 'active'}`}
            onClick={() => setIsCompletedScreen(true)}
          >
            Completed
          </button>
        </div>
  
        <div className="todo-list">
          {isCompletedScreen === false &&
            allTodos.map((item, index) => (
              <div className="todo-list-item" key={index}>
                {editingTodoIndex === index ? (
                  <div className='todo-edit' key={index}>
                    <div className="todo-input-item-edit">
                      <div className="todo-input-title-edit">
                        <input
                          type="text"
                          value={newEditedTodoTitle}
                          onChange={(e) => setNewEditedTodoTitle(e.target.value)}
                          placeholder="Title"
                        />
                      </div>
                      <div className="todo-input-description-edit">
                        <input
                          type="text"
                          value={newEditedDescription}
                          onChange={(e) => setNewEditedDescription(e.target.value)}
                          placeholder="Description"
                        />
                      </div>
                    </div>
                    <div className='edit-button'>
                      <button
                        className="cancel-edit-button"
                        onClick={() => {
                          setIsEditingTodo(false);
                          setEditingTodoIndex(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="save-edit-button"
                        onClick={() => {
                          handleToDoEdit(index);
                          setIsEditingTodo(false);
                          setEditingTodoIndex(null);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="todo-list-container">
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <div className='todo-list-buttons'>
                      <FiTrash
                        title="Delete?"
                        className="icon-delete"
                        onClick={() => handleToDoDelete(index)}
                      />
                      <FiEdit2
                        title="Edit?"
                        className="icon"
                        onClick={() => {
                          setIsEditingTodo(true);
                          setEditingTodoIndex(index);
                        }}
                      />

                      <FiCheck
                        title="Completed?"
                        className="check-icon"
                        onClick={() => handleComplete(index)}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
  
        {isCompletedScreen === true &&
          completedTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>
                  <i>Completed at: {item.completedOn}</i>
                </p>
              </div>
              <div>
                <FiTrash
                  className="icon-delete"
                  onClick={() => handleCompletedTodoDelete(index)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;