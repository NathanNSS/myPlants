import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
    title:String;
}
export function Button({title, ...resto}:ButtonProps){
    return(
        <TouchableOpacity style={styles.button} activeOpacity={0.6} {...resto}>
        <Text style={styles.content}>
            {title}
        </Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        height:56,
        borderRadius:16,
        paddingHorizontal:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.green
    },
    content:{
        fontSize:17,
        fontFamily:fonts.complement,
        color:colors.white,
    }
})