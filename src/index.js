"use strict";

import React, { Component } from 'react';
import update from 'react/lib/update';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import WeUI from 'react-weui';
import 'weui';
import './style.less';

const {ButtonArea, Button, Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter} = WeUI;

class WeForm extends Component {
  static propTypes = {
    schema: React.PropTypes.array.isRequired,
    form: React.PropTypes.object.isRequired
  };

  static defaultProps = {
    schema: {},
    form: {}
  };

  state = {
    values : {},
    errors: {}
  };

  constructor(props){
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.setItemValue = this.setItemValue.bind(this);
  }

  componentDidMount() {
    let defaults = {};
    this.props.schema.forEach((section,index)=>{
      let items = section.properties;
      items.map((item,i)=>{
        if(item.default) {
          defaults[item.id]=item.default;
        }
      });
    });

    this.setState({values:defaults});
  }

  setItemValue(field,value){
    let _values = Object.assign({},this.state.values,{[field]:value});
    this.setState({values:_values});
  }

  itemOnChange(type,id,e){
    switch(type){
      default:
        this.setItemValue(id,e.target.value);
        break;
    }
  }

  getErrorStyle(field){
    if(this.state.errors === {}) return false;
    if(this.state.errors[field]){
      return 'weui_cell_warn';
    }
  }

  renderItem(schema){
    return schema.map((item,i)=>{
      switch(item.type){
        case 'text':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id)}>
                <CellHeader>
                  <label className="weui_label">{item.label}</label>
                </CellHeader>
                <CellBody>
                  <input className="weui_input" type="text"
                    placeholder={item.placeholder} value={this.state.values[item.id]}
                    onChange={this.itemOnChange.bind(this,item.type,item.id)}/>
                </CellBody>
                {this.getErrorStyle(item.id) ? <CellFooter><i className="weui_icon_warn"></i></CellFooter> : false}
            </Cell>
          )
          break;
        case 'number':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id)}>
              <CellHeader>
                <label className="weui_label">{item.label}</label>
              </CellHeader>
              <CellBody>
                <input className="weui_input" type="number"
                  placeholder={item.placeholder} value={this.state.values[item.id]}
                  onChange={this.itemOnChange.bind(this,item.type,item.id)}/>
              </CellBody>
              {this.getErrorStyle(item.id) ? <CellFooter><i className="weui_icon_warn"></i></CellFooter> : false}
            </Cell>
          )
          break;
        case 'textarea':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id)}>
              <CellBody>
                <textarea className="weui_textarea" placeholder={item.placeholder} 
                rows="3" onChange={this.itemOnChange.bind(this,item.type,item.id)}>
                {this.state.values[item.id]}
                </textarea>
              </CellBody>
            </Cell>
          )
          break;
        break;
        case 'textarea':

        break;
      }
    })
  }

  validateForm(){
    let error = false;
    let errors = [];
    let values = this.state.values;

    this.props.schema.forEach((section,index)=>{
      let items = section.properties;
      items.forEach((item,i)=>{
        if(!item.rule) return;

        let rules = item.rule.split("|");
        rules.forEach((rule)=>{
          if(errors[item.id]) return;
          let rulecmds = rule.split(":");
          let cmd = rulecmds[0];
          let params = typeof rulecmds[1] !== 'undefined' ? rulecmds[1].split(',') : false;
          switch(cmd){
            case 'required':
              if(!values[item.id]) errors[item.id] = trans('validate.required');
            break;
            case 'string':
              if(typeof values[item.id] !== 'string') errors[item.id] = trans('validate.needstring');
            break;
            case 'number':
              if(typeof parseFloat(values[item.id]) !== 'number') errors[item.id] = trans('validate.neednumber');
            break;
            case 'image':
              if(!values[item.id].name.match(/\.(jpg|jpeg|png|gif|svg)$/)) errors[item.id] = trans('validate.needimage');
            break;
            case 'between':
              if(typeof params[0] === 'undefined') break;
              if(values[item.id].length < params[0]) errors[item.id] = trans('validate.needlength1',params[0]);
              if(typeof params[1] !== 'undefined') {
                if(params[0] == 0 && values[item.id].length > params[1]) errors[item.id] = trans('validate.needlength2',params[1]);
                if(values[item.id].length > params[1]) errors[item.id] = trans('validate.needlength3',params[0],params[1]);
              }
            break;
          }
        });
        if(errors[item.id]) error = true;
      });
    });

    if(error) return errors;
    return false;
  }

  handleClick(onClick){

    this.setState({errors:{}});
    let errors = this.validateForm();
    console.log(errors);
    if(errors){
      return this.setState({errors:errors});
    }else{
      if(onClick) onClick(this.state.values);
    }
  }

  renderForm(){
    return this.props.schema.map((sections,index)=>{
      let items = sections.properties;
      return (
        <div key={index}>
          {sections.label ? <CellsTitle>{sections.label}</CellsTitle> : false}
          <Cells form>
            {this.renderItem(items)}
          </Cells>
          {sections.tips ? <CellsTips>{sections.tips}</CellsTips> : false}
        </div>
      )
    });
  }

  renderActions(){
    return this.props.form.actions.map((action,index)=>{
      return <Button key={index} type={action.type} onClick={this.handleClick.bind(this,action.onClick)}>{action.label}</Button>
    });
  }
  render() {
    return (
      <section>
        {this.renderForm()}
        <ButtonArea>
          {this.renderActions()}
        </ButtonArea>
      </section>
    )
  }
};

var TranslationDictionary = {
  'validate':{
    'required': 'Required',
    'needstring':'Needs to be a valid string',
    'neednumber':'Needs to be a valid number',
    'needimage':'Needs to be a valid image',
    'needlength1':"Length size needs to be bigger than {s}",
    'needlength2':"Length size needs to be less than {s}",
    'needlength3':"Length size needs to be between {s} and {s}",
  }
};

function trans(key,...vars){
  let keys = key.split(".");
  let translation = TranslationDictionary[keys[0]];
  if (translation && translation[keys[1]]) {
    let phase = translation[keys[1]];
    let needle = "{s}";
    let count = phase.split(needle).length - 1;

    if(count < 1) return phase;
    for (let i = 0; i <= (count-1); i++) {
      if(typeof vars[i] !== undefined) phase = phase.replace(needle,vars[i]);
    };

    return phase;
  }
  else {
    console.log("Warning: missing translation for: " + key);
    return key;
  }
}

export default WeForm;