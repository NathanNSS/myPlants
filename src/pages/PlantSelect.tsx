import React, { useEffect, useState } from 'react';
import { 
    StyleSheet,
    FlatList, 
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import { EnvironmentButton } from '../components/EnvironmentButton';

import { Header } from '../components/Header';
import { PlanCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentsProps{
    key: string;
    title: string;    
}

interface PlantsProps{
    id: string;
    name: string;
    about:string;
    water_tips:string;
    photo:string;
    environments: [string],
    frequency: {
    times: number;
    repeat_every: string;
    }
}

export function PlantSelect(){
    
    const [environments, setEnvironments] = useState<EnvironmentsProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredPlants, setfilteredPlants] = useState<PlantsProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);
    
    function handleEvironmetSelected (environment: string){
        setEnvironmentSelected(environment);

        if( environment == 'all')
        return setfilteredPlants(plants);

        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        );

        setfilteredPlants(filtered); 
    }
    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true)
        
        if(page > 1){
            setPlants( oldValue => [...oldValue, ...data]);
            setfilteredPlants(oldValue => [...oldValue, ...data]);
        }else{

            setPlants(data);
            setfilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    useEffect( () => {

        async function fetchEnvironment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title:'Todos',
                },
                ...data
            ]);
        }

        fetchEnvironment();
    },[])
   
    useEffect( () => {
        fetchPlants();
    },[])

    if(loading)
    return <Load/>
    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subTitle}>
                    Você quer colocar sua planta ?
                </Text>
            </View>
            <View>
                <FlatList
                    data={environments}
                    renderItem={({item})=>(

                        <EnvironmentButton 
                            title={item.title} 
                            active={item.key === environmentSelected}
                            onPress={() => handleEvironmetSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listaAmbientes}
                />
            </View>
            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({item})=>(

                        <PlanCardPrimary data={item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) =>{ handleFetchMore(distanceFromEnd) }}
                    ListFooterComponent={
                        loadingMore ? <ActivityIndicator color={colors.green}/> : <></>
                    }
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
    },
    header:{
        paddingHorizontal:30,
    },
    title:{
        fontSize:17,
        color:colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subTitle:{
        fontSize:17,
        lineHeight: 20,
        color:colors.heading,
        fontFamily: fonts.text,
    },
    listaAmbientes:{
        height:40,
        justifyContent:'center',
        paddingBottom: 5,
        marginLeft: 0,
        marginVertical: 30
    },
    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})