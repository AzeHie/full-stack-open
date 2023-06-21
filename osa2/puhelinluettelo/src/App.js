import { useEffect, useState } from "react";

import personService from "./services/Persons";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState();
  const [notificationStyle, setNotificationStyle] = useState();

  const addSuccessNotification = (message) => {
    setNotification(message);
    setNotificationStyle("success");
    setTimeout(() => {
      setNotification(null);
      setNotificationStyle(null);
    }, 5000);
  };

  const addErrorNotification = (message) => {
    setNotification(message);
    setNotificationStyle("error");
    setTimeout(() => {
      setNotification(null);
      setNotificationStyle(null);
    }, 5000);
  };

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
      addErrorNotification("Deleting the person failed!");
      return;
    }
    const { name } = personToDelete;

    const confirmation = window.confirm(`Delete ${name}?`);

    if (confirmation) {
      personService
        .deletePerson(id)
        .then((res) => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
          addSuccessNotification(`${name} deleted successfully!`);
        })
        .catch(() => {
          addErrorNotification(`Deleting ${name} failed!`);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let personExists = persons.some((person) => person.name === newName);

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (personExists) {
      const confirmation = window.confirm(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );

      if (confirmation) {
        let person = persons.find((person) => person.name === newName);

        personService
          .update(person.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) => {
                if (person.id === updatedPerson.id) {
                  return updatedPerson;
                }
                return person;
              })
            );
            addSuccessNotification(
              `${person.name}'s number updated successfully!`
            );
          })
          .catch(() => {
            addErrorNotification(`information of ${person.name} has already been removed from the server!`)
          });
      } else {
        setNewName("");
        setNewNumber("");
        return;
      }
    } else {
      personService.create(newPerson).then((res) => {
        setPersons(persons.concat(res));
      }).catch(() => {
        addErrorNotification("Creating new person failed!")
      });
      addSuccessNotification(`New person added successfully!`);
    }
    setNewName("");
    setNewNumber("");
    event.target.reset();
  };

  const showPersons = showAll ? (
    <Persons persons={persons} handleDelete={handleDelete} />
  ) : (
    <Persons persons={filteredPersons} />
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} styles={notificationStyle} />
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
