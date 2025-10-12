import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Users,
  Briefcase,
  FileText,
  Image,
} from "lucide-react";
import Navbar from "../shared/Navbar";
import { COMPANY_API_END_POINT } from "../utils/constant";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";



export default function CompanySetup() {
  const {companyId}=useParams();
  //console.log("Company ID from URL:", companyId);

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    // industry: '',
    size: "",
    location: "",
    description: "",
    logo_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

useEffect(() => {
  const fetchCompany = async () => {
    if (!companyId) return; // no ID, new company

    try {
      const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const company = res.data.company;
        setFormData({
          name: company.name || "",
          website: company.website || "",
          size: company.size || "",
          location: company.location || "",
          description: company.description || "",
          logo_url: company.logo || "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchCompany();
}, [companyId]);



    // Fetch company data by ID and populate form 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
  const res = await axios.put(
    `${COMPANY_API_END_POINT}/update/${companyId}`,
    {
      companyName: formData.name,
      location: formData.location,
      description: formData.description,
      logo: formData.logo_url,
    },
    { withCredentials: true,timeout:5000 }
  );

  console.log("Full response:", res); // <- log full response
  console.log("response data:", res.data); // <- log response data

  if (res.data.success) {
    console.log("response message:", res.data.message);
    toast.success(res.data.message);
    setSuccess(true);
  } else {
    toast.error(res.data.message);
  }
} catch (err) {
  console.log("Axios error:", err);
}
finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-slate-800">
        <div className="mb-8">
          <button className="inline-flex items-center hover:text-gray-900 transition-colors  bg-red-600 text-gray-200 text-sm font-bold ">
            <ArrowLeft className="w-4 h-4 mr-2 bg-red-600 text-gray-200" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-200 mt-4">
            Company Setup
          </h2>
        </div>

        {/* {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">Company created successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )} */}

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-xl shadow-sm border border-gray-200 p-8 space-y-8"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="name"
                  className="flex items-center  text-white text-lg font-semibold tracking-tighter mb-2"
                >
                  <Building2 className="w-4 h-4 mr-2 text-white text-lg font-semibold tracking-tighter" />
                  Company Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="flex items-center  text-white text-lg font-semibold tracking-tighter mb-2"
                >
                  <Globe className="w-4 h-4 mr-2 text-white text-lg font-semibold tracking-tighter" />
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="flex items-center  text-white text-lg font-semibold tracking-tighter mb-2"
                >
                  <Users className="w-4 h-4 mr-2 text-white text-lg font-semibold tracking-tighter" />
                  Company Size
                </label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="flex items-center  text-white text-lg font-semibold tracking-tighter mb-2"
                >
                  <MapPin className="w-4 h-4 mr-2 text-white text-lg font-semibold tracking-tighter" />
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label
                  htmlFor="logo_url"
                  className="flex items-center  text-white text-lg font-semibold tracking-tighter mb-2"
                >
                  <Image className="w-4 h-4 mr-2 text-white text-lg font-semibold tracking-tighter" />
                  Logo URL
                </label>
                <input
                  type="url"
                  id="logo_url"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="flex items-center  text-white text-lg font-semibold tracking-tighter mb-2"
                >
                  <FileText className="w-4 h-4 mr-2  text-white text-lg font-semibold tracking-tighter" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your company..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creating..." : "Create Company"}
            </button>
          </div>
        </form>
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
    </div>
  );
}
