import { ImageCheckboxPage } from './app.po';

describe('image-checkbox App', () => {
  let page: ImageCheckboxPage;

  beforeEach(() => {
    page = new ImageCheckboxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
