import { Helmet } from "react-helmet-async";

export type PageTitleProps = {
    title: string
}

export const PageTitle = ({ title }) => {
    return (
        <Helmet>
            <title>{title} - Renjith Ravindran Personal Website</title>
        </Helmet>
    )
}