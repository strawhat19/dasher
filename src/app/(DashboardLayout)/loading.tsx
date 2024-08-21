import { Skeleton } from "@mui/material";

export default function Loading() {
    return(
        <div className={`loading`}>
            <Skeleton variant={`rounded`} width={210} height={60} />
        </div>
    )
}