import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DonattionFlowHistory from './DonationFlowHistory';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    marginRight:50
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Donated To: 0x98BfA478D7e25f4A424c8f1E96A190368D118b22</Typography>
          <Typography className={classes.heading}>Amount: $500</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <DonattionFlowHistory address={"0x98BfA478D7e25f4A424c8f1E96A190368D118b22"}/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Donated To: 0x847d2827188fA5Da7b4b20AaA3d5BbB449Cf0AFb</Typography>
          <Typography className={classes.heading}>Amount: $50</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <DonattionFlowHistory address={"0x847d2827188fA5Da7b4b20AaA3d5BbB449Cf0AFb"}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}