

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './ConsumerOrderShippingGroup.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'


const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(consumerOrderShippingGroup)=>{return [
	 ]}

const internalImageListOf = (consumerOrderShippingGroup) =>defaultImageListOf(consumerOrderShippingGroup,imageList)

const optionList =(consumerOrderShippingGroup)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalSettingListOf = (consumerOrderShippingGroup) =>defaultSettingListOf(consumerOrderShippingGroup, optionList)
const internalLargeTextOf = (consumerOrderShippingGroup) =>{

	return null
	

}


const internalRenderExtraHeader = defaultRenderExtraHeader

const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf


const internalRenderTitle = (cardsData,targetComponent) =>{
  
  
  const linkComp=cardsData.returnURL?<Link to={cardsData.returnURL}> <FontAwesome name="arrow-left"  /> </Link>:null
  return (<div>{linkComp}{cardsData.cardsName}: {cardsData.displayName}</div>)

}


const internalSummaryOf = (consumerOrderShippingGroup,targetComponent) =>{
	
	
	const {ConsumerOrderShippingGroupService} = GlobalComponents
	
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号">{consumerOrderShippingGroup.id}</Description> 
<Description term="名称">{consumerOrderShippingGroup.name}</Description> 
<Description term="订单">{consumerOrderShippingGroup.bizOrder==null?"未分配":consumerOrderShippingGroup.bizOrder.displayName}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"订单","consumerOrder",ConsumerOrderShippingGroupService.requestCandidateBizOrder,
	      ConsumerOrderShippingGroupService.transferToAnotherBizOrder,"anotherBizOrderId",consumerOrderShippingGroup.bizOrder?consumerOrderShippingGroup.bizOrder.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="金额">{consumerOrderShippingGroup.amount}</Description> 
	
        {buildTransferModal(consumerOrderShippingGroup,targetComponent)}
      </DescriptionList>
	)

}


class ConsumerOrderShippingGroupDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"城市",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'consumerOrderShippingGroup'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName,  } = this.props.consumerOrderShippingGroup
    if(!this.props.consumerOrderShippingGroup.class){
      return null
    }
    const returnURL = this.props.returnURL
    
    const cardsData = {cardsName:"消费订单送货分组",cardsFor: "consumerOrderShippingGroup",
    	cardsSource: this.props.consumerOrderShippingGroup,returnURL,displayName,
  		subItems: [
    
      	],
  	};
    //下面各个渲染方法都可以定制，只要在每个模型的里面的_features="custom"就可以得到定制的例子
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderTitle = this.props.renderTitle || internalRenderTitle
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    return (

      <PageHeaderLayout
        title={renderTitle(cardsData,this)}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
        <div>
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}
        {subListsOf(cardsData)} 
        {largeTextOf(cardsData.cardsSource)}
          
        </div>
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  consumerOrderShippingGroup: state._consumerOrderShippingGroup,
  returnURL: state.breadcrumb.returnURL,
  
}))(Form.create()(ConsumerOrderShippingGroupDashboard))

