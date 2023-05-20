import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';



const QRpage = ({navigation}) => {
    const [isScanned, setIsScanned] = useState(false);
    const [appToOpen, setAppToOpen] = useState('');


    useEffect(() => {
        if (isScanned) {
            openApp();
        }
    }, [isScanned]);

    const handleScan = (e) => {
        const app = e.data;
        setAppToOpen(app);
        setIsScanned(true);
    };

    const openApp = () => {
        if (appToOpen) { // check if the QR code data is not empty
          if (appToOpen.startsWith('tel:') || appToOpen.startsWith('mailto:') || appToOpen.startsWith('http:') || appToOpen.startsWith('www.') || appToOpen.startsWith('sms')) {
           
            Linking.openURL(appToOpen);
            navigation.goBack()
            
            
            
          } else {
            alert('Invalid QR code'); // display an alert for invalid QR code data
          }
        }
      };


    return (
        <View style={styles.container}>
            <QRCodeScanner
                onRead={handleScan}
                showMarker={true}
                reactivate={true}
                permissionDialogMessage="Need permission to access camera"
                reactivateTimeout={500}
                markerStyle={styles.marker}
                cameraStyle={styles.camera}
            />
            {isScanned && (
                <View style={styles.infoContainer}>

                    <Text style={styles.text}>{appToOpen}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        borderColor: '#FFF',
    },
    camera: {
        height: '100%',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        color: '#FFF',
        marginLeft: 10,
    },
});

export default QRpage;