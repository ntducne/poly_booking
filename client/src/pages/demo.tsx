export default function Demo() { 
    fetch('http://localhost:5000/api/v1/users',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    return (
        <>aHIHI</>
    )
}