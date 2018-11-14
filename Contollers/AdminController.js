const Admin = require('../Models/Admin');
const Artisan = require('../Models/Artisan');
const User = require('../Models/User');
const Specialization = require('../Models/Specialization');
const mailer = require('../Services/mailer');

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
                const sortedRequest = allRequest[0].userRequest.sort((a, b) => {
                    if (a.dateOfRequest > b.dateOfRequest) {
                        return -1;
                    } else {
                        return 1;
                    }
                })
                res.json({ usersRequest: sortedRequest, code: 12 });
            }
        })
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.getAllArtisansRequest = (req, res, next) => {
    try {
        Admin.find().select('artisanRequest').populate('artisanRequest').exec((err, artisans) => {
            if (err) return res.json({ message: 'Error ocurred in getting all artisans', code: 10 });
            if (artisans) {
                res.json({ message: `You have ${artisans[0].artisanRequest.length} artisans currently applied`, artisans: artisans, code: 11 });
            }
        })
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.verifyAnArtisan = (req, res, next) => {
    const artisanId = req.params.id;
    const newNum = 1;
    try {
        Artisan.findById(artisanId).exec((err, artisan) => {
            if (err) return res.json({ message: 'This artisan does not exist', code: 10 });
            if (!artisan) {
                return res.json({ message: 'Error ocurred in finding this artisans', code: 11 });
            }
            mailer.verify(artisan._id, artisan.email, (err, info) => {
                if (err) res.json({ message: 'Error ocurred while sending mail', err: err, code: 12 });
                else {
                    artisan.verified = newNum;
                    artisan.save();
                    res.json({ message: 'This artisan have been verified', code: 13 });
                }
            })
        })
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.getAllUsers = (req, res, next) => {
    try {
        User.find().exec((err, users) => {
            if (err) return res.json({ message: 'There is no user currently', code: 10 });
            if (!users) {
                return res.json({ message: 'Error ocurred in finding this artisans', code: 11 });
            }
            res.json({ message: `There are ${users.length} users currently`, users: users, code: 12 });
        })
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.addSpecialization = (req, res, next) => {
    const data = {
        specialization: req.body.specialization
    }
    try {
        if (req.body.specialization == '' || req.body.specialization == null) {
            return res.json({ message: 'The field is required', code: 10 });
        } else {
            Specialization.findOne({ specialization: req.body.specialization }).exec((err, spec) => {
                if (err) return res.json({ message: 'Error ocurred in finding this specialization', code: 11 });
                if (spec) {
                    return res.json({ message: 'This specialization already exists', code: 12 })
                }
                Specialization.create(data, (err, sp) => {
                    if (err) return res.json({ message: 'Error ocurred in adding this specialization', code: 13 });
                    if (sp) {
                        res.json({ message: 'This specialization have been added successfully', code: 14 })
                    }
                })
            })
        }
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

exports.getAllSpecialization = (req, res, next) => {
    try {
        Specialization.find({}).exec((err, output) => {
            if (err) return res.json({ message: 'Error ocurred in getting this specialization', code: 10 });
            if (!output) {
                return res.json({ message: 'There is no artisan currently', code: 11 });
            }
            res.json({ message: output, code: 12 });
        })
    } catch (error) {
        res.json({ message: error, code: 15 });
    }
}

// exports.deleteSpecialization = (req, res, next) => {
//     const specializationID = req.body.specializationID
//     try {
//         Specialization.find({ specialization: specializationID }).exec((err, spec) => {
//             if (err) return res.json({ message: 'Error ocurred in finding this specialization', code: 10 });
//             if (!spec) {
//                 return res.json({ message: 'There specialization does not exist', code: 11 });
//             }
//             Specialization.remove({ specialization: specializationID }).exec((err) => {
//                 if (err) return res.json({ message: 'Error ocurred in deleting this specialization', code: 12 });
//                 res.json({message: 'This specialization have been deleted', code: 13});
//             })
//         })
//     } catch (error) {
//         res.json({ message: error, code: 15 });
//     }
// }