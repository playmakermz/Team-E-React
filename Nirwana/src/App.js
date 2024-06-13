import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {output:false};
  }

  handleClick(item){
    this.setState({output: !this.state.output});
  }

  render(){
    let listTugas = [
      {task : "Bikin todo-list"},
      {task : "Bikin weather-app"},
      {task : "Bikin movie-app"}
    ]
    return(
      <div>
        <Header />
        <h2>Tugas Hari Ini</h2>
        <div className='buttonTugas'>
          <button onClick={() => this.handleClick()}>Cek Tugas</button>
        </div>
        <div>
          {this.state.output? listTugas.map((item) => {
            return(
              <Content task={item.task}/>
            )
          }) : ""}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;

/*constructor(props){
  super(props);
  this.state = {name : "Lihat deskripsi"};
}


render() {
  let listBuah = [
    {name : "Apple", id : 1},
    {name : "Mango", id : 2},
    {name : "Avocado", id : 3},
    {name : "Watermelon", id : 4},
    {name : "Papaya", id : 5}
  ]
  return(
    <div>
      {listBuah.map((item) => {
        return (
          <p>{item.name}</p>
        )
      })}
    </div>
  )
}*/