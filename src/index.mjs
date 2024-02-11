import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id:1, username:"sakib", displayName:"Sakib"},
    {id:2, username:"upal", displayName:"Upal"},
    {id:3, username:"shohag", displayName:"Shohag"},
    {id:4, username:"kabir", displayName:"Kabir"},
    {id:5, username:"sazzad", displayName:"Sazzad"},
    
];

app.listen(PORT, () =>{
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) =>{
    res.status(201).send({msg : "hello world"});
});

app.get('/api/users', (req, res) => {
    res.send(mockUsers);
});

app.get('/api/users/:id', (req, res) =>{
    console.log(req.params);
    const parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad request. Invalid ID."});

    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return res.status(404).send({msg : "User not found"});
    return res.send(findUser);
});

app.get('/api/products', (req, res) => {
    res.send([
        {id: 123, name: "chiken breast", price: 12.99}
    ]);
});
