import { StyleSheet, Text, View ,ScrollView,Pressable} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image, } from 'react-native-elements';
import { removeFromWishlist } from '../redux/wishListReducer';
import Icon from 'react-native-vector-icons/FontAwesome';

const WishList = ({navigation}) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist)
  const dispatch = useDispatch();
  const removeProductFromWishList=(item)=>{
    dispatch(removeFromWishlist(item));
  }
  return (
    <View>
      <View style={styles.container}>
        {wishlist.length === 0 ? (
          <View >
          <Image style={styles.image} source={require('../assets/emptywishlist.jpg')}/></View>
        ) : (
          <>
          <ScrollView>
            {wishlist.map((item, index) => (
                <View  key={index}  style={{
                  flexDirection: 'column',
                  margin: 5,
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: '#dcdcdc',justifyContent:'flex-start',paddingRight:100,width:400
                  
                }}><Pressable onPress={()=>navigation.navigate('ProductDetail', { product: item },)}>
                    <View style={{flexDirection:'row'}}>
                      
                    <Image style={{
                        height: 100, width: 150, resizeMode: 'cover',
                        resizeMode: 'stretch'
                    }} source={{ uri: item.image }} />
                    <View>
                    <Text numberOfLines={1} style={{color:'black'}}>{item.title}</Text>
                    <Text style={{color:'black'}}>${item.price}</Text>
                    <Text style={{color:'black'}}>⭐{item.rating.rate}</Text>
                    {/* <Pressable onPress={()=>removeProductFromWishList(item)}><Icon name='trash-o'size={25}
                  color="black"/></Pressable> */}
                   
                

                    </View>
                    </View>
                    </Pressable>
                </View>
            ))}
            </ScrollView>
            </>
        )}

        </View>
        
   
    </View>
  )
}

export default WishList

const styles = StyleSheet.create({
  
  image: {
    width: 500,
    height: '98%',
    resizeMode: 'cover', paddingTop:100
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems:'center',backgroundColor:'white'
   
  },
})