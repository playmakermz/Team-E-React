import { TouchableOpacity, View, ScrollView, Text, Button, TextInput } from 'react-native'
import { useState, useEffect, } from 'react' // ===== React original
import {styles} from './style'

function App(){
  let [formTitle, setFormTitle] =  useState('') // ============= State untuk title form ==========
  let [formDescription, setFormDescription] = useState('') // ================= state untuk description 
  let [formInput, setFormInput] = useState([{title: 'Try', description: 'Description Try', id: crypto.randomUUID()}]) // =============== form utama
  let [itemid, setItemId] = useState(null) // ================ update form =====================
  let [buttonUpdate, setButtonUpdate] = useState(true) // ================ indikator kapan untuk melakukan update =========


  // =============== HandleSubmit ================
  function handleSubmit(choice){
    if (formTitle === ''){alert('Please insert a title'); return ''}

    if (choice === 0){
      let abc = {title: formTitle, description: formDescription, id: crypto.randomUUID()}
      setFormInput([...formInput, abc]) // Menambahkan data kebagian akhir
      setFormTitle('') // clear
      setFormDescription('') // Clear
    }
    else if (choice === 1){
      handleUpdate(itemid) // Declarasi function kita bisa akses terlebih dahulu sebelum ditulis.
    }
  }

  // ==================== HandleDelete =================
  function handleDelete(input){
    let abc = formInput.filter((item) => {
      return item.id !== input 
      // item.id === input akan disisihkan
    })
    setFormInput(abc)
  }

  // ======================= handleUpdate =====================
  function handleUpdate(inputid){
    let abc = formInput.map((item) => {
      if(item.id === inputid){
        return {...item, title: formTitle, description: formDescription,}
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
 

  // ================= Main return Function ======================
  return(
    <View style={styles.container}>
      <View style={styles.containerSibling}>
        <Text style={styles.h1}>Note Taking App</Text>

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
            <Text>Title  :{item.title}</Text>
            <Text>{item.description}</Text>
            <Button title="Delete Note" color="red" onPress={() => handleDelete(item.id)}/>
            <Button title="Update Note" color="orange" onPress={() => {setItemId(item.id); setButtonUpdate(false)}}/>
          </View>

        ))}
      </ScrollView>

      </View>
    </View>
  )
}

export default App