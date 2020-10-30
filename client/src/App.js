import React, { Component } from 'react';
import './App.css';
import MyForm from "./Components/MyForm"
import Table from "./Components/Table"


class App extends Component {

  // Construtor da classe
  constructor(props) {
    super(props);
    this.state = {
      table: null, // Tabela contendo os dados em JSON
    };
  }

  // Fazer solicitacao AJAX para ter a tabela com os dados coletados, o que ocorre ao click do botao
  myClickHandler = async e => {
    const response = await fetch('http://localhost:4000/data');
    const form = await response.json();
    
    var tabl = (
      <Table data={form}/>
    );

    this.setState({table: tabl})
    
  }

  render(){
    return (
      <div style={{marginLeft: "10px"}}>
          <h1>CES-26 - 5ª Série de Exercícios</h1>
          <h2>Aluna: Raíssa Batista de Miranda Pimentel - Turma: COMP-21</h2>
          <MyForm />
          <br/>
          <button onClick={this.myClickHandler}>Exibir dados coletados</button>
          <br/>
          <br/>
          {this.state.table}
      </div>
    );
  }
  
}

export default App;
