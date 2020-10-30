import React, { Component } from 'react';

// Baseado em https://www.w3schools.com/react/react_forms.asp
class MyForm extends Component {

    // Construtor da classe
    constructor(props) {
      super(props);
      this.state = {
        nome: '',
        idade: null,
        errormessage: '', // Mensagem de erro
        errStatus: false, // Verificar se ha erro no formulario
      };
    }

    // Mudar estado e verificar se a idade eh um numero ou maior do que 18
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      let err = '';
      if (nam === "idade") {
        if (val !== "" && !Number(val)) { // Verificar se a idade eh um numero
          err = <strong>A idade deve ser um número.</strong>;
          this.setState({errStatus: true});
        }
        else {
            if(val !== "" && val <= 18) { // Verificar se a idade eh maior do que 18
                err = <strong>A idade deve ser maior do que 18.</strong>;
                this.setState({errStatus: true});
            }
            else {
                this.setState({errStatus: false});
            }
        }
      }
      this.setState({errormessage: err});
      this.setState({[nam]: val});
    }

    // Enviar conteudo de nome e idade do formulario para o backend
    mySubmitHandler = async e => {
        e.preventDefault();
        // Enviar para o backend somente se nao houver erros no formulario
        if(!this.state.errStatus)
        {
            try {
            const body = 
            {
                nome: this.state.nome,
                idade: this.state.idade,
            }

            await fetch("http://localhost:4000/form_post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            
            window.location = "/";
            } catch (err) {
            console.error(err.message);
            }
        }
      };

    render() {
      return (
        <form onSubmit={this.mySubmitHandler} >
        <p>Nome:</p>
        <input
          type='text'
          name='nome'
          onChange={this.myChangeHandler}
        />
        <p>Idade:</p>
        <input
          type='text'
          name='idade'
          onChange={this.myChangeHandler}
        />
        <p>
        {this.state.errormessage}
        </p>
        <input type='submit' value='Submeter'/>
        </form>
      );
    }
  }
  
export default MyForm;