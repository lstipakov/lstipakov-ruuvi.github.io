var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var serve = require('metalsmith-serve');
var moveUp = require('metalsmith-move-up');
var less = require('metalsmith-less');
var ignore = require('metalsmith-ignore');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var cleanCSS = require('metalsmith-clean-css');
var define = require('metalsmith-define');
var compress = require('metalsmith-gzip');
var paths = require('metalsmith-paths');
var partials = require('metalsmith-register-partials');
var helpers = require('metalsmith-register-helpers');
var redirect = require('metalsmith-redirect');
var copy = require('metalsmith-copy');
var fork = require('./fork');
var inPlace = require('metalsmith-in-place');
var watch = require('metalsmith-watch');
var autotoc = require('metalsmith-autotoc');
var lunr = require('metalsmith-lunr');
var lunr_ = require('lunr');
var fileMetadata = require('metalsmith-filemetadata');
var msIf = require('metalsmith-if');
var precompile = require('./precompile');
var apidoc = require('./apidoc');
var git = require('git-rev');

var handlebars = require('handlebars');
var prettify = require('prettify');
prettify.register(handlebars);

//disable autolinking
function noop() {}
noop.exec = noop;
var marked = require('marked');
marked.InlineLexer.rules.gfm.url = noop;

var environment;

var gitBranch;

