import { ContactListAppPage } from './app.po';

describe('contact-list-app App', function() {
  let page: ContactListAppPage;

  beforeEach(() => {
    page = new ContactListAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
