const { Observable } = require('rxjs');
const { ColdObservable } = require('rxjs/internal/testing/ColdObservable');
const { map } = require('rxjs/operators');
const users = {
    data: [
        {
            status: "active",
            age: 10
        },
        {
            status: "inactive",
            age: 12
        },
        {
            status: "inactive",
            age: 18
        },
        {
            status: "inactive",
            age: 72
        },
        {
            status: "active",
            age: 25
        }
        
    ]
};

const users2 = {
    data: [
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 12
        },
        {
            status: "inactive",
            age: 18
        },
        {
            status: "inactive",
            age: 72
        },
        {
            status: "active",
            age: 25
        }
        
    ]
};


const observable = new Observable((subscriber) => {
    subscriber.next(users2);
   
}).pipe(
    map((value) => {
        // console.log("1) got data from observable ", value)
       return value.data
    }),
    map((value) => {

        // console.log("2)Got data from first operator ", value)
       return value.filter(user => user.status === "active")
        }),
        map((value) => {

            // console.log("3)Got data from second operator ", value)
           return (value.reduce((sum, user) => sum+ user.age, 0) / value.length )
            }),
            map ((value) => {
                // console.log("4) Got data from third operator", value);
                if(value < 18) throw new Error("Age is less than 18");
                else return value;
            }),
            
    
);

const observer = {
    next : (value) => { console.log("Observer got a value of " + value);
},
error: (err) => { console.log("Observer got an error " + err);
},
complete: () => { console.log("Observer got a complete notification");
}
};

observable.subscribe(observer);
