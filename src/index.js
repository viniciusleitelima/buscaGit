#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const Table = require('cli-table');
const figlet = require('figlet');
const axios = require('axios');

const package = require('../package.json');


const showUsersTable = (data) => {
   
    const table = new Table({
        head: ['id', 'login', 'name', 'bio'],
        colWidths: [10, 30, 30, 50]
    });
    table.push(
        [data.id, data.login, data.name, data.bio]
    )
    console.log(table.toString());
}

async function makeGetRequest(name) {

    let url = "https://api.github.com/users/" + name;
    let res = await axios.get(url);

    let user = res.data;
   
    
    showUsersTable(user);
    
  }

program.version(package.version);

console.log(chalk.cyan(figlet.textSync('getGit')));


program
    .command('list <name>' )
    .description('Lista usuario do github')
    .action((name) => {
       makeGetRequest(name);
    });



program.parse(process.argv);
