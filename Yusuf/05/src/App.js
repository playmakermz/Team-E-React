import { useState } from 'react';
import Header from './header';


function App() {
  const [count, setCount] = useState(0); // Penghitung
  const [close, setClose] = useState(true); // Tutup penghitung jika count === 5
  const [formInput, setFormInput] = useState(''); // Input formulir
  const [formAlert, setFormAlert] = useState(false); // Tampilkan alert
  const [buah, setBuah] = useState([
    { nama: 'Anggur', harga: 10000, id: crypto.randomUUID(), fform: false },
    { nama: 'Melon', harga: 20000, id: crypto.randomUUID(), fform: false },
  ]);
  const [updateFormAll, setUpdateFormAll] = useState(false); // Alert untuk form spesifik

  // Handle Penghitung
  const handleCount = () => {
    if (count === 5) {
      alert('Selesai');
      setClose(false);
    } else {
      setCount(count + 1);
    }
  };

  // Penanganan Formulir
  const appForm = () => (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h2>Formulir Pesanan</h2>
      <textarea value={formInput} onChange={(event) => handleChange(event)} />
      {formAlert && handleAllert()}
      <input type="submit" value="Kirim" />
    </form>
  );

  const handleChange = (event) => {
    setFormInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formInput === "") {
      setFormAlert(true);
    } else {
      setFormAlert(false);
      setFormInput('');
      setBuah([...buah, { nama: formInput, harga: 0, id: crypto.randomUUID() }]);
    }
  };

  const handleAllert = () => (
    <div>
      <h4 style={{ color: 'red' }}>Form tidak boleh kosong!!</h4>
    </div>
  );

  const handleDelete = (item) => {
    const filteredBuah = buah.filter((buahItem) => buahItem.id !== item.id);
    setBuah(filteredBuah);
  };

  const updateForm = (item) => (
    <form>
      <h2>Formulir Pesanan</h2>
      <textarea onChange={(event) => handleChange(event)} />
      {updateFormAll && handleAllert()}
      <div className='appButton' onClick={() => handleUpdate(item)}>Submit</div>
    </form>
  );

  const handleUpdate = (item) => {
    if (!item.fform) {
      const updatedBuah = buah.map((buahItem) => {
        if (buahItem.id === item.id) {
          return { ...buahItem, fform: true };
        } else {
          return buahItem;
        }
      });
      setBuah(updatedBuah);
    } else {
      const updatedBuah = buah.map((buahItem) => {
        if (buahItem.id === item.id) {
          return { ...buahItem, nama: formInput, fform: false };
        } else {
          return buahItem;
        }
      });
      setBuah(updatedBuah);
    }
  };

  const appSearch = () => (
    <form>
      <h2>Cari Item</h2>
      <textarea onChange={(event) => handleChange(event)} />
      {updateFormAll && handleAllert()}
      <div className='appButton' onClick={handleSearch}>Cari</div>
    </form>
  );

  const handleSearch = () => {
    const filteredBuah = buah.filter((item) => item.nama === formInput);
    setBuah(filteredBuah);
  };

  return (
    <div className='appContainer'>
      <div className='appSubstitute'>
        <Header />
        <h2>Aplikasi Penghitung</h2>
        <h3>Count: {count}</h3>
        {close && <button onClick={handleCount}>+</button>}
        <br />
        {appForm()}
        <ul>
          {buah.map((buahItem) => (
            <div key={buahItem.id}>
              <p>{buahItem.nama} - {buahItem.harga}</p>
              <button onClick={() => handleDelete(buahItem)}>Hapus</button>
              <button onClick={() => handleUpdate(buahItem)}>Update</button>
              {buahItem.fform && updateForm(buahItem)}
            </div>
          ))}
        </ul>
        {appSearch()}
      </div>
    </div>
  );
}

export default App;
