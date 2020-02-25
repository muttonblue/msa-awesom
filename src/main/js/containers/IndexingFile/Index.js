import React, { useRef, useEffect, useContext } from 'react';
import {connect} from 'react-redux' ;
import SamplePage from '~/components/SamplePage';
import fetch, {doPost} from 'thaisamut/common/lib/fetch';

import OLIRemoteDataTable from "thaisamut/common/components/oli-datatable";
import OLIDownloadButton from "thaisamut/common/components/oli-button/OLIDownloadButton";
import Utils from "thaisamut/common/lib/Utils";
import OLIHLayout from "thaisamut/common/components/oli-layout/OLIHLayout";
import OLIDemo from "thaisamut/common/components/oli-demo";
import OLIButton from "thaisamut/common/components/oli-button";
import OLIIcon from "thaisamut/common/components/oli-icon";

import IconButton from "@material-ui/core/IconButton";

import CommonContext from "thaisamut/common/context/CommonContext";


const MainDataTable = (props) => {

    const dataTableRef = useRef();
    useEffect( () => {
        dataTableRef.current.search({});
    }, []);
    const datas = [];

    const { action } = props;

    console.log('MainDataTable.props=>');
    console.log(props);

    const ctx = useContext(CommonContext);

    console.log("window.global.global.UNITTEST");
    console.log(window.global.UNITTEST);

    const UNITTEST = window.global.UNITTEST;

    if ( UNITTEST === true ) {
        for(let i = 1; i <= 100; i++){
            datas.push(
                {fileName: `sc20190001-${i}`, scanDate: Date(), fileType: 'TIFF', pageCount: 5, mfpCode: 'ir2018', ftpFolder: '0116-01'},
            );
        }
    }

//    const submitJobURL = Utils.getServices().example.submitJob;
//    const poolingJobURL = Utils.getServices().common.commonPoolingJob;
//    const downloadFileURL = Utils.getServices().common.commonDownloadFile;

    return (
            <OLIRemoteDataTable
                ref={dataTableRef}
                customToolbar={() => (
                    <OLIHLayout justify={'flex-end'} alignItems={'center'} >
                        <OLIButton variant="contained" color={"primary"} icon='mdi-account'>Refresh</OLIButton>
                    </OLIHLayout>
                )}
                columns={[
                    {
                    label:'Click', name:'', align:'center',
                                options:{
                                    customBodyRender: (value, tableMeta, rowData) => {
                                        return (
                                            <IconButton color={'primary'} onClick={() => action.push('/IndexingFile/DataEntry', {value,tableMeta,rowData})}>
                                                <OLIIcon name={"mdi-file-document"} />
                                            </IconButton>
                                        )
                                    }
                                }
                    },
                    {label:'File name', name:'fileName'},
                    {label:'Scan Date', name:'scanDate'},
                    {label:'File Type', name:'fileType'},
                    {label:'Page Count', name:'pageCount'},
                    {label:'MFP Code', name:'mfpCode'},
                    {label:'FTP Folder', name:'ftpFolder'},
                ]}
                remoteServiceConfig={{
                    mockCountURL:() => datas.length,
                    mockDataURL:() => datas,
                }}
            />
    )
};


const mapStateToProps = state => {
    const {UI} = state.gs;

    return {

    }
};

const mapDispatchToProps = dispatch => ({


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainDataTable)
