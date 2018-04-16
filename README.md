# REACT
Construindo aplicação com React - Estudo

# Aula 01 - Criando e Configurando o Projeto

# Instalação

* NodeJS
* Executar comando `npm install -g create-react-app@0.5.0` para instalar globalmente
* Dentro da pasta do projeto `projetos-javascript` executar no Windows `node node_modules/.bin/create-react-app cdc-admin`
* Se a instalação foi feita globalmente, execute assim: `create-react-app cdc-admin`
* Acesse a pasta do projeto que acabou de ser criado, o `cdc-admin`, e execute o comando npm start
* Abra seu navegador e acesse o endereço `http://localhost:3000`


# Download do jar para rodarmos a api localmente

* Seguindo o [link](http://bit.ly/jar-api-curso-react)

# Código da API que vai ser consumida pela aplicação

* O código de Back-End da API que vai ser consumida pela aplicação está disponível em [GitHub](https://github.com/alberto-alura/cdcadmin-api)


# Aula 02 - Definindo a estrutura do html do cadastro de autor

* Utilização do projeto [Pure CSS](https://purecss.io/start/)

* Layout com navegação no menu lateral esquerda, enquanto o cadastro estará no conteúdo central da página.

* Começamos a mexer com o React, herdamos de `Components`, pedimos para `ReactDOM` renderizar.

# Aula 03 - Consumindo a API e dando vida a nossa listagem

* O React fornece funções que serão chamadas em determinados ciclos de vida do componente. Uma delas é
`componentWillMount()` usada quando o componente acabou de ser montado. Ela será chamada logo após o
método `render()` ser invocado pela primeira vez.

* O `componentWillMount()` não executa nenhuma lógica, não faz nenhuma preparação de informações que ficarão
armazenadas no estado do componente que já poderá ser aproveitada para primeira invocação do `render()`.

* Conforme o projeto evoluir e ficar maior, pode ser necessário utilizar funções do ciclo de vida, como a
`shouldComponentUpdate`. Ela indica para o React se seu componente deve ser renderizado e por defaut retorna true.

# Aula 04: Cadastrando novos autores e atualização de componentes

# Aula 05: Isolando os componentes do Autor e melhorando a comunicação entre eles

* **lista={this.state.lista}** = Declara que a tabela de autores depende da variável lista que está no state do AutorBox
* **props** = Argumentos que passamos para dentro de um componente ficam disponíveis na variável props, possui um JSON criado dinamicamente.

* Criamos a função atualizaListage, que receberá como argumento a novaLista. Dentro adicionaremos o setState() e passaremos o lista que deverá ser a novaLista.

* **Higher-order Components** São os componentes responsáveis por encapsular um estado que será trabalhado por vários outros componentes e que comumente nomeamos
utilizando o sufixo `Box`.  Depois, criá-lo, podemos passá-lo como argumento.

## Por que usamos um High Order Component ?

* Usamos para manter o estado compartilhado entre dois ou mais componentes. Dessa forma você tem mais componentes focados em visualização do que com a lógica em si.
