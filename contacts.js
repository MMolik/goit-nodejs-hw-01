const fs = require('fs').promises;
const path = require('path');
require('colors');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const parseContacts = (data) => JSON.parse(data.toString());

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = parseContacts(data);
    const sortedContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
    console.table(sortedContacts);
  } catch (error) {
    console.log(error.message.red);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = parseContacts(data);
    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
      console.table(contact);
    } else {
      console.log(`There is no contact with the id: ${contactId}`.red);
    }
  } catch (error) {
    console.log(error.message.red);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = parseContacts(data);
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

    if (contacts.length !== updatedContacts.length) {
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
      console.log(`Contact with the id ${contactId} has been removed`.green);
    } else {
      console.log(`There is no contact with the id: ${contactId}`.red);
    }
  } catch (error) {
    console.log(error.message.red);
  }
}

async function addContact(name, email, phone) {
  if (!name || !email || !phone) {
    console.log('Please set arguments (name, email, phone) to add contact'.red);
    return;
  }

  const { nanoid } = await import('nanoid');

  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = parseContacts(data);
    const updatedContacts = [...contacts, contact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`${name} has been added to your contacts`.green);
  } catch (error) {
    console.log(`Oops, something went wrong: ${error.message}`.red);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
