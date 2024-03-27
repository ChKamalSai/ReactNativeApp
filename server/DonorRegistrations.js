const connection = require("./Connection");
function CharityRegistration(organizationName, email, address, contactDetails, googleMapLink, password, callback) {


    connection.query("select * from Organisations where email=?", [email], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        else if(result.length!=0){
            return callback(null,"Email already exists");
        }
        connection.query("select * from Organisations where mobile=?", [contactDetails], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            else if(result.length!=0){
                return callback(null,"Mobile number already exists");
            }
            connection.query("INSERT INTO Organisations VALUES (?, ?, ?, ?, ?, ?)",
                [organizationName, email, address, contactDetails, googleMapLink, password], (err, result) => {
                    if (err) {
                        console.error("Error registering charity organisation", err);
                        return callback(err, "unkown error occured, please try after some time");
                    }
                    console.log("Charity organisation registered successfully");
                    return callback(null, true);
                });

        })
    })


}
function SupervisorRegistration(name, email, phoneNumber, id, supervisingMess, password, callback) {
    connection.query("SELECT * FROM Supervisors WHERE email=?", [email], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        else if(result.length!=0){
            return callback(null,"Email already exists");
        }
        connection.query("SELECT * FROM Supervisors WHERE phoneNumber=?", [phoneNumber], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            else if(result.length!=0){
                return callback(null,"Mobile number already exists");
            }
            connection.query("INSERT INTO Supervisors (name, email, phoneNumber, id, supervisingMess, password) VALUES (?, ?, ?, ?, ?, ?)",
                [name, email, phoneNumber, id, supervisingMess, password], (err, result) => {
                    if (err) {
                        console.error("Error registering supervisor", err);
                        return callback(err, "Unknown error occurred, please try again later");
                    }
                    console.log("Supervisor registered successfully");
                    return callback(null, true);
                });
        });
    });
}
function StudentRegistration(studentName, organizingGroup, proofsOfOrganizingEvent, contactDetails, dateOfEvent, time, location, password, callback) {

    connection.query("INSERT INTO Students (studentName, organizingGroup, proofsOfOrganizingEvent, contactDetails, dateOfEvent, time, location, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [studentName, organizingGroup, proofsOfOrganizingEvent, contactDetails, dateOfEvent, time, location, password], (err, result) => {
            if (err) {
                console.error("Error registering student", err);
                return callback(err, "Unknown error occurred, please try again later");
            }
            console.log("Student registered successfully");
            return callback(null, true);
        });
}
module.exports = {
    CharityRegistration,
    SupervisorRegistration,
    StudentRegistration
}