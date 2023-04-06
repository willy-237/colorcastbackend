const listUsers = async (credentials) => {
    try{
        let response = await fetch("http://localhost:3002/api/users/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + credentials.t
            }
        })
        return await response.json()
    }catch(err){
        console.log(err);
    }
}

const createUser = async (user, credentials) => {
    try{
        let reponse = await fetch("http://localhost:3002/api/users", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + credentials.t
            },
            body: JSON.stringify(user)
        })
        return await reponse.json();
    }catch(err){
        console.log(err)
    }
}

export { listUsers, createUser }