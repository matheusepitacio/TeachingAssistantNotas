import { defineSupportCode } from 'cucumber';
import { browser, $, element, by, Key } from 'protractor';
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

async function deleteGrade(goal, cpf) {

    const currentGrade = await element(by.id(`${goal} ${cpf}`)).getAttribute('value')

    for (let i = 0; i < currentGrade.length; i++) {
        await element(by.id(`${goal} ${cpf}`)).sendKeys(Key.BACK_SPACE)
    }
}

async function assertGradeInGoal(grade, goal, cpf) {

    const currentGrade = await element(by.id(`${goal} ${cpf}`)).getAttribute('value')

    expect(currentGrade).to.equal(grade)

}

async function assertGradeNotInGoal(goal, cpf) {

    const items = await element.all(by.id(`meta ${goal}`))

    if (items.length == 1) {

        const currentGrade = await element(by.id(`${goal} ${cpf}`)).getAttribute('value')

        expect(currentGrade).to.equal("")
    }
}


async function addStudentToList(cpf) {
    await element(by.buttonText("Adicionar Aluno")).click()

    await $("input[name='adicionarAluno']").sendKeys(cpf)

    await element(by.buttonText("Adicionar Aluno")).click()

}



defineSupportCode(function ({ Given, When, Then, After }) {

    Given(/^I am logged in as "Professor"$/, async () => {
        await loginAsTeacher()

        await browser.sleep(2000) //esperando pois tem um bug que demora para navegar

    })

    Given(/^I am at the grades page$/, async () => {
        await assertCorrectUrl("http://localhost:4200/notas")
    })

    Given(/^I cannot see the cpf "([^\"]*)" in the student list$/, async (cpf) => {
        await assertCpfNotInStudentList(cpf);
    })

    Given(/^there is a cpf "([^\"]*)" in the student list$/, async (cpf) => {
        const items = await element.all(by.id(`cpf ${cpf}`))

        if (items.length == 0) {
            await addStudentToList(cpf)
        }
    })

    Given(/^there is a grade "([^\"]*)" in the "([^\"]*)" goal for the cpf "([^\"]*)"$/,
        async (grade, goal, cpf) => {
            await addGoalToGoalsList(goal)

            await addGradeToGoal(grade, goal, cpf)

        }
    )

    When(/^I add the cpf "([^\"]*)" to the student list$/, async (cpf) => {

        await addStudentToList(cpf)

    })

    When(/^I register the grade "([^\"]*)" in the "([^\"]*)" goal for the cpf "([^\"]*)"$/,
        async (grade, goal, cpf) => {

            await addGoalToGoalsList(goal)

            await addGradeToGoal(grade, goal, cpf)

        }
    )

    When(/^I update the grade in the "([^\"]*)" goal of cpf "([^\"]*)" to "([^\"]*)"$/,
        async (goal, cpf, grade) => {

            await deleteGrade(goal, cpf)

            await addGradeToGoal(grade, goal, cpf)
        }
    )

    When(/^I delete the grade in the "([^\"]*)" goal of cpf "([^\"]*)"$/,
        async (goal, cpf) => {

            await deleteGrade(goal, cpf)
        }
    )

    When(/^I refresh the page$/, async () => {
        await browser.refresh()

        await browser.sleep(3000)
    }

    )

    Then(/^I can see the cpf "([^\"]*)" in the student list$/, async (cpf) => {

        await assertCpfInStudentList(cpf);
    })

    Then(/^I can see the grade "([^\"]*)" in the "([^\"]*)" goal for the cpf "([^\"]*)"$/,
        async (grade, goal, cpf) => {

            await assertGradeInGoal(grade, goal, cpf)
        }
    )

    Then(/^I cannot see a grade in the "([^\"]*)" goal for the cpf "([^\"]*)"$/,
        async (goal, cpf) => {

            await assertGradeNotInGoal(goal, cpf)
        }
    )

    Then(/^I can see the average "([^\"]*)" for the cpf "([^\"]*)"$/, async(average,cpf) => {
        const currentAverage = await element(by.id(`media ${cpf}`)).getText()

        expect(currentAverage).to.equal(average)
    })

    Then(/^I can see an error message in average field for the cpf "([^\"]*)"$/, async(cpf) => {
        const message = await element(by.id(`media ${cpf}`)).getText()

        expect(message).to.equal('Nenhum número nas metas, impossível calcular')
    })

    After(async () => {

        if (await element(by.id(`remover 700`)).isPresent()) {
            await element(by.id(`remover 700`)).click()
        }
    })

})
