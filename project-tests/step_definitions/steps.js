const { I } = inject();
// Add in your custom step files

Given('I am on login page', () => {
  I.wait(5)
  I.amOnPage('/login');
  I.wait(5);
});

Given('I attach file {string}', path => {
  I.attachFile('input[name=mainImage]', path)
});

Given('I select options:', table => {
  // From "features/basic.feature" {"line":7,"column":5}
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.selectOption(row[0], row[1]);
  });
});

Given('I fill out input data:', table => {
  // From "features/basic.feature" {"line":7,"column":5}
  const tableData = table.parse().rawData;

  tableData.forEach(row => {
    I.fillField(row[0], row[1])
  });
});

Given('I press {string} button', name => {
  // From "features/basic.feature" {"line":12,"column":5}
  I.click(name);
  I.wait(3);
});

Then('I can see {string} text', text => {
  // From "features/basic.feature" {"line":13,"column":5}
  I.waitForText(text);
});
