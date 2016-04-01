'use strict';
const normalizeUrl = require('normalize-url');
const humanizeUrl = require('humanize-url');
const yeoman = require('yeoman-generator');
const _s = require('underscore.string');

module.exports = yeoman.Base.extend({
	init() {
		const cb = this.async();
		const self = this;

		this.prompt([{
			name: 'moduleName',
			message: 'What do you want to name your module?',
			default: this.appname.replace(/\s/g, '-'),
			filter: x => _s.slugify(x)
		}, {
			name: 'githubUsername',
			message: 'What is your GitHub username?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a username'
		}, {
			name: 'website',
			message: 'What is the URL of your website?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a website URL',
			filter: x => normalizeUrl(x)
		}, {
			name: 'nyc',
			message: 'Do you need code coverage?',
			type: 'confirm',
			default: false
		}], props => {
			const tpl = {
				moduleName: props.moduleName,
				camelModuleName: _s.camelize(props.moduleName),
				githubUsername: props.githubUsername,
				name: self.user.git.name(),
				email: self.user.git.email(),
				website: props.website,
				humanizedWebsite: humanizeUrl(props.website),
				nyc: props.nyc
			};

			const mv = (from, to) => {
				self.fs.move(self.destinationPath(from), self.destinationPath(to));
			};

			self.fs.copyTpl([
				`${self.templatePath()}/**`
			], self.destinationPath(), tpl);

			mv('editorconfig', '.editorconfig');
			mv('gitattributes', '.gitattributes');
			mv('gitignore', '.gitignore');
			mv('travis.yml', '.travis.yml');
			mv('_package.json', 'package.json');

			cb();
		});
	},
	git() {
		this.spawnCommandSync('git', ['init']);
	},
	install() {
		this.installDependencies({bower: false});
	}
});
