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

exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id }).then((sauce) => {
		const filename = sauce.imageUrl.split("/images/")[1];
		fs.unlink("images/" + filename, () => {
			Sauce.deleteOne({ _id: req.params.id })
				.then(() => {
					res.status(200).json({
						message: "Deleted!",
					});
				})
				.catch((error) => {
					res.status(400).json({
						error: error,
					});
				});
		});
	});
};

// router.put('/:id', auth, sauceCtrl.modifySauce);

exports.modifySauce = (req, res, next) => {
	let sauce = new Sauce({ _id: req.params._id });
	if (req.file) {
		const url = req.protocol + "://" + req.get("host");
		req.body.thing = JSON.parse(req.body.thing);
		sauce = {
		_id: req.params.id,
		name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
		description: req.body.sauce.description,
		mainPepper: req.body.sauce.mainPepper,
		imageUrl: url + "/images/" + req.file.filename,
		heat: req.body.sauce.heat,
		userId: req.body.sauce.userId,
		};
	} else {
		sauce = {
        _id: req.params.id,
		name: req.body.name,
        manufacturer: req.body.manufacturer,
		description: req.body.description,
		mainPepper: req.body.mainPepper,
		imageUrl: req.body.imageUrl,
		heat: req.body.heat,
		userId: req.body.userId,
		};
	}
	Sauce.updateOne({ _id: req.params.id }, sauce)
		.then(() => {
			res.status(201).json({
				message: "Thing updated successfully!",
			});
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

// like a sauce
// dislike a sauce