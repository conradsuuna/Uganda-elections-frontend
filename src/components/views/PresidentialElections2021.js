import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../layouts/Tabs';
import Box from '@mui/material/Box';
import BarChart from '../charts/BarChart';
import ScatterPlot from '../charts/ScatterPlot';
import API from "../api"


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PresidentialElections2021() {
    const [value, setValue] = useState(0);
    // const [barData, setBarData] = useState(null);
    // const [scatterData, setScatterData] = useState(null);

    const [barPollingStations, setBarPollingStations] = useState(null);

    // 
    const [districtData, setDistrictData] = useState(null);
    const [stationData, setStationData] = useState(null);
    // from select elements
    const [pollingStation, setPollingStation] = useState('');
    const [districtName, setDistrictName] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDistrictChangeScatter = (event) => {
        let location = event.target.value
        let name = event.target.options[event.target.selectedIndex].text
        setDistrictName(name)

        // post request
        const payload = {
            location_id: String(location)
        }
        API.post('/get_polling_stations_by_district', payload).then((res) => {
            let data = res.data
            data.forEach(obj => renameKey(obj, 'winner_percentage', 'y'));
            data.forEach(obj => renameKey(obj, 'voter_turnout', 'x'));
            // console.log(data)
            setStationData(null)
            setStationData(data)
        }).catch(error => {
            console.log(error)
        })
    };

    const handleDistrictChangeScatterBar = (event) => {
        let location = event.target.value
        // post request
        const payload = {
            location_id: String(location)
        }
        API.post('/get_polling_stations', payload).then((res) => {
            let data = res.data
            setBarPollingStations(data)
        }).catch(error => {
            console.log(error)
        })
    };

    const handleStationChange = (event) => {

        setPollingStation(event.target.value);
        // post
        const payload = {
            LocationName: String(event.target.value)
        }
        API.post('/get_polls_winners', payload).then((res) => {
            let incoming_data = res.data
            let data = []
            for (let d in incoming_data) {
                data.push({ name: d.replace("Percentage", ""), value: parseFloat(Number(incoming_data[d]).toFixed(2)) })
            }
            console.log(incoming_data)
            setStationData(null)
            setStationData(data)
        }).catch(error => {
            console.log(error)
        })
    };

    function renameKey(obj, oldKey, newKey) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    useEffect(() => {
        API.get('/get_districts').then((res) => {
            // console.log(res.data)
            setDistrictData(res.data)
        }).catch(error => {
            console.log(error)
        })

        const test_data = [{ winner_percentage: 0, voter_turnout: 0 }]
        setStationData(test_data)

        const test_data2 = [{ _id: "61c8c8dae8e3b248c77b5c8a", location_name: "Karangara Trading Centre" }]
        setBarPollingStations(test_data2)
    }, [])

    if (!stationData) return "Please Wait, Loading ....";
    if (!districtData) return "Please Wait, Loading ....";
    if (!barPollingStations) return "Please Wait, Loading ....";

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Winnber by polling station" {...a11yProps(0)} />
                    <Tab label="Voter turnout" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <form class="row g-3">
                    <div class="col-auto">
                        <select className="form-select" aria-label="Default select example" defaultValue="1" style={{ width: 300 }} onChange={handleDistrictChangeScatterBar}>
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
                    </div>
                    <div class="col-auto">
                        <div className='row'>
                            <select className="form-select" aria-label="Default select example" defaultValue="1" style={{ width: 300 }} onChange={handleStationChange}>
                                <option value="1" dis="true">Select Polling Station</option>
                                {barPollingStations.map((d) => (
                                    <option
                                        key={d._id}
                                        value={d.location_name}
                                    >
                                        {d.location_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
                <BarChart data={stationData} station={pollingStation} />
            </TabPanel>

            <TabPanel value={value} index={1}>
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
                <ScatterPlot data={stationData} station={districtName} />
            </TabPanel>
        </div>
    );
}
