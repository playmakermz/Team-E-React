import React from 'react';
import './App.css';

class HewanItem extends React.Component {
  // props
  // hewan, handleHewanUpdate, handleHewanDelete
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: false,  // jika pada mode update (true) maka tampilkan <input /> dan pengguna bisa mengetikkan perubahan nama hewan
      isChanged: false,   // untuk tahu jika inputValue pernah diubah
      showError: false,   // jika pengguna menekan tombol update dengan nilai input kosong, maka error akan true
      inputValue: ''
    }
  }

  handleInputChange = (event) => {
    this.setState({isChanged: true, inputValue: event.target.value});
  }

  toggleUpdate = () => {
    // Jika tombol update ditekan dan teks pernah diubah
    if (this.state.isChanged && this.state.isUpdating) {
      if (this.state.inputValue === '') {  // jika input kosong
        this.setState({showError: true});
        return;
      } else {
        this.setState({showError: false});
      }
      
      this.props.handleHewanUpdate(this.props.hewan.id, this.state.inputValue);
    } 

    this.setState({isUpdating: !this.state.isUpdating});
  }

  render() {
    let hewanElement;
  
    if (this.state.isUpdating) {
      hewanElement = (
        <div className='simple-form'>  
          <input type="text" 
            onChange={(event) => this.handleInputChange(event)} 
            placeholder="Masukan nama hewan" 
            value={this.state.isChanged ? 
              this.state.inputValue : this.props.hewan.namaHewan} 
          />
        </div>
      )
    } else {
      hewanElement = (
        <p className="hewan-item">{this.props.hewan.namaHewan}</p>
      )
    }
  
    return (
      <div>
        {hewanElement}
        {this.state.showError ? <p class="error-message">Nama Hewan Tidak Boleh Kosong!</p> : ""}
        <button 
          onClick={() => this.toggleUpdate()}
          >Update</button>
        <button 
          onClick={() => {this.props.handleHewanDelete(this.props.hewan.id)}}
          >Delete</button>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialHewanList = [
      { id: crypto.randomUUID(), namaHewan: 'Kuda'},
      { id: crypto.randomUUID(), namaHewan: 'Gajah'},
    ];

    this.state = {
      hewanList: initialHewanList,
      filteredHewanList: initialHewanList,
      inputValue: '',   // value pada input utk menambahkan hewan
      filterValue: '',  // value pada input utk filter hewan
      showError: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.inputValue === "") {  // input tidak boleh kosong
      this.setState({showError: true});
    } else {
      let hewanItem = {
        id: crypto.randomUUID(),
        namaHewan: this.state.inputValue
      }

      const newHewanList = [...this.state.hewanList];
      newHewanList.push(hewanItem);

      this.setState({
        hewanList: newHewanList,
        showError: false,
        inputValue: ''
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }

  handleFilterChange = (event) => {
    this.setState({filterValue: event.target.value});
    this.handleSearch(event.target.value);
  }

  handleHewanUpdate = (hewanId, namaHewan) => {
    let newHewanList = this.state.hewanList.map((hewanItem) => {
      if (hewanId === hewanItem.id) {
        hewanItem.namaHewan = namaHewan;
      }

      return hewanItem;
    });

    this.setState({hewanList: newHewanList})
  }

  handleHewanDelete = (hewanId) => {
    let newHewanList = this.state.hewanList.filter((hewanItem) => {
      return hewanItem.id !== hewanId;
    })

    this.setState({hewanList: newHewanList});
  }

  handleSearch = (namaHewan) => {
    let newFilteredHewanList;
    
    if (namaHewan === '') {
      newFilteredHewanList = [...this.state.hewanList];
    } else {
      newFilteredHewanList = this.state.hewanList.filter((hewanItem) => {
        return hewanItem.namaHewan.toLowerCase()
          .includes(namaHewan.toLowerCase());
      })
    }

    this.setState({filteredHewanList: newFilteredHewanList});
  }

  clearFilter = () => {
    this.handleSearch('');
    this.setState({filterValue: ''});
  }

  componentDidUpdate(prevProps, prevState) {
    // Update filteredHewanList setiap hewanList berubah
    if (!Object.is(this.state.hewanList, prevState.hewanList)) {
      this.handleSearch(this.state.filterValue);
    }
  }

  render() {
    return (
      <div className='body'>
        <div className='main'>
  
          <div className='container header'>
            <h1>Todo App <br />(Class Component)</h1>
          </div>
  
          <div className="container">
            <form onSubmit={(event) => this.handleSubmit(event)} className="simple-form">
              <label for="input-field">Nama Hewan:</label>
              <input type="text" onChange={(event) => this.handleInputChange(event)} value={this.state.inputValue} id="input-field" name="input-field" placeholder="Masukan nama hewan" />
              {this.state.showError ? <p class="error-message">Nama Hewan Tidak Boleh Kosong!</p> : ""}
              <button className="submit">Submit</button>
            </form>
            {this.state.filteredHewanList.length > 0 ? (
              <div className="hewan-list">
                {this.state.filteredHewanList.map((hewanItem) => {
                  return (
                    <HewanItem 
                    key={hewanItem.id} 
                    hewan={hewanItem} 
                    handleHewanUpdate={this.handleHewanUpdate}
                    handleHewanDelete={this.handleHewanDelete} />
                  )
                })}
              </div>
            ) : (
              <></>
            )}
            <div className='simple-form form-filter'>
              <label for="search-field">Filter Hewan:</label>
              <input type="text" onChange={(event) => this.handleFilterChange(event)} 
                value={this.state.filterValue} 
                id="search-field" placeholder="Masukan filter nama hewan" />
              <button className="submit" 
                onClick={() => this.clearFilter()}>Clear</button>
            </div>
          </div>
  
        </div>
      </div>
    )
  }

  
}

export default App;