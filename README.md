# Reallink Digital - Atividade de Estágio

Este repositório contém o projeto desenvolvido para o Programa de Estágio da Reallink Digital, onde foi criado um site sem o uso de React. O projeto está configurado para funcionar em um servidor local com o WAMP, usando o MySQL para gerenciar o banco de dados.

## Pré-requisitos

- [WAMP Server](https://www.wampserver.com/en/) (ou similar, como XAMPP)
- Conhecimento básico de PHP e MySQL
- Acesso ao phpMyAdmin para gerenciamento do banco de dados

## Configuração do Ambiente

1. **Instalar o WAMP Server**
   - Baixe e instale o WAMP Server.
   - Certifique-se de que o Apache e o MySQL estão rodando após a instalação.

2. **Configurar o Banco de Dados MySQL**
   - No phpMyAdmin, crie um novo banco de dados com o nome apropriado (por exemplo, `task_manager`).
   - Importar o arquivo SQL:
     - No phpMyAdmin, selecione o banco de dados que você criou.
     - Vá até a aba **Importar** e selecione o arquivo do banco de dados (`task_manager.sql`).
     - Clique em **Executar** para importar as tabelas e dados.

3. **Configurações de Conexão**
   - Verifique que os detalhes de conexão do banco de dados estejam configurados no arquivo de configuração PHP (por exemplo, `dbconnect.php`):
     ```php
     $servername = "localhost";
     $username = "root";
     $password = "";
     $dbname = "meu_banco_de_dados";
     ```
   - Certifique-se de que o servidor esteja configurado para `localhost`, o usuário como `root`, e sem senha (`""`).

## Executando o Projeto

1. Coloque os arquivos do projeto dentro da pasta `www` do WAMP (ou equivalente).
2. Abra o navegador e acesse `http://localhost/todolist` para visualizar o site.

## Observação
Este projeto foi desenvolvido sem o uso do React ou de frameworks de frontend modernos. Todas as funcionalidades são implementadas com PHP e MySQL no backend.

## Contato

Para dúvidas ou mais informações, entre em contato com o autor do projeto.
