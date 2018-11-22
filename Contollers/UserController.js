const User = require('../Models/User');
const Admin = require('../Models/Admin');
const bcrypt = require('bcrypt');
const Request = require('../Models/Request');
const Artisan = require('../Models/Artisan');
const Specialization = require('../Models/Specialization');

exports.signup = (req, res, next) => {
    try {
        if (req.body.firstName == '' || req.body.firstName == null || req.body.lastName == '' || req.body.lastName == null || req.body.email == '' || req.body.email == null || req.body.password == '' || req.body.password == null || req.body.confirmPassword == '' || req.body.confirmPassword == null || req.body.phoneNumber == '' || req.body.phoneNumber == null) {
            return res.json({ message: 'The field(s) are required', code: 10 });
        } else {
            User.findOne({ email: req.body.email }).exec((err, user) => {
                if (err) return res.json({ message: 'Error ocurred in finding this user', code: 11 });
                Artisan.findOne({ email: req.body.email }).exec((err, artisan) => {
                    if (err) return res.json({ message: 'Error ocurred in finding this artisan', code: 20 });
                    if (user || artisan) {
                        return res.json({ message: 'The user already exist', code: 12 });
                    }
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
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                })
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
                if (err) return res.json({ message: 'Error ocurred in finding this User', code: 11 });
                Artisan.findOne({ email: req.body.email }).exec((err, artisan) => {
                    if (err) return res.json({ message: 'Error ocurred in finding this Artisan', code: 12 });
                    Admin.findOne({ email: req.body.email }).exec((err, admin) => {
                        if (err) return res.json({ message: 'Error ocurred in finding this Admin', code: 13 });
                        // Checking for User
                        if (user) {
                            if (user.flag == 0) {
                                const checkPassword = bcrypt.compareSync(req.body.password, user.password);
                                if (!checkPassword) {
                                    res.json({ message: 'email or password invalid!', code: 14 });
                                } else {
                                    res.json({ message: 'You have logged in succesfully', code: 15, token: { id: user._id, email: user.email, number: user.phoneNumber, flag: user.flag } })
                                }
                            }
                        } else {
                            // Checking for Artisan
                            if (artisan) {
                                if (artisan.flag == 1) {
                                    if (artisan.verified == 0) {
                                        return res.json({ message: 'Your account have not been verified', code: 16 })
                                    } else {
                                        if (artisan.password == null) {
                                            return res.json({ message: 'There is no password set for this account', code: 17 })
                                        } else {
                                            const checkPassword = bcrypt.compareSync(req.body.password, artisan.password);
                                            if (!checkPassword) {
                                                res.json({ message: 'email or password invalid!', code: 18 });
                                            } else {
                                                res.json({ message: 'You have logged in succesfully', code: 19, token: { id: artisan._id, email: artisan.email, number: artisan.phoneNumber, flag: artisan.flag } })
                                            }
                                        }
                                    }
                                }
                            } else {
                                // Checking for Admin
                                if (admin) {
                                    if (admin.flag == 2) {
                                        const checkPassword = bcrypt.compareSync(req.body.password, admin.password);
                                        if (!checkPassword) {
                                            res.json({ message: 'email or password invalid!', code: 20 });
                                        } else {
                                            res.json({ message: 'You have logged in succesfully as an Admin', code: 21, token: { id: admin._id, email: admin.email, flag: admin.flag } })
                                        }
                                    }
                                } else {
                                    return res.json({ message: 'This account does not exist', code: 22 })
                                }
                            }
                        }
                    })
                })
            })
        }
    } catch (error) {
        res.json({ message: error, code: 23 });
    }
}

