import React, { useRef, useEffect, useContext, useState } from 'react';
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
import OLIForm from 'thaisamut/common/components/oli-form/OLIForm';
import OLIVLayout from "thaisamut/common/components/oli-layout/VLayout";
import OLIPanel from "thaisamut/common/components/oli-panel";
import OLICheckboxField from "thaisamut/common/components/oli-form/field/OLICheckboxField";
import DateUtils from "thaisamut/common/lib/DateUtils";

import IconButton from "@material-ui/core/IconButton";
import {Button, Typography} from "@material-ui/core";

import Carousel, { Modal, ModalGateway } from 'react-images';

const MainDataTable = (props) => {

    const [initialValues, setInitialValues] = useState({});

    const { value,tableMeta } = props;

    const ctx = useContext(CommonContext);

    console.log("ctx.global");
    console.log(ctx.global);

//    const images = [{ source: 'path/to/image-1.jpg', source: 'path/to/image-2.jpg' }];
    const images = [
        { source: 'https://images.unsplash.com/photo-1526382551041-3c817fc3d478?dpr=2&auto=format&w=1024' },
        { source: 'https://images.unsplash.com/photo-1522985225914-17a10a58c8ec?dpr=2&auto=format&w=1024' },
    ];

    const [modalIsOpen,toggleModal] = useState(false);

    let formSchemas = [
        {
            column: 5,
            panelComponent:(component) => {
                return (
                    <OLIPanel title={"Personal Info"} collapsible={true}>
                        {component}
                    </OLIPanel>
                )
            },
            properties: {
                docType: {
                    type: "string",
                    label: 'Document Type',
                    required: true,
                    placeholder: '',
                    helperText: '',
                    maxlength: 50,
                    validates: 'required'
                },
                policyNo: {
                    type: "string",
                    label: 'Policy No',
                    required: true,
                    maxlength: 10,
                },
            }
        },
        {
            column:1,
            actionComponent:(formProps) => {

                //const canSubmit = formProps.values['username'] && formProps.values['password'];

                return (
                    <OLIVLayout style={{padding:15}}>
                        <OLIHLayout justify='center' alignItems={'center'} spacing={1}>
                            <Button color={'primary'}
                                    variant="contained"
                                    onClick={() => formProps.handleSubmit()}>Save</Button>
                        </OLIHLayout>
                    </OLIVLayout>
                );
            },
        },
    ];

    const validates = (values) => {
        console.log('validates : ', values);
    };

    const submitValues = (values) => {
        console.log('submitValues : ', values);
    };

    const onReset = () => {
        console.log('onReset form ')
    };

    console.log("Get RowData " + JSON.stringify(value));

    return (
        <OLIVLayout style={{padding:15}}>
            <OLIPanel title={"View Image"} collapsible={true}>
                <OLIVLayout>
                    <Button color={'primary'}
                        variant="contained"
                        onClick={() => toggleModal(true)}>Open Image</Button>
                    <Carousel views={images} />
                    <ModalGateway>
                        {modalIsOpen ? (
                          <Modal onClose={() => toggleModal(!modalIsOpen)} >
                            <Carousel views={images} />
                          </Modal>
                        ) : null}
                    </ModalGateway>
                </OLIVLayout>
            </OLIPanel>
            <OLIForm initialValues={initialValues}
                     validate={validates}
                     onSubmit={submitValues}
                     onReset={onReset}
                     formSchemas={formSchemas}
            />
        </OLIVLayout>
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
