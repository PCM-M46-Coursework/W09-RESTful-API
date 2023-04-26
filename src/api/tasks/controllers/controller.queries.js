const Task = require("../model");

module.exports = {
	/**
	 * Get all tasks within the database.
	 *
	 * @param {object} req - Express request object
	 * @param {object} res - Express response object
	 * @returns {object} 200 - A JSON object with all tasks.
	 * @returns {Error} 500 - Internal server error.
	 */
	getAllTasks: async function (_, res) {
		try {
			const tasks = await Task.findAll({
				where: { user_id: req.user.id },
			});
			res.status(200).json({ message: "OK", data: tasks });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Get a single task from the database, by the task's id.
	 *
	 * @param {object} req - Express request object
	 * @param {object} res - Express response object
	 * @returns {object} 200 - A JSON object with the requested task.
	 * @returns {Error} 500 - Internal server error.
	 */
	getTaskById: async function (req, res) {
		try {
			const task = await Task.findByPk(req.params.id);
			if (!task) throw new Error("Task not found.");
			if (task.user_id != req.user.id) {
				return res.status(401).json({ message: "Unauthorised" });
			}
			res.status(200).json({ message: "OK", data: task });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},
};
