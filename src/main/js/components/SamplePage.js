import React, {useRef, useState, useEffect, Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import OLIVLayout from "thaisamut/common/components/oli-layout/VLayout";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        //padding: theme.spacing(2),
        border: "1px solid red",
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    toolbarSelect:{
        width:'300px',
    }
}));

const SamplePage = (props) => {
    
    const classes = useStyles();

    const {} = props ;

    useEffect(()=> {
       
    }, []);


    return (
        <OLIVLayout style={{backgroundColor:'#F5F5F5'}}>
            SAMPLE PAGE

        </OLIVLayout>
    );
};

export default SamplePage;

