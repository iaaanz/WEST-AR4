/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';
/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"DE4043C0-80FB-4196-B3A5-20A2A270691C",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./model/CenaErro.js');
var InitialARScene1 = require('./model/abajur.js');
var InitialARScene2 = require('./model/cadeira.js');
var InitialARScene3 = require('./model/mixer.js');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";
var AR_NAVIGATOR_TYPE2 = "AR2";
var AR_NAVIGATOR_TYPE3 = "AR3";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator(1);
    }else if (this.state.navigatorType == AR_NAVIGATOR_TYPE2){
      return this._getARNavigator(2);
    }else if (this.state.navigatorType == AR_NAVIGATOR_TYPE3){
      return this._getARNavigator(3);
    }
  }

  // Presents the user with a choice of an AR or VR experience
  //Tela
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.header}>
            <Text style={localStyles.TextoCabecalho}>Seleção de Objetos</Text>
          </View>
        <View style={localStyles.inner}>
          
        <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
            underlayColor={'#68a0ff'} >
              <View style={localStyles.innerButtons}>
              <Image style={localStyles.imageButtons}></Image>
            <Text style={localStyles.tituloButtons}>Esse é o titulo do botão 1</Text>
            </View>
          </TouchableHighlight>
                  <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE2)}
            underlayColor={'#68a0ff'} >

             <View style={localStyles.innerButtons}>
              <Image style={localStyles.imageButtons}></Image>
            <Text style={localStyles.tituloButtons}>Esse é o titulo do botão 2</Text>
            </View>
          </TouchableHighlight>
                  <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE3)}
            underlayColor={'#68a0ff'} >

             <View style={localStyles.innerButtons}>
              <Image style={localStyles.imageButtons}></Image>
            <Text style={localStyles.tituloButtons}>Esse é o titulo do botão 3</Text>
            </View>
          </TouchableHighlight>
          </View>
          </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator(x) {
    switch (x) {
      case 1:
          return (
      
            <ViroARSceneNavigator {...this.state.sharedProps}
              initialScene={{scene: InitialARScene1}} />
          );
        case 2:
          return (
      
            <ViroARSceneNavigator {...this.state.sharedProps}
              initialScene={{scene: InitialARScene2}} />
          );
        case 3:
          return (
      
            <ViroARSceneNavigator {...this.state.sharedProps}
              initialScene={{scene: InitialARScene3}} />
          );
    
      default:
          return (
      
            <ViroARSceneNavigator {...this.state.sharedProps}
              initialScene={{scene: InitialARScene}} />
          );
    }
    
  }
  

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  descricao:{
    flex: 0.4,
    alignContent: 'center',
    alignItems: "center"

  },
  header :{
    flex : 0.1,
    flexDirection: 'row',
    backgroundColor: "#3474eb",
    padding: 15,
    paddingLeft: 30
  },
  TextoCabecalho :{
    flex: 1,
    fontSize: 30,
    textAlign:'left',
    textAlignVertical:'bottom',
    color: 'white'
  }, 
  outer : {
    flex: 1,
    alignContent: 'center',
    backgroundColor: "#f7f6f6",
  },
  inner: {
    flex : 1,
    paddingTop: 25,
    alignContent:'stretch',
    alignItems: 'center',
    backgroundColor: "#f7f6f6",
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 110,
    width: 350,
    backgroundColor:'transparent',
    borderWidth: 0.5,
    borderColor: '#22262e',
    marginBottom: 5,
  },
  innerButtons:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#dbdbdb',
    alignContent: 'center'
  },
  imageButtons:{
    height: 110,
    width: 350/3,
    
  },
  tituloButtons:{
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 25,
    marginLeft: 20,
    color: '#3b3b3b'
  },
  descricaoButtons:{

  },

});

module.exports = ViroSample
