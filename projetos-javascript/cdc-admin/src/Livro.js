import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class TabelaLivros extends Component {

    render(){
        return(
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                        <th>Titulo</th>
                        <th>Preço</th>
                        <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function(livro){
                                return(
                                    <tr key={livro.id}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor}</td>
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

export default class LivroBox extends Component {

    constructor() {
		super();
        this.state = {lista : []};
	}

    componentWillMount(){
		$.ajax({
				url:'http://localhost:8080/api/livros',
				dataType: 'json',
				success:function(resposta){
					console.log(this);
					this.setState({lista:resposta});
				}.bind(this)
			}
        );

        PubSub.subscribe('atualiza-lista-livros', function (topico, novalistagem) {
            this.setState({
                lista: novaLista
            });
        }.bind(this));
    }

    render(){
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <TabelaLivros lista={this.state.lista}/>
                </div>
            </div>
        );
    }
}
