import React from 'react';
import PageNavigate from "thaisamut/common/containers/oli-navigator/PageNavigate";
import OliIcon from 'thaisamut/common/components/oli-icon';

import IndexingFile from '~/containers/IndexingFile/Index';
import DataEntry from '~/containers/IndexingFile/DataEntry';
import SearchFile from '~/containers/SearchFile/Index';


export const loadConfig = (globalConfig) => {
let {contextPath, namespaceUrl} = globalConfig;
const { msaWebConf, domainName } = globalConfig;

const basepath = msaWebConf[`msa.web.basepath.${domainName}`];
const basepathNBSPortal = msaWebConf['msa.web.basepath.nbsportal'];

    return {
        title:'NBS Portal',
        shortTitle: null,
        defaultMenu:'IndexingFile',
         links: {
            home: `${basepathNBSPortal}/thaisamut/web/nbsportal/index.html`,
            logout: `${basepathNBSPortal}/thaisamut/pub/nbsportal/loginmock.html`,
        },
        menus: [
            {
                key: 'main',
                title: 'DMS POC',

                children: [
                    {
                        key: 'IndexingFile',
                        title: 'Indexing',
                        component: (props) =>
                            <PageNavigate
                                {...props}
                                pages={{
                                    stackPage: [
                                        {key: 'IndexingFile/Main', component: <IndexingFile />},
                                        {key: 'IndexingFile/DataEntry', component: <DataEntry />},
                                    ],
                                }}
                            />
                    },
                    {
                        key: 'SearchFile',
                        title: 'Search',
                        component: (props) =>
                            <PageNavigate
                                {...props}
                                pages={{
                                    stackPage: [
                                        {key: 'SearchFile/main', component: <SearchFile />},
                                    ],
                                }}
                            />
                    },
                ],

                icon: <OliIcon name='list-ul' font={'FontAwesome'}/>,
                permission : 123
            }
        ]
    }
};


