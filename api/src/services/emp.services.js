import db from "../config/db.js";

export const getAllEmployees = async (page, limit, offset) => {
    const [records] = await db.query("SELECT * FROM employees LIMIT ? OFFSET ?", [limit, offset]);
    const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM employees");
    return { page, limit, total, totalPages: Math.ceil(total / limit), records };
}

export const getEmployeeTaskById = async (id) => {
    const [record] = await db.query("SELECT * FROM employees e INNER JOIN tasks t ON e.id = t.employee_id WHERE e.id = ?", [id]);
    return record;
}

export const getEmployeeById = async (id) => {
    const [[record]] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    return record;
}

export const getEmployeeByEmail = async (email) => {
    const [[record]] = await db.query("SELECT * FROM employees WHERE email = ?", [email]);
    return record;
}

export const deleteEmployee = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM employees WHERE id = ?", [id]);
    return affectedRows;
}

export const addOrEditEmployee = async (obj, id = 0) => {
    const [[[{ affectedRows }]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)", [id, obj.name, obj.employee_code, obj.salary])
    return affectedRows;
}