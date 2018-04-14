const mongoose = require('mongoose');
const assert = require('assert');
mongoose.Promise = global.Promise; // Use native promises

const db = mongoose.connect('mongodb://localhost:27017/contact-manager');

// Convert values to lowercase, why?
function toLower(v)
{
    return v.toLowerCase();
}

// Define a contact
const contactSchema = mongoose.Schema(
    {
        firstname: { type: String, set: toLower },
        lastname: { type: String, set: toLower },
        phone: { type: String, set: toLower },
        email: { type: String, set: toLower }
    }
);

// Define model as an interface with the database
const Contact = mongoose.model('Contact', contactSchema);

/**
 * @function [addContact]
 * @param {String} contact
 * @return {String} Status
 * This a controller function
 */
const addContact = (contact) => 
{
    Contact.create(contact, (err) =>
    {
        assert.equal(null, err);
        console.info('New contact added');
        process.exit(0);
    });
};

/**
 * @function [getContact]
 * @param {string} name
 * @returns {Json}
 * This is a controller function
 */
const getContact = (name) =>
{
    // Define search criteria to be case-insensitive and inexact.
    const search = new RegExp(name, 'i');
    Contact.find(
        {
            $or: 
            [
                { firstname: search }, 
                { lastname: search }
            ]
        }
    ).exec((err, contact) => 
    {
        assert.equal(null, err);
        console.info(contact);
        console.info('${ contact.length } matches');
        process.exit(0);
    });
};

/**
 * @function [updateContact]
 * @param {Integer} _id
 * @returns {String} status 
 */
const updateContact = (_id, contact) =>
{
    Contact.update({ _id }, contact).exec((err, status) =>
    {
        assert.equal(null, err);
        console.info('Updated successfully');
        process.exit(0);
    });
};

/**
 * @function [deleteContact]
 * @param {Integer} _id
 * @returns {String} status
 */
function deleteContact(_id)
{
    Contact.remove({ _id }).exec((err, status) => 
    {
        assert.equal(null, err);
        console.info('Deleted successfully');
        process.exit(0);
    });
}

/**
 * @function [getContactList]
 * @returns [contactList] contacts
 */
function getContactList()
{
    Contact.find().exec((err, contacts) => 
    {
        assert.equal(null, err);
        console.info(contacts);
        console.info('${contacts.length} matches');
        process.exit(0);
    });
}
// Export all methods
module.exports = 
{ 
    addContact, 
    getContact, 
    updateContact, 
    deleteContact, 
    getContactList 
};