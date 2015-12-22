"use strict";

import React from 'react';
import Page from '../../components/page';
import WeForm from '../../../lib';

let schema = [
  {
    label:'基本资料',
    properties:[
      {
        id:'username',
        label:'用户名',
        default:'',
        type:'text',
        placeholder:'2到15位字符',
        rule:'required|between:2,15|string'
      },
      {
        id:'password',
        label:'密码',
        type:'password',
        placeholder:'输入您的密码',
        rule:'required'
      },
      {
        id:'bday',
        label:'出生',
        type:'date',
        rule:'required'
      },
      {
        id:'area',
        label:'所在地区',
        type:'select',
        rule:'required',
        default:'2',
        options:[
          {
            label:'地区1',
            value:'1'
          },
          {
            label:'地区2',
            value:'2'
          },
          {
            label:'地区3',
            value:'3'
          }
        ]
      },
    ]
  }
];

let form = {
  actions:[
    {
      label:'申请',
      type:'primary',
      onClick :(data)=>alert(JSON.stringify(data,null,2)),
    }
  ]
};

const SignupDemo = (props) => (
  <Page className="home" title="注册Demo">
    <WeForm schema={schema} form={form}/>
  </Page>
)

export default SignupDemo;