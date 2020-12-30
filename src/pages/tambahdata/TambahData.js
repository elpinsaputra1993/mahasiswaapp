import React, {useState, PureComponent} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';

const TambahData = ({navigation}) => {
  const [id, setId] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jurusan, setJurusan] = useState('');
  // const [image, setImage] = useState('');
  const [singleFile, setSingleFile] = useState('');

  const GoTo = () => {
    navigation.navigate('List Data');
  };
  const image = singleFile;
  const simpan = () => {
    const data = new FormData();
    data.append('nama', nama);
    data.append('alamat', alamat);
    data.append('jurusan', jurusan);
    data.append('image', image);
    console.log(`Datanya ==> ${data}`);
    axios
      .post(
        'http://192.168.43.10/elpin/2020/JuaraCoding/12282020/backend_CRUD_ReactNative/api/mahasiswas/tambah',
        data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        },
      )
      .then(function (response) {
        alert(`Proses simpan data berhasil ..!!`);
        // alert(JSON.stringify(response));
        setNama('');
        setAlamat('');
        setJurusan('');
        setSingleFile('');
        // navigation.navigate('List Data');
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
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
      setSingleFile(res);
    } catch (err) {
      setSingleFile('');
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
        {' '}
        Form Input Mahasiswa
      </Text>
      <TextInput
        placeholder="Masukkan Nama"
        style={{borderWidth: 1, marginBottom: 5}}
        value={nama}
        onChangeText={(value) => setNama(value)}></TextInput>
      <TextInput
        placeholder="Masukkan alamat"
        style={{borderWidth: 1, marginBottom: 5}}
        value={alamat}
        onChangeText={(value) => setAlamat(value)}></TextInput>
      <TextInput
        placeholder="Masukkan Jurusan"
        style={{borderWidth: 1, marginBottom: 5}}
        value={jurusan}
        onChangeText={(value) => setJurusan(value)}></TextInput>

      {/*Showing the data of selected Single file*/}
      {singleFile != null ? (
        <>
          <Image
            style={{
              textAlign: 'center',
              margin: 10,
              width: 150,
              height: 150,
            }}
            source={{uri: singleFile.uri}}
          />
          <Text style={styles.textStyle}>
            File Name: {singleFile.name ? singleFile.name : ''}
            {'\n'}
            Type: {singleFile.type ? singleFile.type : ''}
            {'\n'}
            File Size: {singleFile.size ? singleFile.size : ''}
            {'\n'}
            URI: {singleFile.uri ? singleFile.uri : ''}
            {'\n'}
          </Text>
        </>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={uploadImage}>
          <Text style={styles.buttonTextStyle}>Upload File</Text>
        </TouchableOpacity> */}
      <TouchableOpacity onPress={simpan} style={styles.btnSimpan}>
        <Text style={styles.textBtn}>Simpan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={GoTo} style={styles.btnSimpan}>
        <Text style={styles.textBtn}>Lihat Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahData;

const styles = StyleSheet.create({
  btnSimpan: {
    backgroundColor: 'lightblue',
    marginTop: 10,
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
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