exports.metalsmith = function() {
  var _removeEmptyTokens = function removeEmptyTokens(token) {
    if (token.length > 0) {return token};
  };
  var metalsmith = Metalsmith(__dirname)
    .concurrency(100)
    .source("../src")
    .destination("../build")
    .use(less({
      pattern: "**/less/style.less",
      useDynamicSourceMap: true
    }))
    .use(ignore([
      '**/less/*.less',
      'content/languages/**/*',
      'assets/images/**/*.ai',
      'content/reference/api_old.md'
    ]))
    .use(cleanCSS({
      files: '**/*.css'
    }))
    .use(msIf(
      (!process.env.TRAVIS_PULL_REQUEST || process.env.TRAVIS_PULL_REQUEST === 'false'),
      apidoc({
        src: '../api-node/',
        config: '../api-node/',
        destFile: 'content/reference/api.md',
        includeFilters: ['.*[vV]iews[^.]*\\.js$', 'lib/AccessTokenController.js']
      })
    ))
    .use(partials({
      directory: '../templates/partials'
    }))
    .use(fileMetadata([
      {pattern: "content/**/*.md", metadata: {"lunr": true, "assets": '/assets', "branch": gitBranch}}
    ]))
    .use(msIf(
      environment === 'development',
      fileMetadata([
        {pattern: "content/**/*.md", metadata: {"development": true}}
      ])
    ))
    .use(precompile({
      directory: '../templates/precompile',
      dest: 'assets/js/precompiled.js',
      knownHelpers: {
        'each': true,
        'if': true
      }
    }))
    .use(moveUp(['content/**/*']))
    .use(paths())
    .use(helpers({
      directory: '../templates/helpers'
    }))
    .use(collections({
      guide: {
        pattern: 'guide/:section/*.md',
        sortBy: 'order',
        orderDynamicCollections: [
          'getting-started',
          'tools-and-features',
          'how-to-build-a-product'
        ]
      },
      reference: {
        pattern: 'reference/*md',
        sortBy: 'order'
      },
      spec: {
        pattern: 'specs/*.md',
        sortBy: 'order'
      },
      support: {
        pattern: 'support/*.md',
        sortBy: 'order'
      }
    }))
    .use(fork({
      key: 'devices',
      redirectTemplate: './templates/redirector.jade'
    }))
    .use(inPlace({
      engine: 'jade',
      pattern: '**/*.jade'
    }))
    .use(copy({
      pattern: '**/*.jade',
      extension: '.html',
      move: true
    }))
    .use(inPlace({
      engine: 'handlebars',
      pattern: '**/*.md'
    }))
    .use(markdown())
    .use(autotoc({
      selector: 'h2, h3',
      pattern: '**/**/*.md'
    }))
    .use(lunr({
      indexPath: 'search-index.json',
      fields: {
        contents: 1,
        title: 10
      },
      pipelineFunctions: [
        _removeEmptyTokens
      ]
    }))
    .use(templates({
      engine: 'handlebars',
      directory: '../templates'
    }))
    .use(permalinks({
      relative: false
    }))
    .use(redirect({
      '/start': '/guide/getting-started/intro',
      '/guide': '/guide/getting-started/intro',
      '/guide/ruuvitag/': '/guide/ruuvitag/start',
      '/guide/ruuvitracker/': '/guide/ruuvitracker/start',
      '/specs': '/specs/ruuvitag-b2',
      '/guide/getting-started': '/guide/getting-started/intro',
      '/guide/how-to-build-a-product': '/guide/how-to-build-a-product/intro/',
      '/guide/tools-and-features': '/guide/tools-and-features/intro',
      '/support': '/support/troubleshooting-support',
      "/ruuvitag" : "/",
      "/ruuvitag/start" : "/guide/getting-started/start",
      "/ruuvitag/connect" : "/guide/getting-started/connect",
      "/ruuvitag/modes" : "/guide/getting-started/modes",
      "/ruuvitag/tinker" : "/guide/getting-started/tinker",
      "/ruuvitag/examples" : "/guide/getting-started/examples",
      "/ruuvitag/dev" : "/guide/tools-and-features/dev",
      "/ruuvitag/dashboard" : "/guide/tools-and-features/dashboard",
      "/ruuvitag/firmware" : "/reference/firmware",
      "/ruuvitag/api" : "/reference/api",
      "/ruuvitag/javascript" : "/reference/javascript",
      "/ruuvitag/ios" : "/reference/ios",
      "/ruuvitag/cli" : "/reference/cli",
      "/ruuvitracker" : "/guide/getting-started/intro/ruuvitracker",
      "/ruuvitracker/start" : "/guide/getting-started/start/ruuvitracker",
      "/ruuvitracker/connect" : "/guide/getting-started/connect/ruuvitracker",
      "/ruuvitracker/modes" : "/guide/getting-started/modes/ruuvitracker",
      "/ruuvitracker/tinker" : "/guide/getting-started/tinker/ruuvitracker",
      "/ruuvitracker/examples" : "/guide/getting-started/examples/ruuvitracker",
      "/ruuvitracker/dev" : "/guide/tools-and-features/dev/ruuvitracker",
      "/ruuvitracker/dashboard" : "/guide/tools-and-features/dashboard/ruuvitracker",
      "/ruuvitracker/ifttt" : "/guide/tools-and-features/ifttt/ruuvitracker",
      "/ruuvitracker/webhooks" : "/guide/tools-and-features/webhooks/ruuvitracker",
      "/ruuvitracker/hackathon" : "/guide/getting-started/hackathon/ruuvitracker",
      "/start" : "/guide/getting-started/start",
      "/connect" : "/guide/getting-started/connect",
      "/modes" : "/guide/getting-started/modes",
      "/tinker" : "/guide/getting-started/tinker",
      "/build" : "/guide/getting-started/build",
      "/examples" : "/guide/getting-started/examples",
      "/dev" : "/guide/tools-and-features/dev",
      "/dashboard" : "/guide/tools-and-features/dashboard",
      "/cli" : "/guide/tools-and-features/cli",
      "/monitor" : "/guide/tools-and-features/monitor",
      "/ifttt" : "/guide/tools-and-features/ifttt",
      "/firmware" : "/reference/firmware",
      "/webhooks" : "/guide/tools-and-features/webhooks",
      "/hackathon" : "/guide/getting-started/hackathon",
    }));

  return metalsmith;
};


exports.build = function(callback) {
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith().build(function(err, files) {
      if (err) { throw err; }
      if (callback) {
        callback(err, files);
      }
    });
  });
};

exports.server = function(callback) {
  environment = 'development';
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith().use(serve())
      .use(watch({
        paths: {
          "${source}/content/**/*.md": true,
          "${source}/assets/less/*.less": "assets/less/*.less",
          "../templates/reference.hbs": "content/reference/*.md",
          "../templates/guide.hbs": "content/guide/**/*.md",
          "../templates/spec.hbs": "content/specs/*.md",
          "../templates/support.hbs": "content/support/*.md",
          "${source}/assets/js/*.js" : true
        },
        livereload: true
      }))
      .build(function(err, files) {
        if (err) {
          console.error(err, err.stack);
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
};
