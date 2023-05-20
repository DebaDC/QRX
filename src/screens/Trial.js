import React, { useState } from 'react';
import {
    View,
    Text,
    Pressable,
    TextInput,
    FlatList,
    ImageBackground,
    Image,
    StatusBar,
    LogBox,
} from 'react-native';
import { BACKGROUND, QRIMAGE } from '../constants/imagepath';
import QRcode from 'react-native-qrcode-svg';
//import {grey, white} from '../constants/Colors';
import RNFetchBlob from 'rn-fetch-blob';

export default Homescreen = ({ navigation }) => {

    const [selectedTab, setSelectedTab] = useState('');
    const [msg, setMsg] = useState("")
    const [obj, setObj] = useState('Brand');
    const [qrCodeRef, setQrCodeRef] = useState("");

    const MessageData = [
        { id: 1, label: 'SMS', inputType: 'number for message' },
        { id: 2, label: 'Email', inputType: 'email' },
        { id: 3, label: 'Phone', inputType: 'Phone number' },
        { id: 4, label: 'URL', inputType: 'URL' },
    ];

    const renderDesin = ({ item }) => {
        // console.log(item)
        return (
            <Pressable
                style={{
                    backgroundColor:  selectedTab == item.id ? 'cyan' : 'white',
                    elevation: 5,
                    borderRadius: 10,
                    height: 50,
                    width: 110,
                    marginLeft: 7,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => 
                    {
                    setSelectedTab(item.id)
                    console.log(item.id)
                    }

                // console.log("")
                }>
                <Text
                    style={{
                        fontSize: 20,
                        // color: selectedTab?.id === item.id ? 'white' : 'black',
                        color: selectedTab == item.id ? 'white' : 'black',
                        alignItems: 'center',
                        // alignSelf: 'center',
                        // marginTop: 3,
                    }}>
                    {item.label}
                </Text>
            </Pressable>
        );
    };

    const downloadQrcode = () => {
        try {
          //   alert('hello');
          qrCodeRef.toDataURL(async data => {
            // console.log(data);
            const path =
              RNFetchBlob.fs.dirs.DownloadDir +
              `/${msg
                .replace('http', '')
                .replace('://', 'a')
                .replace('.', '_')
                .slice(0, 30)}.png`;
            console.log(path);
            await RNFetchBlob.fs.writeFile(path, data, 'base64');
    
            alert('Download Successfully');
          });
        } catch (err) {
          console.log(err);
        }
      };

    const btnPress = ({} ) => {
       
        if(selectedTab == 1){
            setObj(`sms:`+ msg )
        }else if(selectedTab == 2){
            setObj("Email")
        }
        };

    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: 'red'
            }}>
                <ImageBackground style={{ flex: 1 }} source={BACKGROUND}>

                    {/* starting header */}
                    <View style={{
                        height: 50,
                        width: 450,
                        // backgroundColor: 'pink',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        // alignItems:'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            height: 50,
                            width: 270,
                            // backgroundColor: 'cyan'
                        }}>
                            <Text
                                style={{
                                    color: 'pink',
                                    fontSize: 24,
                                    fontWeight: '700',
                                    // alignSelf: 'center',
                                    // margin: 20,
                                }}>
                                QR Code Generator
                            </Text>
                        </View>
                        <View style={{
                            height: 50,
                            width: 110,
                            // backgroundColor: 'green'
                        }}>

                        </View>

                    </View>
                    {/* end header */}


                    {/* start flat list */}
                    <View style={{
                        height: 70,
                        width: 430,
                        // backgroundColor: 'green',
                        marginVertical: 10,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={MessageData}
                            renderItem={renderDesin}
                        />

                    </View>
                    {/* end flat list */}


                    {/* start for taking Text Input */}
                    <View
                        style={{
                            height: 80,
                            alignSelf: 'center',
                            alignItem: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}>
                        <TextInput
                            onTouchStart={() => { }}
                            onChangeText={txt => {
                                setMsg(txt);
                            }}
                            value={msg}
                            style={{
                                padding: 10,
                                borderWidth: 1,
                                height: 60,
                                width: '90%',
                                alignSelf: 'center',
                                borderRadius: 10,
                                backgroundColor: 'white',
                                color: 'black',
                                fontSize: 20,
                                marginTop: 30,
                            }}
                            placeholder={"Enter Data"}
                            // placeholder={`Enter ${inputType}`}
                            placeholderTextColor={'grey'}
                        // keyboardType={inputType === 'Phone number' ? 'number-pad' : 'default'}
                        />
                    </View>
                    {/* end for taking Text Input */}

                    
                    {/* <View style={{
                        height:50,
                        width:250,
                        backgroundColor:'red',
                        alignSelf:'center',
                        marginTop:20
                    }}>

                    </View> */}
          <Pressable
            onPress={btnPress}
            style={{
              width: '50%',
              height: 50,
              backgroundColor: 'blue',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 30, color: 'white'}}>Generate QR</Text>
          </Pressable>
  
          <View
            style={{
              width: '80%',
              height: 200,
              marginTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <QRcode
              value={obj}
              color={'white'}
              backgroundColor="black"
              size={250}
              getRef={ref => setQrCodeRef(ref)}
            />
          </View>
          
  
          <View style={{alignItems: 'center', marginTop: 100}}>
            <Pressable
              onPress={() => downloadQrcode()}
              style={{
                backgroundColor: 'blue',
                height: 80,
                width: 180,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'white',
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 30, color: 'white'}}>Download</Text>
            </Pressable>
          </View>

        
                        

                </ImageBackground>
            </View>
        </>
    )
}