const Admin = require('../Models/Admin');
const Artisan = require('../Models/Artisan');
const bcrypt = require('bcrypt');
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
                console.log(artisans)
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