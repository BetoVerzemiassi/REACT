import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component{

    constructor() {
		super();
		//state = variável disponibilizada pelo React
		this.state = {lista : [],nome: '',email: '',senha: ''};
		this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    enviaForm(evento){
		evento.preventDefault();

		$.ajax({
			url: 'http://localhost:8080/api/autores',
			contentType: 'application/json',
			dataType: 'json',
			type: 'post',
			data: JSON.stringify({
				nome: this.state.nome,
				email: this.state.email,
				senha: this.state.senha
			}),
			success: function(novalistagem){
                PubSub.publish('atualiza-lista-autores',novalistagem);
                // this.setState({lista: resposta});//irá alterar o estado do componente FormularioAutor
                /*Dentro do setstate temos um JSON com a variável lista e a resposta que é a nova listagem*/
                // this.props.callbackAtualizaListagem(resposta);
			},//.bind(this),bind chamado para trabalhar com o this do react
			error: function(resposta){
				console.log("erro");
			}
		});
	}

	/*Pegando informações de dentro de inputs com React*/
	setNome(evento){
		this.setState({nome: evento.target.value});
	}

	setEmail(evento){
		this.setState({email: evento.target.value});
	}

	setSenha(evento){
		this.setState({senha: evento.target.value});
	}

    //Se temos um componente e queremos que ele retorne um HTML que será colocado na View, precisamos utilziar a função render()
    render(){
        return(
            <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">
            <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome"/>
            <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email"/>
            <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha"/>
            <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
            </div>
            </form>
            </div>
        );
    }
}

class TabelaAutores extends Component {

    render(){
        return(
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                        <th>Nome</th>
                        <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(autor){
                                return(
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class AutorBox extends Component {

    constructor() {
		super();
        this.state = {lista : []};
        // this.atualizaListagem = this.atualizaListagem.bind(this);//Informamos no contrutor que a função atualizaListagem usará o this do React
	}


	//chamada antes de invocar o render pela primeira vez
	componentWillMount(){
		$.ajax({
				url:'http://localhost:8080/api/autores',
				dataType: 'json',
				success:function(resposta){
					console.log(this);
					this.setState({lista:resposta});
				}.bind(this)
			}
        );
        
        PubSub.subscribe('atualiza-lista-autores', function (topico, novalistagem) {
            this.setState({
                lista: novaLista
            });
        }.bind(this));
    }

    /*
    Criamos a função atualizaListage, que receberá como argumento a novaLista.
    Dentro adicionaremos o setState() e passaremos o lista que deverá ser a
    novaLista.
    */
   
    // atualizaListagem(novaLista){
    //     this.setState({lista:novaLista});
    // }
    render(){
        return(
            <div>
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        )
    }
}

/*
lista={this.state.lista} = Declara que a tabela de autores depende da variável lista que está no state do AutorBox
props = Argumentos que passamos para dentro de um componente ficam disponíveis na variável props, possui um JSON criado dinamicamente.
*/
