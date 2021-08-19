Feature: Grades
    As a Teacher
    I want to Add, Update and Delete student grades
    So that I can manage my students performance

Scenario: Registering grades
    Given I am logged in as "Professor"
    Given I am at the grades page
    Given I cannot see the cpf "700" in the student list
    When I add the cpf "700" to the student list 
    When I register the grade "10" in the "Escrever Requisitos" goal for the cpf "700"
    When I register the grade "9" in the "Executar Testes" goal for the cpf "700"
    When I register the grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"
    Then I can see the cpf "700" in the student list
    Then I can see the grade "10" in the "Escrever Requisitos" goal for the cpf "700"
    Then I can see the grade "9" in the "Executar Testes" goal for the cpf "700"
    Then I can see the grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"
    Then I can see the average "9.5" for the cpf "700"

Scenario: Updating grades
    Given I am logged in as "Professor"
    Given I am at the grades page
    Given there is a cpf "700" in the student list
    Given there is a grade "10" in the "Escrever Requisitos" goal for the cpf "700"
    Given there is a grade "9" in the "Executar Testes" goal for the cpf "700"
    Given there is a grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"
    When I update the grade in the "Escrever Requisitos" goal of cpf "700" to "8.8"
    Then I can see the cpf "700" in the student list
    Then I can see the grade "8.8" in the "Escrever Requisitos" goal for the cpf "700"
    Then I can see the grade "9" in the "Executar Testes" goal for the cpf "700"
    Then I can see the grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"
    Then I can see the average "9.1" for the cpf "700"

Scenario: Deleting grades
    Given I am logged in as "Professor"
    Given I am at the grades page
    Given there is a cpf "700" in the student list
    Given there is a grade "10" in the "Escrever Requisitos" goal for the cpf "700"
    Given there is a grade "9" in the "Executar Testes" goal for the cpf "700"
    Given there is a grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"
    When I delete the grade in the "Escrever Requisitos" goal of cpf "700"
    When I refresh the page
    Then I cannot see a grade in the "Escrever Requisitos" goal for the cpf "700"
    Then I can see the grade "9" in the "Executar Testes" goal for the cpf "700"
    Then I can see the grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"
    Then I can see the average "9.25" for the cpf "700"

Scenario: Not calculating average when all goals has non-numeric grades
    Given I am logged in as "Professor"
    Given I am at the grades page
    Given I cannot see the cpf "700" in the student list
    When I add the cpf "700" to the student list 
    When I register the grade "MANA" in the "Escrever Requisitos" goal for the cpf "700"
    When I register the grade "MPA" in the "Executar Testes" goal for the cpf "700"
    When I register the grade "MA" in the "Desenvolver Projeto" goal for the cpf "700"
    Then I can see the grade "MANA" in the "Escrever Requisitos" goal for the cpf "700"
    Then I can see the grade "MPA" in the "Executar Testes" goal for the cpf "700"
    Then I can see the grade "MA" in the "Desenvolver Projeto" goal for the cpf "700"
    Then I can see an error message in average field for the cpf "700"
