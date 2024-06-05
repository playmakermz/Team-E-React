import React from "react";
import Item from "./item";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: true,
      fruitName: "",
      newFruitName: "",
      newFruitCount: 0,
      newFruitFormVisible: false,
      newFruitError: "",
      error: "",
      updateError: "",
      fruits: [
        { id: 1, name: "Jeruk", item: 10 },
        { id: 2, name: "Mangga", item: 10 },
        { id: 3, name: "Pisang", item: 10 },
        { id: 4, name: "Nanas", item: 10 },
        { id: 5, name: "Anggur", item: 10 },
      ],
      updatingFruitId: null,
    };
  }

  handleClick = () => {
    this.setState({ output: !this.state.output });
  };

  handleInputChange = (event) => {
    this.setState({ fruitName: event.target.value, error: "" });
  };

  handleUpdateInputChange = (event) => {
    this.setState({ newFruitName: event.target.value, updateError: "" });
  };

  handleUpdateCountChange = (event) => {
    this.setState({
      newFruitCount: parseInt(event.target.value, 10),
      updateError: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { fruitName, fruits } = this.state;
    if (!fruitName) {
      this.setState({ error: "Isi nama Buah dulu" });
      return;
    }
    const fruitIndex = fruits.findIndex(
      (fruit) => fruit.name.toLowerCase() === fruitName.toLowerCase()
    );
    if (fruitIndex === -1) {
      this.setState({ error: "Buah yang anda cari tidak ada" });
      return;
    }
    if (fruits[fruitIndex].item === 0) {
      this.setState({ error: `${fruits[fruitIndex].name} sudah habis` });
      return;
    }
    const updatedFruits = [...fruits];
    updatedFruits[fruitIndex].item -= 1;
    this.setState({ fruits: updatedFruits, fruitName: "" }, () => {
      alert(`sukses membeli buah ${fruits[fruitIndex].name}`);
    });
  };

  handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this fruit?"
    );
    if (shouldDelete) {
      const updatedFruits = this.state.fruits.filter(
        (fruit) => fruit.id !== id
      );
      this.setState({ fruits: updatedFruits });
    }
  };

  handleUpdateClick = (id) => {
    this.setState((prevState) => ({
      updatingFruitId: prevState.updatingFruitId === id ? null : id,
      newFruitName: "",
      newFruitCount: 0,
      updateError: "",
    }));
  };

  handleUpdate = (id) => {
    const { newFruitName, newFruitCount, fruits } = this.state;

    if (!newFruitName) {
      this.setState({ updateError: "Nama buah tidak boleh kosong" });
      return;
    }

    const nameExists = fruits.some(
      (fruit) =>
        fruit.name.toLowerCase() === newFruitName.toLowerCase() &&
        fruit.id !== id
    );
    if (nameExists) {
      this.setState({ updateError: "Buah sudah ada" });
      return;
    }

    if (isNaN(newFruitCount) || newFruitCount <= 0) {
      this.setState({ updateError: "Jumlah buah harus lebih dari 0" });
      return;
    }

    const fruitIndex = fruits.findIndex((fruit) => fruit.id === id);
    if (fruitIndex !== -1) {
      const updatedFruits = [...fruits];
      updatedFruits[fruitIndex].name = newFruitName;
      updatedFruits[fruitIndex].item = newFruitCount;
      this.setState({
        fruits: updatedFruits,
        newFruitName: "",
        newFruitCount: 0,
        updatingFruitId: null,
        updateError: "",
      });
    }
  };

  handleNewFruitClick = () => {
    this.setState((prevState) => ({
      newFruitFormVisible: !prevState.newFruitFormVisible,
      newFruitName: "",
      newFruitCount: 0,
      newFruitError: "",
    }));
  };

  handleNewFruitNameChange = (event) => {
    this.setState({ newFruitName: event.target.value, newFruitError: "" });
  };

  handleNewFruitCountChange = (event) => {
    this.setState({
      newFruitCount: parseInt(event.target.value, 10),
      newFruitError: "",
    });
  };

  handleNewFruitSubmit = (event) => {
    event.preventDefault();
    const { newFruitName, newFruitCount, fruits } = this.state;

    if (!newFruitName) {
      this.setState({ newFruitError: "Nama buah tidak boleh kosong" });
      return;
    }

    const nameExists = fruits.some(
      (fruit) => fruit.name.toLowerCase() === newFruitName.toLowerCase()
    );
    if (nameExists) {
      this.setState({ newFruitError: "Buah sudah ada" });
      return;
    }

    if (isNaN(newFruitCount) || newFruitCount <= 0) {
      this.setState({ newFruitError: "Jumlah buah harus lebih dari 0" });
      return;
    }

    const newFruit = {
      name: newFruitName,
      id: fruits.length ? fruits[fruits.length - 1].id + 1 : 1,
      item: newFruitCount,
    };
    this.setState({
      fruits: [...fruits, newFruit],
      newFruitName: "",
      newFruitCount: 0,
      newFruitFormVisible: false,
      newFruitError: "",
    });
  };

  render() {
    const {
      fruits,
      output,
      fruitName,
      newFruitName,
      newFruitCount,
      error,
      updateError,
      newFruitError,
      updatingFruitId,
      newFruitFormVisible,
    } = this.state;

    return (
      <div style={styles.app}>
        <div style={styles.content}>
          <form style={styles.form} onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={fruitName}
              onChange={this.handleInputChange}
              placeholder="masukkan nama buah"
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>
              Beli Buah
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.itemContainer}>
            {output ? (
              fruits.map((fruit) => (
                <div key={fruit.id} style={styles.item}>
                  <Item name={fruit.name} item={fruit.item} />
                  <button
                    onClick={() => this.handleDelete(fruit.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.handleUpdateClick(fruit.id)}
                    style={styles.updateButton}
                  >
                    {updatingFruitId === fruit.id ? "Cancel" : "Update"}
                  </button>
                  {updatingFruitId === fruit.id && (
                    <div style={styles.updateForm}>
                      <input
                        type="text"
                        placeholder="Update Name"
                        value={newFruitName}
                        onChange={this.handleUpdateInputChange}
                        style={styles.input}
                      />

                      <input
                        type="number"
                        placeholder="Update Count"
                        value={newFruitCount}
                        onChange={this.handleUpdateCountChange}
                        style={styles.input}
                      />
                      <button
                        onClick={() => this.handleUpdate(fruit.id)}
                        style={styles.saveButton}
                      >
                        Save
                      </button>
                      {updateError && <p style={styles.error}>{updateError}</p>}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={styles.noItems}>No items to display</p>
            )}
          </div>
          <button style={styles.toggleButton} onClick={this.handleClick}>
            {output ? "Hide Items" : "Show Items"}
          </button>
          <button
            style={styles.createButton}
            onClick={this.handleNewFruitClick}
          >
            {newFruitFormVisible ? "Cancel" : "Create New Fruit"}
          </button>
          {newFruitFormVisible && (
            <form style={styles.form} onSubmit={this.handleNewFruitSubmit}>
              <input
                type="text"
                value={newFruitName}
                onChange={this.handleNewFruitNameChange}
                placeholder="Nama Buah Baru"
                style={styles.input}
              />
              <input
                type="number"
                value={newFruitCount}
                onChange={this.handleNewFruitCountChange}
                placeholder="Jumlah"
                style={styles.input}
              />
              <button type="submit" style={styles.submitButton}>
                Tambah Buah
              </button>
              {newFruitError && <p style={styles.error}>{newFruitError}</p>}
            </form>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  app: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: "20px",
    flexGrow: 1,
  },
  form: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#61dafb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  submitButtonHover: {
    backgroundColor: "#21a1f1",
  },
  error: {
    color: "red",
    fontStyle: "italic",
    marginTop: "10px",
  },
  itemContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "20px 0",
  },
  item: {
    padding: "10px",
    color: "#333",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  deleteButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
  updateButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
  updateForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10px",
  },
  saveButton: {
    marginTop: "10px",
    padding: "5px 10px",
    backgroundColor: "#61dafb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
  noItems: {
    color: "gray",
    fontStyle: "italic",
  },
  toggleButton: {
    marginRight: "10px",
    padding: "10px 20px",
    backgroundColor: "#61dafb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  toggleButtonHover: {
    backgroundColor: "#21a1f1",
  },
  createButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "20px",
    color: "white",
  },
};

export default App;
