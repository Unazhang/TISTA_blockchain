import React, { useState } from 'react'
import Popup from "../../pages/Popup";
import Controls from "../../controls/Controls";
import Send from "../../pages/Donation/send.js";

export default function HomeSend() {

    const [openPopup, setOpenSend] = useState(false)

    return (
        <>
        <Controls.Button
                    text="Send"
                    variant="contained"
                    onClick={() => { setOpenSend(true);}}
        />

        <Popup
            title="Send"
            open={openPopup}
            handleClose={setOpenSend}
        >
            <Send/>
        </Popup>

        </>
    )
}
