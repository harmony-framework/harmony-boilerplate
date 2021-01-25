import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Accordion,
	Container
} from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
	flowsConfig: {
		[key: string]: {
			[key: string]: { steps: Array<string> };
		};
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		paddingTop: '50px',
		paddingLeft: '0px'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	accordionItem: {
		marginTop: '10px'
	},
}));

export default function SimpleAccordion(props: Props) {
	const classes = useStyles();
	const { flowsConfig } = props;

	return (
		<Container className={classes.root}>
			<h5>Flows</h5>
			{
				Object.keys(flowsConfig)?.map((flow) => {
					const subFlows = flowsConfig[flow];

					return (
						<Accordion key={flow} className={classes.accordionItem}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
								<Typography className={classes.heading}>flow name: <b>{flow}</b></Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									<span><u>sub flows:</u></span>
									{
										Object.keys(subFlows)?.map((subFlow) => {
											return (
												<Accordion key={`${flow}_${subFlow}`} className={classes.accordionItem}>
													<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
														<Typography className={classes.heading}>{subFlow.replace(',', ' and ')}</Typography>
													</AccordionSummary>

													<AccordionDetails>
														<Typography>
															<ol>
																{
																	subFlows[subFlow]?.steps.map((step) => {
																		return <li key={`${flow}_${subFlow}_${step}`}>{step}</li>;
																	})
																}
															</ol>
														</Typography>
													</AccordionDetails>
												</Accordion>
											);
										})
									}
								</Typography>
							</AccordionDetails>
						</Accordion>
					);
				})
			}
		</Container>
	);
}
