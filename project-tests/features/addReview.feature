Feature: New venue creation
  As an registered user
  I want to be able to add a new review

  Scenario:
    Given I am on login page
    Given I fill out input data:
      | Username | user2 |
      | Password | password2 |
    Given I press "Login user" button
    Given I press "The first venue" button
    Given I fill out input data:
      | Leave a comment | user2 was here |
    Given I select options:
      | "input[type="select" name="foodRating"]" | 4 |
      | "input[type="select" name="serviceRating"]" | 3 |
      | "input[type="select" name="interiorRating"]" | 5 |
    Given I press "Submit review" button
    Then I can see "Review has been added" text
