import { useState } from 'react'

function App() {
  const [harga, setHarga] = useState('')
  const [namaBuah, setNamaBuah] = useState('')
  const [editBuahId, setEditBuahId] = useState(null)
  const [showError, setShowError] = useState(false)
  const [searchNama, setSearchNama] = useState('');
  const [buahForm, setBuahForm] = useState(true)
  const [buah, setBuah] = useState([
    {
      id: 1,
      nama: 'Jeruk',
      harga: 10000,
      selesai: false,
    },
    {
      id: 2,
      nama: 'Mangga',
      harga: 20000,
      selesai: false,
    },
    {
      id: 3,
      nama: 'Pisang',
      harga: 30000,
      selesai: false,
    }
  ])
  const handleSubmit = () => {
    if (namaBuah !== '') {
      if (editBuahId) {
        updateBuah(editBuahId);
      } else {
        addBuah();
      }
    } else {
      setShowError(true);
    }
  };

  const formBuah = () => (
    <form onSubmit={(e) =>{
      e.preventDefault()
    }}>
      <h2>Daftar Buah</h2>
      <input value={namaBuah} 
      placeholder='Masukkan Nama Buah' 
      onChange={e => setNamaBuah(e.target.value)} />
      <input value={harga} 
      placeholder='Masukkan Harga Buah' onChange={(e) => setHarga(e.target.value)} />
      {showError ? nullBuah() : null}
      <div> <button onClick={handleSubmit}>
        {editBuahId ? 'Update' : 'Submit'}</button>
      </div>

    </form>
  )

  const addBuah = () => {
    const newBuah = {
      id: buah.length + 1,
      nama: namaBuah,
      harga: harga,
      selesai: false,
    }
    setBuah([...buah, newBuah]),
    setHarga('')
    setNamaBuah('')
    setShowError(false);
  }

  const deleteBuah = (id) => {
    const newBuah = buah.filter((item) => item.id !== id)
    setBuah(newBuah)
  }
  const nullBuah = () => (
    <div style={styles.alert}>Nama buah kosong</div>
  );
  

  const updateBuah = (id) => {
    const newBuahs = buah.map((buah) => 
    buah.id === id ? {...buah, nama: namaBuah, harga: harga} : buah
    )
    setBuah(newBuahs)
    setEditBuahId(null)
    setNamaBuah('')
    setHarga('')
    setShowError(false);
  }

  const handleEdit = (buah) => {
    setEditBuahId(buah.id)
    setNamaBuah(buah.nama)
    setBuahForm(true)
    setHarga(buah.harga)
  }

  const searchBuah = buah.filter((buah) =>
    buah.nama.toLowerCase().includes(searchNama.toLowerCase())
  );
  const handleSearch = (event) => {
    setSearchNama(event.target.value.toLowerCase()); 
  };

  return(
    <div>
      <h1>Daftar Buah</h1>
      {buahForm ? formBuah() : <p>Sudah ditambahkan</p>}
      <div>
        {buah.map((item) => (
          <div key={item.id}>
            {item.nama} - {item.harga}
            <button onClick={() => deleteBuah(item.id)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
            {}
          </div>
        ))}
      </div>
      <input
        type="search"
        placeholder="Search for items"
        onChange={handleSearch}
      />
      <ul>
        {searchBuah.length > 0 ? (
          searchBuah.map((item) => (
            <li key={item.id}>
            {item.nama} - {item.harga}</li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
    
  )
}
const styles = {
  alert: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    marginBottom: '10px',
  },
};
export default App
