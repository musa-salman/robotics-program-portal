import { Route } from "react-router-dom"
import Container from "./Container"

export const useStudyMaterialRoutes = () => {
    return (
        <>
            <Route path="/study-material" element={<Container />} />
        </>
    )
}