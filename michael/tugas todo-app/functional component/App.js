import React, { useState, useEffect } from 'react';
import './App.css';

const HewanItem = ({ hewan, handleHewanUpdate, handleHewanDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false); // jika pada mode update (true) maka tampilkan <input /> dan pengguna bisa mengetikkan perubahan nama hewan
  const [isChanged, setIsChanged] = useState(false); // untuk tahu jika inputValue pernah diubah
  const [showError, setShowError] = useState(false); // jika pengguna menekan tombol update dengan nilai input kosong, maka error akan true
  const [inputValue, setInputValue] = useState(''); 

  const handleInputChange = (event) => {
    setIsChanged(true);
    setInputValue(event.target.value);
  }

  const toggleUpdate = () => {
    // Jika tombol update ditekan dan teks pernah diubah
    if (isChanged && isUpdating) {
      if (inputValue === '') {  // jika input kosong
        setShowError(true);
        return;
      } else {
        setShowError(false);
      }
      
      handleHewanUpdate(hewan.id, inputValue);
    } 

    setIsUpdating(!isUpdating);
  }

  let hewanElement;

  if (isUpdating) {
    hewanElement = (
      <div className='simple-form'>  
        <input type="text" 
          onChange={(event) => handleInputChange(event)} 
          placeholder="Masukan nama hewan" 
          value={isChanged ? inputValue : hewan.namaHewan} 
        />
      </div>
    )
  } else {
    hewanElement = (
      <p className="hewan-item">{hewan.namaHewan}</p>
    )
  }

  return (
    <div>
      {hewanElement}
      {showError ? <p class="error-message">Nama Hewan Tidak Boleh Kosong!</p> : ""}
      <button 
        onClick={() => toggleUpdate()}
        >Update</button>
      <button 
        onClick={() => {handleHewanDelete(hewan.id)}}
        >Delete</button>
    </div>
  )
  
}

const App = () => {
  const initialHewanList = [
    { id: crypto.randomUUID(), namaHewan: 'Kuda'},
    { id: crypto.randomUUID(), namaHewan: 'Gajah'},
  ];

  const [hewanList, setHewanList] = useState(initialHewanList);
  const [filteredHewanList, setFilteredHewanList] = useState(initialHewanList);
  const [inputValue, setInputValue] = useState(''); // value pada input utk menambahkan hewan
  const [filterValue, setFilterValue] = useState('');  // value pada input utk filter hewan
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue === "") {  // input tidak boleh kosong
      setShowError(true);
    } else {
      let hewanItem = {
        id: crypto.randomUUID(),
        namaHewan: inputValue
      }

      const newHewanList = [...hewanList];
      newHewanList.push(hewanItem);

      setHewanList(newHewanList);
      setShowError(false);
      setInputValue('');
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    handleSearch(event.target.value);
  }

  const handleHewanUpdate = (hewanId, namaHewan) => {
    let newHewanList = hewanList.map((hewanItem) => {
      if (hewanId === hewanItem.id) {
        hewanItem.namaHewan = namaHewan;
      }

      return hewanItem;
    })

    setHewanList(newHewanList);
  }

  const handleHewanDelete = (hewanId) => {
    let newHewanList = hewanList.filter((hewanItem) => {
      return hewanItem.id !== hewanId;
    })

    setHewanList(newHewanList);
  }

  const handleSearch = (namaHewan) => {
    let newFilteredHewanList;
    
    if (namaHewan === '') {
      newFilteredHewanList = [...hewanList];
    } else {
      newFilteredHewanList = hewanList.filter((hewanItem) => {
        return hewanItem.namaHewan.toLowerCase()
          .includes(namaHewan.toLowerCase());
      })
    }

    setFilteredHewanList(newFilteredHewanList);
  }

  const clearFilter = () => {
    handleSearch('');
    setFilterValue('');
  }

  // Update filteredHewanList setiap hewanList berubah
  useEffect(() => {
    handleSearch(filterValue);
  }, [hewanList])

  return (
    <div className='body'>
      <div className='main'>

        <div className='container header'>
          <h1>Todo App <br />(Functional Component)</h1>
        </div>

        <div className="container">
          <form onSubmit={(event) => handleSubmit(event)} className="simple-form">
            <label for="input-field">Nama Hewan:</label>
            <input type="text" onChange={(event) => handleInputChange(event)} value={inputValue} id="input-field" name="input-field" placeholder="Masukan nama hewan" />
            {showError ? <p class="error-message">Nama Hewan Tidak Boleh Kosong!</p> : ""}
            <button className="submit">Submit</button>
          </form>
          {filteredHewanList.length > 0 ? (
            <div className="hewan-list">
              {filteredHewanList.map((hewanItem) => {
                return (
                  <HewanItem 
                  key={hewanItem.id} 
                  hewan={hewanItem} 
                  handleHewanUpdate={handleHewanUpdate}
                  handleHewanDelete={handleHewanDelete} />
                )
              })}
            </div>
          ) : (
            <></>
          )}
          <div className='simple-form form-filter'>
            <label for="search-field">Filter Hewan:</label>
            <input type="text" onChange={(event) => handleFilterChange(event)} 
              value={filterValue} 
              id="search-field" placeholder="Masukan filter nama hewan" />
            <button className="submit" 
              onClick={() => clearFilter()}>Clear</button>
          </div>
        </div>

      </div>
    </div>
  )
  
}

export default App;