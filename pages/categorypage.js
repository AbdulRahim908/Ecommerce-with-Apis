import { StyleSheet, Text, View ,Pressable,Image,TouchableOpacity,ActivityIndicator} from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist,removeFromWishlist } from '../redux/wishListReducer';
const BaseUrl = 'https://fakestoreapi.com/products/category';
const CategoryPage = ({navigation, route}) => {
    const { category } = route.params;
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchCategory(category);
      }, [category]);

    useEffect(() => {
        fetchCategory(category);
        // Update header title dynamically
        navigation.setOptions({
          title: category, // Set the title to the selected category
        });
      }, [category]);
    const fetchCategory = async (category) => {
        try {
          const result = await fetch(`${BaseUrl}/${category}`);
          const data = await result.json();
          setCategories(data);
          setIsLoading(false);
        //   console.log(data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setIsLoading(false);
        }
      };
      const [isHeartFilled, setIsHeartFilled] = useState(false);

      const toggleHeartColor = (productId) => {
        setCategories(categories.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              isHeartFilled: !product.isHeartFilled // Toggle heart state for the clicked product
            };
          }
          return product;
        }));
      };
      const wishlist = useSelector((state) => state.wishlist.wishlist)
  console.log(wishlist)
  const dispatch = useDispatch();
  const addProductToWishList =(product) => {
    const isInWishlist = wishlist.find((item) => item.id === product.id);
  if (isInWishlist) {
    dispatch(removeFromWishlist(product));
  } else {
    dispatch(addToWishlist(product));
  }
  };
    return (
        
        <View style={styles.container}>
          {isLoading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
            <FlatList
     data={categories}
     renderItem={({item}) => (
       <View
         style={{
           flex: 1,
           flexDirection: 'column',
           margin: 5,
           height:250,
          borderRadius:15,
          overflow: 'hidden',
          backgroundColor:'#dcdcdc',
          
          
          
         }}><Pressable onPress={()=>navigation.navigate('ProductDetail', { product: item },)}>
         <Image
           style={styles.imageThumbnail}
           source={{ uri: item.image }}
         />
         
         <Text numberOfLines={1} style={{fontSize:20,fontWeight:'900',color:'black'}}>{item.title}</Text>
         
         <Text numberOfLines={2} style={{fontSize:15,fontWeight:'300',color:'black',lineHeight:20,maxHeight:40}}>{item.description}</Text>
         <View style={{flexDirection:'row', gap:10, justifyContent:'space-between'}}>
         <Text style={{fontSize:18,fontWeight:'500',color:'black'}}> ${item.price}</Text>
         <TouchableOpacity onPress={() => {toggleHeartColor(item.id); addProductToWishList(item);}}>
              <Icon
                name={item.isHeartFilled ? 'heart' : 'heart-o'}
                size={30}
                color={item.isHeartFilled ? 'red' : 'black'}
              />
            </TouchableOpacity>
         </View>
         {/* <Text style={{fontSize:15,fontWeight:'300',color:'black'}}>{item.rating}</Text> */}
         </Pressable>
       </View>
     )}
     //Setting the number of column
     numColumns={2}
     keyExtractor={item=>item.id}/>
     )}
        </View>
        

    )
}

export default CategoryPage

const styles = StyleSheet.create({
    container:{
        flex:1,marginTop:40

    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        alignSelf:'center',
        width:'100%',
        borderRadius:15,
        resizeMode:'cover',
        resizeMode:'stretch',
        
      },
})