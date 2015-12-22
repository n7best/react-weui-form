import React from 'react';
import {Cells, Cell, CellHeader, CellBody, CellFooter} from 'react-weui';
import Page from '../../components/page';
import IconCell from './images/icon_nav_cell.png';
import 'weui';
import './style.less';

export default class Home extends React.Component {

    state = {
        components: [
          {
              icon: IconCell,
              label: '大杂烩',
              url: '#all'
          },
          {
              icon: IconCell,
              label: '注册Demo',
              url: '#signup'
          }
        ]
    };

    _renderItem() {
        return this.state.components.map((component, index) => {
            return (
                <Cell key={index} className="global_navs" href={component.url} >
                    <CellHeader>
                        <img className="icon_nav" src={component.icon} alt=""/>
                    </CellHeader>
                    <CellBody>{component.label}</CellBody>
                    <CellFooter/>
                </Cell>
            );
        });
    }

    render() {
        return (
            <Page className="home" title="weui-form" subTitle="快速方便表单创建">
                <Cells access>
                    {
                        this._renderItem()
                    }
                </Cells>
            </Page>
        );
    }
};