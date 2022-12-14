import React, { Component } from "react";
import { nanoid } from "nanoid";

import ContactForm from "components/ContactForm";
import Filter from "components/Filter";
import ContactList from "components/ContactList";
import Box from "components/Box";

// utils
import getFilteredContacts from "utils/getFilteredContacts";

// import initialContacts from 'contacts.json'; <--- get them from localStorage in componentDidMount()

import { PhonebookTitle, PnonebookSubtitle } from "./App.styled";

class App extends Component {
  state = {
    contacts: [], //initialContacts,
    filter: '',
  }

  componentDidMount() {
    const contacts =
      localStorage.getItem('contacts')
        ? JSON.parse(localStorage.getItem('contacts'))
        : [];
    
    this.setState({
      contacts,
    })
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    
    if (contacts.find(contact => contact.name === name)) {
      alert(`"${name}" is already in contacts.`)
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  }

  deleteContact = contactId => {    
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact =>
        contact.id !== contactId),
    }));
  };

  // for Filter
  handleInput = ({ target: { name, value } }) => {
      this.setState({
          [name]: value,
      });
  };
  
  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = getFilteredContacts(contacts, filter);

    return (
      <Box
        width={350} ml='auto' mr='auto' p='20px'
        border='1px solid' borderColor='gray'
      >

        <PhonebookTitle>Phonebook</PhonebookTitle>

        {/* Form component */}
        <ContactForm
          onAddContact={this.addContact}
        />

        <PnonebookSubtitle>Contacts</PnonebookSubtitle>

        {/* Filter component */}
        <Filter
          filter={filter}
          onInput={this.handleInput}
        />
        
        {/* Contacts list Component */}
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />

      </Box>
    );
  };
  
};

export default App;