let express = require('express');
const { default: mongoose } = require('mongoose');
let Users = require('./db/users')
let Medicine = require('./db/medicine')
const jsonwebtoken = require('jsonwebtoken');
let Orders = require('./db/order')

const multer = require('multer');

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, './build/images')
        },
        filename: function (req, file, cb) {
                cb(null, file.originalname)
        }
})

const upload = multer({ storage: storage })


mongoose.connect("mongodb+srv://tayyab:1234@cluster0.wzlj0.mongodb.net/?retryWrites=true&w=majority", (err, connection) => {

        console.log(err || connection);

})


let myApp = express();


myApp.use(express.json());

myApp.post('/auth/createMedicine', upload.single('pic'), async (req, res) => {
        try {
                req.body.medicinePic = req.file.originalname;
                let medicine = new Medicine(req.body);
                await medicine.save();
        } catch (e) {
                res.json({
                        success: true,
                })
        }
})

// myApp.post('/auth/session',async (req, res) => {

        
//         jsonwebtoken.verify(req.body.token, 'Drugs online store', { expiresIn: '5h' }, async (err, data) => {
                

//                 if (data) {
//                         let user = await Users.findById(data.id);
//                         res.json(user);
//                 } else {
//                         res.json(null)
//                 }
//         })

// })

myApp.delete('/auth/delete', async (req, res) => {
        try {

                await Medicine.findByIdAndDelete(req.query.id);

                res.json({
                        success: true,
                })

        } catch (e) {

                res.json({
                        success: false,
                })

        }
});


myApp.delete('/auth/deleteUser', async (req, res) => {
        try {

                await Users.findByIdAndDelete(req.query.id);

                res.json({
                        success: true,
                })

        } catch (e) {

                res.json({
                        success: false,
                })

        }
});

myApp.get('/auth/admin', async (req, res) => {
        try {
                let users = await Users.find({});
                res.json(users);
        } catch (e) {
                res.json({
                        success: true,
                })
        }
});


myApp.post('/auth/custumerOrder', async (req, res) => {

        try {
                let newOrder = new Orders(req.body);
                await newOrder.save();
        } catch (e) {
                res.json({
                        success: true,
                })
        }
});

 

myApp.get('/auth/getOrder' , async(req , res)=>{

        try{
                let getOrder = await Orders.find({}).populate('medicine customer').exec();
                res.json(getOrder);
        }catch(e){
                res.json({
                        success:true,
                })
        }
 
})



myApp.post('/auth/signup', async (req, res) => {


        try {

                let medicineUser = new Users(req.body);
                await medicineUser.save();
        } catch (e) {
                res.json({
                        success: true,
                })
        }
});



myApp.get('/auth/getMedicine', async (req, res) => {
        try {

                let newMedicines = await Medicine.find({});
                res.json(newMedicines);
        } catch (e) {
                res.json({
                        success: true,
                })
        }
})



myApp.post('/auth/login', async (req, res) => {

        try {

                let userFound = await Users.findOne({
                        password: req.body.password,
                        email: req.body.email,

                });

                if (userFound) {

                        // jsonwebtoken.sign({ id: userFound._id }, 'Drugs online store', (err, data) => {
                        //         res.json({
                        //                 userFound,
                        //                 nishani: data,
                        //         });
                        // })

                        res.json({userFound})
                } else {
                        res.json(null)
                }
        } catch (e) {
                res.json({
                        userFound,
                })
        }
});

myApp.use(express.static('./build'));

myApp.listen(process.env.PORT||  2211, '0.0.0.0', () => {
        console.log('server is working');
})