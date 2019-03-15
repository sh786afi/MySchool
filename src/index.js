import {app} from "./app";
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Start on Port ${PORT}`);
})

// const MyToken = async ()=>{
//     const token = jwt.sign({_id:'abc123'},'thisismycourse',{expiresIn:'7 days'})
//     console.log(token);
//     const data=jwt.verify(token,'thisismycourse')
//     console.log(data)
// }

// MyToken();           