Feature: Grades
    As a Teacher
    I want to Add, Update and Delete student grades
    So That I can manage my students performance

Scenario: Registering grades
    Given I am logged in as "Professor"
    And I am at grades page
    And I cannot see the cpf "700" in the student list
    When I add the cpf "700" to the student list 
    And I register the grade "10" in the "Escrever Requisitos" goal for the cpf "700"
    And I register the grade "9" in the "Executar Testes" goal for the cpf "700"
    And I register the grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"
    Then I can see the cpf "700" in the student list
    And I can see the grade "10" in the "Escrever Requisitos" goal for the cpf "700"
    And I can see the grade "9" in the "Executar Testes" goal for the cpf "700"
    And I can see the grade "9.5" in the "Desenvolver Projeto" goal for the cpf "700"



