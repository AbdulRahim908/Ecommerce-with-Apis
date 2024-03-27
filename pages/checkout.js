import { StyleSheet, Text, View, ScrollView,  } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, incrementQuantity, } from '../redux/cartReducer';
import { Image, Button} from 'react-native-elements';

const Checkout = () => {
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch();
    const increaseQuantity = (product) => {
        dispatch(incrementQuantity(product));

    }
    const decreaseQuantity = (product) => {
        dispatch(decrementQuantity(product));

    };
    const calculateTotalPrice = () => {
      return cart.reduce((total, item) => total + (item.price * item.quantity || 0), 0);
    };
  
    
    return (
      
        <View style={styles.container}>
        {cart.length === 0 ? (
          <View >
          <Image style={styles.image} source={require('../assets/emptycart.png')}/></View>
        ) : (
          <>
          <ScrollView>
            {cart.map((product, index) => (
                <View  key={index}  style={{
                  flexDirection: 'column',
                  margin: 5,
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: '#dcdcdc',justifyContent:'flex-start',paddingRight:100,width:380
                  
                }}>
                    <View style={{flexDirection:'row'}}>
                      
                    <Image style={{
                        height: 100, width: 150, resizeMode: 'cover',
                        resizeMode: 'stretch'
                    }} source={{ uri: product.image }} />
                    <View>
                    <Text numberOfLines={1} style={{color:'black'}}>{product.title}</Text>
                    <Text style={{color:'black'}}>${product.price}</Text>
                    <Text style={{color:'black'}}>⭐{product.rating.rate}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Button onPress={() => decreaseQuantity(product)} title="-" buttonStyle={styles.quantitybutton}/>
                  <Text style={{ fontSize: 15, fontWeight: '300', color: 'black', marginHorizontal: 10 }}>{product.quantity}</Text>
                  <Button onPress={() => increaseQuantity(product)} title="+" buttonStyle={styles.quantitybutton} />
                </View>

                    </View>
                    </View>
                    
                </View>
            ))}
            <Text style={{color:'green',fontSize:30,fontWeight:'bold'}}>Total Price = ${calculateTotalPrice()}</Text>
            </ScrollView>
            </>
        )}

        </View>
        
    )
}

export default Checkout
// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  quantitybutton:{
    backgroundColor: '#F83758',
    marginLeft:5,
    width:40,
    height:40,
    borderRadius:20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',backgroundColor:'white',paddingTop:30
    
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: 'cover',
  },
})
