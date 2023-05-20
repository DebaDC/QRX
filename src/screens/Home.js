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
import { BACKGROUND, SCANLOGO} from '../../src/constants/imagepath';
import QRcode from 'react-native-qrcode-svg';
//import {grey, white} from '../constants/Colors';
import RNFetchBlob from 'rn-fetch-blob';
import { blue, red, yellow } from '../constants/color';

export default Home= ({ navigation }) => {

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
                    backgroundColor:  selectedTab == item.id ? 'grey' : 'white',
                    elevation: 5,
                    borderRadius: 20,
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
            setObj(`mailto:`+ msg)
        }else if(selectedTab == 3){
            setObj(`tel:`+ msg)
        }else if(selectedTab == 4){
            setObj( `http: `+msg)
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
                        height: 70,
                        width: 550,
                        // backgroundColor: 'pink',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent: 'center',
                        marginTop:10
                    }}>
                        <View style={{
                            height: 50,
                            width: 400,
                            // backgroundColor: 'cyan'
                        }}>
                            <Text
                                style={{
                                    // color: 'red',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    alignSelf: 'center',
                                    marginTop:7,marginLeft:80

                                    
                                }}>
                                QR Code Generator
                            </Text>
                        </View>
                        <View style={{
                            height: 50,
                            width: 80,
                        alignSelf:'flex-end',
                        marginRight:70
                        }}>
                         <Pressable
                        onPress={() => navigation.navigate('QRpage')}
                        style={{}}>
                        <Image source={SCANLOGO}
                            style={{
                                height: 30,
                                width: 30,
                                alignSelf: 'center',
                                marginTop:5,
                                marginRight:20
                              
                            }} />
                    </Pressable>

                        </View>

                    </View>
                    {/* end header */}


                    {/* start flat list */}
                    <View style={{
                        height: 70,
                        width: 440,
                        // backgroundColor: 'green',
                        marginTop:30

                        
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
                            height: 100,
                            width: '100%',
                            marginTop:10,

                            // backgroundColor:red
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
                                width: '80%',
                                alignSelf: 'center',
                                borderRadius: 20,
                                backgroundColor: 'white',
                                color: 'black',
                                fontSize: 20,
                                marginTop: 10,
                                elevation:10
                            }}
                            placeholder={"Enter Data"}
                            placeholderTextColor={'grey'}
                            keyboardType='default'
                        // keyboardType={inputType === 'Phone number' ? 'number-pad' : 'default'}
                        />
                    </View>
                    {/* end for taking Text Input */}

                    
          <View style={{width:'100%',height:'10%'}}>        
          <Pressable
            onPress={btnPress}
            style={{
              width: '55%',
              height:60,
              alignSelf: 'center',
             backgroundColor:blue,
             borderRadius:20,
             
            }}>
            <Text style={{fontSize: 25, color: 'white',alignSelf:'center',marginTop:12}}>Generate QR</Text>
          </Pressable>
          </View>
  
          <View
            style={{
              width: '80%',
              height: 200,
              marginVertical:50,
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
          
  
          <View style={{marginTop:10,width:'100%',height:'10%'}}>
            <Pressable
              onPress={() => downloadQrcode()}
              style={{
                width: '55%',
                height:60,
                alignSelf: 'center',
               backgroundColor:blue,
               borderRadius:20,
               marginTop:20
              }}>
              <Text style={{fontSize: 25, color: 'white',alignSelf:'center',marginTop:12}}>Download</Text>
            </Pressable>
          </View>

        
                        

                </ImageBackground>
            </View>
        </>
    )
}
