import React, { useRef, useEffect, useContext } from 'react';
import {connect} from 'react-redux' ;

import fetch, {doPost} from 'thaisamut/common/lib/fetch';
import OLIRemoteDataTable from "thaisamut/common/components/oli-datatable";
import OLIDownloadButton from "thaisamut/common/components/oli-button/OLIDownloadButton";
import Utils from "thaisamut/common/lib/Utils";
import OLIHLayout from "thaisamut/common/components/oli-layout/OLIHLayout";
import OLIDemo from "thaisamut/common/components/oli-demo";
import OLIButton from "thaisamut/common/components/oli-button";
import OLIIcon from "thaisamut/common/components/oli-icon";
import CommonContext from "thaisamut/common/context/CommonContext";

import IconButton from "@material-ui/core/IconButton";

const Index = (props) => {

    return (
            'Hello, This is Search File Page'
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
)(Index)
