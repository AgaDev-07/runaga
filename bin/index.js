#!/usr/bin/env node

const fs = require('fs');
const cp = require('child_process');
const Log = require('../lib/log');
const package = require('../package.json');

const log = new Log(package.name);

const DIRECTORY = cp.execSync(`cd`, { encoding: 'utf8' }).trim();

const args = require('../lib/args')();

const CONFIGFILE = `${DIRECTORY}/${package.name}.json`;

let CONFIG = {};

if (fs.existsSync(CONFIGFILE))
  CONFIG = require(CONFIGFILE);
const DEFAULTS = {
  file: CONFIG.file || 'index.js',
  ignore: CONFIG.ignore || [],
  extensions: CONFIG.extensions || ['js', 'json'],
  exclude: CONFIG.exclude || ['node_modules'],
};

const config = {
  init: args.init,
  file: args.file || DEFAULTS.file,
  ignore: args.ignore || DEFAULTS.ignore,
  extensions: args.extensions || DEFAULTS.extensions,
  exclude: args.exclude || DEFAULTS.exclude,
};

const path = `${DIRECTORY}/${config.file}`;

const start = () => {
  let cmd;
  try {
    cmd = cp.spawn('node', [path], { stdio: 'inherit' });
    cmd.on('close', code => {
      if (code === 0) log.debug('clean exit');
      if (code === 1) log.error('app crashed');
    });
  } catch (error) {
    log.error('app crashed');
  }
  return cmd;
};

let command = null;

function watch(dir) {
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
        if (stats.isDirectory() && !config.exclude.includes(file)) {
          watch(path);
        }
      });
    });
  });
  fs.watch(dir, (event, filename) => {
    if (
      config.extensions.includes(filename.split('.').pop()) &&
      !config.ignore.includes(filename)
    ) {
      log.debug('restarting due to changes...');
      log.debug(`starting 'node ${config.file}'`);
      command.kill();
      command = start();
    }
  });
}
function run() {
  if(config.init){
    if(fs.existsSync(CONFIGFILE))return;
    fs.writeFileSync(CONFIGFILE, JSON.stringify(DEFAULTS, null, 2));
    log.debug(`created ${CONFIGFILE.split('/').pop()}`);
    return;
  }
  command = start();
  log.info(package.version);
  log.info(`watching path(s) "${DIRECTORY}"`);
  log.info(`watching extensions ${config.extensions}`);
  setTimeout(()=>watch(DIRECTORY), 10_000)
}

run();
