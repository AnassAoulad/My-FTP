# My-FTP

[Instruction](https://github.com/Gi-jutsu/myftp)
# Requirements

- :eight_spoked_asterisk: NodeJS version `^14.7.6` (manage NodeJS versions with [nodeenv](https://github.com/nodenv/nodenv) or [nvm](https://github.com/nvm-sh/nvm))
- :package: Yarn version `^1.22.11` or NPM version `^6.14.15`

## Getting started

- Clone the repository
- `yarn install` or `npm install`

## Run the application
Open your terminal and enter in the server folder and run `yarn dev` or `npm run dev` same with client folder.

### Commands
Command which client supported :

- **USER** <username>: check if the user exist. </br>
- **LIST**: list the current directory of the server. </br>
- **CWD** <directory>: change the current directory of the server. </br>
- **PWD**: display the name of the current directory of the server. </br>
- **HELP**: send helpful information to the client. </br>
- **QUIT**: close the connection and stop the program. </br>
## Documentation

- [node](https://nodejs.org/api/process.html)
- [rfc959](https://datatracker.ietf.org/doc/html/rfc959)
