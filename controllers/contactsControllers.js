const HttpError = require("../helpers/HttpError.js");
const contactsService = require("../services/contactsServices.js");
const controllerWrapper = require("../helpers/controllerWrapper.js");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contactsService.addContact(name, email, phone);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedItems = req.body;

  const result = await contactsService.updateById(id, updatedItems);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
};
