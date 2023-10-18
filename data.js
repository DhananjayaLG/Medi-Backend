import bcrypt from 'bcryptjs';
const data=
{
users:[
    {
        Email:"nadeesha5.pabasara@gmail.com",
        password:bcrypt.hashSync('123abc'),
        role:'doctor',
        Name:"Nadeesha Pabasara",
        Type:"Senior Medical Officer",
        WardName:"ICU",
        Specialization:  "Cardiologist",
        Address:"katubedda,moratuwa",
        ContactNo:"0763860004",
        ID:12783
    },
    {Email:'admin1@gmail.com',
    password:bcrypt.hashSync('123'),
    role:'admin',
    Name:"Kmala jaya",
    Address:"Katubedda , Anuradhapura",
    ContactNo: "0783412345",
    
   },
   {
    Email:"Srimal.pabasara@gmail.com",
    password:bcrypt.hashSync('1abc'),
    role:'consultant',
    Name:"Srimal Gamage",
    Type:"Senior Medical Officer",
    WardName:"ICU",
    Specialization:  "Cardiologist",
    Address:"katubedda,moratuwa",
    ContactNo:"0763860004",
    ID:12783
},
]}
export default data;