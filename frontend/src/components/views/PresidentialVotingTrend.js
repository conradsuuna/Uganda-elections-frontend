import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../layouts/Tabs';
import Box from '@mui/material/Box';
import API from "../api"
import LineChart from '../charts/LineChart';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PresidentialParliamentary() {
    const [value, setValue] = useState(0);
    
    const [trendData, setTrendData] = useState(null);

    // 
    const [districtData, setDistrictData] = useState(null);
    const [districtName, setDistrictName] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDistrictChange = (event) => {
        let location = event.target.value
        console.log(location)
        // post request
        const payload = {
            district_name: String(location)
        }
        setDistrictName(location)
        API.post('/get_turnout_trend', payload).then((res) => {
            let data = res.data

            setTrendData(null)
            setTrendData(data)
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
                voter_turnout: 0,
                year: 0
            }]
        setTrendData(test_data)

    }, [])

    if (!districtData) return "";
    if (!trendData) return '';

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Presidential Voting Trend" {...a11yProps(0)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <form class="row g-3">
                    <div class="col-auto">
                        <select className="form-select" aria-label="Default select example" defaultValue="1" style={{ width: 300 }} onChange={handleDistrictChange}>
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
                <LineChart data={trendData} station={districtName} />
            </TabPanel>
        </div>
    );
}
