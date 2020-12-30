import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import qs from 'qs';

const EditData = ({route, navigation}) => {
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jurusan, setJurusan] = useState('');
  const {itemId, itemNama, itemAlamat, itemJurusan, itemImage} = route.params;
  const [imagePicture, setimagePicture] = useState(
    `http://192.168.43.10/elpin/2020/JuaraCoding/12282020/backend_CRUD_ReactNative/uploads/${itemImage}`,
  );
  const [users, setUsers] = useState([]);
  const [singleFile, setSingleFile] = useState('');
  const [tempImgSelect, setTempImgSelect] = useState(
    `http://192.168.43.10/elpin/2020/JuaraCoding/12282020/backend_CRUD_ReactNative/uploads/${itemImage}`,
  );
  const image = singleFile;
  const update = () => {
    const data = new FormData();
    data.append('id', itemId);
    data.append('nama', nama);
    data.append('alamat', alamat);
    data.append('jurusan', jurusan);
    data.append('image', image);
    axios
      .post(
        'http://192.168.43.10/elpin/2020/JuaraCoding/12282020/backend_CRUD_ReactNative/api/mahasiswas/update',
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then(function (response) {
        alert(`Proses ubah data berhasil ..!!`);
        // alert(JSON.stringify(response));
        // navigation.navigate('List Data');
        navigation.navigate('Tambah Data');
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(
        `http://192.168.43.10/elpin/2020/JuaraCoding/12282020/backend_CRUD_ReactNative/api/mahasiswas/getId/${itemId}`,
      )
      .then((res) => {
        const mahasiswa = res.data.data;
        console.log('tes : ' + JSON.stringify(res.data.data));
        setUsers(mahasiswa);
      });
  };
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setimagePicture(res.uri);
      setSingleFile(res);
    } catch (err) {
      setSingleFile('');
      setimagePicture(tempImgSelect);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <View>
      <Text style={{textAlign: 'center', margin: 10}}>
        Form Input Mahasiswa
      </Text>
      {users.map((mahasiswa) => {
        return (
          <View>
            <TextInput
              style={{borderWidth: 1, marginBottom: 5}}
              value={mahasiswa.id}
              key={mahasiswa.id}
              onChangeText={(text) => setId(text)}></TextInput>
            <TextInput
              style={{borderWidth: 1, marginBottom: 5}}
              onChangeText={(text) => setNama(text)}>
              {mahasiswa.nama}
            </TextInput>
            <TextInput
              style={{borderWidth: 1, marginBottom: 5}}
              onChangeText={(text) => setAlamat(text)}>
              {mahasiswa.alamat}
            </TextInput>
            <TextInput
              style={{borderWidth: 1, marginBottom: 5}}
              onChangeText={(text) => setJurusan(text)}>
              {mahasiswa.jurusan}
            </TextInput>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  margin: 10,
                  width: 100,
                  height: 100,
                  marginLeft: 20,
                  marginTop: 10,
                }}
                source={{uri: imagePicture}}
              />
            </View>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableHighlight onPress={update} style={styles.btnSimpan}>
        <Text style={styles.textBtn}>UPDATE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default EditData;

const styles = StyleSheet.create({
  btnSimpan: {
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  textBtn: {
    fontSize: 20,
    color: 'white',
  },
  delete: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  desc: {
    marginLeft: 18,
    flex: 1,
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});