//export const loadConfig = (globalConfig) => {
//let {contextPath, namespaceUrl} = globalConfig;
//    return {
//        title:'Collection System',
//        shortTitle:null,
//        defaultMenu:'sd002_1',
//        menus: [
//            {
//                key: 'assignJob',
//                title: 'จ่ายงานติดตามชำระเบี้ย',
//                component: <AssignJob/>,
//                icon:<OliIcon name='list-ul' font={'FontAwesome'}/>,
//                permission : 200603,
//            },
//            {
//                key: 'sd002_1_main',
//                title: 'ติดตามชำระเบี้ย',
//                icon:<OliIcon name='list-ul' font={'FontAwesome'}/>,
//                children: [
//                    {   key: 'sd002_1', title: 'รายการติดตาม',
//                        component: (props) => <PageNavigate {...props} pages={{
//                            stackPage: [
//                                {key: 'sd002_1/SD002_1', component: <SD002_1/>},
//                                {key: 'sd002_1/SD0023Popup', title: 'รายการกรมธรรม์ของผู้เอาประกันและประวัติการติดตาม', component: <SD0023Popup/>, unmountOnInActive:true },
//                                {key: 'sd002_1/PolicyTable', title: 'รายการกรมธรรม์ของลูกค้าที่ต้องติดตาม', component: <PolicyTable/>},
//                                {key: 'sd002_1/SD004_1', title: 'บันทึกติดตาม', component: <SD004_1/>},
//                            ],
//                            popupPage: [
//                                {key: 'sd002_1/SD003_1', title: 'ข้อมูลติดต่อ', component: <SD003_1/>},
//                                {key: 'sd002_1/SD003_1_update_popup', title: 'ข้อมูลติดต่อลูกค้า', component: <SD003_1_update_popup/>,
//                                    dialogOptions: (actions) => ({
//                                    fullWidth:false
//                                })},
//                                {key: 'sd002_1/SD003_1_delete_popup', title: 'ยืนยันการลบข้อมูล', component: <SD003_1_delete_popup/>,
//                                    dialogOptions: (actions) => ({
//                                    fullWidth:false
//                                })},
//                                {key: 'sd002_1/SD003_3', title: 'อัปเดตไปยังข้อมูลลูกค้า และกรมธรรม์อื่นๆ', component: <SD003_3/>,
//                                    dialogOptions: (actions) => ({
//                                    fullWidth:false
//                                })},
//
//                            ]
//                        }} navigationOptions={{
//                            dialogOptions: (actions) => ({
//                                fullWidth:true
//                            })
//                        }} />
//                    },
//                    {   key: 'sd002_2', title: 'รายการนัดชำระ',
//                        permission : [200601,200603],
//                        component: (props) => <PageNavigate {...props} pages={{
//                            stackPage: [
//                                {key: 'sd002_2/Page1', component: <SD002_2/>},
//                                {key: 'sd002_2/Page2', title: 'บันทึกข้อมูลการนัดชำระ', component: <PaymentHistoryDetailPopup/>},
//                            ],
//                            popupPage: [
//
//                            ]
//                        }}  />
//                    }
//                ],
//            },
//            {
//                key: 'SD006',
//                title: 'รายงานการติดตาม',
//                component: <SD006/>,
//                icon:<OliIcon name='list-ul' font={'FontAwesome'}/>,
//            },
//            {
//                key: 'samplePage',
//                title: 'samplePage',
//                component: <samplePage/>,
//                icon:<OliIcon name='list-ul' font={'FontAwesome'}/>,
//            }
//
//        ],
//        links: {
//            home: `${contextPath}/secure/home.html`,
//            logout: `${contextPath}/secure/logout.html`,
//        },
//        services: {
//            common: {
//                commonPoolingJob: `${namespaceUrl}/common/commonPoolingJob.html`,
//                commonDownloadFile: `${namespaceUrl}/common/commonDownloadFile.html`,
//            },
//            assignJob:{
//                searchFollowCrmUser : `${namespaceUrl}/assignjob/searchFollowCrmUser.html` ,
//                searchDataAssignJob : `${namespaceUrl}/assignjob/searchDataAssignJob.html` ,
//                countDataAssignJob : `${namespaceUrl}/assignjob/countDataAssignJob.html` ,
//                searchPolicyInfo : `${namespaceUrl}/assignjob/searchPolicyInfo.html` ,
//                assignJobToStaff : `${namespaceUrl}/assignjob/assignJobToStaff.html` ,
//            },
//            sd002_1:{
//                countFollowUpCustomer : `${namespaceUrl}/sd002_1/countFollowUpCustomer.html` ,
//                searchFollowUpCustomer : `${namespaceUrl}/sd002_1/searchFollowUpCustomer.html`
//            },
//            sd002_2:{
//                countCreditCutFollow : `${namespaceUrl}/sd002_2/countCreditCutFollow.html` ,
//                searchCreditCutFollow : `${namespaceUrl}/sd002_2/searchCreditCutFollow.html`
//            },
//            sd002_3:{
//               searchPolicyInfo : `${namespaceUrl}/sd002_3/searchPolicyInfo.html` ,
//               searchCustomerCis : `${namespaceUrl}/sd002_3/searchCustomerCis.html` ,
//               searchFollowPanelData : `${namespaceUrl}/sd002_3/searchFollowPanelData.html` ,
//               searchHistoryPolicyInfo : `${namespaceUrl}/sd002_3/searchHistoryPolicyInfo.html` ,
//               searchPolicyDetailPanelData: `${namespaceUrl}/sd002_3/searchPolicyDetailPanelData.html` ,
//               searchPaymentChannelPanelData : `${namespaceUrl}/sd002_3/searchPaymentChannelPanelData.html` ,
//               searchLastPaymentHistoryPanelData : `${namespaceUrl}/sd002_3/searchLastPaymentHistoryPanelData.html` ,
//               searchCurrentAddressPanelData : `${namespaceUrl}/sd002_3/searchCurrentAddressPanelData.html` ,
//               searchHistorySendCardInfo : `${namespaceUrl}/sd002_3/searchHistorySendCardInfo.html` ,
//               savePolicyFollowAssign : `${namespaceUrl}/sd002_3/savePolicyFollowAssign.html` ,
//               genSmsMessage : `${namespaceUrl}/sd002_3/genSmsMessage.html` ,
//            },
//            sd003:{
//                searchCountactTypeByPolicyNo    : `${namespaceUrl}/sd003/searchCountactTypeByPolicyNo.html` ,
//                getLookUpContactTypeList        : `${namespaceUrl}/sd003/getLookUpContactTypeList.html` ,
//                getLookUpNationalityList        : `${namespaceUrl}/sd003/getLookUpNationalityList.html` ,
//                getLookUpAreaCodeList           : `${namespaceUrl}/sd003/getLookUpAreaCodeList.html` ,
//                getThailandZipCodeMap           : `${namespaceUrl}/sd003/getThailandZipCodeMap.html` ,
//                getPolicyInfoListWithPolicyNo   : `${namespaceUrl}/sd003/getPolicyInfoListWithPolicyNo.html` ,
//                getCustomerAddressWithPolicyNo  : `${namespaceUrl}/sd003/getCustomerAddressWithPolicyNo.html` ,
//                getProvinceList                 : `${namespaceUrl}/sd003/getProvinceList.html` ,
//                getDistrictList                 : `${namespaceUrl}/sd003/getDistrictList.html` ,
//                getSubDistrictList              : `${namespaceUrl}/sd003/getSubDistrictList.html` ,
//                savePolicyCustomerInfo          : `${namespaceUrl}/sd003/savePolicyCustomerInfo.html` ,
//            },
//            sd005_1:{
//               searchPaymentHistoryDetail   : `${namespaceUrl}/sd005_1/searchPaymentHistoryDetail.html` ,
//               searchCreditHistoryUsing     : `${namespaceUrl}/sd005_1/searchCreditHistoryUsing.html` ,
//               getCreditBankEdcList         : `${namespaceUrl}/sd005_1/getCreditBankEdcList.html` ,
//               getCreditCardIssuerList      : `${namespaceUrl}/sd005_1/getCreditCardIssuerList.html` ,
//               getUserInfo                  : `${namespaceUrl}/sd005_1/getUserInfo.html` ,
//               saveCreditCardPaymentInfo    : `${namespaceUrl}/sd005_1/saveCreditCardPaymentInfo.html` ,
//            },
//            sd006:{
//                getFollowByList             : `${namespaceUrl}/sd006/getFollowByList.html` ,
//                countFollowAssign           : `${namespaceUrl}/sd006/countFollowAssign.html` ,
//                searchFollowAssign          : `${namespaceUrl}/sd006/searchFollowAssign.html` ,
//                countFollowAssignHistory    : `${namespaceUrl}/sd006/countFollowAssignHistory.html` ,
//                searchFollowAssignHistory   : `${namespaceUrl}/sd006/searchFollowAssignHistory.html` ,
//                exportFollowAssignExcel     : `${namespaceUrl}/sd006/exportFollowAssignExcel.html` ,
//                exportFollowAssignExcelByJob     : `${namespaceUrl}/sd006/exportFollowAssignExcelByJob.html` ,
//            }
//        }
//    };
//};
