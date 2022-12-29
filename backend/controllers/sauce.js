const Sauce = require('../models/sauce');
const fs = require('fs');

// getAllSauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
		(sauces) => {
        res.status(200).json(sauces);
    })
    .catch(
		(error) => {
        res.status(400).json({
            error: error,
        });
    });
}

// getOneSauce
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({
		_id: req.params.id
	})
	.then(
		(sauce) => {
			res.status(200).json(sauce);
		})
		.catch(
			(error) => {
			res.status(404).json({
				error: error,
			});
		});
};
// createSauce
exports.createSauce = (req, res, next) => {
	req.body.sauce = JSON.parse(req.body.sauce);
	const url = req.protocol + "://" + req.get("host");
	// console.log('createSauce is working')
	const sauce = new Sauce({
		userId: req.body.sauce.userId,
		name: req.body.sauce.name,
		manufacturer: req.body.sauce.manufacturer,
		description: req.body.sauce.description,
		mainPepper: req.body.sauce.mainPepper,
		imageUrl: url + "/images/" + req.file.filename,
		heat: req.body.sauce.heat,
		
	})
	// console.log(sauce);
	sauce.save()
	.then(() =>{
		res.status(201).json({
			message: "Sauce saved successfully",
		});
	})
	.catch((error) =>{
		res.status(400).json({
			error: error,
		})
	})
}
// router.put('/:id', auth, sauceCtrl.modifySauce);
// router.delete('/:id', auth, sauceCtrl.deleteSauce);

// like a sauce
// dislike a sauce