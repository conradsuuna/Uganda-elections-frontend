import { Routes, Route } from "react-router-dom";
// import Home from "./views/Home";
import PresidentialElections2021 from "./views/PresidentialElections2021";
import PresidentialParliamentary from "./views/PresidentialParliamentary";
import PresidentialVotingTrend from "./views/PresidentialVotingTrend";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<PresidentialElections2021 />} />
            <Route path="/presidential-2021" element={<PresidentialElections2021 />} />
            <Route path="/presidential-parliamentary-2021" element={<PresidentialParliamentary />} />
            <Route path="/presidential-voting-trend" element={<PresidentialVotingTrend />} />

        </Routes>
    )
}