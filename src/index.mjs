import express from 'express';

const app = express();

app.use(express.json())

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
    console.log(req.query);
    const { 
        query: {filter, value},
    } = req;
    // filter and value are defined
    if (filter && value)return res.send(mockUsers.filter((user) => user[filter].includes(value))
    );
    return res.send(mockUsers);
    
});

app.post('/api/users', (req, res) => {
    const { body } = req;
    const newUser = {
        id: mockUsers[mockUsers.length - 1].id+1, ...body };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
    
})

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

app.put('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id },
    }= req;
    const parsedId =parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === - 1) return res.sendStatus(404);
    mockUsers[findUserIndex] = { id: parsedId, ...body };
    return res.sendStatus(200);
});

app.patch('/api/users/:id', (req, res) => {
    const {
        body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body};
    return res.sendStatus(200);
});

app.delete('/api/users/:id', (req, res) => {
    const {
        params: { id },
    }=req;

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);
    mockUsers.splice(findUserIndex), 1;
    return res.sendStatus(200);

})