import prisma from "../config/prisma.js";
export const createUser = async (req, res) => {
  try {
    const { name, blood, phone, role } = req.body;
    const user = await prisma.user.create({
      data: { name, blood, phone, role },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { qr: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
