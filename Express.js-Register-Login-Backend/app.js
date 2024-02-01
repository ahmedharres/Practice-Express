const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())

//array to store user in memory
const users = []

app.post('/register', async (req, res) => {
    try {
        const { userName, phone, email, password, gender } = req.body
        const findUser = users.find((data) => userName === data.userName)
        if (findUser) {
            res.status(400).send(`User Name Already Used`)
            return
        }
        let hashedPass = await bcrypt.hash(password, 10)
        users.push({ userName, phone, email, password: hashedPass, gender, })
        console.log(users)
        res.status(201).send('Registered Successfully')
        return
    } catch (err) {
        res.status(500).send({ message: err.message })
        return
    }
})

app.post('/Login', async (req, res) => {
    try {
        const { userName, password, } = req.body
        const findUser = users.find((data) => userName === data.userName)
        if (!findUser) {
            res.status(400).send(`Wrong User Name or Password`)
            return
        }
        const matchPassword = await bcrypt.compare(password, findUser.password)
        if (matchPassword) {
            res.status(200).send('Logged In Successfully')
            return
        }
        res.status(400).send(`Wrong User Name or Password`)
            return

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})
app.listen(5000, () => {
    console.log('server is listening on port 5000...')
})