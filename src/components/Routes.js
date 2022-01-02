import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import PresidentialElections2021 from "./views/PresidentialElections2021";

export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presidential-2021" element={<PresidentialElections2021 />} />
        </Routes>
    )
}