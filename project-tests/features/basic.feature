Feature: Registration
  As an anonymous user
  I want to be able to register on the website

  Scenario:
    Given I am on register page
    Given I fill out input data:
    | Username | user6 |
    | Password | password6 |
    | Display Name | Ivan Ivanov |
    Given I press "Create new user" button
    Then I can see "Registration complete" text
