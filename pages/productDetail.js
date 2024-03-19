import { StyleSheet, Text, View,Pressable } from 'react-native';
import React from 'react';
// import {dataSource} from '../data/constants';
import { Image ,Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const ProductDetail = ({route,navigation}) => {
  const { product } = route.params;
  const handleCheckout = () => {

    navigation.navigate('Checkout', { product });
  };
  return (
    <View style={styles.container}>
      
    <Image style={styles.imageThumbnail} source={{ uri: product.image }} />
    <Text style={{ fontSize: 25, fontWeight: '900', color: 'black' }}>{product.title}</Text>
    <Text style={{color:'black',fontSize:18,fontWeight:'600'}}>Product Details:</Text>
    <Text style={{ fontSize: 15, fontWeight: '300', color: 'black' }}>{product.description}</Text>
    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}> ${product.price}</Text>
    <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}> ⭐ {product.rating.rate}</Text>
    {/* <Text style={{ fontSize: 15, fontWeight: '300', color: 'black' }}>Rating {product.rating}</Text> */}
    <Button title=" Go to cart"  buttonStyle={styles.button} onPress={handleCheckout}
    icon={
      <Icon
        name="shopping-cart"
        size={15}
        color="white"
      />
    }
    />
  </View>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container:{
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex:1,
    gap:5,width:400

  },
  imageThumbnail: {
    alignSelf:'center',
    height: 300,
    alignItems:'center',
    width:410,
    resizeMode:'cover',
    borderRadius:0,
    resizeMode:'stretch',
    
    
  },
  button:{
    backgroundColor:'green',
    marginLeft:5
  },
 
})