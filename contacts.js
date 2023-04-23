const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid")

 const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async function () {
	const data = await fs.readFile(contactsPath)
	return JSON.parse(data);
 }
 
 const getContactById = async (contactId) => {
	const data = await listContacts();
   const contactById = data.find (item => item.id === contactId);
	return  contactById || null;
 }
 
 const removeContact = async function (contactId) {
	const data = await listContacts();
	const contactList = data.filter(item => item.id !== contactId);
	await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
	return await listContacts();
 }
 
 const addContact = async function (name, email, phone) {
	const contactNew = {
		id: nanoid(),
		name,
	   email, 
		phone
	}
	const data = await listContacts();
	data.push(contactNew);
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
	return contactNew;
 }

 module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
 }