import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Title, Subtitle } from 'components/App/App.styled';

import { Form } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLocaleLowerCase();
    const findName = contacts.find(
      contact => contact.name.toLocaleLowerCase() === normalizedName
    );

    if (findName) {
      toast.error(`${name} is already in the contacts`);
      return;
    }

    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    setContacts(contacts => [...contacts, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContact = getVisibleContact();

  return (
    <Container>
      <Title>Phonebook</Title>
      <Form onSubmit={addContact} />
      <Subtitle>Contacts</Subtitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContact} onDeleteContact={deleteContact} />
      <ToastContainer theme="colored" autoClose={2000} position="top-right" />
    </Container>
  );
};
