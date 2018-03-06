const {assert} = require('chai');
const request = require('supertest');
const {buildItemObject} = require('../test-utils');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Single item page', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  it('creates the item, it renders in the home page and is clickable', () => {
    const itemToCreate = buildItemObject();
    browser.url('/items/create');
    browser.setValue('#title-input', itemToCreate.title);
    browser.setValue('#description-input', itemToCreate.description);
    browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
    browser.click('#submit-button');
    assert.include(browser.getText('body'), itemToCreate.title);
    assert.include(browser.getAttribute('body img', 'src'), itemToCreate.imageUrl);

    browser.url('/');

    browser.click('.item-card a')
    assert.include(browser.getText('body'), itemToCreate.title);
  });
});
