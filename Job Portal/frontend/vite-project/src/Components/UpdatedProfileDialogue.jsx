import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "./redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "./utils/constant";
import axios from "axios";

const UpdatedProfileDialogue = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!user) return <div>Loading...</div>;

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    mobileno: user?.mobileno || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setInput({ ...input, file: files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!input.fullname) newErrors.fullname = "Name is required.";
    if (!input.email) newErrors.email = "Email is required.";
    if (!input.mobileno) newErrors.mobileno = "Phone number is required.";
    if (!input.skills) newErrors.skills = "Skills are required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    try {
      setLoading(true);

      // Use FormData for file + other fields
      const formData = new FormData();
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("mobileno", input.mobileno);
      formData.append("bio", input.bio);
      formData.append("skills", input.skills.trim());
      if (input.file) formData.append("file", input.file);

      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateUserProfile(res.data.user));
        setOpen(false);
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
      console.log("Profile updated successfully:", req.body);
    } catch (error) {
      console.error("Error in updating profile:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[600px] bg-black border border-red-500 text-white"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-red-500" id="dialog-title">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <p id="dialog-description" className="sr-only">
          Update your profile information: name, email, phone, bio, skills, and upload a resume.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {[
              { id: "fullname", label: "Name", value: input.fullname, error: errors.fullname },
              { id: "email", label: "Email", value: input.email, error: errors.email },
              { id: "mobileno", label: "Mobileno", value: input.mobileno, error: errors.mobileno },
              { id: "bio", label: "Bio", value: input.bio, error: errors.bio },
              { id: "skills", label: "Skills", value: input.skills, error: errors.skills },
            ].map((field) => (
              <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.id} className="text-right text-red-400">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.id}
                  className={`col-span-3 bg-zinc-900 border-red-500 text-white placeholder:text-gray-400 ${
                    field.error ? "border-red-600" : ""
                  }`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={field.value}
                  onChange={handleChange}
                />
                {field.error && <span className="text-red-600 text-xs">{field.error}</span>}
              </div>
            ))}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right text-red-400">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                className="col-span-3 bg-zinc-900 border-red-500 text-white file:text-white file:bg-red-600 file:border-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatedProfileDialogue;
