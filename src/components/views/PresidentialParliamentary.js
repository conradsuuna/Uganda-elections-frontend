import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../layouts/Tabs';
import Box from '@mui/material/Box';
import API from "../api"
import GroupedBarChart from '../charts/GroupedBarChart';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PresidentialParliamentary() {
    const [value, setValue] = useState(0);
    
    const [groupedData, setGroupedData] = useState(null);

    // 
    const [districtData, setDistrictData] = useState(null);
    const [districtName, setDistrictName] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDistrictChangeBar = (event) => {
        let location = event.target.value
        console.log(location)
        // post request
        const payload = {
            district_name: String(location).toUpperCase()
        }
        setDistrictName(location)
        API.post('/getParliamentaryPresidentialPercentagesByParty', payload).then((res) => {
            let data = res.data

            const new_data = []
            
            for (let d in data[0]) {
                new_data.push({ party: d.replace("_percentage", "").toUpperCase(),
                 presidential: parseFloat(Number(data[0][d]).toFixed(2)),
                 parliamentary: parseFloat(Number(data[1][d]).toFixed(2))
                 })
            }
            console.log(new_data)
            setGroupedData(null)
            setGroupedData(new_data)
        }).catch(error => {
            console.log(error)
        })
    };

    useEffect(() => {
        API.get('/get_districts').then((res) => {
            // console.log(res.data)
            setDistrictData(res.data)
        }).catch(error => {
            console.log(error)
        })

        const test_data = [
            {
                party: "",
                presidential: 0,
                parliamentary: 0
            }]
        setGroupedData(test_data)

    }, [])

    if (!districtData) return "";
    if (!groupedData) return '';

    const parties = groupedData.map((d) => d.party)
    const stats = Object.keys(groupedData[0]).slice(1);

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Party Votes" {...a11yProps(0)} />
                    {/* <Tab label="Presidential Vs Parliamentary Votes" {...a11yProps(1)} /> */}
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <form class="row g-3">
                    <div class="col-auto">
                        <select className="form-select" aria-label="Default select example" defaultValue="1" style={{ width: 300 }} onChange={handleDistrictChangeBar}>
                            <option value="1" dis="true">Select Districts</option>
                            {districtData.map((d) => (
                                <option
                                    key={d._id}
                                    value={d.location_name}
                                >
                                    {d.location_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
                <GroupedBarChart data={groupedData} stats={stats} parties={parties} station={districtName} />
            </TabPanel>

            {/* <TabPanel value={value} index={1}>
                <select className="form-select" aria-label="Default select example" defaultValue="1" style={{ width: 300 }} onChange={handleDistrictChangeScatter}>
                    <option value="1" dis="true">Select Districts</option>
                    {districtData.map((d) => (
                        <option
                            key={d._id}
                            value={d.location_id}
                        >
                            {d.location_name}
                        </option>
                    ))}
                </select>
                <CorrScatterPlot data={stationData} station={districtName} />
            </TabPanel> */}
        </div>
    );
}
