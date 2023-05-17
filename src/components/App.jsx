import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isDuplicateName = contacts.some(
      contact => contact.name === newContact.name
    );

    if (isDuplicateName) {
      alert(`${newContact.name} is already in the contacts list!`);
    } else {
      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const generateId = () => {
    return nanoid();
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} generateId={generateId} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Contacts</h2>
      {filteredContacts.length > 0 ? (
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      ) : (
        <p>No contacts found.</p>
      )}
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  addContact: PropTypes.func,
  deleteContact: PropTypes.func,
  handleFilterChange: PropTypes.func,
  generateId: PropTypes.func,
};

export default App;
