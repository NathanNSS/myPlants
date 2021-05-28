import React, { useState } from 'react';
import { 
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    Keyboard,
    Alert,
    
}from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componentes
import { Button } from '../components/Button';

//Classes de estilos
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const [isFocus, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function inputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    function inputFocus(){
        setIsFocused(true);

    }
    function InputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }
    const navigation = useNavigation();

    async function handleSubmit(){
        if(!name)
            return Alert.alert('Me diz como chamar você 😥');
        try{
            await AsyncStorage.setItem('@plantManager:user',name);
            navigation.navigate('Confirmation',{
                title:'Prontinho',
                subTitle:'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle:'Começar',
                icon:'smile',
                nextScreen:'PlantSelect' 
            })
        }catch{
            Alert.alert('Não foi possivel salvar seu nome 😥');
        }
    }
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS == 'ios'? 'padding' : 'height'}
                
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>

                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😆': '😀'}
                                </Text>
                                
                                <Text style={styles.title}>
                                    Como podemos{'\n'}chamar você? 
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocus ||  isFilled) && {borderColor:colors.green}
                                ]}
                                placeholder="Digite um nome"
                                onBlur={inputBlur}                    
                                onFocus={inputFocus}
                                onChangeText={InputChange}            
                            />
                            <View style={styles.footer}>
                                <Button title="Confirmar" onPress={handleSubmit}/>                
                            </View>
                            
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'space-around',
    },
    content:{
        flex:1,
        width:'100%',
        
    },
    form:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:54,
        
    },
    header:{
        alignItems:'center',
    },
    title:{
        textAlign:'center',
        fontSize:24,
        fontFamily: fonts.heading,
        lineHeight:20*1.5,
        color:colors.heading
        
    },
    emoji:{
        fontSize:44,
        marginVertical:20
    },
    input:{
        borderBottomWidth:1,
        borderColor:colors.gray,
        color:colors.heading,
        width:'100%',
        fontSize:18,
        padding:10,
        marginTop:50,
        textAlign:'center'
    },
    footer:{
        marginTop:60,
        width:'100%',
        paddingHorizontal:20
    }

});