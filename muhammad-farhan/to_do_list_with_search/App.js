import React, { useState } from 'react';

const App = () => {
  const [showMerkSepatu, setShowMerkSepatu] = useState(true);
  const [namaBrand, setNamaBrand] = useState("");
  const [harga, setHarga] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showError, setShowError] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [brands, setBrands] = useState([
    { name: 'Nike', harga: 'Rp 1.000.000', id: crypto.randomUUID(), completed: false },
    { name: 'Adidas', harga: 'Rp 900.000', id: crypto.randomUUID(), completed: false },
    { name: 'Puma', harga: 'Rp 800.000', id: crypto.randomUUID(), completed: false },
    { name: 'Reebok', harga: 'Rp 700.000', id: crypto.randomUUID(), completed: false },
    { name: 'New Balance', harga: 'Rp 600.000', id: crypto.randomUUID(), completed: false },
  ]);
  const [editBrandId, setEditBrandId] = useState(null);

  const toggleMerkSepatu = () => {
    setShowMerkSepatu(!showMerkSepatu);
  };

  const handleChange = (event) => {
    setNamaBrand(event.target.value);
  };

  const handleHargaChange = (event) => {
    setHarga(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    if (namaBrand !== '') {
      if (editBrandId) {
        updateBrand(editBrandId);
      } else {
        addBrand();
      }
    } else {
      setShowError(true);
    }
  };

  const renderAlert = () => (
    <div style={styles.alert}>
      Nama merek tidak boleh kosong
    </div>
  );

  const renderForm = () => (
    <form style={styles.form} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <h2>Formulir Merek Sepatu</h2>
      <input
        style={styles.input}
        value={namaBrand}
        onChange={handleChange}
        placeholder="Masukkan nama merek..."
      />
      <input
        style={styles.input}
        value={harga}
        onChange={handleHargaChange}
        placeholder="Masukkan harga..."
      />
      {showError ? renderAlert() : null}
      <div style={styles.submitButton} onClick={handleSubmit}>
        {editBrandId ? 'Update' : 'Submit'}
      </div>
    </form>
  );

  const addBrand = () => {
    const newBrand = {
      name: namaBrand,
      harga: harga,
      id: crypto.randomUUID(),
      completed: false
    };
    setBrands([...brands, newBrand]);
    setNamaBrand("");
    setHarga("");
    setShowForm(true);
    setShowError(false);
  };

  const updateBrand = (id) => {
    const updatedBrands = brands.map(brand =>
      brand.id === id ? { ...brand, name: namaBrand, harga: harga } : brand
    );
    setBrands(updatedBrands);
    setNamaBrand("");
    setHarga("");
    setShowForm(true);
    setEditBrandId(null);
    setShowError(false);
  };

  const deleteBrand = (id) => {
    const filteredBrands = brands.filter(brand => brand.id !== id);
    setBrands(filteredBrands);
  };

  const handleEdit = (brand) => {
    setNamaBrand(brand.name);
    setHarga(brand.harga);
    setShowForm(true);
    setEditBrandId(brand.id);
  };

  const toggleComplete = (id) => {
    const updatedBrands = brands.map(brand =>
      brand.id === id ? { ...brand, completed: !brand.completed } : brand
    );
    setBrands(updatedBrands);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.appContainer}>
      <div style={styles.appSubtitute}>
        {showForm ? renderForm() : <p>Form sudah di-submit!</p>}
        <div style={styles.list}>
          <h1>List Merek Sepatu:</h1>
          <input
            style={styles.input}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari merek..."
          />
          {showMerkSepatu ?
            filteredBrands.map((item) => (
              <div key={item.id} style={styles.listItem}>
                <input 
                  type="checkbox" 
                  checked={item.completed}
                  onChange={() => toggleComplete(item.id)}
                  style={styles.checkbox}
                />
                <p style={{ ...styles.brandName, textDecoration: item.completed ? 'line-through' : 'none' }}>
                  {item.name} - {item.harga}
                </p>
                <div style={styles.buttonGroup}>
                  <button style={styles.editButton} onClick={() => handleEdit(item)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => deleteBrand(item.id)}>Delete</button>
                </div>
              </div>
            )) : null}
          <div style={styles.toggleButton} onClick={toggleMerkSepatu}>Show/Hide</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    border: '2px solid #6c63ff',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#e0e0e0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif'
  },
  appSubtitute: {
    marginTop: '20px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#6c63ff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px',
    display: 'inline-block',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px'
  },
  input: {
    width: '80%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginBottom: '10px'
  },
  alert: {
    color: 'red',
    marginTop: '10px',
  },
  list: {
    border: '2px solid #6c63ff',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandName: {
    flex: 1,
    margin: '0 10px',
  },
  checkbox: {
    marginRight: '10px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold'
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold'
  },
  toggleButton: {
    padding: '10px 20px',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '20px',
    fontWeight: 'bold'
  }
};

export default App;
