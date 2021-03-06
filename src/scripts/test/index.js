import jest from 'jest';
import createConfig from '../../jest/create-config';

export default (extraArgs, watch, noCoverage = false, inBand = false) => {
  process.env.NODE_ENV = 'test';

  const argv = [];

  // test
  if (watch) {
    argv.push('--watch');
    argv.push('--notify');
  } else {
    argv.push('--forceExit');
  }

  if (inBand) {
    argv.push('--runInBand');
  }

  extraArgs.forEach((e) => {
    argv.push(e);
  });

  // add config
  argv.push('--config', JSON.stringify(createConfig(noCoverage)));
  jest.run(argv);
};
