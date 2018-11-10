const Artisan = require('../Models/Artisan');
const cloud = require('../Services/cloudinary');

exports.addArtisan = (req, res, next) => {
    // console.log(req.file);
    const artisan = new Artisan({
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
        } else {
            if (req.body.phoneNumber.length < 4) {
                return res.json({ message: 'The Phone Number should contain at least 4 characters', code: 11 });
            } else {
                if (req.body.guarantor1Number.length < 4) {
                    return res.json({ message: 'First guarantor phone number should contain at least 4 characters', code: 12 });
                } else {
                    if (req.body.guarantor2Number.length < 4) {
                        return res.json({ message: 'Second guarantors number should contain at least 4 characters', code: 13 });
                    } else {
                        cloud.upload(artisan.image).then(result => {
                            artisan.image = result.url;
                            artisan.imageID = result.Id;
                            Artisan.create(artisan, (err, result) => {
                                if (err) return res.json({ message: err, code: 14 })
                                if (result) {
                                    res.json({ message: 'We will get back to you after verification through your email', code: 15 })
                                }
                            })
                        })
                    }
                }
            }
        }
    } catch (error) {
        res.json({ message: error, code: 16 })
    }
}

exports.artisanProfile = (req, res, next) => {
    const artisanId = req.params.id;
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
        res.json(artisan)
    })
}