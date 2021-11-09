import React, { useState } from 'react'
import DonationReqForm from "./DonationReqForm";
import {makeStyles} from '@material-ui/core';
import Controls from "../../controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../Popup";
import Send from "./send.js";
import DonationTab from './DonationTab';
import Typography from "@material-ui/core/Typography";
import DetectAccount from './DetectAccount';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        verticalAlign:'top',
        top:0
    }
}))


export default function DonationDraft() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenDonate] = useState(false)
    const [openDonreq, setDonreq] = useState(false);


    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (resetForm) => {
        resetForm()
        setRecordForEdit(null)
        setOpenDonate(false)
        setDonreq(false)
    }

    return (
        <>
        <div><Typography variant="h6" id="tableTitle" component="div">Donation</Typography> </div>
        <div style={{width:'80%'}}>
            <DonationTab />
        </div>

        <div >
        <Controls.Button
                    text="Request Donation"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => { setDonreq(true);}}
        />
        <Controls.Button
                    text="Donate"
                    variant="contained"
                    className={classes.newButton}
                    onClick={() => { setOpenDonate(true); }}
        />
        </div>
            
        <Popup
            title="Donate"
            open={openPopup}
            handleClose={setOpenDonate}
        >
            <Send/>
        </Popup>

        <Popup
            title="Request Donation"
            open={openDonreq}
            handleClose={setDonreq}
        >
            <DonationReqForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit} />
                <DetectAccount/>
        </Popup>
        </>
    )
}
