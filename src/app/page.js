"use client";
import * as React from 'react'
import Controller from './controller.js'

export default function Home() {
  const [rendered,set_rendered] = React.useState(false)
  const robotNameList = ["4_DoF"]
  const [robotName,set_robotName] = React.useState(robotNameList[0])
  const [j1_rotate,set_j1_rotate] = React.useState(0)
  const [j2_rotate,set_j2_rotate] = React.useState(-85)
  const [j3_rotate,set_j3_rotate] = React.useState(170)
  const [j4_rotate,set_j4_rotate] = React.useState(5)
  const [j5_rotate,set_j5_rotate] = React.useState(0)
  const [c_pos_x,set_c_pos_x] = React.useState(0)
  const [c_pos_y,set_c_pos_y] = React.useState(0.2)
  const [c_pos_z,set_c_pos_z] = React.useState(0.5)
  const [c_deg_x,set_c_deg_x] = React.useState(0)
  const [c_deg_y,set_c_deg_y] = React.useState(0)
  const [c_deg_z,set_c_deg_z] = React.useState(0)
  let registered = false

  const robotChange = ()=>{
    const get = (robotName)=>{
      let changeIdx = robotNameList.findIndex((e)=>e===robotName) + 1
      if(changeIdx >= robotNameList.length){
        changeIdx = 0
      }
      return robotNameList[changeIdx]
    }
    set_robotName(get)
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      require("aframe");
      setTimeout(set_rendered(true),1000)
      console.log('set_rendered')

      if(!registered){
        registered = true
        AFRAME.registerComponent('robot-click', {
          init: function () {
            this.el.addEventListener('click', (evt)=>{
              robotChange()
              console.log('robot-click')
            });
          }
        });
      }
    }
  }, [typeof window])

  const controllerProps = {
    robotName, robotNameList, set_robotName,
    j1_rotate,set_j1_rotate,j2_rotate,set_j2_rotate,j3_rotate,set_j3_rotate,
    j4_rotate,set_j4_rotate,j5_rotate,set_j5_rotate,
    c_pos_x,set_c_pos_x,c_pos_y,set_c_pos_y,c_pos_z,set_c_pos_z,
    c_deg_x,set_c_deg_x,c_deg_y,set_c_deg_y,c_deg_z,set_c_deg_z
  }

  const robotProps = {
    robotNameList, robotName, j1_rotate, j2_rotate, j3_rotate, j4_rotate, j5_rotate
  }

  if(rendered){
    return (
    <>
      <a-scene>
        <a-plane position="0 0 0" rotation="-90 0 0" width="10" height="10" color="#7BC8A4" shadow></a-plane>
        <Assets/>
        <Select_Robot {...robotProps}/>
        <a-entity light="type: directional; color: #FFF; intensity: 0.8" position="1 2 1"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.8" position="-1 1 2"></a-entity>
        <a-entity id="rig" position={`${c_pos_x} ${c_pos_y} ${c_pos_z}`} rotation={`${c_deg_x} ${c_deg_y} ${c_deg_z}`}>
          <a-camera id="camera" cursor="rayOrigin: mouse;" position="0 0 0"></a-camera>
        </a-entity>
      </a-scene>
      <Controller {...controllerProps}/>
    </>
    );
  }else{
    return(
      <a-scene>
        <Assets/>
      </a-scene>
    )
  }
}

const Assets = ()=>{
  return (
    <a-assets>
      {/*4_DoF*/}
      <a-asset-items id="j0" src="link_0.gltf" ></a-asset-items>
      <a-asset-items id="j1" src="link_1.gltf" ></a-asset-items>
      <a-asset-items id="j2" src="link_2.gltf" ></a-asset-items>
      <a-asset-items id="j3" src="link_3.gltf" ></a-asset-items>
      <a-asset-items id="j4" src="link_4.gltf" ></a-asset-items>
      <a-asset-items id="j5_l" src="finger_l.gltf" ></a-asset-items>
      <a-asset-items id="j5_r" src="finger_r.gltf" ></a-asset-items>
    </a-assets>
  )
}

const Four4_DoF = (props)=>{
  const {visible, j1_rotate, j2_rotate, j3_rotate, j4_rotate, j5_rotate} = props
  return (<>{visible?
    <a-entity gltf-model="#j0" position="0 0 0" rotation={`0 0 0`}>
      <a-entity gltf-model="#j1" position="0 0.046 0" rotation={`0 ${j1_rotate} 0`}>
        <a-entity gltf-model="#j2" position="0 0.0538 0" rotation={`0 0 ${-j2_rotate}`}>
          <a-entity gltf-model="#j3" position="0.02533 0.13785 0" rotation={`0 0 ${-j3_rotate}`}>
            <a-entity gltf-model="#j4" position="0 0.16325 -0.0002" rotation={`0 0 ${-j4_rotate}`}>
              <a-entity gltf-model="#j5_l" position="0 0.05075 -0.0128" rotation={`${-j5_rotate} 0 0`}></a-entity>
              <a-entity gltf-model="#j5_r" position="0 0.05075 0.0128" rotation={`${j5_rotate} 0 0`}></a-entity>
            </a-entity>
          </a-entity>
        </a-entity>
      </a-entity>
    </a-entity>:null}</>
  )
}

const Select_Robot = (props)=>{
  const {robotNameList, robotName, ...rotateProps} = props
  const visibletable = robotNameList.map(()=>false)
  const findindex = robotNameList.findIndex((e)=>e===robotName)
  if(findindex >= 0){
    visibletable[findindex] = true
  }
  return (<>
    <Four4_DoF visible={visibletable[0]} {...rotateProps}/>
  </>)
}









