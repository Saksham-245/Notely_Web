const { Notes } = require("../models/index");

const showAllNotes = async (req, res) => {
  const userId = req.user.id;
  const page = Number(req.query.page) || 1; // Default to page 1 if not provided
  const limit = Number(req.query.limit) || 10; // Default to 10 records per page if not provided
  const offset = (page - 1) * limit;

  if (!req?.user?.id) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  try {
    const totalNotes = await Notes.count({ where: { userId } });
    const totalPages = Math.ceil(totalNotes / limit);
    const nextPage = page < totalPages ? page + 1 : null;

    const notes = await Notes.findAll({ where: { userId }, limit, offset });
    if (notes.length === 0) {
      return res.status(200).json({
        message: "No Notes Found",
      });
    } else {
      return res.status(200).json({
        notes,
        currentPage: page,
        nextPage,
        totalPages,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve notes." });
  }
};

const createNote = async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  if (!req?.user?.id) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  try {
    await Notes.create({
      title,
      description,
      userId,
    });
    return res.status(200).json({
      message: "Note Created",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create a note" });
  }
};

const detailNote = async (req, res) => {
  const id = req.query.id;

  try {
    const note = await Notes.findByPk(id);
    return res.status(200).json({
      note,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to get the selected Note" });
  }
};

const deleteNote = async (req, res) => {
  const id = req.query.id;

  try {
    await Notes.destroy({ where: { id } });
    return res.status(200).json({
      message: "Note has been deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  showAllNotes,
  createNote,
  detailNote,
  deleteNote,
};
