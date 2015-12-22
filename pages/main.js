"use strict";

import React from 'react';
import Page from '../components/page';
import WeForm from '../../src';

let schema = [
  {
    label:'基本资料',
    properties:[
      {
        id:'name',
        label:'字符',
        default:'',
        type:'text',
        placeholder:'提示文本',
        rule:'required|between:2,15|string'
      },
      {
        id:'name2',
        label:'数字',
        default:5,
        type:'number',
        placeholder:'0',
        rule:'required|number'
      },
    ]
  },{
    label:'文本区域',
    tips:'提示文字',
    properties:[
      {
        id:'wenben',
        placeholder:'文本预设',
        type:'textarea',
        rule:'required'
      }
    ]
  }
];

let form = {
  title:'文章列表',
  actions:[
    {
      label:'提交',
      type:'primary',
      onClick :(data)=>console.log(data),
    }
  ]
};

const Main = (props) => (
  <Page className="home" title="WeUI" subTitle="为微信Web服务量身设计">
    <WeForm schema={schema} form={form}/>
  </Page>
)

export default Main;