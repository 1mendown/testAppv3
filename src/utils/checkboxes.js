import React, { Component } from 'react';
import {StyleSheet,Text,View,Button,CheckBox} from 'react-native';


const checkboxes = () => {
    
      cB1()
      {
        this.setState({one:true,two:false,three:false,four:false});

      }
      cB2() {
        this.setState({one:false,two:true,three:false,four:false});
      }
      cB3() {
        this.setState({one:false,two:false,three:true,four:false});
      }
      cB4() {
        this.setState({one:false,two:false,three:false,four:true});
      }



}


export default checkboxes;
