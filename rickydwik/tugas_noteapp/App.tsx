import { TouchableOpacity, View, ScrollView, Text, Button, TextInput, SafeAreaView } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function App() {
  let [formTitle, setFormTitle] = useState('') // ============= State untuk title form ==========
  let [formDescription, setFormDescription] = useState('') // ================= state untuk description 
  let [formInput, setFormInput] = useState([{ title: 'Try', description: 'Try', id: crypto.randomUUID() }]) // =============== form utama
  let [itemid, setItemId] = useState(null) // ================ update form =====================
  let [buttonUpdate, setButtonUpdate] = useState(true) // ================ indikator kapan untuk melakukan update =========

  // =============== HandleSubmit ================
  function handleSubmit(choice) {
    if (formTitle === '') { alert('Please insert a title'); return '' }

    if (choice === 0) {
      let abc = { title: formTitle, description: formDescription, id: crypto.randomUUID() }
      setFormInput([...formInput, abc]) // Menambahkan data kebagian akhir
      setFormTitle('') // clear
      setFormDescription('') // Clear
    }
    else if (choice === 1) {
      handleUpdate(itemid) // Declarasi function kita bisa akses terlebih dahulu sebelum ditulis.
    }
  }

  // ==================== HandleDelete =================
  function handleDelete(input) {
    let abc = formInput.filter((item) => {
      return item.id !== input
      // item.id === input akan disisihkan
    })
    setFormInput(abc)
  }

  // ======================= handleUpdate =====================
  function handleUpdate(inputid) {
    let abc = formInput.map((item) => {
      if (item.id === inputid) {
        return { ...item, title: formTitle, description: formDescription, }
      }
      else {
        return item
      }
    })

    setFormInput(abc) // Data terbaru karena update akan disimpan
    setFormTitle('') // clear
    setFormDescription('') // Clear
    setButtonUpdate(true)
  }


  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSibling}>
        <Text style={styles.h1}>Aplikasi Note</Text>

        <TextInput
        style={styles.input}
        placeholder="Note Title"
        onChangeText={setFormTitle}
        value={formTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Note Description"
        onChangeText={setFormDescription}
        value={formDescription}
      />

      {buttonUpdate? 

    (<TouchableOpacity onPress={()=> handleSubmit(0)} style={styles.buttons}>
    <Text>Submit Button</Text>
      </TouchableOpacity>) : 
      
      (<TouchableOpacity onPress={()=> handleSubmit(1)} style={styles.buttonu}>
    <Text>Update Button</Text>
      </TouchableOpacity>)  

    }

      <ScrollView contentContainerStyle={styles.itemList}>
        {formInput.map((item) => (

          <View key={item.id} style={styles.itemm}>
            <Text style={styles.tek}>Title  :{item.title}</Text>
            
            <Text style={styles.tek}>Description :{item.description}</Text>
            
            <Button title="Delete Note" color="red" onPress={() => handleDelete(item.id)}/>
            <Text style={styles.spas}> </Text>
            <Button title="Update Note" color="orange" onPress={() => {setItemId(item.id); setButtonUpdate(false)}}/>
          </View>

        ))}
      </ScrollView>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  input: {
    width: "99%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
    height: 60,
    margin: 5,
    borderWidth: 1,
    marginVertical:10,
    padding: 10,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "dodgerblue",
  },

  containerSibling: {
    width: "100%",
    maxWidth: 500,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    
  },

  h1: {
    fontSize: 24,
    fontFamily:"Arial",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "Black",
  },

  itemList: {
    marginTop: 20,
  },

  itemm: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "Blue",
  },
  tek:{
    marginTop:5,
    marginBottom:5,
  },
  tekspas:{
    marginTop:1,
    marginBottom:1,
  },
  buttons: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginTop: 5,
  },
  buttonu: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "yellow",
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  buttonTextUpdate: {
    color: "black",
    fontWeight: "bold",
  },
});