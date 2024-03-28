import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,  removeFromCart } from '../redux/cartReducer';
import Snackbar from 'react-native-snackbar';
const ProductDetail = ({ route ,navigation}) => {
  const { product } = route.params;
  const cart = useSelector((state) => state.cart.cart)
  console.log(cart);
  const dispatch = useDispatch();
  const addproductToCart = (product) => {
    dispatch(addToCart(product));
  };
  const removeProductFromCart=(product)=>{
    dispatch(removeFromCart(product));

  }

  return (
    <ScrollView>
      <SafeAreaView>
      <View style={styles.container}>

        <Image style={styles.imageThumbnail} source={{ uri: product.image }} />
        <View style={{ padding: 7, gap: 7 }}>
          <Text style={{ fontSize: 25, fontWeight: '900', color: 'black' }}>{product.title}</Text>
          
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}> ${product.price}</Text>
  <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}> ⭐ {product.rating.rate}</Text>
  <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Product Details:</Text>
  <Text style={{ fontSize: 15, fontWeight: '300', color: 'black' }}>{product.description}</Text>
  <View style={{ flexDirection: 'row',gap:5 }}>
    <Image style={{height:30,width:120}} source={require('../assets/Frame1.png')} />
    <Image style={{height:30,width:60}} source={require('../assets/Frame2.png')} />
    <Image style={{height:30,width:125}} source={require('../assets/Frame3.png')} />
  </View>
          {cart.some((value) => value.id == product.id) ? 
          (<Button title="   Remove from cart" buttonStyle={styles.button}
           onPress={() => {removeProductFromCart(product); Snackbar.show({
            text: 'Item removed from your cart',
            duration: Snackbar.LENGTH_SHORT,textColor:"white",backgroundColor:"#F83758",action: {
              text: 'check',
              textColor: 'white',
              onPress: () => navigation.navigate('Checkout'),
            },
          });}}
            icon={
              <Icon
                name="shopping-cart"
                size={50}
                color="white"
              />
            }
          />

          ) : (
            <Button title="   Add to cart" buttonStyle={styles.button} onPress={() => 
              {addproductToCart(product); Snackbar.show({
              text: 'Item Added in your cart',
              duration: Snackbar.LENGTH_SHORT,textColor:"white",backgroundColor:"#F83758",action: {
                text: 'check',
                textColor: 'white',
                onPress: () => navigation.navigate('Checkout'),
              },
            });}}
              icon={
                <Icon
                  name="shopping-cart"
                  size={50}
                  color="white"
                />
              }
            />
          )}

        </View>
        
      </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignproducts: 'center',
    flex: 1,
    gap: 5, width: 400,paddingTop:40,alignItems:'center',alignSelf:'center'

  },
  imageThumbnail: {
    alignSelf: 'center',
    height: 350,
    alignproducts: 'center',
    width: 410,
    
    borderRadius: 40,
    resizeMode: 'stretch',


  },
  button: {
    backgroundColor: 'green',
    alignSelf: 'flex-start'
  },

})