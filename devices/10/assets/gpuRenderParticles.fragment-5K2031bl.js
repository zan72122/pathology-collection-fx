import{t as e}from"./shaderStore-D-XQlhUT.js";import{n as t,t as n}from"./clipPlaneFragment-Ct2VqHzk.js";import{n as r,t as i}from"./fogFragment-EikOP4pH.js";import{t as a}from"./objectIdFunctions-0O_zsAzb.js";import{n as o,r as s,t as c}from"./meshBlendTagFragmentOutput-DuUOl0Y1.js";import{t as l}from"./helperFunctions-BH8P-eyq.js";import{n as u,t as d}from"./imageProcessingFunctions-B1IXC_gq.js";import{t as f}from"./logDepthDeclaration-DYYUVTrx.js";import{t as p}from"./geometryRenderingFragment-Br907bcJ.js";var m=`gpuRenderParticlesPixelShader`,h=`var diffuseSamplerSampler: sampler;var diffuseSampler: texture_2d<f32>;varying vUV: vec2f;varying vColor: vec4f;
#ifdef PREPASS
uniform geometryZeroAlphaDiscard: f32;
#ifdef PREPASS_POSITION
varying vGeometryPositionW: vec3f;
#endif
#ifdef PREPASS_WORLD_NORMAL
varying vGeometryNormalW: vec3f;
#endif
#ifdef PREPASS_NORMAL
varying vGeometryNormalV: vec3f;
#endif
#endif
#define PREPASS_VELOCITY_ZERO
#include<prePassDeclaration>[SCENE_MRT_COUNT]
#include<clipPlaneFragmentDeclaration>
#include<imageProcessingDeclaration>
#include<logDepthDeclaration>
#include<helperFunctions>
#include<imageProcessingFunctions>
#include<fogFragmentDeclaration>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#include<clipPlaneFragment>
let textureColor: vec4f=textureSample(diffuseSampler,diffuseSamplerSampler,input.vUV);var baseColor: vec4f=textureColor*input.vColor;
#ifdef PREPASS
let geometryAlbedo: vec3f=toLinearSpaceVec3(baseColor.rgb);
#endif
#ifdef BLENDMULTIPLYMODE
let alpha: f32=input.vColor.a*textureColor.a;baseColor=vec4f(baseColor.rgb*alpha+vec3f(1.0)*(1.0-alpha),baseColor.a);
#endif
#include<logDepthFragment>
#include<fogFragment>(color,baseColor)
#ifdef IMAGEPROCESSINGPOSTPROCESS
baseColor=vec4f(toLinearSpaceVec3(baseColor.rgb),baseColor.a);
#else
#ifdef IMAGEPROCESSING
baseColor=vec4f(toLinearSpaceVec3(baseColor.rgb),baseColor.a);baseColor=applyImageProcessing(baseColor);
#endif
#endif
#ifdef PREPASS
let geometryColor: vec4f=baseColor;if (geometryColor.a<=0.0 && uniforms.geometryZeroAlphaDiscard>0.0) {discard;}
#ifdef PREPASS_POSITION
let geometryPositionW: vec3f=input.vGeometryPositionW;
#endif
#ifdef PREPASS_LOCAL_POSITION
let geometryPositionL: vec3f=input.vPosition;
#endif
#ifdef PREPASS_DEPTH
let geometryViewDepth: f32=input.vViewPos.z;
#endif
#ifdef PREPASS_NORMALIZED_VIEW_DEPTH
let geometryNormalizedViewDepth: f32=input.vNormViewDepth;
#endif
#ifdef PREPASS_NORMAL
let geometryNormalV: vec3f=normalize(input.vGeometryNormalV);
#endif
#ifdef PREPASS_WORLD_NORMAL
let geometryNormalW: vec3f=normalize(input.vGeometryNormalW);
#endif
#include<geometryRenderingFragment>
#else
fragmentOutputs.color=baseColor;
#endif
}
`;e.ShadersStoreWGSL[m]||(e.ShadersStoreWGSL[m]=h);var g=[a,s,t,u,f,l,d,r,n,o,i,c,p];for(let t of g)e.IncludesShadersStoreWGSL[t.name]||(e.IncludesShadersStoreWGSL[t.name]=t.shader);var _={name:m,shader:h};export{_ as gpuRenderParticlesPixelShaderWGSL};