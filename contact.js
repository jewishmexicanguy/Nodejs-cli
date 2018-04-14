#!/usr/bin/env node

const program = require('commander');
const prompt = require('inquirer');
/**
 * Require logic.js file and get controller function using JS destructuring assignment.
 * This const loads CRUD functions that we defined and exported in logic.js
 */
const 
{ 
    addContact, 
    getContact,
    getContactList,
    updateContact,
    deleteContact
} = require('./logic');

// Craft question for user
const questions = 
[
    {
        type: 'input',
        name: 'firstname',
        message: 'Entre firstname ...'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter lastname ...'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter phone number ...'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email address ...'
    }
];

program
    .version('0.0.1')
    .description('Contact management system')

program
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() =>
        {
            prompt(questions).then(answers => 
                addContact(answers)
            );
        }
    );

program
    .command('getContact <name>')
    .alias('r')
    .description('Get contact')
    .action(name => getContact(name));

program
    .command('updateContact <_id>')
    .alias('u')
    .description('Update contact')
    .action(_id => 
    {
        prompt(questions).then((answers) =>
        updateContact(_id, answers));
    });

program
    .command('updateContact <_id>')
    .alias('d')
    .description('Delete contact')
    .action(_id => deleteContact(_id));

program
    .command('getContactList')
    .alias('l')
    .description('List of contacts')
    .action(function() 
    {
        getContactList();
    });

// Assert that a VALID command is provided
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2)))
{
    program.outputHelp();
    process.exit();
}

program
    .parse(process.argv);