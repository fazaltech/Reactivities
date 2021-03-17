import React, {Component}from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Header, Icon,List } from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

 

class App extends Component{
  state ={
    value: []

  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
     .then((response)=>{  
       console.log(response);
       this.setState({
      value:response.data
    })})
  
  }

  render(){

    return (
      <div>
      <Header as='h2'>
      <Icon name='users' />
      <Header.Content>Reactivities</Header.Content>
    </Header>
    <List>
    {this.state.value.map((value:any)=>(
               <List.Item key={value.id}>{value.name}</List.Item>
             ))}
  </List>
        
    
     </div>
    );
}
}

export default App;
