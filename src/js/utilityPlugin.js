this.JET = window.JET || {};

JET.Utils = function () {
    return {
        fileReader: function (jsonData) {
            return JSON.stringify(jsonData, null, 4);
        },
        idValidEmail: function (email) {
            let res = /\S+@\S+\.\S+/;
            return res.test(email);
        },
        getDataFromJSON: async function (url) {
            console.log(url , 'url')
            const response = await fetch(url);
            const json = await response.json();
            return json;

        },
        isUserExist: async function (user, password) {
            let deCryptedPwd = btoa(password);
            let val = false;
            fetch("http://localhost:3000/userData")
            .then((response) => response.json())
            .then((result)=>{
                console.log(result)
                result.forEach(element => {
                    if (element.username === user && element.password === deCryptedPwd && element.userRole === role) {
                        val =  true;
                    }                    
                });
                
            })
            .then(()=>{
                if(val){
                //console.log("Ready to fix session of user");    
                this.setSession("username",user);
                }
            })
            .catch((ex) =>console.log(ex));
        },
        setSession: function (key, value) {
            try {
                if ((typeof key !== 'undefined' && key !== null && key !== '') && (typeof value !== 'undefined' && value !== null && value !== '')) {
                    sessionStorage.setItem(key, value);
                    return true;
                }
            }
            catch (ex) {
                return false;
            }
        },
        getSession: function (key) {
            if ((typeof key !== 'undefined' && key !== null && key !== '')) {
                return sessionStorage.getItem(key);
            }
        },
        isDataInSession: function (key) {
            let session = this.getSession(key);
            return session === undefined || session === null || session === '';
        },
        setJSONSession: function (key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        getJSONSession: function (key) {
            return JSON.parse(this.getSession(key));
        },
        deleteSession: function (key) {
            if ((typeof key !== 'undefined' && key !== null && key !== '')) {
                sessionStorage.removeItem(key);
            }
        },
        updateJSON: async function (url, data) {
            try {
                fetch(url, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
            catch (ex) {
                console.log(ex);
            }
        }
    }
}();