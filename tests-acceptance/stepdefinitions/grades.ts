import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

async function assertCorrectUrl(url) {
    const currentUrl = await browser.getCurrentUrl();

    expect(currentUrl).to.equal(url)
}

async function loginAsTeacher() {
    await browser.get("http://localhost:4200/login")

    await $("input[name='cpf']").sendKeys("888.888.888-88")
    await $("input[name='password']").sendKeys("professorteste")

    await element(by.buttonText("Login")).click()
}

async function loginAsStudent(cpf, password) {

    await browser.get("http://localhost:4200/login")

    await $("input[name='cpf']").sendKeys(cpf)
    await $("input[name='password']").sendKeys(password)

    await element(by.buttonText("Login")).click()
}

async function assertCpfNotInStudentList(cpf) {

    const items = await element.all(by.id(`cpf ${cpf}`))

    expect(items.length).to.equal(0)
}

async function assertCpfInStudentList(cpf) {
    const items = await element.all(by.id(`cpf ${cpf}`))

    expect(items.length).to.equal(1)
}

async function addGoalToGoalsList(goal) {

    const items = await element.all(by.id(`meta ${goal}`))

    if (items.length == 0) {
        await element(by.buttonText("Adicionar Meta")).click()

        await $("input[name='adicionarMeta']").sendKeys(goal)

        await element(by.buttonText("Adicionar Meta")).click()
    }
}

async function addGradeToGoal(grade, goal, cpf) {

    await element(by.id(`${goal} ${cpf}`)).sendKeys(grade)
}

async function assertGradeInGoal(grade,goal,cpf) {

    const currentGrade = await element(by.id(`${goal} ${cpf}`)).getAttribute('value')

    expect(currentGrade).to.equal(grade)
    
}

defineSupportCode(function ({ Given, When, Then, After }) {

    Given(/^I am logged in as "Professor"$/, async () => {
        await loginAsTeacher()

        await browser.sleep(1000);
    })

    Given(/^I am at grades page$/, async () => {
        await assertCorrectUrl("http://localhost:4200/notas")
    })

    Given(/^I cannot see the cpf "([^\"]*)" in the student list$/, async (cpf) => {
        await assertCpfNotInStudentList(cpf);
    })

    When(/^I add the cpf "([^\"]*)" to the student list$/, async (cpf) => {

        await element(by.buttonText("Adicionar Aluno")).click()

        await browser.sleep(1000);

        await $("input[name='adicionarAluno']").sendKeys(<string>cpf)

        await element(by.buttonText("Adicionar Aluno")).click()

    })

    When(/^I register the grade "([^\"]*)" in the "([^\"]*)" goal for the cpf "([^\"]*)"$/,
        async (grade, goal, cpf) => {

            await addGoalToGoalsList(goal)

            await addGradeToGoal(grade, goal, cpf)

        }
    )

    Then(/I can see the cpf "([^\"]*)" in the student list$/, async (cpf) => {

        await assertCpfInStudentList(cpf);
    })

    Then(/I can see the grade "([^\"]*)" in the "([^\"]*)" goal for the cpf "([^\"]*)"$/,
        async(grade,goal,cpf) => {

            await assertGradeInGoal(grade,goal,cpf)
        }
    )

    After( async () => {
        await element(by.id(`remover 700`)).click()
    })
 
})
