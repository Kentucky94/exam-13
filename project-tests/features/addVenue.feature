Feature: New venue creation
  As an registered user
  I want to be able to add a new venue

  Scenario:
    Given I am on login page
    Given I fill out input data:
      | Username | user2 |
      | Password | password2 |
    Given I press "Login user" button
    Given I press "Add new venue" button
    Given I fill out input data:
      | Venue title | My new cafe |
      | Venue description | My new venue |
    Given I attach file "./img/building.jpg"
    Given I press "input[type='checkbox']" button
    Given I press "Create" button
    Then I can see "Your venue has been posted" text
