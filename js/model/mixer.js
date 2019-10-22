'use strict';

import React, { Component } from 'react';

import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARScene,
  ViroARPlane,
  ViroNode,
  ViroSpotLight
} from 'react-viro';

var createReactClass = require('create-react-class');

var ItemRender = createReactClass({

  getInitialState(){
    return{
      scale: [0.1, 0.1, 0.1],
      rotation : [-90, 0, 0],
      position: [0, -10, -40],
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
            position={this.state.position}
            onPinch={this._onPinch}
            dragType="FixedToWorld">
              <ViroAmbientLight color={"#aaaaaa"} />
                <Viro3DObject
                source={require('../res/mixer/11653_Stand_Mixer_v1_L3.obj')}
                resource={require('../res/mixer/11653_Stand_Mixer_v1_L3.mtl')}
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
