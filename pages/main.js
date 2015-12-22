"use strict";

import React from 'react';
import Page from '../components/page';
import WeForm from '../../lib';

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
      {
        id:'password',
        label:'密码',
        type:'password',
        placeholder:'输入您的密码',
        rule:'required'
      },
    ]
  },
  {
    label:'日期',
    tips:'日期选12-3到12-5之间',
    properties:[
      {
        id:'date1',
        label:'日期',
        type:'date',
        rule:'required|date:2015-12-03,2015-12-05'
      },
      {
        id:'datetime',
        label:'时间',
        type:'datetime',
        rule:'required|datetime'
      },
    ]
  },
  {
    label:'选择',
    properties:[
      {
        id:'select1',
        label:'单选',
        type:'select',
        rule:'required',
        default:'2',
        options:[
          {
            label:'选择1',
            value:'1'
          },
          {
            label:'选择2',
            value:'2'
          },
          {
            label:'选择3',
            value:'3'
          }
        ]
      },
    ]
  },
  {
    label:'多选项',
    checkbox:true,
    properties:[
      {
        id:'checkbox1',
        label:'多选1',
        type:'checkbox',
        value:'checkbox1'
      },
      {
        id:'checkbox2',
        label:'多选2',
        type:'checkbox',
        value:'checkbox2'
      },
      {
        id:'checkbox3',
        label:'多选3',
        type:'checkbox',
        value:'checkbox3'
      },
    ]
  },
  {
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
  actions:[
    {
      label:'提交',
      type:'primary',
      onClick :(data)=>alert(JSON.stringify(data,null,2)),
    }
  ]
};

const Main = (props) => (
  <Page className="home" title="weui-form" subTitle="快速方便表单创建">
    <WeForm schema={schema} form={form}/>
  </Page>
)

export default Main;