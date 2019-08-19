import React, { Component } from 'react';
import {StyleSheet,Text,View,Button,CheckBox} from 'react-native';

const renderItems = () => {
  return (

    <SafeAreaView style={{flex:1,flexDirection:'row',marginBottom:3}}>
        <Image style={{width:120,height:120,margin:5,resizeMode:'contain'}}
          source={{uri:item.image}}/>
          <View>
            <Text style={{position:'absolute',top:'15%',color:'#1da548'}}>
            {item.status}
            </Text>
            <Text style={{marginTop:"30%",fontWeight:'bold'}}>
              {item.resName}
             </Text>
             <Text style={{fontSize:12,opacity:0.7}}>
              {item.address}
            </Text>
            <View  style={{position:'absolute',right:"-70%",marginTop:'10%'}}>
             <Text style={{backgroundColor:'green',padding:2,borderRadius:10,zIndex:2,color:'whitesmoke'}}>
              {item.ratings} <Icon name="ios-star" size={14} />
              </Text>
             </View>
            <View style={{position:'absolute',right:"-65%",marginTop:'25%'}}>
             <Text style={{fontSize:12,color:'orange'}}>
              {item.distance}km
            </Text>
            </View>
          </View>
    </SafeAreaView>

    )



}


export default renderItems;
