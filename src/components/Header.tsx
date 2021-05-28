import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import userImg from '../assets/user-4-460.png' 
import fonts from '../styles/fonts';
export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(()=>{
        async function loadStorageUserName (){
            const user = await AsyncStorage.getItem('@plantManager:user');

            setUserName(user || '')
        }

        loadStorageUserName();

    },[])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá, </Text>
                <Text style={styles.userName}>{userName}</Text>
                
            </View>

            <Image source={userImg} style={styles.userImg}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
        marginTop:getStatusBarHeight(),
    },
    userImg:{
        width:70,
        height:70,
        borderRadius:35,
        backgroundColor:colors.green_light,
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    }

})