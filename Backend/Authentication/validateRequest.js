var isEmailValid = function (db, email, callback) {
	// TODO: Replace with valid database collection
	db.collection.findOne({
		email: email
	}, function (err, user) {
		callback(user);
	});
};

module.exports.validate = function (req, res, db, callback) {
	// If blank email address
	if (!req.params.token) {
		res.writeHead(403, {
			'Content-Type': 'application/json; charset=utf-8'
		});
		res.end(JSON.stringify({
			error: "You are not authorized to access this application",
			message: "An Email Address for authentication is required"
		}));
	};

	isEmailValid(db, req.params.token, function (user) {
		if (!user) {
			res.writeHead(403, {
				'Content-Type': 'application/json; charset=utf-8'
			});
			res.end(JSON.stringify ({
				error: "Your are not authorized to access this application",
				message: "Invalid User Email"
			}));
		} else {
			callback();
		}
	});
};
