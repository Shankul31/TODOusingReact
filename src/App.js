import React, { Component } from 'react';

const Title = ({todocount}) => {
  return(
    <div>
        <div>
          <h4>{todocount} remaining out of {todocount}</h4>
        </div>
      </div>  
  );
}


 class TodoItems extends Component{
  constructor(props, context){
    super(props, context);
    this.createTasks = this.createTasks.bind(this);
  }

  delete(key){
    this.props.delete(key);
  }
  

    createTasks(item){
      return <li onClick = { () => this.delete(item.key)}
                key={item.key}>{item.text}</li>
    } 

      render(){
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return(
          <ul className = "theList">
            {listItems}
          </ul> 
          
        );
}

};

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        items:[],
        isStrikethrough: false
    }
    this.additem= this.additem.bind(this);    
    this.deleteItem=this.deleteItem.bind(this);
  }
  
  additem(e){
    var itemArray = this.state.items;

    if(this._inputElement.value !== ""){
        itemArray.unshift({
            text: this._inputElement.value,
            key: Date.now()
        });

        this.setState ({
          itmes: itemArray
        });
          this._inputElement.value = "";
      }
          console.log(itemArray);
          e.preventDefault();
  }
  deleteItem(key){
      var filteredItems = this.state.items.filter(function (item){
          return(item.key !== key);
      });
      this.setState({
        items:filteredItems,
        isStrikethrough: !this.state.isStrikethrough
    });
  }



  render() {
    return (
      <div className= "todoListMain">
        <form onSubmit={this.additem}>    
          <input ref={(a) => this._inputElement = a}
            placeholder="Enter item">

          </input> 
          <button type="submit" onSubmit={this.additem}>
                Add
            </button>
        </form>
        <Title todocount = {this.state.items.length}/>
        <TodoItems entries ={this.state.items}
                   delete = {this.deleteItem}/>  

      </div>
    );
  }
}

export default App;
