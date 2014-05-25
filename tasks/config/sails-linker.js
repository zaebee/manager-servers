/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

	grunt.config.set('sails-linker', {
		devJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="/www%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
				'templates/**/*.html': require('../pipeline').jsFilesToInject,
				'templates/**/*.ejs': require('../pipeline').jsFilesToInject,
				'templates/**/*.pt': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="/www/%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
				'templates/**/*.html': require('../pipeline').jsFilesToInject,
				'templates/**/*.ejs': require('../pipeline').jsFilesToInject,
				'templates/**/*.pt': require('../pipeline').jsFilesToInject
			}
		},

		prodJs: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="/www%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.js'],
				'templates/**/*.html': ['.tmp/public/min/production.js'],
				'templates/**/*.ejs': ['.tmp/public/min/production.js'],
				'templates/**/*.pt': ['.tmp/public/min/production.js']
			}
		},

		prodJsRelative: {
			options: {
				startTag: '<!--SCRIPTS-->',
				endTag: '<!--SCRIPTS END-->',
				fileTmpl: '<script src="www/%s"></script>',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/**/*.html': ['.tmp/public/min/production.js'],
				'templates/**/*.html': ['.tmp/public/min/production.js'],
				'templates/**/*.ejs': ['.tmp/public/min/production.js'],
				'templates/**/*.pt': ['.tmp/public/min/production.js']
			}
		},

		devStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="/www%s">',
				appRoot: '.tmp/public'
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
				'templates/**/*.html': require('../pipeline').cssFilesToInject,
				'templates/**/*.ejs': require('../pipeline').cssFilesToInject,
				'templates/**/*.pt': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="/www/%s">',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
				'templates/**/*.html': require('../pipeline').cssFilesToInject,
				'templates/**/*.ejs': require('../pipeline').cssFilesToInject,
				'templates/**/*.pt': require('../pipeline').cssFilesToInject
			}
		},

		prodStyles: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="www%s">',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.css'],
				'templates/**/*.html': ['.tmp/public/min/production.css'],
				'templates/**/*.ejs': ['.tmp/public/min/production.css'],
				'templates/**/*.pt': ['.tmp/public/min/production.css']
			}
		},

		prodStylesRelative: {
			options: {
				startTag: '<!--STYLES-->',
				endTag: '<!--STYLES END-->',
				fileTmpl: '<link rel="stylesheet" href="www/%s">',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/min/production.css'],
				'templates/**/*.html': ['.tmp/public/min/production.css'],
				'templates/**/*.ejs': ['.tmp/public/min/production.css'],
				'templates/**/*.pt': ['.tmp/public/min/production.css']
			}
		},

		// Bring in JST template object
		devTpl: {
			options: {
				startTag: '<!--TEMPLATES-->',
				endTag: '<!--TEMPLATES END-->',
				fileTmpl: '<script type="text/javascript" src="/www%s"></script>',
				appRoot: '.tmp/public'
			},
			files: {
				'.tmp/public/index.html': ['.tmp/public/jst.js'],
				'templates/**/*.html': ['.tmp/public/jst.js'],
				'templates/**/*.ejs': ['.tmp/public/jst.js'],
				'templates/**/*.pt': ['.tmp/public/jst.js']
			}
		},

		devJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		devJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': require('../pipeline').jsFilesToInject
			}
		},

		prodJsJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.js']
			}
		},

		prodJsRelativeJade: {
			options: {
				startTag: '// SCRIPTS',
				endTag: '// SCRIPTS END',
				fileTmpl: 'script(src="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.js']
			}
		},

		devStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		devStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},

			files: {
				'views/**/*.jade': require('../pipeline').cssFilesToInject
			}
		},

		prodStylesJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.css']
			}
		},

		prodStylesRelativeJade: {
			options: {
				startTag: '// STYLES',
				endTag: '// STYLES END',
				fileTmpl: 'link(rel="stylesheet", href="%s")',
				appRoot: '.tmp/public',
				relative: true
			},
			files: {
				'views/**/*.jade': ['.tmp/public/min/production.css']
			}
		},

		// Bring in JST template object
		devTplJade: {
			options: {
				startTag: '// TEMPLATES',
				endTag: '// TEMPLATES END',
				fileTmpl: 'script(type="text/javascript", src="%s")',
				appRoot: '.tmp/public'
			},
			files: {
				'views/**/*.jade': ['.tmp/public/jst.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-sails-linker');
};
