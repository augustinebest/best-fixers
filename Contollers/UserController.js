const User = require('../Models/User');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    try {
        if (req.body.firstName == '' || req.body.firstName == null || req.body.lastName == '' || req.body.lastName == null || req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null || req.body.confirmPassword == '' || req.body.confirmPassword == null || req.body.phoneNumber == '' || req.body.phoneNumber == null) {
            return res.json({ message: 'The field(s) are required', code: 10 });
        } else {
            User.findOne({ email: req.body.email }).exec((err, user) => {
                if (err) {
                    return res.json({ message: 'Error ocurred in finding this user', code: 11 });
                } else {
                    if (user) {
                        return res.json({ message: 'The user already exist', code: 12 });
                    } else {
                        if (req.body.firstName.length < 3) {
                            return res.json({ message: 'The first name should contain at least 3 characters', code: 13 });
                        } else {
                            if (req.body.lastName.length < 3) {
                                return res.json({ message: 'The last name should contain at least 3 characters', code: 14 });
                            } else {
                                if (req.body.phoneNumber.length < 4) {
                                    return res.json({ message: 'The phone number should contain at least 4 characters', code: 15 });
                                } else {
                                    if (req.body.password.length < 6) {
                                        return res.json({ message: 'The password should contain at least 6 characters', code: 16 });
                                    } else {
                                        if (req.body.password != req.body.confirmPassword) {
                                            return res.json({ message: 'The password does not match', code: 17 });
                                        } else {
                                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                                if (err) res.json(err);
                                                else {
                                                    const user = {
                                                        firstName: req.body.firstName,
                                                        lastName: req.body.lastName,
                                                        email: req.body.email,
                                                        password: hash,
                                                        phoneNumber: req.body.phoneNumber
                                                    }; 
                                                    User.create(user, (err, result) => {
                                                        if (err) return res.status(303).json({ err: err })
                                                        res.json({ message: 'This user have been added successfully!', code: 18 });
                                                    })
                                                    // console.log(user)
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })

        }
    } catch (error) {
        res.json({ error: error, code: 19 });
    }
}

exports.login = (req, res, next) => {
    try {
        if (req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null) {
            return res.json({ message: 'The field(s) are required!', code: 10 });
        } else {
            User.findOne({ email: req.body.email }).exec((err, user) => {
                if (err) return res.json({ message: 'Error in finding this user', code: 11 });
                if (!user) {
                    return res.json({ message: 'This user does not exist', code: 12 });
                } else {
                    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
                    if (!checkPassword) {
                        res.json({ message: 'email or password invalid!', code: 13 });
                    } else {
                        res.json({ message: 'You have logged in succesfully', code: 14, token: { id: user._id, name: user.name, email: user.email, number: user.phoneNumber } })
                    }
                }
            })
        }
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.userProfile = (req, res, next) => {
    const userId = req.params.id;
    try {
        User.findById(userId, '-password -__v').exec((err, user) => {
            if(err) return res.json({message: 'This user does not exist'});
            if(!user) {
                return res.json({message: 'Error ocurred in finding this user'});
            }else {
                res.json({message: 'User\'s profile' , user: user});
            }
        })
    } catch(error) {
        res.json({message: error, code: 16});
    }
}

exports.makeRequest = (req, res, next) => {
    // res.json('make request')
}