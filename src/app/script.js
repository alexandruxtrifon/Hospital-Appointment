fetch("http://localhost:3000/api/get-appointments")
.then((response)=>{
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then((data) =>{
    console.log(data);
})
.catch((error)=>{
    console.error('There was a problem with the fetch operation:', error);
})