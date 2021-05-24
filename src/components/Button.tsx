import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';

import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps{
    title:String;
}
export function Button({title, ...resto}:ButtonProps){
    return(
        <TouchableOpacity style={styles.button} activeOpacity={0.6} {...resto}>
        <Text style={{color:'white'}}>
            {title}
        </Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        height:56,
        marginBottom:50,
        borderRadius:16,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.green
    }
})