exports.userProfile = (req, res, next) => {
    const userId = req.params.id;
    try {
        User.findById(userId, '-password -__v').populate({
            path: 'requestlogs',
            select: 'dateOfRequest jobCategory jobDescription address dateDone userId status',
            populate: {
                path: 'jobCategory',
                select: 'specialization'
            }
        }).exec((err, user) => {
            if (err) return res.json({ message: 'This user does not exist' });
            if (!user) {
                return res.json({ message: 'Error ocurred in finding this user' });
            } else {
                res.json({ message: 'User\'s profile', user: user });
            }
        })
    } catch (error) {
        res.json({ message: error, code: 16 });
    }
}

exports.makeRequest = (req, res, next) => {
    const userId = req.params.id;
    const request = new Request({
        jobCategory: req.body.jobCategory,
        jobDescription: req.body.jobDescription,
        address: req.body.address,
        dateDone: req.body.dateDone,
        userId: userId,
        lat: req.body.lat,
        long: req.body.long
    })
    try {
        if (req.body.jobCategory == '' || req.body.jobCategory == null || req.body.jobDescription == '' || req.body.jobDescription == null || req.body.address == '' || req.body.address == null || req.body.dateDone == '' || req.body.dateDone == null) {
            return res.json({ message: 'The field(s) are required', code: 17 });
        } else {
            User.findOne({ _id: userId }, '-password -__v').exec((err, user) => {
                if (err) return res.json({ message: 'This user does not exist', code: 10 });
                if (!user) {
                    return res.json({ message: 'Error ocurred in finding this user', code: 11 });
                } else {
                    Admin.findOne({ email: 'best@gmail.com', }, '-password -__v -rejectedRequest -confirmRequest').exec((err, admin) => {
                        if (err) return res.json({ message: 'This admin does not exist', code: 12 });
                        if (admin) {
                            Request.create(request, (err, result) => {
                                if (err) return res.json({ message: 'Error ocurred in adding this request', code: 13 });
                                if (result) {
                                    Artisan.find().exec((err, artisan) => {
                                        if (err) return res.json({ message: 'Error ocurred in finding artisans', code: 14 });
                                        const requestOrigin = { 
                                            id: result._id,
                                            latX: result.lat,
                                            longY: result.long
                                        };
                                        const availableArtisans = [];
                                        const resultantArtisans = [];

                                        for (var el of artisan) {
                                            if (el.verified == 1 && el.lat != null || el.long != null) {
                                                if(el.specialization == req.body.jobCategory) {
                                                    const av = {
                                                        artisanID: el._id,
                                                        latX: el.lat,
                                                        longY: el.long
                                                    }
                                                    availableArtisans.push(av);
                                                }
                                            }
                                        }
                                        for(var x of availableArtisans) {
                                            const avail = {
                                                artisanID: x.artisanID,
                                                D: Math.sqrt(Math.pow((parseFloat(x.latX) - parseFloat(requestOrigin.latX)), 2) + Math.pow((parseFloat(x.longY) - parseFloat(requestOrigin.longY)), 2))
                                            }
                                            resultantArtisans.push(avail);
                                        }
                                        const sortedArtisians = resultantArtisans.sort((a, b) => {
                                            return a.D - b.D
                                        })
                                        const sendToArtisan = sortedArtisians.slice(0,5); // select five close artisans to the user

                                        const p = sendToArtisan.map(q => {
                                            return q.artisanID
                                        })
                                        Artisan.find({_id: p}).exec((err, art) => {
                                            if(err) return res.json({message: 'Error ocurred in getting this artisan', code: 17});
                                            if(!art) {
                                                res.json({message: 'There is no artisan avai', code: 18})
                                            }
                                            const k = art.map(s => {
                                                s.requestNotifications.push(result._id);
                                                s.save();
                                            })
                                            const check2 = user.requestlogs.push(result._id);
                                            const check3 = admin.userRequest.push(result._id);
                                            if(check2 && check3) {
                                                user.save();
                                                admin.save();
                                                res.json({message: 'Your request will be matched with an artisan', code: 15});
                                            }
                                        })

                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    } catch (error) {
        res.json({ message: error, code: 16 });
    }
}