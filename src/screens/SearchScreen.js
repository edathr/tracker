import React, {useContext, useEffect} from 'react';

// Components
import {StyleSheet,FlatList} from 'react-native';
import ListItems from '../components/ListItems';

// Context
import { Context } from '../context/TrackerContext';

const SearchScreen = ({ search, navigation }) => {
    const { state, getCategory } = useContext(Context);

    useEffect(() => {
        getCategory();

        const listener = navigation.addListener('didFocus', () => {
            getCategory();
        })

        //cleans up listener
        return () => {
            listener.remove();
        };
    }, [])

    console.log(state.categories);

    const filter = (categories) => {
        const results = [];
        for (const category of categories) {
            for (const item of Object.values(category.items)) {
                if (item.title.toLowerCase().includes(search.toLowerCase())) {
                    item.catid = category.catid;
                    results.push(item);
                }
            }
        }
        return results;
    }

    const renderList = (data) => {
        return <ListItems 
            key={data.itemid}
            title={data.title} 
            itemid={data.itemid}
            started={data.started}
            catid={data.catid}
        />
    }

    return (
        <FlatList 
            data={filter(state.categories)}
            renderItem={({item}) => renderList(item)}
            keyExtractor={item => item.itemid}
        />
    )
}

const styles = StyleSheet.create({

});

export default SearchScreen;