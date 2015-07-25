'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _blueTape = require('blue-tape');

var _blueTape2 = _interopRequireDefault(_blueTape);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

(0, _blueTape2['default'])('transpilation should be up to date', function callee$0$0(t) {
  var rootDir, sourceDir, distDir, sources, stats;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        rootDir = _path2['default'].join(__dirname, '../..');
        sourceDir = _path2['default'].join(rootDir, 'src');
        distDir = _path2['default'].join(rootDir, 'dist');
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap((0, _globPromise2['default'])(__dirname + '/../../src/**/*.js'));

      case 5:
        sources = context$1$0.sent;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_Promise.all(sources.map(function (source) {
          var dist = _path2['default'].join(distDir, source.substr(sourceDir.length + 1));
          return _Promise.all([source, dist, _fsPromise2['default'].stat(source), _fsPromise2['default'].stat(dist)]);
        })));

      case 8:
        stats = context$1$0.sent;

        stats.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 4);

          var source = _ref2[0];
          var dist = _ref2[1];
          var sourceStats = _ref2[2];
          var distStats = _ref2[3];

          t.ok(new Date(distStats.mtime) >= new Date(sourceStats.mtime), source.substr(sourceDir.length + 1) + ' should be transpiled and up to date');
        });

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
});
//# sourceMappingURL=transpilation.js.map