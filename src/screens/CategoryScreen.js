import React, { useState, useContext, useEffect } from 'react';

// Components
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import ListItems from '../components/ListItems';
import AddItemDialog from '../components/AddItemDialog';
import { SearchBar, Card } from 'react-native-elements';
import Grid from 'react-native-grid-component';

// Gradient
import {LinearGradient} from 'expo-linear-gradient';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Context
import { Context } from '../context/TrackerContext';


const CategoryScreen = ({ navigation }) => {
    const { state, addItem, getCategory } = useContext(Context);
    const catid = navigation.getParam('catid')
    const [items, setItems] = useState([]);

    useEffect(() => {
        getCategory();
        const category = state.categories.find((category) => category.catid === catid);
        if (category.items === undefined) {
            setItems([]);
        } else {
            setItems(Object.values(category.items));
        }

        const listener = navigation.addListener('didFocus', () => {
            getCategory();
            const category = state.categories.find((category) => category.catid === catid);
            if (category.items === undefined) {
                setItems([]);
            } else {
                setItems(Object.values(category.items));
            }
        })

        //cleans up listener
        return () => {
            listener.remove();
        };
    }, [])

    const started = items.filter((item) => item.started === true)

    const [isModalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const updateSearch = (newSearch) => {
        setSearch(newSearch);
    }

    const renderItem = (data) => {
        return (
            <ListItems 
                key={data.itemid}
                title={data.title} 
                itemid={data.itemid}
                started={data.started}
                catid={catid}
            />
        )
    };

    const renderWatch = (data) => {
        return (
            <Text style={styles.item}>
                {data.title}
            </Text>
        )
    }

    return (
        <LinearGradient 
            colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#CCDCFD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{flex: 1}}
        >
            <SearchBar 
                placeholder="Search"
                containerStyle={styles.searchbar}
                inputContainerStyle={{backgroundColor: 'transparent'}}
                onChangeText={(newSearch) => updateSearch(newSearch)}
                value={search}
            />
            
            <TouchableOpacity 
                onPress={() => openModal() }
                style={styles.addbutton}
            >
                <Ionicons style={styles.icon} name="ios-add-circle-outline" size={30}/>
                <Text style={styles.buttontext}>Add Item</Text>
            </TouchableOpacity>
            
            <View>
                <Card containerStyle={styles.container}>
                    <Text style={styles.header}>
                        Currently Started:
                    </Text>
                    {started.length !== 0 ?<FlatList 
                        data={started}
                        renderItem={({item}) => renderWatch(item)}
                        keyExtractor={item => item.itemid}
                    />: <Text>Nothing started yet!</Text>}
                </Card>
            </View>

            <Grid 
                renderItem={renderItem}
                data={items}
                numColumns={1}
            />

            <AddItemDialog 
                isModalVisible={isModalVisible} 
                closeModal={closeModal} 
                type={'book'}
                catid={catid}
                onSubmit={(title) => {
                    addItem(catid, title, closeModal)
                }}
            />
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    icon: {
        color: 'white', 
        marginRight: 10
    },
    buttontext: {
        color: 'white',
    },
    addbutton: {
        borderRadius: 5,
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#7E82C4',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    searchbar: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    container: {
        borderRadius: 10,
        backgroundColor: '#CCDCFD'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 10
    },
    item: {
        paddingVertical: 5
    }
});

export default CategoryScreen;