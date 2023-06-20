import { useEffect, useState } from "react";

import personService from "./services/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    const filterResult = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredPersons(filter === "" ? [] : filterResult);
    setShowAll(filter === "" ? true : false);
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (!personToDelete) {
      alert("Deleting person failed!");
      return;
    }
    const { name } = personToDelete;

    window.confirm(`Delete ${name}?`);
    
    personService
      .deletePerson(id)
      .then((res) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
      })
      .catch(() => {
        alert("Deleting the person failed!");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let personExists = persons.some((person) => person.name === newName);
    if (personExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then((res) => {
      setPersons(persons.concat(res));
      setNewName("");
      setNewNumber("");
      event.target.reset();
    });
  };

  const showPersons = showAll ? (
    <Persons persons={persons} handleDelete={handleDelete} />
  ) : (
    <Persons persons={filteredPersons} />
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />
      <Form
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {showPersons}
    </div>
  );
};

export default App;
