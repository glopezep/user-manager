const debug = require('debug')('user-manager:db:setup')
const chalk = require('chalk')
const inquirer = require('inquirer')
const hasFlag = require('has-flag')
const Db = require('./')
const config = require('./config')

config.logging = (msg) => debug(msg)

const db = new Db(config)
const prompt = inquirer.createPromptModule()

async function setup () {
  if (!hasFlag('force')) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happened')
    }
  }

  db.setup().then(msg => {
    console.log(`${chalk.green('[success]')} ${msg}`)
    process.exit(0)
  }).catch(err => {
    console.error(`${chalk.red('[error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
  })
}

setup()
