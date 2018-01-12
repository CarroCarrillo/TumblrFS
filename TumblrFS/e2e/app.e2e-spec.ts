import { TumblrFSPage } from './app.po';

describe('tumblr-fs App', () => {
  let page: TumblrFSPage;

  beforeEach(() => {
    page = new TumblrFSPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
