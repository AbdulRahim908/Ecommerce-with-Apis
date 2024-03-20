import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ScrollView, Image, Pressable,TextInput,ActivityIndicator} from 'react-native'
import React, { useContext } from 'react'
import useNavigation from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import { Header, Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native';
import { Products } from '../data/constants'
import { useEffect, useState } from "react";
const BaseUrl = 'https://fakestoreapi.com/products';

const Home = ({ navigation }) => {

  const imageUrl = 'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'
  const [products, setProducts] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortByDesc, setSortByDesc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [sortByDesc]);

  const fetchProduct = async () => {
    try {
      const result = await fetch(`${BaseUrl}${sortByDesc ? '?sort=desc' : ''}`);
      const data = await result.json();
      setProducts(data);
      setMasterData(data);
      setIsLoading(false);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const titleData = item.title ? item.title.toUpperCase() : '';
        const descriptionData = item.description ? item.description.toUpperCase() : '';
        const textData = text.toUpperCase();
        return titleData.includes(textData) || descriptionData.includes(textData);
      });
      setProducts(newData);
      setSearch(text);
    } else {
      setProducts(masterData);
      setSearch(text);
    }
  }
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const toggleHeartColor = (productId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          isHeartFilled: !product.isHeartFilled // Toggle heart state for the clicked product
        };
      }
      return product;
    }));
  };
  if (!products) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Header backgroundColor='white'
        placement="center"
        // leftComponent={{ icon: 'menu', color: 'black' }}
        centerComponent={{ text: 'Stylish', style: { color: 'black', fontSize: 20, fontWeight: 'bold' } }}
        rightComponent={
          <Avatar
            rounded
            source={{ uri: imageUrl }}
            size='small'
            onPress={() => navigation.navigate('Settings')}
          />
        }
      />
      <TextInput

        placeholder='Search Any product'
        placeholderTextColor='black'
        style={{ backgroundColor: 'white', height: 50, width: "100%", borderColor: '#dcdcdc', borderWidth: 1 }}

        onChangeText={(text) => searchFilter(text)}
      />
      <View style={styles.featured}>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: '600' }}>All Featured</Text>
        <View style={{ gap: 10, alignItems: 'center', flexDirection: 'row', marginLeft: 170 }}>
          <Button title=" sort" color="black" buttonStyle={styles.button} onPress={() => setSortByDesc(!sortByDesc)}
            icon={
              <Icon
                name="sort"
                size={15}
                color="white"
              />
            }

          />

        </View>
      </View>
      <View style={styles.circles}>
        <Avatar
          size='medium'
          rounded
          source={require('../assets/electronics.jpg')} onPress={() => navigation.navigate('CategoryPage', { category: 'electronics' })}
        />
        <Avatar
          size='medium'
          rounded
          source={require('../assets/jewelery.jpg')} onPress={() => navigation.navigate('CategoryPage', { category: 'jewelery' })}
        />

        <Avatar
          size='medium'
          rounded
          source={require('../assets/mens.png')} onPress={() => navigation.navigate('CategoryPage', { category: 'men\'s%20clothing' })}
        />
        <Avatar
          size='medium'
          rounded
          source={require('../assets/womens.png')} onPress={() => navigation.navigate('CategoryPage', { category: 'women\'s%20clothing' })}
        />
      </View>
      <View style={styles.circlenames}>
        <Text style={{ color: 'black' }}>electronics</Text>
        <Text style={{ color: 'black' }}>jewelery</Text>
        <Text style={{ color: 'black' }}>  Mens</Text>
        <Text style={{ color: 'black' }}>   Womens</Text>
      </View >
      <View style={styles.cardContainer}>
      {isLoading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 5,
                height: 250,
                borderRadius: 15,
                overflow: 'hidden',
                backgroundColor: '#dcdcdc',



              }}><Pressable onPress={() => navigation.navigate('ProductDetail', { product: item },)}>
                <Image
                  style={styles.imageThumbnail}
                  source={{ uri: item.image }}
                />

                <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: '900', color: 'black' }}>{item.title}</Text>

                <Text numberOfLines={2} style={{ fontSize: 15, fontWeight: '300', color: 'black', lineHeight: 20, maxHeight: 40 }}>{item.description}</Text>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}> ${item.price}</Text>
                  <TouchableOpacity onPress={() => toggleHeartColor(item.id)}>
                    <Icon
                      name={item.isHeartFilled ? 'heart' : 'heart-o'}
                      size={30}
                      color={item.isHeartFilled ? 'red' : 'black'}
                    />
                  </TouchableOpacity>
                </View>
              </Pressable>
            </View>
          )}

          numColumns={2}
          keyExtractor={item => item.id} />
          )}
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, gap: 10
    // justifyContent:'center',
    // alignItems:'center'  
  },
  featured: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 5

  },
  button: {
    backgroundColor: 'black'

  },
  circles: {
    gap: 38,
    flexDirection: 'row',
    marginLeft: 5

  },
  circlenames: {
    gap: 28,
    flexDirection: 'row',
    // marginLeft:
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    // borderColor:'black'

  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
    resizeMode: 'stretch',

  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

})
export default Home