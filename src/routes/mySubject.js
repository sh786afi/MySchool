import SubjectModel from "../db/SubjectModel";
import { route, successRoute } from "./";

export const addSubject = route(async (req, res) => {
  const { SubjectName, classId } = req.body;
  const createSubject = await SubjectModel.create(SubjectName, classId);
  res.send(await successRoute(createSubject));
});

//Get all Subject api
export const getSubject = async (req, res) => {
  try {
    const getAllSubject = await SubjectModel.getSubject();
    res.send(await successRoute(getAllSubject));
  } catch (e) {
    res.status(500).send(e);
  }
};
//Get Subject By id
export const getSubjectbyId = async (req, res) => {
  const _id = req.params.id;
  try {
    const SubjectById = await SubjectModel.findSubjectById(_id);
    if (!SubjectById) {
      return res.status(400).send();
    }
    res.send(await successRoute(SubjectById));
  } catch (e) {
    res.status(500).send(e);
  }
};
export const deleteSubjectbyId = async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteSubjectById = await SubjectModel.deleteSubjectById(_id);
    if (!deleteSubjectById) {
      return res.status(400).send();
    }
    res.send(await successRoute(deleteSubjectById));
  } catch (e) {
    res.status(500).send(e);
  }
};
export const updateSubjectbyId = route(async (req, res) => {
  const _id = req.params.id;
  const info = req.body;
  try {
    const updateSubjectById = await SubjectModel.updateSubject(_id, info);
    if (!updateSubjectById) {
      return res.status(404).send({ error: "Subject does not exist" });
    }
    res.send(await successRoute(updateSubjectById));
  } catch (e) {
    res.status(400).send(e);
  }
});

export const getAllSubjectInClass = route(async (req, res) => {
  try {
    const classId = req.params.classId;
    const SubjectByClassId = await SubjectModel.subjectInClass(classId);
    if (!SubjectByClassId) {
      return res.status(400).send();
    }
    res.send(SubjectByClassId);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});
