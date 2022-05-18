import axios from 'axios';
import { url } from  './URL'

function errorBE(error){
    console.log("Erro no back end !", error)
    throw (error);
}

class Api {

// ---------------- U S E R S        
    /*
        uid: UUID,
        name: string,
        password: string,
    */
    login({name, password}) {        
        // If user/pass are OK, B.E. returns token
        return axios.post(`${url}/login`, 
            {name: name, password: password}
        )
        .then(
            (response) => {return response.data},
            (error) => errorBE(error)
        )
    }

    addUser(name, password1) {
        const admToken = localStorage.getItem("ADM");
        return axios.post(`${url}/user/store`, 
                {name: name, password: password1},
                {headers: {'Authorization': admToken}}
            )
        .then( //If OK retrurs an user object
            (response) => {return response.data},
            (error) => errorBE(error)
        )
    }
            
    getUsers() {
        const admToken = localStorage.getItem("ADM");

        console.log("getusers:", admToken)

        return axios.get(`${url}/users`, 
            {headers: {'Authorization': admToken}}
        )
        .then( // If OK returns an arrays of user objects 
            (response) => {return response.data},
            (error) => {
                console.log("Erro no back end !", error);
                return [] // Return array to help front end
            }
        )
    }

    // Save edited user
    updtUser({name, password, uid}) {
        const admToken = localStorage.getItem("ADM");
        return axios.put(`${url}/user/${uid}`, 
            {name, password},
            {headers: {'Authorization': admToken}}
        )
        .then( //If OK returns user object
            (response) => {return response.data},
            (error) => errorBE(error)
        )
    }

    // Remove user
    delUser(uid) {
        const admToken = localStorage.getItem("ADM");
        return axios.delete(`${url}/user/${uid}`,
            {headers: {'Authorization': admToken}}
        )
        .then( // If OK returns removed user
            (response) => {return response.data},
            (error) => errorBE(error)
        )
    }
    
    // Test admin token
    testAdmin(name, password) {  
        return axios.post(`${url}/login`, 
            {name, password},
        )
        .then( // If OK return admin token
            (response) => {return response.data},
            (error) => errorBE(error))
    }


// ---------------- M E S S A G E S     
    /*
        uid: UUID,
        description: string,
        details: string,
        user_id: UUID
    */

    // Store new message
    saveMessage({description, details}, uid) {
        //Enforce the size of the arrays to not upset the DB
        const descriNew = description.slice(0,44);
        const detailNew = details.slice(0,149);

        const token = localStorage.getItem("token");
        return axios.post(`${url}/message/${uid}`, 
            {description: descriNew, details: detailNew},
            {headers: {'Authorization': token}}
        )
        .then( // If OK retirns a message object
            (response) => {return response.data;},
            (error) => errorBE(error))
    }

    // Get all users's messages
    getMessages(userID) {
        const token = localStorage.getItem("token");
        return axios.get(`${url}/messages/${userID}`, 
            {headers: {'Authorization': token}}
        )
        .then( // If OK return an arrays of message objects
            (response) => {return response.data;},
            (error) => {
                console.log("Erro no back end !", error);
                return [] // The user has no message
            }
        )
    }

    // Remove message
    delMessage(messageID) {
        const token = localStorage.getItem("token");

        return axios.delete(`${url}/message/${messageID}`, 
            {headers: {'Authorization': token}}
        )
        .then( //If OK retuns the removed message
            (response) => {return response.data},
            (error) => errorBE(error)
        )
    }    

    // Save edited  message
    updtMessage({description, details, uid}) {
        const descriNew = description.slice(0,44);
        const detailNew = details.slice(0,149);

        const token = localStorage.getItem("token");

        return axios.put(`${url}/message/${uid}`, 
            {description: descriNew,details: detailNew},
            {headers: {'Authorization': token}}
        )
        .then( // If OK retirns the updated message
            (response) => {return response.data},
            (error) => errorBE(error)
        )
    }    
}

export default new Api();