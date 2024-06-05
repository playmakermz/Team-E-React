import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [formInput, setFormInput] = useState("");
  const [formHarga, setFormHarga] = useState("");
  const [isFormAlertVisible, setIsFormAlertVisible] = useState(false);
  const [buah, setBuah] = useState([
    { nama: "Anggur", harga: 10000, id: crypto.randomUUID(), fform: false },
    { nama: "Melon", harga: 20000, id: crypto.randomUUID(), fform: false },
  ]);
  const [displayBuah, setDisplayBuah] = useState(buah);
  const [updateFormAll, setUpdateFormAll] = useState(false);
  const [showAllData, setShowAllData] = useState(false);

  const handleCount = () => {
    if (count === 5) {
      alert("Counter selesai");
      setIsButtonEnabled(false);
    } else {
      setCount(count + 1);
    }
  };

  const handleChange = (event) => {
    setFormInput(event.target.value);
  };

  const handleHargaChange = (event) => {
    setFormHarga(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formInput === "" || formHarga === "") {
      setIsFormAlertVisible(true);
    } else {
      setIsFormAlertVisible(false);
      const newItem = {
        nama: formInput,
        harga: parseInt(formHarga),
        id: crypto.randomUUID(),
        fform: false,
      };
      const newBuahList = [...buah, newItem];
      setBuah(newBuahList);
      setDisplayBuah(newBuahList);
      setFormInput("");
      setFormHarga("");
    }
  };

  const handleAlert = () => (
    <div style={styles.alert}>
      <h4>Form tidak boleh kosong!!</h4>
    </div>
  );

  const handleDelete = (items) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      const filteredBuah = buah.filter((item) => item.id !== items.id);
      setBuah(filteredBuah);
      setDisplayBuah(filteredBuah);
    }
  };

  const updateForm = (item) => (
    <form
      style={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdate(item);
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Formulir Pesanan</h2>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          placeholder="Nama Buah"
          onChange={handleChange}
        />
        <input
          style={styles.input}
          placeholder="Harga"
          type="number"
          onChange={handleHargaChange}
        />
      </div>
      {updateFormAll ? handleAlert() : ""}
      <div style={styles.buttonContainer}>
        <div style={styles.submitButton} onClick={() => handleUpdate(item)}>
          Submit
        </div>
      </div>
    </form>
  );

  const handleUpdate = (items) => {
    if (items.fform) {
      const updatedBuah = buah.map((item) => {
        if (item.id === items.id) {
          return {
            ...item,
            nama: formInput || item.nama,
            harga: parseInt(formHarga) || item.harga,
            fform: false,
          };
        } else {
          return item;
        }
      });
      setBuah(updatedBuah);
      setDisplayBuah(updatedBuah);
      setFormInput("");
      setFormHarga("");
    } else {
      const updatedBuah = buah.map((item) => {
        if (item.id === items.id) {
          return { ...item, fform: true };
        } else {
          return item;
        }
      });
      setBuah(updatedBuah);
      setDisplayBuah(updatedBuah);
    }
  };

  const appSearch = () => (
    <div style={{ marginBottom: "10px" }}>
      <form style={styles.form}>
        <h2 style={{ marginBottom: "10px" }}>Search Item</h2>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            placeholder="Nama Buah"
            onChange={handleChange}
          />
          <div style={styles.buttonContainer}>
            <div style={styles.searchButton} onClick={handleSearch}>
              Search
            </div>
            <div style={styles.searchButton} onClick={handleShowAllData}>
              {showAllData ? "Hide All Data" : "Show All Data"}
            </div>
          </div>
        </div>
        {updateFormAll ? handleAlert() : ""}
      </form>
    </div>
  );

  const handleSearch = () => {
    const searchedBuah = buah.filter((item) =>
      item.nama.toLowerCase().includes(formInput.toLowerCase())
    );
    setDisplayBuah(searchedBuah.length > 0 ? searchedBuah : buah);
  };

  const handleShowAllData = () => {
    setDisplayBuah(showAllData ? [] : buah);
    setShowAllData(!showAllData);
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.appSubstitute}>
        <h2>Ini Counter App</h2>
        <h3>Count: {count}</h3>
        {isButtonEnabled && (
          <button style={styles.counterButton} onClick={handleCount}>
            +
          </button>
        )}
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: "10px" }}>Formulir Pesanan</h2>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              placeholder="Nama Buah"
              value={formInput}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              placeholder="Harga"
              type="number"
              value={formHarga}
              onChange={handleHargaChange}
            />
          </div>
          {isFormAlertVisible && handleAlert()}
          <div style={styles.buttonContainer}>
            <input style={styles.submitButton} type="submit" value="Kirim" />
          </div>
        </form>
        <div>
          {displayBuah.map((buah) => (
            <div key={buah.id} style={styles.itemContainer}>
              <p>
                {buah.nama} - {buah.harga}
              </p>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(buah)}
              >
                Delete
              </button>
              <button
                style={styles.updateButton}
                onClick={() => handleUpdate(buah)}
              >
                Update
              </button>
              {buah.fform && updateForm(buah)}
            </div>
          ))}
        </div>
        {appSearch()}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  appSubstitute: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "auto",
  },
  counterButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },
  form: {
    marginTop: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    gap : "10px"
  },
  input: {
    width: "48%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttonContainer: {
    alignItems: "center",

  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  searchButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    margin : "10px",
  },
  alert: {
    marginTop: "10px",
    color: "red",
    fontWeight: "bold",
  },
  itemContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
    backgroundColor: "#fff",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  updateButton: {
    backgroundColor: "#ffc107",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default App;
