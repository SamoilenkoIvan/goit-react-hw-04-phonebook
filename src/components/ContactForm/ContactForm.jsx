import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ContactForm = ({ generateId, onSubmit }) => {
const [name, setName] = useState('');
const [number, setNumber] = useState('');

const handleNameChange = (event) => {
setName(event.target.value);
};

const handleNumberChange = (event) => {
setNumber(event.target.value);
};

const handleSubmit = (event) => {
event.preventDefault();
const newContact = {
id: generateId(),
name,
number,
};
onSubmit(newContact);
setName('');
setNumber('');
};

return (
<form onSubmit={handleSubmit}>
<label>
Name:
<input
       type="text"
       name="name"
       pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
       title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
       value={name}
       onChange={handleNameChange}
       required
     />
</label>
<label>
Phone Number:
<input
       type="tel"
       name="number"
       pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
       title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
       value={number}
       onChange={handleNumberChange}
       required
     />
</label>
<button type="submit">Add Contact</button>
</form>
);
};

ContactForm.propTypes = {
generateId: PropTypes.func,
onSubmit: PropTypes.func,
};

export default ContactForm;