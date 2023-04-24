const { DataTypes } = require("sequelize");
const { context } = require("../../db/connection");

/**
 * Defines schema for a record, within the Books table, in the database.
 */
const Book = context.define("Book", {});

module.exports = Book;
