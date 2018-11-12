const Artisan = require('../Models/Artisan');
const cloud = require('../Services/cloudinary');
const Admin = require('../Models/Admin');
const Request = require('../Models/Request');
const bcrypt = require('bcrypt');

exports.addArtisan = (req, res, next) => {
    const artisan1 = new Artisan({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        specialization: req.body.specialization,
        imageID: '',
        image: req.file.path,
        guarantor1Name: req.body.guarantor1Name,
        guarantor1Number: req.body.guarantor1Number,
        guarantor2Name: req.body.guarantor2Name,
        guarantor2Number: req.body.guarantor2Number
    })
    try {
        if (req.body.firstName == '' || req.body.firstName == null || req.body.lastName == '' || req.body.lastName == null || req.body.email == '' || req.body.email == null || req.body.phoneNumber == '' || req.body.phoneNumber == null || req.body.address == '' || req.body.address == null || req.body.specialization == '' || req.body.specialization == null || req.body.guarantor1Name == '' || req.body.guarantor1Name == null || req.body.guarantor1Number == '' || req.body.guarantor1Number == null || req.body.guarantor2Name == '' || req.body.guarantor2Name == null || req.body.guarantor2Number == '' || req.body.guarantor2Number == null) {
            return res.json({ message: 'The field(s) are required!', code: 10 });
        }
        else {
            if (req.body.phoneNumber.length < 4) {
                return res.json({ message: 'The Phone Number should contain at least 4 characters', code: 11 });
            } else {
                if (req.body.guarantor1Number.length < 4) {
                    return res.json({ message: 'First guarantor phone number should contain at least 4 characters', code: 12 });
                } else {
                    if (req.body.guarantor2Number.length < 4) {
                        return res.json({ message: 'Second guarantors number should contain at least 4 characters', code: 13 });
                    } else {
                        if (req.file.size > 5242880) {
                            return res.json({ message: 'You can\'t upload file greater than 5MB', code: 14 });
                        } else {
                            Artisan.findOne({ email: req.body.email }).exec((err, artisan) => {
                                if (err) return res.json({ message: 'Error ocurred in getting this atisan', code: 15 });
                                if (artisan) {
                                    return res.json({ message: 'This email already exist', code: 16 });
                                } else {
                                    cloud.upload(artisan1.image).then(result => {
                                        artisan1.image = result.url;
                                        artisan1.imageID = result.Id;
                                        Admin.findOne({ email: 'best@gmail.com' }, '-password -__v -rejectedRequest -confirmRequest').exec((err, output) => {
                                            if (err) return res.json({ message: 'This admin does not exist', code: 17 });
                                            if (output) {
                                                Artisan.create(artisan1, (err, result) => {
                                                    if (err) return res.json({ message: err, code: 18 })
                                                    if (result) {
                                                        const check = output.artisanRequest.push(result._id);
                                                        if (check) {
                                                            output.save();
                                                            res.json({ message: 'We will get back to you after verification through your email', code: 19 })
                                                        }
                                                    }
                                                })
                                            }
                                        })
                                    })
                                }

                            })
                        }
                    }
                }
            }
        }
    } catch (error) {
        res.json({ message: error, code: 20 })
    }
}

exports.artisanProfile = (req, res, next) => {
    const artisanId = req.params.id;
    try {
        Artisan.findOne({ _id: artisanId }).populate({
            path: 'requestNotifications',
            populate: {
                path: 'userId',
                select: 'firstName lastName email phoneNumber'
            }
        }).exec((err, artisan) => {
            if (err) return res.json({ message: 'This artisan does not exist', code: 10 });
            if (!artisan) {
                return res.json({ message: 'Error ocurred in finding this artisan', code: 11 })
            }
            res.json({ message: artisan, code: 12 });
        })
    } catch (error) {
        res.json({ message: error, code: 13 })
    }
}

exports.acceptRequest = (req, res, next) => {
    const requestId = req.params.id;
    const newStatus = 1;
    try {
        Request.findOne({ _id: requestId }).exec((err, request) => {
            if (err) return res.json({ message: 'This Request does not exist', code: 10 });
            if (!request) {
                return res.json({ message: 'Error ocurred in finding this request', code: 11 });
            }
            const check = request.status = newStatus;
            if (check) {
                request.save();
                res.json({ message: 'You have kindly accepted this request' })
            }
        })
    } catch (error) {
        res.json({ message: error, code: 18 })
    }
}

exports.setPassword = (req, res, next) => {
    const artisanId = req.query.token;
    const artisanEmail = req.query.email;

    try {
        if (req.body.password == '' || req.body.password == null || req.body.confirmPassword == '' || req.body.confirmPassword == null) {
            return res.json({ message: 'The field(s) are required', code: 10 });
        } else {
            if (req.body.password.length < 6) {
                return res.json({ message: 'The password should contain at least 6 characters', code: 11 });
            } else {
                if (req.body.password != req.body.confirmPassword) {
                    return res.json({ message: 'Password do not match', code: 12 });
                } else {
                    Artisan.findOne({ _id: artisanId }).exec((err, artisan) => {
                        if (err) return res.json({ message: 'This Artisan does not exist', code: 11 });
                        if (!artisan) {
                            return res.json({ message: 'Error ocurred in finding this request', code: 12 });
                        }
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) res.json(err);
                            else {
                                const pass = {
                                    password: hash
                                };
                                Artisan.create(pass, (err, result) => {
                                    if (err) return res.json({ err: err })
                                    if (result) {
                                        artisan.password = hash;
                                        artisan.save();
                                        res.json({ message: 'Your password have been set, you can proceed to login', code: 13 });
                                    }
                                })
                            }
                        })
                    })
                }
            }
        }
    } catch (error) {
        res.json({ message: error, code: 18 })
    }
    console.log(artisanId, artisanEmail)
}