import { Chapter5Page } from './app.po';

describe('chapter5 App', function() {
  let page: Chapter5Page;

  beforeEach(() => {
    page = new Chapter5Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
