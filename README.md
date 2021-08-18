# TeachingAssistantNotas

Como conectar o banco de dados no windows:

 1. Faça o download do PostgreSQL: https://www.postgresql.org/download/
 2. Instale o PostgreSQL, no windows a instalação pedirá para você escolher uma senha, guarde essa senha
 3. Navegue o cmd para onde está instalado o PostgreSQL, normalmente é algo como **C:\Program Files\PostgreSQL\13\bin**
 4. No cmd digite: **psql -U postgres**
 5. Então o programa pedirá por uma senha, coloque a senha que você salvou ao instalar
 6. Digite o seguinte comando: **CREATE DATABASE teachingassistant;**
 7. Digite o seguinte comando: **\c teachingassistant;**
 8. As tabelas que são utilizadas no projeto vão ser criadas:
 9. Digite o seguinte comando: **CREATE TABLE usuarios(cpf varchar(50) PRIMARY KEY, nome varchar(50), email varchar(50), password varchar(50), cargo varchar(50));**
 10. Digite o seguinte comando: **CREATE TABLE notas (cpf_aluno varchar(50), cpf_professor varchar(50), meta varchar(50), nota varchar(50), PRIMARY KEY (cpf_aluno, meta));**
 
 Então, crie no diretório **ta-server** um arquivo com o nome de **secrets.json** com seguinte conteúdo:

{ "jwtSecretKey" : **[escolha alguma senha e coloque em formato de string]**, "user" : "postgres", "password": **[coloque a senha que você escolheu ao instalar o postgres em formato de string]** ,"database": "teachingassistant" }

O sistema provavelmente está pronto para uso.

No linux acredito que os passos de 5-10 são os mesmos
