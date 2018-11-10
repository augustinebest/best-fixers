const Admin = require('../Models/Admin');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {

    try {
        if (req.body.username == '' || req.body.username == null || req.body.password == '' || req.body.password == null || req.body.confirmPassword == '' || req.body.confirmPassword == null) {
            return res.json({ messsage: 'The field(s) are required', code: 10 });
        } else {
            Admin.findOne({ username: req.body.username }).exec((err, result) => {
                if (err) res.json({ messsage: err, code: 11 });
                if (result) {
                    return res.json({ messsage: 'This admin already exist', code: 12 });
                } else {
                    if (req.body.username.length < 3) {
                        return res.json({ messsage: 'The username should contain of at least 4 characters', code: 13 });
                    } else {
                        if (req.body.password.length < 6) {
                            return res.json({ messsage: 'The password should contain of at least 6 characters', code: 14 });
                        } else {
                            if (req.body.password != req.body.confirmPassword) {
                                return res.json({ messsage: 'The password does not match', code: 15 });
                            } else {
                                bcrypt.hash(req.body.password, 10, (err, hash) => {
                                    if (err) res.json(err);
                                    else {
                                        const admin = new Admin({
                                            username: req.body.username,
                                            password: hash
                                        })
                                        Admin.create(admin, (err, result) => {
                                            if (err) return res.json({ err: err })
                                            res.json({ message: 'This Admin have been added successfully!', code: 16 });
                                        })
                                    }
                                })
                            }
                        }
                    }
                }
            })
        }
    } catch (error) {
        res.json({ messsage: error, code: 15 })
    }
}

exports.login = (req, res, next) => {
    try {
        if (req.body.username == '' || req.body.username == null || req.body.password == '' || req.body.password == null) {
            return res.json({ message: 'The field(s) are required!', code: 10 });
        } else {
            Admin.findOne({ username: req.body.username }).exec((err, user) => {
                if (err) return res.json({ message: 'Error in finding this Admin', code: 11 });
                if (!user) {
                    return res.json({ message: 'This Admin does not exist', code: 12 });
                } else {
                    const checkPassword = bcrypt.compareSync(req.body.password, user.password);
                    if (!checkPassword) {
                        res.json({ message: 'username or password invalid!', code: 13 });
                    } else {
                        res.json({ message: 'You have logged in succesfully as an admin', code: 14, token: { id: user._id } })
                    }
                }
            })
        }
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.getAllRequests = (req, res, next) => {
    try {
        Admin.find().populate({
            path: 'userRequest',
            select: 'dateOfRequest jobCategory jobDescription address dateDone ',
            populate: {
                path: 'userId',
                select: 'firstName lastName email phoneNumber'
            }
        }).exec((err, allRequest) => {
            if (err) return res.json({ message: 'Error in finding this Admin', code: 11 });
            if (allRequest) {
                res.json({usersRequest: allRequest[0].userRequest, code: 12});
            }
        })
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.getAllArtisansRequest = (req, res, next) => {
    try {
        Admin.find().select('artisanRequest').populate('artisanRequest').exec((err, artisans) => {
            if(err) return res.json({ message: 'Error ocurred in getting all artisans', code: 10 });
            if(artisans) {
                res.json({message: `You have ${artisans.length} artisans currently applied`, artisans: artisans, code: 11});
            }
        })
    } catch(error) {
        res.json({ message: error, code: 15 });
    }
}

exports.verifyAnArtisan = (req, res, next) => {
    try {
        res.json('verify an artisan');
    } catch(error) {
        res.json({ message: error, code: 15 });
    }
}