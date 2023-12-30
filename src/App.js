import './App.css';



function App() {
  return (
    <div className="App">
    <h1>My Todos</h1>

    <div className="todo-wrapper">

      <div className="todo-input">
        <div className="todo-input-item">
          <label>Title:</label>
          <input
            type="text"
            placeholder="What's the title of your To Do?"
          />
        </div>
        <div className="todo-input-item">
          <label>Description:</label>
          <input
            type="text"
            placeholder="What's the description of your To Do?"
          />
        </div>
        <div className="todo-input-item">
          <button
            className="primary-btn"
            type="button"
          >
            Add
          </button>
        </div>
      </div>
      <div className="btn-area">
        <button>
          To Do
        </button>

      </div>
      <div className="todo-list">

   
      </div>
    </div>
  </div>
  );
}

export default App;
