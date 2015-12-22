# react-weui-form
weui-react快速表单创建

# [Demo](http://n7best.github.io/react-weui-form/)

# 使用
npm安装
```
npm install react-weui-form
```

react倒入
```
import WeForm from 'react-weui-form'
```

定义表单
```
//定义架构
let schema = [
  //一个新的列表组
  {
    label:'基本资料',
    properties:[
    //表单单位定义
    //创建一个文本输入，验证为2到15为字符
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
      }
    ]
  }
];
//定义设置
let form = {
  //定义按钮
  actions:[
    {
      label:'登陆',
      type:'primary',
      onClick :(data)=>alert(JSON.stringify(data,null,2)),
    }
  ]
};
```
输出React组件
```
<WeForm schema={schema} form={form}/>
```

#可用type
text,password,number,date,datetime,textarea,select,checkbox
#可用验证rule
用法
```
rule:'required|between:2,15'
```
| 类别 | 属性 |
| ------  | ----------- |
| required|  |
| string  |  |
| number  |  |
| date    | mindate[optional],maxdate[optional] |
| datetime    | mindate[optional],maxdate[optional] |
| between    | min[optional],max[optional] |
