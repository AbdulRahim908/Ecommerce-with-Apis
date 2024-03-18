import { StyleSheet, Text, View ,Pressable,Image} from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BaseUrl = 'https://fakestoreapi.com/products/category';
const CategoryPage = ({navigation, route}) => {
    const { category } = route.params;
    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategory(category);
      }, [category]);


    // useEffect(() => {
    //     fetchElectronics();
    //     fetchJewelry();
    //     fetchMensClothing();
    //     fetchWomensClothing();
    // }, []);

    // const fetchElectronics = async () => {
    //     try {
    //         const result = await fetch(`${BaseUrl}/electronics`);
    //         const data = await result.json(); // Await the JSON parsing
    //         setCategories(data);
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // }
    // const fetchjewelery = async () => {
    //     try {
    //         const result = await fetch(`${BaseUrl}/jewelery`);
    //         const data = await result.json(); // Await the JSON parsing
    //         setCategories(data);
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // }
    // const fetchmen = async () => {
    //     try {
    //         const result = await fetch(`${BaseUrl}/men's%20clothing`);
    //         const data = await result.json(); // Await the JSON parsing
    //         setCategories(data);
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // }
    // const fetchwomen = async () => {
    //     try {
    //         const result = await fetch(`${BaseUrl}/women's%20clothing`);
    //         const data = await result.json(); // Await the JSON parsing
    //         setCategories(data);
    //         console.log(data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //     }
    // }
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
        //   console.log(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    return (
        
        <View style={styles.container}>
            <FlatList
     data={Categories}
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
         <Icon
        name="heart-o"
        size={18}
        color="black"
      />
         </View>
         {/* <Text style={{fontSize:15,fontWeight:'300',color:'black'}}>{item.rating}</Text> */}
         </Pressable>
       </View>
     )}
     //Setting the number of column
     numColumns={2}
     keyExtractor={item=>item.id}/>
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