'use strict';

import React, { Component } from 'react';

import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARPlane,
  ViroNode,
  ViroDirectionalLight,
  ViroSpotLight
} from 'react-viro';

var createReactClass = require('create-react-class');

var ItemRender = createReactClass({

  getInitialState(){
    return{
      scale: [0.009, 0.009, 0.009],
      rotation : [0, 0, 0],
      position: [0, -5, -5],
    }
  },

  render() {
    return (
    <ViroARScene> 
      <ViroARPlane>
        <ViroAmbientLight color={"#aaaaaa"} />
          <ViroSpotLight 
          innerAngle={5} 
          outerAngle={90} 
          direction={[0,-1,-.2]}
          position={[0, 3, 1]}
          color="#ffffff" 
          castsShadow={true} />
            <ViroNode
            ref={this._setARNodeRef}
            scale={this.state.scale}
            rotation={this.state.rotation}
            onRotate={this._onRotate}
            onDrag={()=>{}}
            onPinch={this._onPinch}
            position={this.state.position}
            dragType="FixedToWorld">
            <Viro3DObject
                source={require('../res/cadeira/jean_obj.obj')}
                resource={require('../res/cadeira/jean_obj.mtl')}
                type="OBJ"/>
          </ViroNode>
        </ViroARPlane>
      </ViroARScene>
    );
  },

  _setARNodeRef(component) {
    this.arNodeRef = component;
  },

  _onRotate(rotateState, rotationFactor, source) {

    if (rotateState == 3) {
      this.setState({
        rotation : [this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]
      });
      return;
    }
    this.arNodeRef.setNativeProps({rotation:[this.state.rotation[0], this.state.rotation[1] + rotationFactor, this.state.rotation[2]]});
  },

  _onPinch(pinchState, scaleFactor, source) {
    var newScale = this.state.scale.map((x)=>{return x * scaleFactor})

    if (pinchState == 3) {
      this.setState({
        scale : newScale
      });
      return;
    }
    this.arNodeRef.setNativeProps({scale:newScale});
  },
});

module.exports = ItemRender;
