import { createServer } from "net";
const fs = require('fs');
const path = require('path');

export function launch(port) {
  const server = createServer((socket) => {
    console.log("new connection.");
    socket.on("data", (data) => {
      const message = data.toString();
      const [command, ...args] = message.trim().split(" ");
      console.log(command, args);

      switch(command) {
        case "USER":
          let name = fs.readFileSync(path.join(process.cwd(), "data", "user.json"), 'utf8');
          const username = JSON.parse(name);
          username.forEach(cm => {
            if (cm.name == args){
              socket.write(`${cm.name} \r\n`);
              socket.write(`230, User logged in, proceed. \r\n`);
            }
          });
          break;
        case "PASS":
          socket.write("331, User name ok, need pass.\r\n");
          let password = fs.readFileSync(path.join(process.cwd(), "data", "user.json"), 'utf8');
          const mdp = JSON.parse(password);
          console.log(user)
          mdp.forEach(cm => {
            if (cm.password == args && cm.name == user){
              socket.write(`${cm.password} \r\n`);
            }
          });
          break;
        case "LIST":
          socket.write("125, Data connection already open; transfer starting \r\n")
          let files = fs.readdirSync(process.cwd());
          files.forEach(file => {
            socket.write(`${file} \r\n`);
          });
          break;
        case "CWD":
          try{
            process.chdir(args[0]);
            socket.write(`250, New directory, ${process.cwd()} \r\n`);
            break;
          }
          catch(err) {
            socket.write(`non-existent file, try another path \r\n`)
            break;
          };
        case "RETR":
          socket.write("150, File status okay; about to open data connection \r\n");
          break;
        case "STOR":
          socket.write("226, Closing data connection \r\n");
          break;
        case "PWD":
          socket.write(`257, ${process.cwd()} \r\n`);
          break;
        case "HELP":
          socket.write(`211, System status, or system help reply. \r\n`);
          const data = fs.readFileSync(path.join(process.cwd(), "data", "commands.json"), 'utf8')
              let resp =""
              const commands = JSON.parse(data);
              commands.forEach(cm => {
                resp += ` - ${cm.commande}: ${cm.description}\r\n`
              socket.write(resp);
            });
          break;
        case "QUIT":
          socket.write('221, Service closing control connection. Logged out if appropriate. \r\n');
          socket.write(process.exit());
          break;
        default:
          console.log("command not supported:", command, args);
      }
    });
  });

  server.listen(port, () => {
    console.log(`server started at localhost:${port}`);
  });
}
