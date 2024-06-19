import { formatDistanceToNowStrict } from "date-fns"

function formatDate(distance, date) {
    if(distance.includes("year")) return new Date(date).toLocaleDateString();
    else return distance;
}

export default function dateFormat( date ){
    const distance = date ? formatDistanceToNowStrict(new Date(date), { addSuffix: true }) : "Invalid date"
    return formatDate(distance, date)
}