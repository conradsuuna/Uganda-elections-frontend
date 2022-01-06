import * as d3 from 'd3'
import { useEffect, useState,useRef } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../layouts/Tabs';
import Box from '@mui/material/Box';
import BarChart from '../charts/BarChart';
import ScatterPlot from '../charts/ScatterPlot';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PresidentialElections2021() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let incoming_data = {
        "MuseveniPercentage": "81.2339331619537",
        "MaoPercentage": "0",
        "KyagulanyiPercentage": "16.5809768637532",
        "MuntuPercentage": "0.6426735218509",
        "MwesigyePercentage": "0.12853470437018",
        "MayambalaPercentage": "0",
        "TumukundePercentage": "0.12853470437018",
        "AmuriatPercentage": "0.6426735218509",
        "NancyPercentage": "0.51413881748072",
        "KatumbaPercentage": "0.12853470437018",
        "KabuletaPercentage": "0"
    }
    let data = []
    for (let d in incoming_data){
        data.push({name:d.replace("Percentage",""), value:parseFloat(Number(incoming_data[d]).toFixed(2))})
    }


    const data2 = [
        {x:1, y:2, name:'kampala'},
        {x:7, y:2, name:'kampala'},
        {x:3, y:6, name:'kampala'},
        {x:4, y:9, name:'kampala'},
        {x:10, y:4, name:'kampala'},
        {x:9, y:2, name:'kampala'},
        {x:1, y:7, name:'kampala'},
        {x:6, y:3, name:'kampala'},
        {x:2, y:5, name:'kampala'}
    ]

    
    // console.log(data)

    // useEffect(() => {
    //     const Chart = Plot.plot({
    //         y: {
    //           grid: true
    //         },
    //         marks: [
    //           Plot.barY(data, {x: "letter", y: "frequency", fill: "#bab0ab"}),
    //           Plot.ruleY([0])
    //         ]
    //       })
        
    // }, [data])
   
    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Winnber by polling station" {...a11yProps(0)} />
                    <Tab label="Voter turnout" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                
                <BarChart data={data} station="Kampala" />
                
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ScatterPlot data={data2} station="Kampala" />
            </TabPanel>
        </div>
    );
}
