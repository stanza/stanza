// This script builds a production output of all of our bundles.

import webpack from 'webpack';
import appRootDir from 'app-root-dir';
import { resolve as pathResolve } from 'path';
import rimraf from 'rimraf';
import webpackConfigFactory from '../../webpack/configFactory';
import { exec } from '../../utils';
import config from '../../config';

process.env.NODE_ENV = 'production';

// First clear the build output dir.
rimraf.sync(pathResolve(appRootDir.get(), config.buildOutputPath));

// Get our "fixed" bundle names
Object.keys(config.bundles)
  // And the "additional" bundle names
  .concat(Object.keys(config.additionalNodeBundles))
  // And then build them all.
  .forEach((bundleName) => {
    const compiler = webpack(
      webpackConfigFactory({ target: bundleName, mode: 'production' }),
    );
    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stats.toString({ colors: true }));
    });
  });
