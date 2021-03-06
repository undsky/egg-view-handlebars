'use strict';

const mock = require('egg-mock');

describe('test/view-handlebars.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/view-handlebars-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, viewHandlebars')
      .expect(200);
  });
});
