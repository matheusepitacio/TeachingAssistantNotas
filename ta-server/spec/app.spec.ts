import request = require("request-promise");

var base_url = "http://localhost:3000/";

const enviarNotaDeAluno = async(cpf: string, meta: string,nota: any, token:string) => {

    var body:any = { meta, nota }

    var options: any = {
        method: 'POST', uri: (base_url + 'notas/'+ cpf), headers: {
            'Authorization': `Bearer ${token}`
        }, body, json: true
    };

    await request(options)
}

const PegarNotaDeAluno = async(cpf: any,token: any):Promise<any> => {
    
    var options: any = {
        method: 'GET', uri: (base_url + 'notas/'+ cpf), headers: {
            'Authorization': `Bearer ${token}`
        }, json: true
    };

    return await request(options)
}


describe("O servidor", () => {

    var token: any

    beforeEach(async () => { //logando como professor
        var body: any = { 'cpf': '888.888.888-88', 'password': 'professorteste' }

        var options: any = { method: 'POST', uri: (base_url + 'login'), body, json: true };

        var response = await request(options)

        token = response.token
    })

    it('está inicialmente com 1 aluno', async () => {

        var options: any = {
            method: 'GET', uri: (base_url + 'notas'), headers: {
                'Authorization': `Bearer ${token}`
            }, json: true
        };

        var response = await request(options)

        expect(response[0].cpf).toBe('600')
    })

    it('cadastra notas corretamente', async () => {

        await enviarNotaDeAluno('800', 'Fazer Testes Unitários', '10', token)

        const notas = await PegarNotaDeAluno('800',token)

        expect(notas[0].meta).toBe('Fazer Testes Unitários')

        expect(notas[0].nota).toEqual('10')

        //apagando a nota enviada
        await enviarNotaDeAluno('800', 'Fazer Testes Unitários', '', token)

    })

    it('atualiza as notas corretamente', async() => {
        await enviarNotaDeAluno('800', 'Fazer Testes Unitários', '10', token)

        await enviarNotaDeAluno('800', 'Fazer Testes Unitários', '9.5', token)

        const notas = await PegarNotaDeAluno('800',token)

        expect(notas[0].meta).toBe('Fazer Testes Unitários')

        expect(notas[0].nota).toEqual('9.5')

        await enviarNotaDeAluno('800', 'Fazer Testes Unitários', '', token)
    })

    it('nao permite que um aluno veja notas de outro aluno', async() => {
        try { //loga como aluno e tenta olhar nota de outro aluo
            var body: any = { 'cpf': '1', 'password': '1' }

        var options: any = { method: 'POST', uri: (base_url + 'login'), body, json: true };

        var response = await request(options)

        var token_aluno = response.token

        var response:any = await PegarNotaDeAluno('600',token_aluno)
        } catch(err) {
            expect(err.error).toBe('Não tente olhar as notas dos outros alunos')
            expect(err.statusCode).toBe(403)
        }
    })

    it ('deleta as metas corretamente', async() => {
        await enviarNotaDeAluno('800', 'Fazer Testes Unitários', '10', token)

        var body = { meta: 'Fazer Testes Unitários'}

        var options: any = { method: 'POST', uri: (base_url + 'meta'),body, headers: {
            'Authorization': `Bearer ${token}`
        }, json: true };

        await request(options)

        const notas = await PegarNotaDeAluno('800',token)

        expect(notas).toEqual([])
    })
})