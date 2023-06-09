// Generated by Selenium IDE
const {Builder, By, logging} = require('selenium-webdriver');
const logger = logging.getLogger('webdriver.http');
logger.setLevel(logging.Level.FINER);

describe('sampleTest with selenium-webdriver', function() {
  this.timeout(30000);

  this.settings.start_session = false;

  let driver;

  before(async () => {
    const builder = new Builder().forBrowser('firefox').usingServer(this.settings.webdriver.url);
    try {
      driver = await builder.build();
    } catch (err) {
      console.error('ERROR', err);
    }
  });

  after(async function() {
    await driver.quit();
  });

  test('navigate', async function(nightwatch) {
    await driver.get('http://localhost');
  });

  test('sampleTest', async function(nightwatch) {
    const element = await driver.findElement(By.css('#weblogin'));
    await expect(element).visible;
    await nightwatch.assert.visible(element);

    await element.click();
  });
});
