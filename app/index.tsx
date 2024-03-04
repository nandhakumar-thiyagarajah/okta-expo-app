import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    createConfig,
    signIn,
    signOut,
    isAuthenticated,
    getUser,
    getUserFromIdToken,
    EventEmitter,
  } from '@okta/okta-react-native';
import configFile from '../auth.config';


const App = () => {

    const [authenticated, setAuthenticated] = useState(false);
    const [context, setContext] = useState('');

    useEffect(()=>{
        const signInEvt = EventEmitter.addListener('signInSuccess', function (e: Event) {
            setAuthenticated(true)
            setContext('Logged in!');
        });

        const signOutEvt = EventEmitter.addListener('signOutSuccess', function (e: Event) {
            setAuthenticated(false)
            setContext('Logged out!');
        });

        const errorEvt = EventEmitter.addListener('onError', function (e: Event) {
            setContext(e.error_message);
        });

        const cancelEvt = EventEmitter.addListener('onCancelled', function (e: Event) {
            setContext(e);
        });

        const oktaConfig = async() => {
            console.log(configFile.oidc);
            
            await createConfig(configFile.oidc);
        };

        oktaConfig();

        return()=>{
            signInEvt.remove();
            signOutEvt.remove();
            errorEvt.remove();
            cancelEvt.remove();
        }
    },[]);
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{'Okta Login'.toLocaleUpperCase()}</Text>
            <View style={styles.whiteContainer}>
                <View style={{width: '100%'}}>
                    <Text>{authenticated.toString()}</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
    )
}

export default App;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'lightgreen',
    },
    whiteContainer: {
        flex:1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 22,
        lineHeight: 28,
        textAlign: 'center'
    },
    buttonContainer: {
        backgroundColor: 'purple',
        borderRadius: 25,
        height: 45,
        paddingHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
    }
});