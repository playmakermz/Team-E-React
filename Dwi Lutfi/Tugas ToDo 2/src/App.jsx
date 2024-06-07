import React from "react";
import Item from "./item";
import './App.css';  // Import the CSS file

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: true,
      sembakoName: "",
      newSembakoName: "",
      newSembakoFormVisible: false,
      newSembakoError: "",
      error: "",
      updateError: "",
      searchResult: null,
      sembako: [
        { id: 1, name: "Beras" },
        { id: 2, name: "Gula" },
        { id: 3, name: "Tepung" },
      ],
      updatingSembakoId: null,
    };
  }

  handleClick = () => {
    this.setState({ output: !this.state.output });
  };

  handleInputChange = (event) => {
    this.setState({ sembakoName: event.target.value, error: "" });
  };

  handleUpdateInputChange = (event) => {
    this.setState({ newSembakoName: event.target.value, updateError: "" });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { sembakoName, sembako } = this.state;
    if (!sembakoName) {
      this.setState({ error: "Isi nama Sembako dulu", searchResult: null });
      return;
    }
    const sembakoIndex = sembako.findIndex(
      (item) => item.name.toLowerCase() === sembakoName.toLowerCase()
    );
    if (sembakoIndex === -1) {
      this.setState({ error: "Sembako yang anda cari tidak ada", searchResult: null });
      return;
    }
    this.setState({ sembakoName: "", searchResult: sembako[sembakoIndex] });
  };

  handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this sembako?"
    );
    if (shouldDelete) {
      const updatedSembako = this.state.sembako.filter(
        (item) => item.id !== id
      );
      this.setState({ sembako: updatedSembako });
    }
  };

  handleUpdateClick = (id) => {
    this.setState((prevState) => ({
      updatingSembakoId: prevState.updatingSembakoId === id ? null : id,
      newSembakoName: "",
      updateError: "",
    }));
  };

  handleUpdate = (id) => {
    const { newSembakoName, sembako } = this.state;

    if (!newSembakoName) {
      this.setState({ updateError: "Nama sembako tidak boleh kosong" });
      return;
    }

    const nameExists = sembako.some(
      (item) =>
        item.name.toLowerCase() === newSembakoName.toLowerCase() &&
        item.id !== id
    );
    if (nameExists) {
      this.setState({ updateError: "Sembako sudah ada" });
      return;
    }

    const sembakoIndex = sembako.findIndex((item) => item.id === id);
    if (sembakoIndex !== -1) {
      const updatedSembako = [...sembako];
      updatedSembako[sembakoIndex].name = newSembakoName;
      this.setState({
        sembako: updatedSembako,
        newSembakoName: "",
        updatingSembakoId: null,
        updateError: "",
      });
    }
  };

  handleNewSembakoClick = () => {
    this.setState((prevState) => ({
      newSembakoFormVisible: !prevState.newSembakoFormVisible,
      newSembakoName: "",
      newSembakoError: "",
    }));
  };

  handleNewSembakoNameChange = (event) => {
    this.setState({ newSembakoName: event.target.value, newSembakoError: "" });
  };

  handleNewSembakoSubmit = (event) => {
    event.preventDefault();
    const { newSembakoName, sembako } = this.state;

    if (!newSembakoName) {
      this.setState({ newSembakoError: "Nama sembako tidak boleh kosong" });
      return;
    }

    const nameExists = sembako.some(
      (item) => item.name.toLowerCase() === newSembakoName.toLowerCase()
    );
    if (nameExists) {
      this.setState({ newSembakoError: "Sembako sudah ada" });
      return;
    }

    const newSembako = {
      name: newSembakoName,
      id: sembako.length ? sembako[sembako.length - 1].id + 1 : 1,
    };
    this.setState({
      sembako: [...sembako, newSembako],
      newSembakoName: "",
      newSembakoFormVisible: false,
      newSembakoError: "",
    });
  };

  render() {
    const {
      sembako,
      output,
      sembakoName,
      newSembakoName,
      error,
      updateError,
      newSembakoError,
      updatingSembakoId,
      newSembakoFormVisible,
      searchResult,
    } = this.state;

    return (
      <div className="app">
        <div className="content">
          <h1 className="title">Toko Sembako Murah</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={sembakoName}
              onChange={this.handleInputChange}
              placeholder="masukkan nama sembako"
              className="input"
            />
            <button type="submit" className="submitButton">
              Cari Sembako
            </button>
          </form>
          {error && <p className="error">{error}</p>}
          {searchResult && (
            <div className="searchResult">
              <p>Hasil Pencarian: {searchResult.name}</p>
            </div>
          )}
          <div className="itemContainer">
            {output ? (
              sembako.map((item) => (
                <div key={item.id} className="item">
                  <Item name={item.name} />
                  <div className="buttonContainer">
                    <button
                      onClick={() => this.handleDelete(item.id)}
                      className="deleteButton"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.handleUpdateClick(item.id)}
                      className="updateButton"
                    >
                      {updatingSembakoId === item.id ? "Cancel" : "Update"}
                    </button>
                  </div>
                  {updatingSembakoId === item.id && (
                    <div className="updateForm">
                      <input
                        type="text"
                        placeholder="Update Name"
                        value={newSembakoName}
                        onChange={this.handleUpdateInputChange}
                        className="input"
                      />
                      <button
                        onClick={() => this.handleUpdate(item.id)}
                        className="saveButton"
                      >
                        Save
                      </button>
                      {updateError && <p className="error">{updateError}</p>}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="noItems">No items to display</p>
            )}
          </div>
          <button className="toggleButton" onClick={this.handleClick}>
            {output ? "Hide Items" : "Show Items"}
          </button>
          <button className="createButton" onClick={this.handleNewSembakoClick}>
            {newSembakoFormVisible ? "Cancel" : "Create New Sembako"}
          </button>
          {newSembakoFormVisible && (
            <form className="form" onSubmit={this.handleNewSembakoSubmit}>
              <input
                type="text"
                value={newSembakoName}
                onChange={this.handleNewSembakoNameChange}
                placeholder="Nama Sembako Baru"
                className="input"
              />
              <button type="submit" className="submitButton">
                Tambah Sembako
              </button>
              {newSembakoError && <p className="error">{newSembakoError}</p>}
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default App;