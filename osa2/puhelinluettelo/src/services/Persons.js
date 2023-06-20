import axios from "axios";
const URL = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(URL);
  return req.then((res) => res.data);
};

const create = (newPerson) => {
  const req = axios.post(URL, newPerson);
  return req.then((res) => res.data);
};

const update = (id, newPerson) => {
  const req = axios.put(`${URL}/${id}`, newPerson);
  return req.then((res) => res.data);
};

const deletePerson = (id) => {
  const req = axios.delete(`${URL}/${id}`);
  return req.then((res) => res.data);
}

const personService = {
  getAll,
  create,
  update,
  deletePerson
}

export default personService;
