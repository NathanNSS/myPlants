import React, { useState } from 'react';
import {SafeAreaView, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'; 

import {Button} from '../components/Button';
export function Welcome(){
    const [visivel, setVisivel] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Gerencie {`\n`} suas plantas de {`\n`} forma fácil
            </Text>
            {
                !visivel &&
                <Image source={wateringImg} style={styles.img}/>

            }

            <Text style={styles.subTitle}>
                Não esqueça mais de regar suas {`\n`} plantas.
                Nós cuidamos de lembrar você{`\n`}
                sempre que precisar.
            </Text>

            <Button title="Imagen" onPress={() => setVisivel(!visivel)} />
            {/* <TouchableOpacity style={styles.button} activeOpacity={0.6}>
                <Text style={{color:'white'}}>
                    Next
                </Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
    },
    title: {
        fontSize:32,
        fontWeight:'bold',
        textAlign:'center',
        color: colors.heading,
        marginTop: 78,//38
    },
    img:{
        width:292,
        height:284,
    },
    subTitle:{
        fontSize:18,
        textAlign:'center',
        paddingHorizontal:20,
        color:colors.body_dark
    },
    // button:{
    //     height:56,
    //     width:56,
    //     marginBottom:50,
    //     borderRadius:16,
    //     paddingHorizontal:10,
    //     justifyContent:'center',
    //     alignItems:'center',
    //     backgroundColor: colors.green
    // }

})