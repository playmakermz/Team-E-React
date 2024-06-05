import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMerkSepatu: true,
      namaBrand: "",
      showError: false,
      showForm: true,
      brands: [
        { name: 'Nike', id: crypto.randomUUID(), completed: false },
        { name: 'Adidas', id: crypto.randomUUID(), completed: false },
        { name: 'Puma', id: crypto.randomUUID(), completed: false },
        { name: 'Reebok', id: crypto.randomUUID(), completed: false },
        { name: 'New Balance', id: crypto.randomUUID(), completed: false },
      ],
      editBrandId: null
    };
  }

  toggleMerkSepatu = () => {
    this.setState({ showMerkSepatu: !this.state.showMerkSepatu });
  };

  handleChange = (event) => {
    this.setState({ namaBrand: event.target.value });
  };

  handleSubmit = () => {
    if (this.state.namaBrand !== '') {
      if (this.state.editBrandId) {
        this.updateBrand(this.state.editBrandId);
      } else {
        this.addBrand();
      }
    } else {
      this.setState({ showError: true });
    }
  };

  renderAlert = () => (
    <div style={styles.alert}>
      Nama merek tidak boleh kosong
    </div>
  );

  renderForm = () => (
    <form style={styles.form} onSubmit={(e) => { e.preventDefault(); this.handleSubmit(); }}>
      <h2>Formulir Merek Sepatu</h2>
      <textarea
        style={styles.textarea}
        value={this.state.namaBrand}
        onChange={this.handleChange}
        placeholder="Masukkan nama merek..."
      />
      {this.state.showError ? this.renderAlert() : null}
      <div style={styles.submitButton} onClick={this.handleSubmit}>
        {this.state.editBrandId ? 'Update' : 'Submit'}
      </div>
    </form>
  );

  addBrand = () => {
    const newBrand = {
      name: this.state.namaBrand,
      id: crypto.randomUUID(),
      completed: false
    };
    this.setState((prevState) => ({
      brands: [...prevState.brands, newBrand],
      namaBrand: "",
      showForm: true,
      showError: false
    }));
  };

  updateBrand = (id) => {
    const updatedBrands = this.state.brands.map(brand =>
      brand.id === id ? { ...brand, name: this.state.namaBrand } : brand
    );
    this.setState({
      brands: updatedBrands,
      namaBrand: "",
      showForm: true,
      editBrandId: null,
      showError: false
    });
  };

  deleteBrand = (id) => {
    const filteredBrands = this.state.brands.filter(brand => brand.id !== id);
    this.setState({ brands: filteredBrands });
  };

  handleEdit = (brand) => {
    this.setState({
      namaBrand: brand.name,
      showForm: true,
      editBrandId: brand.id
    });
  };

  toggleComplete = (id) => {
    const updatedBrands = this.state.brands.map(brand =>
      brand.id === id ? { ...brand, completed: !brand.completed } : brand
    );
    this.setState({ brands: updatedBrands });
  };

  render() {
    return (
      <div style={styles.appContainer}>
        <div style={styles.appSubtitute}>
          {this.state.showForm ? this.renderForm() : <p>Form sudah di-submit!</p>}
          <div style={styles.list}>
            <h1>List Merek Sepatu:</h1>
            {this.state.showMerkSepatu ?
              this.state.brands.map((item) => (
                <div key={item.id} style={{ ...styles.listItem, backgroundColor: item.completed ? '#d3f9d8' : '#f9d8d8' }}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => this.toggleComplete(item.id)}
                    style={styles.checkbox}
                  />
                  <p style={{ ...styles.brandName, textDecoration: item.completed ? 'line-through' : 'none' }}>
                    {item.name}
                  </p>
                  <div style={styles.buttonGroup}>
                    <button style={styles.editButton} onClick={() => this.handleEdit(item)}>Edit</button>
                    <button style={styles.deleteButton} onClick={() => this.deleteBrand(item.id)}>Delete</button>
                  </div>
                </div>
              )) : null}
            <div style={styles.toggleButton} onClick={this.toggleMerkSepatu}>Show/Hide</div>
          </div>
        </div>
      </div>
    );
  }
}

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
  textarea: {
    width: '80%',
    height: '60px',
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
    borderRadius: '5px',
    marginBottom: '10px'
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
