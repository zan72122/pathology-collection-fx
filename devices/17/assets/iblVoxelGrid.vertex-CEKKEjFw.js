import{t as e}from"./shaderStore-D-XQlhUT.js";import{t}from"./bonesDeclaration-oDxSsnww.js";import{t as n}from"./bonesVertex-BZbvWQw2.js";import{t as r}from"./morphTargetsVertex-Uz52QWNe.js";import{t as i}from"./morphTargetsVertexDeclaration-DQIU8BV5.js";import{t as a}from"./morphTargetsVertexGlobal-Bo-wqe4M.js";import{t as o}from"./morphTargetsVertexGlobalDeclaration-D6da8uHC.js";import{n as s,t as c}from"./bakedVertexAnimation-7XIMgH6x.js";import{t as l}from"./instancesDeclaration-CJBvtBV5.js";import{t as u}from"./instancesVertex-C-FoRQR1.js";var d=`iblVoxelGridVertexShader`,f=`attribute vec3 position;varying vec3 vNormalizedPosition;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
uniform mat4 invWorldScale;uniform mat4 viewMatrix;void main(void) {vec3 positionUpdated=position;
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);gl_Position=viewMatrix*invWorldScale*worldPos;vNormalizedPosition.xyz=gl_Position.xyz*0.5+0.5;
#ifdef IS_NDC_HALF_ZRANGE
gl_Position.z=gl_Position.z*0.5+0.5;
#endif
}`;e.ShadersStore[d]||(e.ShadersStore[d]=f);var p=[t,s,l,o,i,a,r,u,n,c];for(let t of p)e.IncludesShadersStore[t.name]||(e.IncludesShadersStore[t.name]=t.shader);var m={name:d,shader:f};export{m as t};