import React, {useState, useEffect} from "react";       //useEffect -> efeito colateral para uma mudança de estado de algum objeto
import './TodoList.css';
import Icone from './assets/lista-tarefas.jpeg';

function TodoList() {

    const listaStorage = localStorage.getItem('Lista');

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);   //verificando se há uma lista salva
    const [novoItem, setNovoItem] = useState("");   //setNovoItem -> armazena o que o ususário está digitando

    useEffect(()=>{                                             //'=>' Arrow function
        localStorage.setItem('Lista', JSON.stringify(lista))    //efeito com a mudança da lista
    }, [lista])                                                 //esta é a lista monitorada

    function adicionaItem(form) {                   //form-> é o formulário que dispara a função para recuperar os dados
        form.preventDefault();                      //Desabilita a função default de atualizar a página e zerar o formulário
        if (!novoItem) {                            //"!" -> se o "novoitem" estiver vazio
            return;                                 //nada acontecerá, caso a condição seja verdadeira
        }
        setLista([...lista, {text: novoItem, isCompleted: false}])  //"...lista" -> lista na condição em que se encontra / "isCompleted" -> se a tarefa está riscada ou realizada / text: novoItem -> adiciona novo item
        setNovoItem("");                                            //setNovoItem fica vazio
        document.getElementById('input-entrada').focus();           //foca no input  
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta (index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);                          //splice -> remove o item da lista / 1 -> um item da lista
        setLista(listaAux);                                 //insere listaAux na lista definitiva                  
    }

    function deletaTudo(index){
        setLista([]);
    }

    return(
    <div>
        <h1>Lista de Tarefas</h1>
        <form onSubmit={adicionaItem}>                             
            <input
                id="input-entrada"
                type="text"
                value={novoItem}
                onChange={(e) => {setNovoItem(e.target.value)}} //quando alterado o campo input, o valor (e) alimentará o setNovoItem
                placeholder="Adicione uma tarefa"
            />
            <button className= "add" type="submit">Add</button>
        </form>
        <div className="ListaTarefas">
            <div style={{ textAlign: 'center' }}>
                {
                    lista.length < 1                                 //se a lista estiver vazia
                    ?                                                   //então 
                    <img className="icone-central" src={Icone}/>                          
                    :                                               //senão
                    lista.map((item, index) => (
                        <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                            <span onClick={()=>{clicou(index)}}>{item.text}</span>
                            <button onClick={()=>{deleta(index)}} className="del">Deletar</button>
                        </div>
                    ))
                }
                {
                    lista.length > 0 &&                                 //'&&' -> então
                    <button onClick={()=>{deletaTudo()}} className="deleteAll">Deletar todas</button>
                }              
            
            </div>
        </div>
    </div>
    )

}

export default TodoList