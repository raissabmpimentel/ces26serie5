import React, { Component } from 'react';

// Baseado em https://medium.com/@subalerts/create-dynamic-table-from-json-in-react-js-1a4a7b1146ef
// this.props.data eh o vetor de dados coletados
export default class Table extends Component {
    
    // Construtor da classe
    constructor(props){
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    }
    
    // Selecionar primeiro elemento do vetor
    getKeys = function(){
    return Object.keys(this.props.data[0]);
    }
    
    // Obter headers da tabela
    getHeader = function(){
        var keys = this.getKeys();
        return keys.map((key, index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    // Criar uma linha para cada item de this.props.data
    getRowsData = function(){
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }
    
    render() {
    return (
        <div>
        <table>
        <thead>
        <tr>{this.getHeader()}</tr>
        </thead>
        <tbody>
        {this.getRowsData()}
        </tbody>
        </table>
        </div>
    );
    }
   }

   // Mapear todos os valores de uma linha (objeto <td>)
   const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        return <td key={props.data[key]}>{props.data[key]}</td>
    })
    }