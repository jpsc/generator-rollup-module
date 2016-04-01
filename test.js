import path from 'path';
import test from 'ava';
import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import pify from 'pify';

let generator;

test.beforeEach(async () => {
	await pify(helpers.testDirectory)(path.join(__dirname, 'temp'));
	generator = helpers.createGenerator('rollup-module:app', ['../app'], null, {skipInstall: true});
});

test.serial('generates expected files', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		githubUsername: 'test',
		website: 'test.com'
	});

	await pify(generator.run.bind(generator))();

	assert.file([
		'.editorconfig',
		'.git',
		'.gitattributes',
		'.gitignore',
		'.travis.yml',
		'lib/index.js',
		'lib/utils.js',
		'license',
		'package.json',
		'readme.md',
		'test.js'
	]);
});

test.serial('nyc option', async () => {
	helpers.mockPrompt(generator, {
		moduleName: 'test',
		githubUsername: 'test',
		website: 'test.com',
		nyc: true
	});

	await pify(generator.run.bind(generator))();

	assert.fileContent('.gitignore', /\.nyc_output/);
	assert.fileContent('.gitignore', /coverage/);
	assert.fileContent('package.json', /"nyc":/);
	assert.fileContent('package.json', /nyc ava/);
});
