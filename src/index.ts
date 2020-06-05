#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const Table = require('cli-table');
const figlet = require('figlet');
const axios = require('axios');

const package = require('../package.json');


const showUsersTable = (data) => {
    
    const table = new Table({
        head: ['id', 'username', 'name', 'state', 'web_url'],
        colWidths: [10, 20, 30, 30, 30]
    });
    data.map((user) =>
        table.push(
          [user.id, user.username, user.name, user.state, user.web_url]
        )
    );
    
    console.log(table.toString());
}

async function makeGetRequest(username) {

    let url = "https://gitlab.com/api/v4/search?scope=users&search=" + username;
    const ACCESS_TOKEN = 'Gt5-erUtryzxWR-SUiSw';
    
    let res = await axios.get(url,{ headers: { 'PRIVATE-TOKEN': ACCESS_TOKEN } });

    let user = res.data;
    
    showUsersTable(user);
    
  }

program.version(package.version);

console.log(chalk.cyan(figlet.textSync('getGit')));


program
    .command('list <name>' )
    .description('Lista usuario do gitlab')
    .action((name) => {
       makeGetRequest(name);
    });



program.parse(process.argv);
