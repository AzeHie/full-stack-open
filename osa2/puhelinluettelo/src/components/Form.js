const Form = ({handleSubmit, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new:</h2>
      <div>
        name: <input onChange={handleNameChange} />
      </div>
      <div>
        Number: <input onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
