import React, { Component } from 'react';
import WeUI from 'react-weui';
import classNames from 'classnames';
import 'weui';

const {ButtonArea, Button, Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter} = WeUI;

class WeForm extends Component {
  static propTypes = {
    schema: React.PropTypes.array.isRequired,
    form: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    schema: {},
    form: {}
  };

  state = {
    values : {},
    errors: {},
    langs: {},
    form: {},
  };

  constructor(props){
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.setItemValue = this.setItemValue.bind(this);
  }

  trans(key,...vars){
    let translation = this.state.langs[this.state.form.locale];
    if (translation && translation[key]) {
      let phase = translation[key];
      let needle = '{s}';
      let count = phase.split(needle).length - 1;

      if(count < 1) return phase;
      for (let i = 0; i <= (count-1); i++) {
        if(typeof vars[i] !== undefined) phase = phase.replace(needle,vars[i]);
      };

      return phase;
    }
    else {
      console.log('Warning: missing translation for: ' + key);
      return key;
    }
  }

  componentWillMount() {
    this.setState({form:Object.assign({},defaultForm,this.props.form)});
    this.setState({langs:Object.assign({},defaultLangs,this.props.form)});
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
      case 'checkbox':
        this.setItemValue(id,e.target.checked);
      break;
      default:
        this.setItemValue(id,e.target.value);
        break;
    }
  }

  getErrorStyle(field,sectionIndex){
    if(this.state.errors === {}) return false;
    if(typeof this.state.errors[sectionIndex] === 'undefined') return false;
    if(this.state.errors[sectionIndex][field]){
      return 'weui_cell_warn';
    }
  }

  getErrorsTitleStyle(index){
    if(this.state.errors === {}) return false;
    if(this.state.errors[index]) {
      if(Object.keys(this.state.errors[index]).length > 0) return true;
    }
    return false;
  }

  renderItem(schema,sectionIndex){
    return schema.map((item,i)=>{
      switch(item.type){
        case 'text':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id,sectionIndex)}>
                <CellHeader>
                  <label className="weui_label">{item.label}</label>
                </CellHeader>
                <CellBody>
                  <input className="weui_input" type="text"
                    placeholder={item.placeholder} value={this.state.values[item.id]}
                    onChange={this.itemOnChange.bind(this,item.type,item.id)}/>
                </CellBody>
                {this.getErrorStyle(item.id,sectionIndex) ? <CellFooter><i className="weui_icon_warn"></i></CellFooter> : false}
            </Cell>
          )
          break;
        case 'password':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id,sectionIndex)}>
                <CellHeader>
                  <label className="weui_label">{item.label}</label>
                </CellHeader>
                <CellBody>
                  <input className="weui_input" type="password"
                    placeholder={item.placeholder} value={this.state.values[item.id]}
                    onChange={this.itemOnChange.bind(this,item.type,item.id)}/>
                </CellBody>
                {this.getErrorStyle(item.id,sectionIndex) ? <CellFooter><i className="weui_icon_warn"></i></CellFooter> : false}
            </Cell>
          )
          break;
        case 'number':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id,sectionIndex)}>
              <CellHeader>
                <label className="weui_label">{item.label}</label>
              </CellHeader>
              <CellBody>
                <input className="weui_input" type="number"
                  placeholder={item.placeholder} value={this.state.values[item.id]}
                  onChange={this.itemOnChange.bind(this,item.type,item.id)}/>
              </CellBody>
              {this.getErrorStyle(item.id,sectionIndex) ? <CellFooter><i className="weui_icon_warn"></i></CellFooter> : false}
            </Cell>
          )
          break;
        case 'date':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id,sectionIndex)}>
              <CellHeader>
                <label className="weui_label">{item.label}</label>
              </CellHeader>
              <CellBody>
                <input className="weui_input" type="date"
                  placeholder={item.placeholder} value={this.state.values[item.id]}
                  onChange={this.itemOnChange.bind(this,item.type,item.id)}/>
              </CellBody>
              {this.getErrorStyle(item.id,sectionIndex) ? <CellFooter><i className="weui_icon_warn"></i></CellFooter> : false}
            </Cell>
          )
          break;
        case 'datetime':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id,sectionIndex)}>
              <CellHeader>
                <label className="weui_label">{item.label}</label>
              </CellHeader>
              <CellBody>
                <input className="weui_input" type="datetime-local"
                  placeholder={item.placeholder} value={this.state.values[item.id]}
                  onChange={this.itemOnChange.bind(this,item.type,item.id)}/>
              </CellBody>
              {this.getErrorStyle(item.id,sectionIndex) ? <CellFooter><i className="weui_icon_warn"></i></CellFooter> : false}
            </Cell>
          )
          break;
        case 'textarea':
          return (
            <Cell key={i} className={this.getErrorStyle(item.id,sectionIndex)}>
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
        case 'select':
          return (
            <Cell key={i}
             className={
              classNames('weui_cell_select',{weui_select_after:item.label},this.getErrorStyle(item.id,sectionIndex))
            }>
              {item.label ? <CellHeader>{item.label}</CellHeader> : false}
              <CellBody>
                <select className="weui_select" value={this.state.values[item.id]}
                 onChange={this.itemOnChange.bind(this,item.type,item.id)}>
                  {item.options.map((option,j)=>{
                    return <option value={option.value} key={j}>{option.label}</option>
                  })}
                </select>
              </CellBody>
            </Cell>
          )
        break;
        case 'checkbox':
          return(
            <label key={i} className="weui_cell weui_check_label">
                <div className="weui_cell_hd">
                    <input type="checkbox" className="weui_check" value={this.state.values[item.id]}
                      onClick={this.itemOnChange.bind(this,item.type,item.id)} />
                    <i className="weui_icon_checked"></i>
                </div>
                <div className="weui_cell_bd weui_cell_primary">
                    <p>{item.label}</p>
                </div>
            </label>
          )
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
      errors[index] = {};
      items.forEach((item,i)=>{
        if(!item.rule) return;

        let rules = item.rule.split('|');
        rules.forEach((rule)=>{
          if(errors[index][item.id]) return;
          let rulecmds = rule.split(':');
          let cmd = rulecmds[0];
          let params = typeof rulecmds[1] !== 'undefined' ? rulecmds[1].split(',') : false;
          switch(cmd){
            case 'required':
              if(!values[item.id]) errors[index][item.id] = this.trans('required');
            break;
            case 'string':
              if(typeof values[item.id] !== 'string') errors[index][item.id] = this.trans('needstring');
            break;
            case 'number':
              if(typeof parseFloat(values[item.id]) !== 'number') errors[index][item.id] = this.trans('neednumber');
            break;
            case 'image':
              if(!values[item.id].name.match(/\.(jpg|jpeg|png|gif|svg)$/)) errors[index][item.id] = this.trans('needimage');
            break;
            case 'date':
            case 'datetime':
              let str = values[item.id];
              let ret = true;
              let valuedate = new Date(values[item.id]);
              if(!valuedate instanceof Date ||isNaN(valuedate.valueOf())) ret = false;
              if(ret){
                if(typeof params[0] !== 'undefined'){
                  let minDate = new Date(params[0]).getTime();
                  if( valuedate < minDate)ret = false;
                }
                if(typeof params[1] !== 'undefined') {
                  let maxDate = new Date(params[1]).getTime();
                  if( valuedate > maxDate)ret = false;
                }
              }
              if(!ret) errors[index][item.id] = this.trans('needdate');
            break;
            case 'between':
              if(typeof params[0] === 'undefined') break;
              if(values[item.id].length < params[0]) errors[index][item.id] = this.trans('needlength1',params[0]);
              if(typeof params[1] !== 'undefined') {
                if(params[0] == 0 && values[item.id].length > params[1]) errors[index][item.id] = this.trans('needlength2',params[1]);
                if(values[item.id].length > params[1]) errors[index][item.id] = this.trans('needlength3',params[0],params[1]);
              }
            break;
          }
        });
        if(errors[index][item.id]) error = true;
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
      let styleTitle = {
        color: this.getErrorsTitleStyle(index) ? '#e64340':'#888'
      }
      let className = classNames({
        weui_cells: true,
        weui_cells_form: true,
        weui_cells_checkbox: sections.checkbox,
      });
      return (
        <div key={index}>
          {sections.label ? <CellsTitle style={styleTitle}>{sections.label}</CellsTitle> : false}
          <Cells className={className}>
            {this.renderItem(items,index)}
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

var defaultLangs = {
  'en':{
    'required': 'Required',
    'needstring':'Needs to be a valid string',
    'neednumber':'Needs to be a valid number',
    'needimage':'Needs to be a valid image',
    'needdate':'Needs to be a valid date',
    'needdatetime':'Needs to be a valid time',
    'needlength1':'Length size needs to be bigger than {s}',
    'needlength2':'Length size needs to be less than {s}',
    'needlength3':'Length size needs to be between {s} and {s}',
  }
};

var defaultForm ={
  locale:'en',
  actions:[
    {
      label:'提交',
      type:'primary',
      onClick :(data)=>console.log(data),
    }
  ]
}

module.exports = WeForm;