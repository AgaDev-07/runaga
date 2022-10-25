declare class Log{
  constructor(name:string);
  debug(...args:string[]):void;
  info(...args:string[]):void;
  error(...args:string[]):void;
}