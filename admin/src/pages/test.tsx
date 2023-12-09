import React, { useEffect } from 'react';
const fetchStatistical = async (value: any) => {
    fetch('http://localhost:8000/api/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    });
}
const Test: React.FC = () => {
    useEffect(() => {
        fetchStatistical({
            "module": "revenue",
            "status": [3, 4],
            "type": "daily",
            "day": "2023-11-29",
        })
    }, []);
    // const processStatistical = (data: any) => {
    //     fetchStatistical(data)
    // }
    return (
        <></>
    );
}
export default Test;