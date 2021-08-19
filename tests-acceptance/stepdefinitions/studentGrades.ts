import { defineSupportCode } from 'cucumber';
import { browser, $, element, by, Key } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

async function loginAsStudent(cpf, password) {

    await browser.get("http://localhost:4200/login")

    await $("input[name='cpf']").sendKeys(cpf)
    await $("input[name='password']").sendKeys(password)

    await element(by.buttonText("Login")).click()
}

defineSupportCode(function ({ Given, When, Then, After }) {

    Given(/^I am logged in as student with cpf "([^\"]*)"$/, async(cpf)=> {

        await loginAsStudent(cpf,cpf);

    })

    When(/^I try to see the grades of the student with cpf "([^\"]*)"$/, async(cpf) => {

        await browser.get("http://localhost:4200/aluno/" + cpf)

    })

    Then(/^I can see the grade "([^\"]*)" in the "([^\"]*)" goal$/, async(grade,goal) => {
        
        const currentGrade = await element(by.id(<string>goal)).getText()

        expect(currentGrade).to.equal(grade)

    })

    Then(/^I receive a message forbidding me to see other students' grades$/, async() => {
        
        const message = await element(by.id('proibido')).getText()

        expect(message).to.equal('Não tente ver as notas de outros colegas')
    })

    Then(/^I can see the average "([^\"]*)"$/, async(average) => {

        const currentAverage = await element(by.id('media')).getText()

        expect(currentAverage).to.equal(average)
    })


})
