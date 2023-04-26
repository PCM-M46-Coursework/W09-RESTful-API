const { isValidModel } = require("../../../core/validators/modelValidator");
const Task = require("../../../db/models/Task");

module.exports = {
	/**
	 * Create a new task within the database.
	 *
	 * @param {Task.model} req.body.required - The model to create.
	 * @returns {TaskResponse.model} 201 - The created model.
	 * @returns {Error} 500 - Internal server error.
	 */
	createTask: async function (req, res) {
		try {
			req.body.user_id = req.user.id;
			const task = await Task.create(req.body);
			res.status(201).json({
				message: "success",
				task,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Update a task within the database. All fields are required for update.
	 *
	 * @param {String} id.path.required - The task's ID.
	 * @param {Task.model} model.body.required - The updated task.
	 * @returns {TaskResponse.model} 200 - The updated model.
	 * @returns {Error} 500 - Internal server error.
	 */
	updateTask: async function (req, res) {
		try {
			// Find the existing task.
			const task = await Task.findByPk(req.params.id);
			if (!task) throw new Error("Task not found.");

			// Ensure task ownership.
			req.body.user_id = req.user.id;
			if (task.user_id != req.user.id) {
				return res.status(401).json({ message: "Unauthorised" });
			}

			// Validate the updated data.
			var validationError = isValidModel(Task, req.body);
			if (validationError.length > 0) {
				return res.status(422).json(validationError);
			}

			// Update the task with the new data.
			task.set(req.body);
			await task.save();

			res.status(200).json({ message: "success", data: task });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Update a task within the database. Partial updates are allowed.
	 *
	 * @param {String} id.path.required - The task's ID.
	 * @param {Task.model} model.body.required - The updated task details.
	 * @returns {TaskResponse.model} 200 - The updated task response object.
	 * @returns {Error} 500 - Internal server error.
	 */
	patchTask: async function (req, res) {
		try {
			const task = await Task.findByPk(req.params.id);
			if (!task) throw new Error("Task not found.");
			if (task.user_id != req.user.id) {
				return res.status(401).json({ message: "Unauthorised" });
			}

			task.set(req.body);
			await task.save();
			res.status(200).json({ data: task });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Delete a task from the database.
	 *
	 * @param {String} id.path.required - The model's ID.
	 * @returns {Void} 204 - No Content.
	 * @returns {Error} 500 - Internal server error.
	 */
	deleteTask: async function (req, res) {
		try {
			let task = await Task.findByPk(req.params.id);
			if (!task) throw new Error("Task not found.");
			if (task.user_id != req.user.id) {
				return res.status(401).json({ message: "Unauthorised" });
			}
			await task.destroy();
			res.status(204).end();
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Truncates the Tasks table within the database. USE WITH CAUTION!
	 *
	 * @returns {Void} 204 - No Content.
	 * @returns {Error} 500 - Internal server error.
	 */
	deleteAllTasks: async function (req, res) {
		try {
			await Task.destroy({
				where: { user_id: req.user.id },
			});
			res.status(204).end();
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},
};
