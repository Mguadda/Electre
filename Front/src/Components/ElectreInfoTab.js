import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ElectreInfoTab = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="electre-content"
        id="electre-header"
      >
        <Typography variant="h6">Learn more about ÉLECTRE</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography paragraph>
          ÉLECTRE is a family of multi-criteria decision analysis (MCDA) methods that originated in Europe in the mid-1960s. The acronym ÉLECTRE stands for: ÉLimination Et Choix Traduisant la REalité ("Elimination and Choice Translating Reality").
        </Typography>
        <Typography paragraph>
          The method was first proposed by Bernard Roy and his colleagues at SEMA consultancy company. A team at SEMA was working on the concrete, multiple criteria, real-world problem of how firms could decide on new activities and had encountered problems using a weighted sum technique. Roy was called in as a consultant and the group devised the ELECTRE method.
        </Typography>
        <Typography paragraph>
          As it was first applied in 1965, the ELECTRE method was to choose the best action(s) from a given set of actions, but it was soon applied to three main problems: choosing, ranking and sorting. The method became more widely known when a paper by B. Roy appeared in a French operations research journal.
        </Typography>
        <Typography paragraph>
          It evolved into ELECTRE I and continued to develop through various iterations like ELECTRE II, ELECTRE III, ELECTRE IV, ELECTRE IS, and ELECTRE TRI. They are used in fields such as business, development, design, and small hydropower.
        </Typography>
        <Typography>
          Criteria in ELECTRE methods have two distinct sets of parameters: the importance coefficients and the veto thresholds. ELECTRE method cannot determine the weights of the criteria. In this regard, it can be combined with other approaches such as Ordinal Priority Approach, Analytic Hierarchy Process, etc.
        </Typography>
        <Typography variant="caption" display="block" gutterBottom style={{ marginTop: 16 }}>
          Source: <Link href="https://en.wikipedia.org/wiki/ELECTRE" target="_blank" rel="noopener">Wikipedia</Link>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ElectreInfoTab;
