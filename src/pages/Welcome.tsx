import React, { useState } from 'react';
import {
    SafeAreaView,
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    StyleSheet,
    Dimensions
} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core'

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors'; 
import fonts from '../styles/fonts';
export function Welcome(){

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification')
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {`\n`} suas plantas de {`\n`} forma fácil
                </Text>
                
                    <Image 
                        source={wateringImg}
                        style={styles.img}
                        resizeMode="contain"
                    />

                <Text style={styles.subTitle}>
                    Não esqueça mais de regar suas {`\n`} plantas.
                    Nós cuidamos de lembrar você{`\n`}
                    sempre que precisar.
                </Text>

                <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={handleStart}>
                    <Feather name="chevron-right" style={styles.buttonIcon}/>
                    
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    wrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal:20
    },
    title: {
        fontSize:32,
        fontWeight:'bold',//?
        textAlign:'center',
        color: colors.heading,
        marginTop: 78,//38
        fontFamily: fonts.heading,
        lineHeight:38
    },
    img:{
        height: Dimensions.get('window').width * 0.7,
    },
    subTitle:{
        fontSize:17,
        textAlign:'center',
        paddingHorizontal:20,
        lineHeight:17*1.5,
        color:colors.body_dark,
    },
    button:{
        height:56,
        width:56,
        marginBottom:50,
        borderRadius:16,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.green
    },
    buttonIcon:{
        fontSize: 35,
        color: colors.white
    }

})