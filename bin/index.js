#!/usr/bin/env node

const fs = require('fs');
const cp = require('child_process');
const Log = require('../lib/log');
const package = require('../package.json');

const log = new Log(package.name);

const file = process.argv[2];

const dir = cp.execSync(`cd`, { encoding: 'utf8' }).trim();
const path = `${dir}/${file}`;
const extensions = ['js', 'json', 'mjs'];

const start = () => {
  let cmd;
  try {
    cmd = cp.spawn('node', [path], { stdio: 'inherit' });
    cmd.on('close', code => {
      if(code===0)
      log.debug('clean exit');
      if(code===1)
      log.error('app crashed')
    });
  } catch (error) {
    log.error('app crashed');
  }
  return cmd;
};

let command = start();

function watch(dir){
  fs.readdir(dir, (err, files) => {
    if (err) {
      log.error(err);
      return;
    }
    files.forEach(file => {
      let path = `${dir}/${file}`;
      fs.stat(path, (err, stats) => {
        if (err) {
          log.error(err);
          return;
        }
        if (stats.isDirectory()) {
          watch(path);
        }
      })
    });
  })
  fs.watch(dir, (event, filename) => {
    if (extensions.includes(filename.split('.').pop())) {
      log.debug('restarting due to changes...');
      log.debug(`starting 'node ${file}'`);
      command.kill();
      command = start();
    }
  });
}
function run(){
  log.info(package.version);
  log.info(`watching path(s) "${dir}"`);
  log.info(`watching extensions ${extensions}`);
  watch(dir);
}

run()