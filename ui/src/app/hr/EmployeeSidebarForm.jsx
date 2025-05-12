import { useState } from "react";

export default function EmployeeSidebarForm({
  open,
  onClose,
  onSubmit,
  defaultValues = {},
}) {
  const [formData, setFormData] = useState({
    fullName: defaultValues.fullName || "",
    employeeCode: defaultValues.employeeCode || "",
    gender: defaultValues.gender || "",
    dob: defaultValues.dob || "",
    joiningDate: defaultValues.joiningDate || "",
    department: defaultValues.department || "",
    designation: defaultValues.designation || "",
    status: defaultValues.status || "active",
    contact: {
      email: defaultValues.contact?.email || "",
      phone: defaultValues.contact?.phone || "",
      address: defaultValues.contact?.address || "",
    },
    personalInfo: {
      passportNo: defaultValues.personalInfo?.passportNo || "",
      passportExpDate: defaultValues.personalInfo?.passportExpDate || "",
      dob: defaultValues.personalInfo?.dob || "",
      maritalStatus: defaultValues.personalInfo?.maritalStatus || "",
    },
    bankInfo: {
      acNo: defaultValues.bankInfo?.acNo || "",
      bankName: defaultValues.bankInfo?.bankName || "",
      panNo: defaultValues.bankInfo?.panNo || "",
      ifscCode: defaultValues.bankInfo?.ifscCode || "",
    },
    skills: defaultValues.skills || [],
    experince: defaultValues.experince || [],
    profile: defaultValues.profile || "",
    documents: defaultValues.documents || [],
  });

  const handleChange = (e, group = null) => {
    const { name, value } = e.target;
    if (group) {
      setFormData((prev) => ({
        ...prev,
        [group]: {
          ...prev[group],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[750px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white">
          <h3 className="text-lg font-semibold">Employee Form</h3>
          <button
            onClick={onClose}
            className="text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto p-6 text-sm h-[calc(100%-8rem)] space-y-6"
        >
          {/* Basic Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Basic Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="employeeCode"
                placeholder="Employee Code"
                value={formData.employeeCode}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              >
                <option value="active">Active</option>
                <option value="resigned">Resigned</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Contact Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <input
                name="email"
                placeholder="Email"
                value={formData.contact.email}
                onChange={(e) => handleChange(e, "contact")}
                className="border px-3 py-2 rounded"
              />
              <input
                name="phone"
                placeholder="Phone"
                value={formData.contact.phone}
                onChange={(e) => handleChange(e, "contact")}
                className="border px-3 py-2 rounded"
              />
              <input
                name="address"
                placeholder="Address"
                value={formData.contact.address}
                onChange={(e) => handleChange(e, "contact")}
                className="col-span-2 border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* Personal Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Personal Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <input
                name="passportNo"
                placeholder="Passport No"
                value={formData.personalInfo.passportNo}
                onChange={(e) => handleChange(e, "personalInfo")}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="passportExpDate"
                value={formData.personalInfo.passportExpDate}
                onChange={(e) => handleChange(e, "personalInfo")}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="dob"
                value={formData.personalInfo.dob}
                onChange={(e) => handleChange(e, "personalInfo")}
                className="border px-3 py-2 rounded"
              />
              <input
                name="maritalStatus"
                placeholder="Marital Status"
                value={formData.personalInfo.maritalStatus}
                onChange={(e) => handleChange(e, "personalInfo")}
                className="border px-3 py-2 rounded"
              />
            </div>
          </div>

          {/* Bank Info */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Bank Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <input
                name="acNo"
                placeholder="Account No"
                value={formData.bankInfo.acNo}
                onChange={(e) => handleChange(e, "bankInfo")}
                className="border px-3 py-2 rounded"
              />
              <input
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankInfo.bankName}
                onChange={(e) => handleChange(e, "bankInfo")}
                className="border px-3 py-2 rounded"
              />
              <input
                name="panNo"
                placeholder="PAN No"
                value={formData.bankInfo.panNo}
                onChange={(e) => handleChange(e, "bankInfo")}
                className="border px-3 py-2 rounded"
              />
              <input
                name="ifscCode"
                placeholder="IFSC Code"
                value={formData.bankInfo.ifscCode}
                onChange={(e) => handleChange(e, "bankInfo")}
                className="border px-3 py-2 rounded"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-indigo-50 border-t flex justify-between">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-xs border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 text-xs bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
