const { Command } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const program = new Command();
program
  .option('-a, --action <string>', 'choose action: list, get, add, remove')
  .option('-i, --id <string>', 'user id')
  .option('-n, --name <string>', 'user name')
  .option('-e, --email <string>', 'user email')
  .option('-p, --phone <string>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      await listContacts();
      break;

    case 'get':
      await getContactById(id);
      break;

    case 'add':
      await addContact(name, email, phone);
      break;

    case 'remove':
      await removeContact(id);
      break;

    default:
      console.warn('Unknown action type!');
  }
}

invokeAction(argv);
