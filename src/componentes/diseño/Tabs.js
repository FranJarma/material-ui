import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabContext, TabPanel } from '@material-ui/lab';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: '2rem'
  },
});

const IconTabs = ({infoTabs}) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return ( 
        <Paper square className={classes.root}>
            <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            >
                {infoTabs.map(tab=>
                <TabContext>
                    <Tab icon={tab.icono} label={tab.label}/>
                    <TabPanel value={value}>
                        {tab.componente}
                    </TabPanel>
                </TabContext>
                )}
            </Tabs>
        </Paper>
     );
}
 
export default IconTabs;
