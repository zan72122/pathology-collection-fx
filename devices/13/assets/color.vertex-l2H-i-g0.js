import{t as e}from"./shaderStore-D-XQlhUT.js";import{t}from"./bonesDeclaration-oDxSsnww.js";import{t as n}from"./bonesVertex-BZbvWQw2.js";import{t as r}from"./clipPlaneVertex-6IHcna3I.js";import{t as i}from"./clipPlaneVertexDeclaration-Be-obVGF.js";import{n as a,t as o}from"./bakedVertexAnimation-7XIMgH6x.js";import{t as s}from"./instancesDeclaration-CJBvtBV5.js";import{t as c}from"./fogVertexDeclaration-Bb9kDbrL.js";import{t as l}from"./instancesVertex-C-FoRQR1.js";import{t as u}from"./fogVertex-B90wzaBe.js";import{t as d}from"./vertexColorMixing-DPW6Is9y.js";var f=`colorVertexShader`,p=`attribute vec3 position;
#ifdef VERTEXCOLOR
attribute vec4 color;
#endif
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#ifdef FOG
uniform mat4 view;
#endif
#include<instancesDeclaration>
uniform mat4 viewProjection;
#ifdef MULTIVIEW
uniform mat4 viewProjectionR;
#endif
#if defined(VERTEXCOLOR) || defined(INSTANCESCOLOR) && defined(INSTANCES)
varying vec4 vColor;
#endif
#define CUSTOM_VERTEX_DEFINITIONS
void main(void) {
#define CUSTOM_VERTEX_MAIN_BEGIN
#ifdef VERTEXCOLOR
vec4 colorUpdated=color;
#endif
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(position,1.0);
#ifdef MULTIVIEW
if (gl_ViewID_OVR==0u) {gl_Position=viewProjection*worldPos;} else {gl_Position=viewProjectionR*worldPos;}
#else
gl_Position=viewProjection*worldPos;
#endif
#include<clipPlaneVertex>
#include<fogVertex>
#include<vertexColorMixing>
#define CUSTOM_VERTEX_MAIN_END
}`;e.ShadersStore[f]||(e.ShadersStore[f]=p);var m=[t,a,i,c,s,l,n,o,r,u,d];for(let t of m)e.IncludesShadersStore[t.name]||(e.IncludesShadersStore[t.name]=t.shader);var h={name:f,shader:p};export{h as t};