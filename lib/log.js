require('./colors');
class Log {
  constructor(name) {
    this.name = name;
  }
  #log(message) {
    return `[${this.name}] ${message}`;
  }
  debug(...messages) {
    console.log(this.#log(messages.join(' ')).green);
  }
  info(...messages) {
    console.log(this.#log(messages.join(' ')).yellow);
  }
  error(...messages) {
    console.log(this.#log(messages.join(' ')).red);
  }
}
module.exports = Log;
