import express from 'express';
const router = express.Router();
import { allocateLeave, allocateLeaveList, createLeveType, getLeveType, leaveRequestCreate, leaveRequestList } from '../../controller/leaveController.js';
import { verifyAuth } from '../../middleware/auth.js';

router.post('/create', verifyAuth, createLeveType);
router.get("/list", verifyAuth, getLeveType);

router.get('/allocate-list', verifyAuth, allocateLeaveList);
router.post('/allocate', verifyAuth, allocateLeave);


router.post("/request", verifyAuth, leaveRequestCreate);
router.get("/request-list", verifyAuth, leaveRequestList)
export default router;