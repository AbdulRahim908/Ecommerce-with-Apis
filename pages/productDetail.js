import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,  removeFromCart } from '../redux/cartReducer';
import Snackbar from 'react-native-snackbar';
const ProductDetail = ({ route }) => {
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
      <View style={styles.container}>

        <Image style={styles.imageThumbnail} source={{ uri: product.image }} />
        <View style={{ padding: 10, gap: 5 }}>
          <Text style={{ fontSize: 25, fontWeight: '900', color: 'black' }}>{product.title}</Text>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '600' }}>Product Details:</Text>
          <Text style={{ fontSize: 15, fontWeight: '300', color: 'black' }}>{product.description}</Text>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}> ${product.price}</Text>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}> ⭐ {product.rating.rate}</Text>
          {cart.some((value) => value.id == product.id) ? 
          (<Button title="   Remove from cart" buttonStyle={styles.button} onPress={() => {removeProductFromCart(product); Snackbar.show({
            text: 'Item removed from your cart',
            duration: Snackbar.LENGTH_SHORT,textColor:"white",backgroundColor:"red"
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
            <Button title="   Add to cart" buttonStyle={styles.button} onPress={() => {addproductToCart(product); Snackbar.show({
              text: 'Item Added in your cart',
              duration: Snackbar.LENGTH_SHORT,textColor:"white",backgroundColor:"red"
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
    </ScrollView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignproducts: 'flex-start',
    flex: 1,
    gap: 5, width: 400,

  },
  imageThumbnail: {
    alignSelf: 'center',
    height: 300,
    alignproducts: 'center',
    width: 410,
    resizeMode: 'cover',
    borderRadius: 0,
    resizeMode: 'stretch',


  },
  button: {
    backgroundColor: 'green',
    alignSelf: 'flex-start'
  },

})