
import express from 'express';
import {
  getAllReflections,
  getReflectionById,
  createReflection,
  updateReflection,
  deleteReflection
} from '../controllers/reflectionController';

const router = express.Router();

// GET all reflections
router.get('/', getAllReflections);

// GET a single reflection by ID
router.get('/:id', getReflectionById);

// POST a new reflection
router.post('/', createReflection);

// PUT/update a reflection
router.put('/:id', updateReflection);

// DELETE a reflection
router.delete('/:id', deleteReflection);

export { router as reflectionRoutes };
