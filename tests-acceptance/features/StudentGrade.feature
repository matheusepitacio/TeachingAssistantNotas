Feature: Student Grades
    As a student
    I want to see my grades
    So that I can verify my performance

Scenario: Show student grades
    Given I am logged in as student with cpf "600"
    When I try to see the grades of the student with cpf "600"
    Then I can see the grade "9.3" in the "Escrever Requisitos" goal
    Then I can see the grade "8.4" in the "Executar Testes" goal
    Then I can see the grade "7.6" in the "Desenvolver Projeto" goal
    Then I can see the average "8.43"

Scenario: Trying to see another student grades
    Given I am logged in as student with cpf "600"
    When I try to see the grades of the student with cpf "700"
    Then I receive a message forbidding me to see other students' grades
